import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import * as AuthService from '../services/auth.service';
import IUser from '../types/user.type';

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Profile from './Profile';
import BoardUser from './BoardUser';
import BoardModerator from './BoardModerator';
import BoardAdmin from './BoardAdmin';

import EventBus from '../common/EventBus';
import ClippedDrawer from './ClippedDrawer';
import EntitiesList from './CodeLists/entity/EntitiesList';
import AddEntity from './CodeLists/entity/AddEntity';
import Entity from './CodeLists/entity/Entity';
import CountiesList from './CodeLists/county/CountiesList';
import County from './CodeLists/county/County';
import AddCounty from './CodeLists/county/AddCounty';
import AddMunicipality from './CodeLists/municipality/AddMunicipality';
import MunicipalitiesList from './CodeLists/municipality/MunicipalitiesList';
import Municipality from './CodeLists/municipality/Municipality';
import AddEmployer from './CodeLists/employer/AddEmployer';
import EmployersList from './CodeLists/employer/EmployersList';
import Employer from './CodeLists/employer/Employer';

const PrivateRoutes: React.FC = () => {
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
      <ClippedDrawer />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user' element={<BoardUser />} />
          <Route path='/mod' element={<BoardModerator />} />
          <Route path='/admin' element={<BoardAdmin />} />
          <Route path='/admin' element={<BoardAdmin />} />
          <Route path='code_lists/entities' element={<EntitiesList />} />
          <Route path='code_lists/entities/add' element={<AddEntity />} />
          <Route path='code_lists/entities/:id' element={<Entity />} />
          <Route path='code_lists/counties' element={<CountiesList />} />
          <Route path='code_lists/counties/add' element={<AddCounty />} />
          <Route path='code_lists/counties/:id' element={<County />} />
          <Route
            path='code_lists/municipalities'
            element={<MunicipalitiesList />}
          />
          <Route
            path='code_lists/municipalities/add'
            element={<AddMunicipality />}
          />
          <Route
            path='code_lists/municipalities/:id'
            element={<Municipality />}
          />
          <Route
            path='code_lists/employers'
            element={<EmployersList />}
          />
          <Route
            path='code_lists/employers/add'
            element={<AddEmployer />}
          />
          <Route
            path='code_lists/employers/:id'
            element={<Employer />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default PrivateRoutes;
