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

import CountyDataService from '../../../services/CountyService';
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

type County = {
  id: number;
  name: string;
};

const newCounty = (): County => ({
  id: /*Math.floor(Math.random() * 30)*/ 0,
  name: /*namor.generate({ words: 1, saltLength: 0, subset: 'manly' })*/ '',
});

type DataBaseDataCounty = County & {
  subRows?: DataBaseDataCounty[];
};

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

function makeDataCounty(...lens: number[]): DataBaseDataCounty[] {
  const makeDataLevelCounty = (depth = 0): DataBaseDataCounty[] => {
    const len = lens[depth];
    return range(len).map(() => ({
      ...newCounty(),
      subRows: lens[depth + 1] ? makeDataLevelCounty(depth + 1) : undefined,
    }));
  };

  return makeDataLevelCounty();
}

const CountiesList: React.FC = () => {
  const { t } = useTranslation();
  const header_group_entities = t('entities');
  const header_group_counties = t('counties');
  const header_id = t('id');
  const header_name = t('name');

  const [data, setData] = React.useState<DataBaseDataCounty[]>(() =>
    makeDataCounty(100)
  );

  const columns = [
    {
      Header: header_group_counties,
      columns: [
        {
          Header: header_id,
          accessor: 'id',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataCounty>) =>
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
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataCounty>) =>
            `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
      ],
    },
    {
      Header: header_group_entities,
      columns: [
        {
          Header: header_id,
          accessor: 'entityId',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataCounty>) =>
            `${value} Names`,
        },
        {
          Header: header_name,
          accessor: 'entityName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataCounty>) =>
            `${value} Names`,
        },
      ],
    },
  ]; //.flatMap((c: any) => c.columns) // remove comment to drop header groups

  useEffect(() => {
    retrieveCounties();
  }, []);

  const retrieveCounties = () => {
    CountyDataService.getAll()
      .then((response: any) => {
        console.log('response.data...', response.data);
        const newdata = response.data.map((x: { id: number; name: any; entityId: any; entityName: any }) => ({
          id: x.id,
          name: x.name,
          entityId: x.entityId,
          entityName: x.entityName,
        }));
        console.log(newdata);
        setData(newdata);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  const addCounty = useCallback(
    () => () => {
      navigate('/code_lists/counties/add');
    },
    [navigate]
  );

  const editCounty = useCallback(
    (instance: TableInstance<DataBaseDataCounty>) => () => {
      navigate(
        '/code_lists/counties/' +
          instance.selectedFlatRows.map((v) => `${v.original.id}`)
      );
    },
    [navigate]
  );

  // const deleteCounty = useCallback(
  //   (instance: TableInstance<DataBaseDataCounty>) => async () => {
  //     CountyDataService.remove(instance.selectedFlatRows.map((v) => `${v.original.id}`))
  //       .then((response: any) => {
  //         console.log(response.data);
  //         dispatch({ type: 'LOG_IN' });
  //         navigateTo('/code_lists/counties', false);
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
      <Table<DataBaseDataCounty>
        name={t('counties')}
        columns={columns}
        data={data}
        onAdd={addCounty}
        onEdit={editCounty}
        // onDelete={deleteCounty}
      />
    </Page>
  );
};

export default CountiesList;
