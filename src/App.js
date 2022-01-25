import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./page/Login";
import SignUp from './page/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './page/HomePage';
import {getAllItem1} from "./redux/reducers/reducers"
import Home  from './components/Home'
function App() {
  const user = useSelector((state)=>{return state.users})
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(user.isLogin){
      console.log("vaoooo")
      getAllItem1(user.userId)(dispatch);
    }
    // console.log(user)
  }, [user]);

  return (
    <div className="App">
      <Switch>
      <Route path="/" exact>
        <HomePage>
          <Home/>
        </HomePage>
      </Route>
        <Route path="/signUp" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
