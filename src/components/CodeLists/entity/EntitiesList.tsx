import { CssBaseline } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CellProps,
  FilterValue,
  IdType,
  Row,
  TableInstance,
} from 'react-table';

import EntityDataService from '../../../services/EntityService';
import { Page } from '../../common/Page';
import { Table } from '../../common/Table';
import { useTranslation } from 'react-i18next';

function filterGreaterThan(
  rows: Array<Row<any>>,
  id: Array<IdType<any>>,
  filterValue: FilterValue
) {
  return rows.filter((row) => {
    const rowValue = row.values[id[0]];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

type Entity = {
  id: number;
  name: string;
};

const newEntity = (): Entity => ({
  id: /*Math.floor(Math.random() * 30)*/ 0,
  name: /*namor.generate({ words: 1, saltLength: 0, subset: 'manly' })*/ '',
});

type DataBaseDataEntity = Entity & {
  subRows?: DataBaseDataEntity[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function makeDataEntity(...lens: number[]): DataBaseDataEntity[] {
  const makeDataLevelEntity = (depth = 0): DataBaseDataEntity[] => {
    const len = lens[depth];
    return range(len).map(() => ({
      ...newEntity(),
      subRows: lens[depth + 1] ? makeDataLevelEntity(depth + 1) : undefined,
    }));
  };

  return makeDataLevelEntity();
}

const EntitiesList: React.FC = () => {
  const { t } = useTranslation();
  const header_id = t('id');
  const header_name = t('name');

  const [data, setData] = React.useState<DataBaseDataEntity[]>(() =>
    makeDataEntity(100)
  );

  const columns = [
    {
      columns: [
        {
          Header: header_id,
          accessor: 'id',
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEntity>) =>
            `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
        {
          Header: header_name,
          accessor: 'name',
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEntity>) =>
            `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
      ],
    },
  ].flatMap((c: any) => c.columns); // remove comment to drop header groups

  useEffect(() => {
    retrieveEntities();
  }, []);

  const retrieveEntities = () => {
    EntityDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map(
          (x: { id: number; name: any }) => ({
            id: x.id,
            name: x.name,
          })
        );
        setData(newdata);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  const addEntity = useCallback(
    () => () => {
      navigate('/code_lists/entities/add');
    },
    [navigate]
  );

  const editEntity = useCallback(
    (instance: TableInstance<DataBaseDataEntity>) => () => {
      navigate(
        '/code_lists/entities/' +
          instance.selectedFlatRows.map((v) => `${v.original.id}`)
      );
    },
    [navigate]
  );

  // const deleteEntity = useCallback(
  //   (instance: TableInstance<DataBaseDataEntity>) => async () => {
  //     EntityDataService.remove(instance.selectedFlatRows.map((v) => `${v.original.id}`))
  //       .then((response: any) => {
  //         console.log(response.data);
  //         dispatch({ type: 'LOG_IN' });
  //         navigateTo('/code_lists/entities', false);
  //         // window.location.reload();
  //       })
  //       .catch((e: Error) => {
  //         console.log(e);
  //       });
  //   },
  //   [dispatch]
  // );

  return (
    <Page>
      <CssBaseline />
      <Table<DataBaseDataEntity>
        name={t('entities')}
        columns={columns}
        data={data}
        onAdd={addEntity}
        onEdit={editEntity}
        // onDelete={deleteEntity}
      />
    </Page>
  );
};

export default EntitiesList;
