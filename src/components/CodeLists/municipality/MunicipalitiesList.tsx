import { CssBaseline } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CellProps, FilterValue, IdType, Row, TableInstance } from 'react-table';

import MunicipalityDataService from '../../../services/MunicipalityService';
import { Page } from '../../../components/common/Page';
import { Table } from '../../../components/common/Table';
import { DataBaseDataMunicipality, makeDataMunicipality } from '../../../components/common/utils';
import { useTranslation } from 'react-i18next';

function filterGreaterThan(rows: Array<Row<any>>, id: Array<IdType<any>>, filterValue: FilterValue) {
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

const MunicipalitiesList: React.FC = () => {
  const { t } = useTranslation();
  const header_group_municipalities = t('municipalities');
  const header_group_counties = t('counties');
  const header_id = t('id');
  const header_name = t('name');
  const [data, setData] = React.useState<DataBaseDataMunicipality[]>(() => makeDataMunicipality(100));

  const columns = [
    {
      Header: header_group_municipalities,
      columns: [
        {
          Header: header_id,
          accessor: 'id',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataMunicipality>) => `${value} Names`,
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
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataMunicipality>) => `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
      ],
    },
    {
      Header: header_group_counties,
      columns: [
        {
          Header: header_id,
          accessor: 'countyId',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataMunicipality>) => `${value} Names`,
        },
        {
          Header: header_name,
          accessor: 'countyName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataMunicipality>) => `${value} Names`,
        },
      ],
    },
  ]; //.flatMap((c: any) => c.columns) // remove comment to drop header groups

  useEffect(() => {
    retrieveMunicipalities();
  }, []);

  const retrieveMunicipalities = () => {
    MunicipalityDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map((x: { id: any; name: any; countyId: any; countyName: any }) => ({
          id: x.id,
          name: x.name,
          countyId: x.countyId,
          countyName: x.countyName,
        }));
        console.log(response.data);
        setData(newdata);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  const addMunicipality = useCallback(
    (instance: TableInstance<DataBaseDataMunicipality>) => () => {
      navigate('/code_lists/municipalities/add');
    },
    [navigate]
  );

  const editMunicipality = useCallback(
    (instance: TableInstance<DataBaseDataMunicipality>) => () => {
      navigate('/code_lists/municipalities/' + instance.selectedFlatRows.map((v) => `${v.original.id}`));
    },
    [navigate]
  );

  // const deleteMunicipality = useCallback(
  //   (instance: TableInstance<DataBaseDataMunicipality>) => async () => {
  //     MunicipalityDataService.remove(
  //       instance.selectedFlatRows.map((v) => `${v.original.id}`)
  //     )
  //       .then((response: any) => {
  //         console.log(response.data);
  //         navigate('/code_lists/municipalitiesh');
  //       })
  //       .catch((e: Error) => {
  //         console.log(e);
  //       });
  //   },
  //   [navigate]
  // );

  return (
    <Page>
      <CssBaseline />
      <Table<DataBaseDataMunicipality>
        name={t('municipalities')}
        columns={columns}
        data={data}
        onAdd={addMunicipality}
        onEdit={editMunicipality}
        // onDelete={deleteMunicipality}
      />
    </Page>
  );
};

export default MunicipalitiesList;
