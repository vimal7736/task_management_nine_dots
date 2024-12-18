import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/features/auth/authSlice';

const InitializeAuthFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      dispatch(setCredentials(userInfo)); 
    }
  }, [dispatch]);

  return null; 
};

export default InitializeAuthFromLocalStorage;
