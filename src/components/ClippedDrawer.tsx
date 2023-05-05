import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import * as AuthService from '../services/auth.service';
import { useState, useEffect } from 'react';
import IUser from '../types/user.type';
import EventBus from '../common/EventBus';
import { useNavigate } from 'react-router-dom';
import { SvgIcon, MenuItem as MenuItem2, Select } from '@mui/material';
import { ReactComponent as LogoIcon } from '../assets/BijeliLogo.svg';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useTranslation } from 'react-i18next';
import { useSidebarSelectedMenuTitleContext } from '../hooks/useSidebarSelectedMenuTitleContext';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CalculateIcon from '@mui/icons-material/Calculate';
import SummarizeIcon from '@mui/icons-material/Summarize';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const { t } = useTranslation();

  const { setMenuTitle } = useSidebarSelectedMenuTitleContext();
  const menuItemMouseUpHandler = (mnuTitle: string) => {
    setMenuTitle(mnuTitle);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [showModeratorBoard, setShowModeratorBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
    navigate('/login', { replace: true });
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters>
          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography> */}
          <SvgIcon
            viewBox='0 0 50 20'
            style={{ minWidth: '80px', marginLeft: '40px' }}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 60 }}
          >
            <LogoIcon />
          </SvgIcon>
          <Typography
            variant='h6'
            sx={{
              marginX: 1,
              flexGrow: 1,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            PLATE
          </Typography>
          {currentUser ? (
            <>
              <Select
                style={{ minWidth: '80px', marginRight: '40px' }}
                id='navbarSelect'
                sx={{
                  'height': '2.5rem',
                  'color': 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white',
                  },
                }}
                displayEmpty
                renderValue={(value) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: 1,
                        py: 0,
                        my: 0,
                      }}
                    >
                      <>
                        <Typography mx='auto' my={0} py={0}>
                          {currentUser.username}
                        </Typography>
                        {value}
                      </>
                    </Box>
                  );
                }}
              >
                <MenuItem2 href='/login' onClick={logOut}>
                  Logout
                </MenuItem2>
              </Select>
            </>
          ) : (
            <Box
              sx={{ display: { xs: 'none', sm: 'block' } }}
              style={{ minWidth: '80px', marginRight: '40px' }}
            >
              <Button
                href='/login'
                sx={{ color: '#fff' }}
                onClick={() =>
                  navigate('/code_lists/counties', { replace: true })
                }
              >
                {t('login')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box component='nav'>
        <Drawer
          variant='permanent'
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map(
                (text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Menu>
              <MenuItem
                icon={<CalculateIcon />}
                onClick={() => navigate('/', { replace: true })}
                onMouseUp={() => menuItemMouseUpHandler('Home')}
              >
                {t('calculation')}
              </MenuItem>
              <SubMenu
                label={t('code_lists')}
                icon={<FormatListNumberedIcon />}
              >
                <MenuItem
                  onClick={() =>
                    navigate('/code_lists/employers', { replace: true })
                  }
                  onMouseUp={() => menuItemMouseUpHandler('Employers')}
                >
                  {t('employers')}
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate('/code_lists/entities', { replace: true })
                  }
                  onMouseUp={() => menuItemMouseUpHandler('Entities')}
                >
                  {t('entities')}
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate('/code_lists/counties', { replace: true })
                  }
                  onMouseUp={() => menuItemMouseUpHandler('County')}
                >
                  {t('counties')}
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    navigate('/code_lists/municipalities', { replace: true })
                  }
                  onMouseUp={() => menuItemMouseUpHandler('Municipality')}
                >
                  {t('municipalities')}
                </MenuItem>
              </SubMenu>
              <MenuItem
                icon={<SummarizeIcon />}
                onClick={() => navigate('/', { replace: true })}
                onMouseUp={() => menuItemMouseUpHandler('Home')}
              >
                {t('reports')}
              </MenuItem>
            </Menu>
          </Box>
        </Drawer>
      </Box>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        <Typography variant='h4'></Typography>
      </Box>
    </Box>
  );
}
