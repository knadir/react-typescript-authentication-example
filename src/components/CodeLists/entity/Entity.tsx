import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EntityDataService from '../../../services/EntityService';
import IEntityData from '../../../types/Entity';
import { Page } from '../../common/Page';

const Entity: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialEntityState = {
    id: null,
    name: '',
  };
  const [currentEntity, setCurrentEntity] =
    useState<IEntityData>(initialEntityState);
  const [message, setMessage] = useState<string>('');

  const getEntity = (id: string) => {
    EntityDataService.get(id)
      .then((response: any) => {
        setCurrentEntity(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getEntity(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentEntity({ ...currentEntity, [name]: value });
  };

  const updateEntity = () => {
    EntityDataService.update(currentEntity.id, currentEntity)
      .then((response: any) => {
        console.log(response.data);
        setMessage('The entity was updated successfully!');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteEntity = () => {
    EntityDataService.remove(currentEntity.id)
      .then((response: any) => {
        console.log(response.data);
        navigate('/code_lists/entities');
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Page>
      <div>
        {currentEntity ? (
          <div className='edit-form'>
            <Typography variant='h4' gutterBottom>
              Entity
            </Typography>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Entity...</p>
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
            value={currentEntity.name}
            onChange={handleInputChange}
          />
          <br />
          <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
            <Button
              variant='contained'
              color='error'
              onClick={deleteEntity}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={updateEntity}
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
};

export default Entity;
