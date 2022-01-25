import React, { useState } from "react";
import { styled } from "@mui/material/styles";
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
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  let history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [changeColor, setChangeColor] = useState("normal");

  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [response, setResponse] = useState("");

  const onChangPassword = (e) => {
    setPassword(e.target.value);
  }
  const onChangConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  }
  const onChangUsername = (e) => {
    setUsername(e.target.value);
  }

  const register = async () =>{
    if(password !== confirmPassword){
      setAlert(true);
      setResponse("Password and confirm password not similar");
    }
    const body ={
      username,
      password
    }
    const accessSignUp = await axios.post("http://localhost:3030/users/signUp", body);
    if(accessSignUp.data.message === "register successfully"){
      setAlert2(true);
      setResponse(accessSignUp.data.message);
      history.push('/login');
    }else if( accessSignUp.data.message === "Username has already been taken"){
      setAlert(true);
      setResponse(accessSignUp.data.message);
    }else{
      setAlert(true);
      setResponse(accessSignUp.data.message);
    }
  }
  const checkPassword = (password) => {
    let strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    return strength;
  };
  const check_Standard = () => {
    const passwordInput = document.querySelector("#password");
    console.log(passwordInput.value);
    switch (checkPassword(passwordInput.value)) {
      case 1:
        setChangeColor("weak");
        break;
      case 2:
        setChangeColor("medium");
        break;
      case 3:
        setChangeColor("medium");
        break;
      case 4:
        setChangeColor("strong");
        break;
      default:
        setChangeColor("");
        break;
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
          {alert ? <Alert severity="warning"  onClose={() => setAlert(false)}>{response}</Alert> : <></> }
          {alert2 ? <Alert severity="success"  onClose={() => setAlert2(false)}>{response}</Alert> : <></> }

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
              <p>SIGN-UP</p>
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
                onChange={onChangUsername}
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
                onChange={onChangPassword}
                placeholder="Password"
                // variant="outlined"
                onInput={check_Standard}
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
                type="password"
                placeholder="Confirm password"
                onChange={onChangConfirmPassword}
                // variant="outlined"
              />
              <div className="checkpass">
                <p className="standard_Password">standard password</p>
                <div className="container">
                  <div
                    className={changeColor === "weak" || changeColor === "medium" || changeColor === "strong" ? "weak" : "normal"}
                  ></div>
                  <div
                    className={changeColor === "medium" || changeColor === "strong" ? "weak" : "normal"}
                  ></div>
                  <div
                    className={changeColor === "strong" ? "weak" : "normal"}
                  ></div>
                </div>
              </div>
              <div className="containButton">
                <Link to="/login" style={{ textDecoration: "none" }}>
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
                    }}
                    variant="contained"
                  >
                    Log in
                  </Button>
                </Link>

                <Button
                  size="large"
                  sx={{
                    letterSpacing: 4,
                    height: 58,
                    backgroundColor: "#ffc112",
                    color: "white",
                    borderRadius: "30px",
                    marginLeft: 2,
                    fontWeight: "bold",
                  }}
                  variant="contained"
                  onClick={register}
                >
                  Create account
                </Button>
              </div>
              <div className="space"></div>
            </form>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
