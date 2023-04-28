import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CountyDataService from '../../../services/CountyService';
import ICountyData from '../../../types/County';
import { Page } from '../../common/Page';

const County: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialCountyState = {
    id: null,
    name: '',
  };
  const [currentCounty, setCurrentCounty] =
    useState<ICountyData>(initialCountyState);
  const [message, setMessage] = useState<string>('');

  const getCounty = (id: string) => {
    CountyDataService.get(id)
      .then((response: any) => {
        setCurrentCounty(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getCounty(id);
  }, [id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentCounty({ ...currentCounty, [name]: value });
  };

  const updateCounty = () => {
    CountyDataService.update(currentCounty.id, currentCounty)
      .then((response: any) => {
        console.log(response.data);
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
          <br />
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
};

export default County;
