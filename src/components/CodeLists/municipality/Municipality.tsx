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

import CountyDataService from '../../../services/CountyService';
import MunicipalityDataService from '../../../services/MunicipalityService';
import IMunicipalityData from '../../../types/Municipality';
import { Page } from '../../../components/common/Page';
import { useTranslation } from 'react-i18next';

interface CountyType {
  inputValue?: string;
  name: string;
  id?: number;
}

const counties: CountyType[] = [];

export default function FreeSoloCreateOption() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialMunicipalityState = {
    id: null,
    name: '',
    countyId: null,
    countyName: '',
  };
  const [currentMunicipality, setCurrentMunicipality] =
    useState<IMunicipalityData>(initialMunicipalityState);
  const [message, setMessage] = useState<string>('');

  const getMunicipality = (id: string) => {
    MunicipalityDataService.get(id)
      .then((response: any) => {
        setCurrentMunicipality(response.data);
        setValue(response.data.countyName);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getMunicipality(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentMunicipality({ ...currentMunicipality, [name]: value });
  };

  const updateMunicipality = () => {
    if (!(value?.id === undefined || value?.id === null)) {
      currentMunicipality.countyId = value?.id;
    };
    MunicipalityDataService.update(currentMunicipality.id, currentMunicipality)
      .then((response: any) => {
        setMessage('The municipality was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteMunicipality = () => {
    MunicipalityDataService.remove(currentMunicipality.id)
      .then((response: any) => {
        console.log(response.data);
        navigate('/code_lists/municipalities');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [value, setValue] = React.useState<CountyType | null>(null);

  useEffect(() => {
    retrieveCounties();
  }, []);

  const retrieveCounties = () => {
    CountyDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map((x: { id: number; name: any }) => ({
          id: x.id,
          name: x.name,
        }));
        for (let i = 0; i < newdata.length; i++) {
          counties.push({ name: '', id: 0 });
        }

        for (let i = 0; i < newdata.length; i++) {
          counties[i].name = newdata[i].name;
          counties[i].id = newdata[i].id;
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Page>
      <div>
        {currentMunicipality ? (
          <div className='edit-form'>
            <Typography variant='h4' gutterBottom>
              Municipality
            </Typography>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Municipality...</p>
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
            id='name'
            name='name'
            label='Name'
            variant='outlined'
            required
            value={currentMunicipality.name}
            onChange={handleInputChange}
          />
          <Autocomplete
            value={value}
            isOptionEqualToValue={(option, value) =>
              option.inputValue === value.inputValue
            }
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  name: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  name: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='countyName'
            options={counties}
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
            renderInput={(params) => <TextField {...params} label={t("counties")} />}
          />
          <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
            <Button
              variant='contained'
              color='error'
              onClick={deleteMunicipality}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={updateMunicipality}
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
