import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import Home from './page/home';
import Ps4 from './page/Ps4';
import Ps5 from './page/Ps5';
import Whatsnew from './page/Whatsnew';
import Signin from './page/Signin';
import Signup from './page/Signup';
import Addgame from './page/Addgame';
import Profile from './page/Profile';
import { Store } from './redux/Store';
import { Provider } from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="Ps4" element={<Ps4 />} />
      <Route path="Ps5" element={<Ps5 />} />
      <Route path="Whatsnew" element={<Whatsnew />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="Addgame" element={<Addgame />} />
      <Route path="Profile" element={<Profile />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
  <RouterProvider router={router}/>
  </Provider> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
