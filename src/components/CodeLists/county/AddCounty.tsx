import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useState } from 'react';
import CountyDataService from '../../../services/CountyService';
import ICountyData from '../../../types/County';
import { Page } from '../../common/Page';
import { useTranslation } from 'react-i18next';

const AddCounty: React.FC = () => {
  const { t } = useTranslation();
  const initialCountyState = {
    id: null,
    name: '',
  };
  const [counties, setCounties] = useState<ICountyData>(initialCountyState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCounties({ ...counties, [name]: value });
  };

  const saveCounty = () => {
    const data = {
      name: counties.name,
    };

    CountyDataService.create(data)
      .then((response: any) => {
        setCounties({
          id: response.data.id,
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
