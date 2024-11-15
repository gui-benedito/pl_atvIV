import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Cliente from './Pages/cliente';
import ListaClientes from './Pages/listagem/listaClientes';
import Cadastrar from './Pages/Cadastrar';
import EditarCliente from './Pages/Editar';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
        </Route>
        <Route path='/cliente' element={<Cliente />}>
          <Route index path='/cliente/lista' element={<ListaClientes />} />
          <Route path='/cliente/cadastrar' element={<Cadastrar/>} />
          <Route path='/cliente/editar/:id' element={<EditarCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
