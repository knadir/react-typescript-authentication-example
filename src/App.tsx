import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoutes from './components/PrivateRoutes';

const App: React.FC = () => {
  return <PrivateRoutes />;
};

export default App;
