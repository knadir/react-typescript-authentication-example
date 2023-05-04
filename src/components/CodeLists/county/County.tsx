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

import EntityDataService from '../../../services/EntityService';
import CountyDataService from '../../../services/CountyService';
import ICountyData from '../../../types/County';
import { Page } from '../../../components/common/Page';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import IEntityData from '../../../types/Entity';

interface EntityType {
  inputValue?: string;
  name: string;
  id?: number;
}

const entities: EntityType[] = [];
const entity: EntityType[] = [];

export default function FreeSoloCreateOption() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const initialCountyState = {
    id: null,
    name: '',
    entityId: null,
    entityName: '',
  };
  const initialEntityState = {
    id: null,
    name: '',
  };

  const [currentCounty, setCurrentCounty] =
    useState<ICountyData>(initialCountyState);
  const [currentEntity, setCurrentEntity] =
    useState<IEntityData>(initialEntityState);
  const [message, setMessage] = useState<string>('');

  const getCounty = (id: string) => {
    CountyDataService.get(id)
      .then((response: any) => {
        setCurrentCounty(response.data);
        setValue(response.data.entityName);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCounty(id);
  }, [id]);

  const getEntity = (id: string | null | undefined) => {
    EntityDataService.get(id)
      .then((response: any) => {
        setCurrentEntity(response.data);
        // setValue(response.data.entityName);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   if (id) getEntity(currentCounty.entityId);
  // }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCounty({ ...currentCounty, [name]: value });
    setCurrentEntity({ ...currentEntity, [name]: value });
    if (event.target.value) getEntity(event.target.value);
    console.log('event.target.value...', event.target.value);
    console.log('currentCounty.entityId...', currentCounty.entityId);
    console.log('currentEntity...', currentEntity);
  };

  const updateCounty = () => {
    if (!(value?.id === undefined || value?.id === null)) {
      currentCounty.entityId = value?.id;
    }
    CountyDataService.update(currentCounty.id, currentCounty)
      .then((response: any) => {
        setMessage('The county was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteCounty = () => {
    CountyDataService.remove(currentCounty.id)
      .then((response: any) => {
        console.log(response.data);
        navigate('/code_lists/counties');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [value, setValue] = React.useState<EntityType | null>(null);

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
      <div>
        {currentCounty ? (
          <div className='edit-form'>
            <Typography variant='h4' gutterBottom>
              County
            </Typography>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a County...</p>
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
            value={currentCounty.name}
            onChange={handleInputChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id='entityId'
                name='entityId'
                label='Entity Id'
                variant='outlined'
                required
                value={currentCounty.entityId}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <div className='edit-form'>
                <Typography variant='body1' gutterBottom>
                  {currentEntity.name}
                </Typography>
              </div>
            </Grid>
          </Grid>
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
              <li {...props} key={option.id}>
                {option.name}
              </li>
            )}
            sx={{ width: 500 }}
            //freeSolo
            renderInput={(params) => (
              <TextField {...params} label={t('entities')} />
            )}
          />
          <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
            <Button
              variant='contained'
              color='error'
              onClick={deleteCounty}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={updateCounty}
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
