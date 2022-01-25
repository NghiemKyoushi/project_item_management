import React, { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import houseImg from "../image/isometric-office.gif";
import catImg from "../image/hi.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import UserImg from "../image/user.png";
import PasswordImg from "../image/key.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { signin } from "../redux/reducers/reducers";
import { useDispatch, useSelector } from 'react-redux';
export default function Login() {
  let history = useHistory();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [response, setResponse] = useState("");
  const [alert, setAlert] = useState(false);

  const login = () => {
    const body ={
      username,
      password
    }
   const a =  signin(body)(dispatch).then((result) => {
     if(result == "success"){
            history.push("/");

     }else{
      setAlert(true);
      setResponse("please enter again");
     }
   });
  }

  // const login = async () => {
  //   const body = {
  //     username,
  //     password,
  //   };
  //   //   console.log(body);
  //   const accessLogin = await axios.post(
  //     "http://localhost:3030/users/login",
  //     body
  //   ); 
  //   if (accessLogin.data.message === "Login successfully") {
  //     const decoded = jwt(accessLogin.data.token);
  //     console.log(decoded);
  //     localStorage.setItem("username", decoded.uname);
  //     localStorage.setItem("uid", decoded.sub);
  //     props.setUser();
  //     history.push("/");
  //   }else {
  //     setAlert(true);
  //     setResponse(accessLogin.data.message);
  //   }
  // };
  const handleChangeName = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {alert ? <Alert severity="warning">{response}</Alert> : <></> }
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <div className="imgContainer">
            <p className="welcome">WELCOME TO </p>
            <h2 className="product">NEW PRODUCT TEAM</h2>
            <hr className="underline" />
            <img className="imgHouse" src={houseImg} alt="" />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="formSignUp">
            <div className="signUp">
              <p style={{ marginLeft: 56 }}>LOGIN</p>
            </div>
            <img
              className="imgCat"
              src={catImg}
              alt=""
              width={120}
              height={120}
            />
            <p className="here">HERE!</p>

            <form className="formSignUp1">
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 1.5 }}>
                      <img src={UserImg} alt="" width={25} height={25} />
                    </InputAdornment>
                  ),
                }}
                className="inputRounded"
                sx={{ marginBottom: 2 }}
                size="medium"
                placeholder="Username"
                onChange={handleChangeName}
                // variant="outlined"
              />
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ marginRight: 3.5 }}>
                      <img src={PasswordImg} alt="" width={30} height={30} />
                    </InputAdornment>
                  ),
                }}
                className="inputRounded"
                sx={{ marginBottom: 2 }}
                size="medium"
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChangePassword}
                // variant="outlined"
              />

              <div className="containButton">
              <Link to ="/signUp" style={{textDecoration: "none"}}><Button
                  size="large"
                  sx={{
                    letterSpacing: 4,
                    height: 58,
                    backgroundColor: "#ffc112",
                    color: "white",
                    borderRadius: "30px",
                    fontWeight: "bold",
                  }}
                  variant="contained"
                >
                  Create account
                </Button></Link>
                
                <Button
                  size="large"
                  sx={{
                    letterSpacing: 4,
                    height: 58,
                    border: "1px solid white",
                    backgroundColor: "#1fc3ff",
                    borderRadius: "30px",
                    color: "white",
                    fontWeight: "bold",
                    marginLeft: 2,
                  }}
                  variant="contained"
                  onClick={login}
                >
                  Log in
                </Button>
              </div>
              <div className="space2"></div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
