import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MunicipalityDataService from '../../../services/MunicipalityService';
import EmployerDataService from '../../../services/EmployerService';
import IEmployerData from '../../../types/Employer';
import { Page } from '../../../components/common/Page';
import { useTranslation } from 'react-i18next';

interface MunicipalityType {
  inputValue?: string;
  name: string;
  id?: number;
}

const municipalities: MunicipalityType[] = [];

export default function FreeSoloCreateOption() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialEmployerState = {
    id: null,
    firstName: '',
    lastName: '',
    municipalityBornId: null,
    municipalityBornName: '',
    municipalityAddrId: null,
    municipalityAddrName: '',
  };
  const [currentEmployer, setCurrentEmployer] =
    useState<IEmployerData>(initialEmployerState);
  const [message, setMessage] = useState<string>('');

  const getEmployer = (id: string) => {
    EmployerDataService.get(id)
      .then((response: any) => {
        setCurrentEmployer(response.data);
        setValueBorn(response.data.municipalityBornName);
        setValueAddr(response.data.municipalityAddrName);
        console.log('response.data...', response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getEmployer(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEmployer({ ...currentEmployer, [name]: value });
  };

  const updateEmployer = () => {
    if (!(valueBorn?.id === undefined || valueBorn?.id === null)) {
      currentEmployer.municipalityBornId = valueBorn?.id;
    }
    if (!(valueAddr?.id === undefined || valueAddr.id === null)) {
      currentEmployer.municipalityAddrId = valueAddr?.id;
    }
    EmployerDataService.update(currentEmployer.id, currentEmployer)
      .then((response: any) => {
        setMessage('The employer was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteEmployer = () => {
    EmployerDataService.remove(currentEmployer.id)
      .then((response: any) => {
        console.log(response.data);
        navigate('/code_lists/employers');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [valueBorn, setValueBorn] = React.useState<MunicipalityType | null>(
    null
  );
  const [valueAddr, setValueAddr] = React.useState<MunicipalityType | null>(
    null
  );

  useEffect(() => {
    retrieveMunicipalities();
  }, []);

  const retrieveMunicipalities = () => {
    MunicipalityDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map((x: { id: number; name: any }) => ({
          id: x.id,
          name: x.name,
        }));
        for (let i = 0; i < newdata.length; i++) {
          municipalities.push({ name: '', id: 0 });
        }

        for (let i = 0; i < newdata.length; i++) {
          municipalities[i].name = newdata[i].name;
          municipalities[i].id = newdata[i].id;
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Page>
      <div>
        {currentEmployer ? (
          <div className='edit-form'>
            <Typography variant='h4' gutterBottom>
              {t('employer')}
            </Typography>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Employer...</p>
          </div>
        )}
        <Box
          component='form'
          sx={{ width: 500, maxWidth: '100%' }}
          noValidate
          autoComplete='off'
        >
          <TextField
            fullWidth
            id='firstName'
            name='firstName'
            label='First name'
            variant='outlined'
            required
            value={currentEmployer.firstName}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id='lastame'
            name='lastName'
            label='Last name'
            variant='outlined'
            required
            value={currentEmployer.lastName}
            onChange={handleInputChange}
          />
          <Autocomplete
            value={valueBorn}
            isOptionEqualToValue={(option, value) =>
              option.inputValue === value.inputValue
            }
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValueBorn({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValueBorn({
                  name: newValue.inputValue,
                });
              } else {
                setValueBorn(newValue);
              }
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='municipalityBornName'
            options={municipalities}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Regular option
              return option.name;
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            sx={{ width: 500 }}
            //freeSolo
            renderInput={(params) => (
              <TextField {...params} label={t('municipality_born')} />
            )}
          />
          <Autocomplete
            value={valueAddr}
            isOptionEqualToValue={(option, value) =>
              option.inputValue === value.inputValue
            }
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValueAddr({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValueAddr({
                  name: newValue.inputValue,
                });
              } else {
                setValueAddr(newValue);
              }
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='municipalityAddrName'
            options={municipalities}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Regular option
              return option.name;
            }}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            sx={{ width: 500 }}
            //freeSolo
            renderInput={(params) => (
              <TextField {...params} label={t('municipality_addr')} />
            )}
          />
          <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
            <Button
              variant='contained'
              color='error'
              onClick={deleteEmployer}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={updateEmployer}
              endIcon={<SendIcon />}
            >
              Update
            </Button>
          </Stack>
          <Typography sx={{ mt: 2 }} variant='subtitle1' gutterBottom>
            {message}
          </Typography>
        </Box>
      </div>
    </Page>
  );
}
