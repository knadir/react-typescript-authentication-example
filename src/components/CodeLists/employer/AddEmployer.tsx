import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';

import MunicipalityDataService from '../../../services/MunicipalityService';
import EmployerDataService from '../../../services/EmployerService';
import IEmployerData from '../../../types/Employer';
import { Page } from '../../../components/common/Page';

interface MunicipalityType {
  inputValue?: string;
  name: string;
  id?: number;
}

const counties: MunicipalityType[] = [];

const AddEmployer: React.FC = () => {
  const initialEmployerState = {
    id: null,
    firstName: '',
    lastName: '',
    municipalityId: null,
    municipalityName: '',
  };

  const [currentEmployer, setCurrentEmployer] =
    useState<IEmployerData>(initialEmployerState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEmployer({ ...currentEmployer, [name]: value });
  };

  const saveEmployer = () => {
    currentEmployer.municipalityId = value?.id;
    const data = {
      id: currentEmployer.id,
      firstName: currentEmployer.firstName,
      lastName: currentEmployer.lastName,
      municipalityId: currentEmployer.municipalityId,
    };
    EmployerDataService.create(data)
      .then((response: any) => {
        setCurrentEmployer({
          municipalityId: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newEmployer = () => {
    setCurrentEmployer(initialEmployerState);
    setSubmitted(false);
  };

  const [value, setValue] = React.useState<MunicipalityType | null>(null);

  useEffect(() => {
    retrieveCounties();
  }, []);

  const retrieveCounties = () => {
    MunicipalityDataService.getAll()
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
              onClick={newEmployer}
              endIcon={<SendIcon />}
            >
              Add
            </Button>
          </div>
        ) : (
          <div>
            <div className='edit-form'>
              <Typography variant='h4' gutterBottom>
                Add Employer
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
                id='firstName'
                name='firstName'
                label='First name'
                variant='outlined'
                required
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                id='lastName'
                name='lastName'
                label='Last name'
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
                id='municipalityName'
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
                  onClick={saveEmployer}
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

export default AddEmployer;
