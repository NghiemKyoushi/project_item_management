import { ActionTypes } from "../contants/action-types"
import { login, getAllItem, logout, addItem, deleteItem } from "../actions/userActions";
import jwtDecode from "jwt-decode";
import axios from "axios";
import storage from 'redux-persist/lib/storage';

const initialState = {
  user: {
    isLogin: false, 
    userId: "",
    username: "",
  }
}

export const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        user: {
          isLogin: payload.isLogin,
          userId: payload.userID,
          username: payload.username
        }
      }
     case ActionTypes.LOGOUT:
       return {
         user: {
          isLogin: payload.isLogin,
          userId: payload.userID,
          username: payload.username 
         }
       }
    default:
      return state
  }
}

const currentState ={
  item: [],
  home: []
}
export const itemReducers = (state = currentState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GETALLITEM:
      return{
        ...state.item,
        item: payload
      }
    case ActionTypes.ADDITEM:
      return {
        ...state.item,
        item: payload
      }
    case ActionTypes.EDITITEM:
      return{
        ...state.item,
        item: payload
      }
    case ActionTypes.REMOVEITEM:
      return {
        ...state.item,
        item: payload
      }
    default:
      return state
  }
}



export const addItem1 = (info) => async dispatch => {
  const saveItem = await axios.post(
    "http://localhost:3030/item/addItem",
    info
  );
  console.log(saveItem.data);
  if (saveItem.data.message === "saved item") {
    // setOpen(false);
    // getAllItem(localStorage.getItem("uid"));
    const result = await axios.get(
      `http://localhost:3030/item/getAllItem/${info.userID}`
    );
    const data = result.data.cart;
    const formatDate = data.map((item) => {
      var startTime = new Date(item.expired_date);
      // console.log(startTime.toISOString().substring(0, 10));
      item.expired_date = startTime.toISOString().substring(0, 10);
      return item;
    });
    dispatch(addItem(formatDate))
    return "success"
  }
  // setFile("");
}
export const deleteItem1 = (body)=> async dispatch => {
  console.log("delete", body)
  const delete_Item = await axios.post(
    "http://localhost:3030/item/deleteItem",
    body
  );
  const result = await axios.get(
    `http://localhost:3030/item/getAllItem/${body.userID}`
  );
  const data = result.data.cart;
  const formatDate = data.map((item) => {
    var startTime = new Date(item.expired_date);
    // console.log(startTime.toISOString().substring(0, 10));
    item.expired_date = startTime.toISOString().substring(0, 10);
    return item;
  });
  dispatch(deleteItem(formatDate))
  return "success"
}

export const logout1 = () => async dispatch => {
  storage.removeItem('persist:root');
  localStorage.removeItem("uid");
  localStorage.removeItem("username");
  const data = {
    isLogin: false,
    userID: "",
    username: ""
  }
  dispatch(logout(data))
}
export const getAllItem1 = (uid) => async dispatch => {
  // console.log("uid", uid)
  const result = await axios.get(
    `http://localhost:3030/item/getAllItem/${uid}`
  );
  const data = result.data.cart;
  const formatDate = data.map((item) => {
    var startTime = new Date(item.expired_date);
    // console.log(startTime.toISOString().substring(0, 10));
    item.expired_date = startTime.toISOString().substring(0, 10);
    return item;
  });
  dispatch(getAllItem(formatDate));
}

export const signin = (info) => async dispatch => {
  console.log("loggggggggggggg")
  const body = {
    username: info.username,
    password: info.password,
  };
  //   console.log(body);
  const accessLogin = await axios.post(
    "http://localhost:3030/users/login",
    body
  );
  if (accessLogin.data.message === "Login successfully") {
    const decoded = jwtDecode(accessLogin.data.token);
    console.log(decoded);
    localStorage.setItem("username", decoded.uname);
    localStorage.setItem("uid", decoded.sub);

    const data = {
      isLogin: true,
      userID: decoded.sub,
      username: decoded.uname
    }
    dispatch(login(data));
    return "success";
  } else {
  }
}
