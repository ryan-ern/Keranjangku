import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
// import App from './App.jsx'
// import './index.css'
import store from './redux/stores';
import RoutesApp from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RoutesApp />
        </Provider>
    </React.StrictMode>
)
