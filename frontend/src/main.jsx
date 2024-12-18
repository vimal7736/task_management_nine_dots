import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './store'; // Import persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import HomeScreen from './screens/HomeScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import TaskScreen from './screens/TaskScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';

// Define the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Public Routes */}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/tasks" element={<TaskScreen />} />
      </Route>
    </Route>
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
</PersistGate>

  </Provider>
);
