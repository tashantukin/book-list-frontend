import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './secure/components/Nav';
import Menu from './secure/components/Menu';
import Dashboard from './secure/dashboard/Dashboard';
import Books from './secure/books/Books';
import BookCreate from './secure/books/BookCreate';
import BookEdit from './secure/books/BookEdit';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './public/Login';
import Register from './public/Register';
import DashboardRedirect from './secure/DashboardRedirect';
function App() {
  return (
    <div className="App"> 
    
        <BrowserRouter>
            <Route path={'/'} exact component = {DashboardRedirect} />
            <Route path={'/dashboard'} exact component = {Dashboard} />
            <Route path={'/books'}component = {Books} exact />
            <Route path={'/books/create'}component = {BookCreate} exact />
            <Route path={'/books/:id/edit'} component = {BookEdit} exact />
            <Route path={'/login'}component = {Login} />
            <Route path={'/register'}component = {Register} />
        </BrowserRouter>
      
    
    </div>
  );
}

export default App;
