// authSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState= {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('accessToken', action.payload.token);
    },
    setLogout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;