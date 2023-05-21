import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotify(state, action) {
      return action.payload;
    },

    removeNotify(state, action) {
      return initialState;
    }
  }
});

export const setNotification = (message, seconds) => {
    return dispatch => {
      dispatch(setNotify(message));
      setTimeout(() => {
        dispatch(removeNotify());
      }, seconds * 1000);
    };
  };

export const { setNotify, removeNotify } = notificationSlice.actions;
export default notificationSlice.reducer;