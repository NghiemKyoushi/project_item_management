import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from './page/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './page/HomePage';
import {getAllItem1, getUser} from "./redux/reducers/reducers"
import Home  from './components/Home';
import FriendHome from './components/FriendHome';
function App() {
  const [visitHome, setVisitHome] = useState(false);

  const user = useSelector((state)=>{return state.users});
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   if(user.isLogin){
  //     console.log("vaoooo")

  //     getAllItem1(user.userId)(dispatch);

  //   }
  // }, [user]);

  const clickHome = () => {
    setVisitHome(true)
  };
  const leaveHome =() => {
    setVisitHome(false);
  }

  return (
    <div className="App">
      <Switch>
      <Route path="/" exact>
        <HomePage clickHome={clickHome} leaveHome={leaveHome}>
          <Home visitHome ={visitHome} />
        </HomePage>
      </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/visitHome/:id">
      <HomePage >
        <FriendHome />
      </HomePage>
      </Route>
      </Switch>
    </div>
  );
}

export default App;
