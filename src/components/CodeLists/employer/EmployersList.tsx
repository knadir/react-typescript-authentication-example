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

import EmployerDataService from '../../../services/EmployerService';
import { Page } from '../../common/Page';
import { Table } from '../../common/Table';
import { DataBaseDataEmployer, makeDataEmployer } from '../../common/utils';
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

const EmployersList: React.FC = () => {
  const { t } = useTranslation();
  const header_group_employers = t('employers');
  const header_group_municipalities_born = t('municipalities_born');
  const header_group_municipalities_addr = t('municipalities_addr');
  const header_id = t('id');
  const header_born_id = t('id');
  const header_born_name = t('name');
  const header_addr_id = t('id');
  const header_addr_name = t('name');
  const header_first_name = t('first_name');
  const header_last_name = t('last_name');
  const [data, setData] = React.useState<DataBaseDataEmployer[]>(() =>
    makeDataEmployer(100)
  );

  const columns = [
    {
      Header: header_group_employers,
      columns: [
        {
          Header: header_id,
          accessor: 'id',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
        {
          Header: header_first_name,
          accessor: 'firstName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
          options: {
            filter: true,
            sort: true,
            sortDirection: 'desc',
          },
        },
        {
          Header: header_last_name,
          accessor: 'lastName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
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
      Header: header_group_municipalities_born,
      columns: [
        {
          Header: header_born_id,
          accessor: 'municipalityBornId',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
        },
        {
          Header: header_born_name,
          accessor: 'municipalityBornName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
        },
      ],
    },
    {
      Header: header_group_municipalities_addr,
      columns: [
        {
          Header: header_addr_id,
          accessor: 'municipalityAddrId',
          // width: 20,
          // minWidth: 10,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
        },
        {
          Header: header_addr_name,
          accessor: 'municipalityAddrName',
          // minWidth: 50,
          aggregate: 'count',
          Aggregated: ({ cell: { value } }: CellProps<DataBaseDataEmployer>) =>
            `${value} Names`,
        },
      ],
    },
  ]; //.flatMap((c: any) => c.columns) // remove comment to drop header groups

  useEffect(() => {
    retrieveEmployers();
  }, []);

  const retrieveEmployers = () => {
    EmployerDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map(
          (x: {
            id: any;
            name: any;
            firstName: any;
            lastName: any;
            municipalityBornId: any;
            municipalityBornName: any;
            municipalityAddrId: any;
            municipalityAddrName: any;
          }) => ({
            id: x.id,
            name: x.name,
            firstName: x.firstName,
            lastName: x.lastName,
            municipalityBornId: x.municipalityBornId,
            municipalityBornName: x.municipalityBornName,
            municipalityAddrId: x.municipalityAddrId,
            municipalityAddrName: x.municipalityAddrName,
          })
        );
        console.log(response.data);
        setData(newdata);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const navigate = useNavigate();

  const addEmployer = useCallback(
    (instance: TableInstance<DataBaseDataEmployer>) => () => {
      navigate('/code_lists/employers/add');
    },
    [navigate]
  );

  const editEmployer = useCallback(
    (instance: TableInstance<DataBaseDataEmployer>) => () => {
      navigate(
        '/code_lists/employers/' +
          instance.selectedFlatRows.map((v) => `${v.original.id}`)
      );
    },
    [navigate]
  );

  // const deleteEmployer = useCallback(
  //   (instance: TableInstance<DataBaseDataEmployer>) => async () => {
  //     EmployerDataService.remove(
  //       instance.selectedFlatRows.map((v) => `${v.original.id}`)
  //     )
  //       .then((response: any) => {
  //         console.log(response.data);
  //         navigate('/code_lists/employersh');
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
      <Table<DataBaseDataEmployer>
        name={t('employers')}
        columns={columns}
        data={data}
        onAdd={addEmployer}
        onEdit={editEmployer}
        // onDelete={deleteEmployer}
      />
    </Page>
  );
};

export default EmployersList;
