import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';

import CountyDataService from '../../../services/CountyService';
import MunicipalityDataService from '../../../services/MunicipalityService';
import IMunicipalityData from '../../../types/Municipality';
import { Page } from '../../../components/common/Page';

interface CountyType {
  inputValue?: string;
  name: string;
  id?: number;
}

const counties: CountyType[] = [];

const AddMunicipality: React.FC = () => {
  const initialMunicipalityState = {
    id: null,
    name: '',
    countyId: null,
    countyName: '',
  };

  const [currentMunicipality, setCurrentMunicipality] =
    useState<IMunicipalityData>(initialMunicipalityState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentMunicipality({ ...currentMunicipality, [name]: value });
  };

  const saveMunicipality = () => {
    currentMunicipality.countyId = value?.id;
    const data = {
      id: currentMunicipality.id,
      name: currentMunicipality.name,
      countyId: currentMunicipality.countyId,
    };
    MunicipalityDataService.create(data)
      .then((response: any) => {
        setCurrentMunicipality({
          countyId: response.data.id,
          name: response.data.name,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newMunicipality = () => {
    setCurrentMunicipality(initialMunicipalityState);
    setSubmitted(false);
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
      <div className='submit-form'>
        {submitted ? (
          <div>
            <Typography sx={{ mt: 2 }} variant='subtitle1' gutterBottom>
              You submitted successfully!
            </Typography>
            <Button
              variant='contained'
              color='success'
              onClick={newMunicipality}
              endIcon={<SendIcon />}
            >
              Add
            </Button>
          </div>
        ) : (
          <div>
            <div className='edit-form'>
              <Typography variant='h4' gutterBottom>
                Add Municipality
              </Typography>
            </div>
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
                onChange={handleInputChange}
              />
              <Autocomplete
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
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
                  <li {...props}>{option.name}</li>
                )}
                sx={{ width: 500 }}
                //freeSolo
                renderInput={(params) => (
                  <TextField {...params} label='Counties' />
                )}
              />
              <br />
              <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
                <Button
                  variant='contained'
                  color='success'
                  onClick={saveMunicipality}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Stack>
            </Box>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AddMunicipality;
