import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/index.js';

// Pages
import MainPage from './pages/Main.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

