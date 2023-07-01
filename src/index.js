import React, { Suspense } from 'react'
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

import PreDataLoader from '../src/components/elements/PreDataLoader'


  const loadingMarkup = (
    <PreDataLoader 
   width={"40px"}
   height={"40px"}
   iconColor={"white"}
   backgroundColor={"#deb726"}
   left={"70%"}
   top={"90px"} />
   
  )


ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
  <React.StrictMode>
  
  <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </Suspense>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
