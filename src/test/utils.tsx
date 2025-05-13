// src/test-utils.tsx or wherever you define your helper functions
import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from '../store/appointmentsSlice'; // Update the path according to your structure
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';


const renderWithStore = (ui: React.ReactNode, preloadedState = {}) => {
  // Create a store using configureStore from Redux Toolkit
  const store = configureStore({
    reducer: {
      appointments: appointmentsReducer, // Make sure to pass the correct reducer from your slice
    },
    preloadedState, // You can pass a custom state if needed
  });
 
  // Return the rendered component wrapped with the Provider
  return render(<Provider store={store}>{ui}</Provider>);

};

export default renderWithStore;
