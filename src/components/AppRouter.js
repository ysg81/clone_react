import React, { useState } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from 'components/Navigation';
import Profile from 'routes/Profile';

function AppRouter( { isLoggedIn } ) {

  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Switch>
        {isLoggedIn ? (
          //로그인 상태
          <> 
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/profile">
            <Profile/>
          </Route>
          </>
        ) : (
          //로그아웃 상태
          <>
          <Route exact path="/">
            <Auth/>
          </Route>
          {/* <Redirect from="*" to="/"/> */}
          </>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter
