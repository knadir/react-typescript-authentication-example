import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import * as AuthService from './services/auth.service';
import IUser from './types/user.type';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';

import EventBus from './common/EventBus';
import EntitiesList from './components/CodeLists/entity/EntitiesList';
import AddEntity from './components/CodeLists/entity/AddEntity';
import Entity from './components/CodeLists/entity/Entity';
import CountiesList from './components/CodeLists/county/CountiesList';
import AddCounty from './components/CodeLists/county/AddCounty';
import County from './components/CodeLists/county/County';
import MunicipalitiesList from './components/CodeLists/municipality/MunicipalitiesList';
import AddMunicipality from './components/CodeLists/municipality/AddMunicipality';
import Municipality from './components/CodeLists/municipality/Municipality';

const App: React.FC = () => {
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
  };

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          bezKoder
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/home'} className='nav-link'>
              Home
            </Link>
          </li>

          {showModeratorBoard && (
            <li className='nav-item'>
              <Link to={'/mod'} className='nav-link'>
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className='nav-item'>
              <Link to={'/admin'} className='nav-link'>
                Admin Board
              </Link>
            </li>
          )}

          {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/code_lists/entities'} className='nav-link'>
                Entities
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/code_lists/counties'} className='nav-link'>
                Counties
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/code_lists/municipalities'} className='nav-link'>
                Municipalities
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/register'} className='nav-link'>
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/code_lists/entities' element={<EntitiesList />} />
          <Route path='/code_lists/entities/add' element={<AddEntity />} />
          <Route path='/code_lists/entities/:id' element={<Entity />} />
          <Route path='/code_lists/counties' element={<CountiesList />} />
          <Route path='/code_lists/counties/add' element={<AddCounty />} />
          <Route path='/code_lists/counties/:id' element={<County />} />
          <Route path='/code_lists/municipalities' element={<MunicipalitiesList />} />
          <Route path='/code_lists/municipalities/add' element={<AddMunicipality />} />
          <Route path='/code_lists/municipalities/:id' element={<Municipality/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user' element={<BoardUser />} />
          <Route path='/mod' element={<BoardModerator />} />
          <Route path='/admin' element={<BoardAdmin />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
