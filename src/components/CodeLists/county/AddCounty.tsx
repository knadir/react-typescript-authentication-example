import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useEffect, useState } from 'react';
import EntityDataService from '../../../services/EntityService';
import CountyDataService from '../../../services/CountyService';
import ICountyData from '../../../types/County';
import { Page } from '../../common/Page';
import { useTranslation } from 'react-i18next';
import { Autocomplete } from '@mui/material';

interface EntitiesType {
  inputValue?: string;
  name: string;
  id?: number;
}

const entities: EntitiesType[] = [];

const AddCounty: React.FC = () => {
  const { t } = useTranslation();
  const initialCountyState = {
    id: null,
    name: '',
    entityId: null,
    entityName: '',
  };
  const [currentCounty, setCurrentCounty] =
    useState<ICountyData>(initialCountyState);
  const [counties, setCounties] = useState<ICountyData>(initialCountyState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCounty({ ...currentCounty, [name]: value });
  };

  const saveCounty = () => {
    currentCounty.entityId = value?.id;
    const data = {
      id: currentCounty.id,
      name: currentCounty.name,
      entityId: currentCounty.entityId,
    };
    console.log('data...',data);
    CountyDataService.create(data)
      .then((response: any) => {
        setCounties({
          entityId: response.data.id,
          name: response.data.name,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newCounty = () => {
    setCounties(initialCountyState);
    setSubmitted(false);
  };

  const component_title = t('add') + ' ' + t('county');
  const [value, setValue] = React.useState<EntitiesType | null>(null);

  useEffect(() => {
    retrieveEntities();
  }, []);

  const retrieveEntities = () => {
    EntityDataService.getAll()
      .then((response: any) => {
        const newdata = response.data.map((x: { id: number; name: any }) => ({
          id: x.id,
          name: x.name,
        }));
        for (let i = 0; i < newdata.length; i++) {
          entities.push({ name: '', id: 0 });
        }

        for (let i = 0; i < newdata.length; i++) {
          entities[i].name = newdata[i].name;
          entities[i].id = newdata[i].id;
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
              {t('you_submitted_successfully')}
            </Typography>
            <Button
              variant='contained'
              color='success'
              onClick={newCounty}
              endIcon={<SendIcon />}
            >
              {t('add')}
            </Button>
          </div>
        ) : (
          <div>
            <div className='edit-form'>
              <Typography variant='h4' gutterBottom>
                {component_title}
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
                label={t('name')}
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
                id='entityName'
                options={entities}
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
                  <TextField {...params} label={t('entities')} />
                )}
              />
              <br />
              <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
                <Button
                  variant='contained'
                  color='success'
                  onClick={saveCounty}
                  endIcon={<SendIcon />}
                >
                  {t('submit')}
                </Button>
              </Stack>
            </Box>
          </div>
        )}
      </div>
    </Page>
  );
};

export default AddCounty;
