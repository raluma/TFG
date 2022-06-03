import React from 'react'
import './App.css';
import { Route } from "wouter"
import Home from "./pages/Home"
import SearchMovies from './pages/SearchMovies'
import SearchSeries from './pages/SearchSeries';
import Error404 from './pages/404'
import Movies from './pages/Movies';
import Series from './pages/Series';
import SearchAll from './pages/SearchAll';
import MovieDetail from './pages/MovieDetail';
import SerieDetail from './pages/SerieDetail';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';


export default function App() {
  return <>
      <Route
          component={Home}
          path="/"
      />  

      <Route
          component={Movies}
          path="/movie"
      />  

      <Route
          component={Series}
          path="/serie"
      />  

      <Route 
          component={Login}
          path="/login"
        />

      <Route 
          component={SignUp}
          path="/Signup"
        />

      <Route 
          component={Profile}
          path="/Profile"
        />


      <Route
        component={SearchAll}
        path="/search/:keyword" 
      />

      <Route
        component={SearchMovies}
        path="/search/movie/:keyword" 
      />

      <Route
        component={SearchSeries}
        path="/search/serie/:keyword" 
      />
      
      <Route
        component={MovieDetail}
        path="/movie/detail/:id"
      />

      
      <Route
        component={SerieDetail}
        path="/serie/detail/:id"
      />

      <Route
        component={Error404}
        path="/404" 
      />
  </>
}
