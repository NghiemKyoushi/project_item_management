import { ActionTypes } from "../contants/action-types"

export const login = (user) => {
    return{
        type:ActionTypes.LOGIN,
        payload: user
    }
}
export const register = (user) => {
    return {
        type:ActionTypes.REGISTER,
        payload: user
    }
}
export const logout = (user) => {
    return{
        type: ActionTypes.LOGOUT,
        payload: user
    }
}

// get item____________________________________________________________________ 
export const getAllItem = (item) => {
    return {
        type: ActionTypes.GETALLITEM,
        payload: item
    }
}
export const getHome  = (home) => {
    return {
        type: ActionTypes.GETHOME,
        payload: home
    }
}

export const addItem = (item) => {
    return{
        type: ActionTypes.ADDITEM,
        payload: item
    }
}

export const deleteItem  = (item) => {
    return{
        type: ActionTypes.ADDITEM,
        payload: item
    }
}

export const getAllUser = (users) => {
    return {
        type: ActionTypes.GETALLUSER,
        payload:users
    }
}
export const getItemExpired = (items) => {
    return {
        type: ActionTypes.GETITEMEXPIREDDATE,
        payload:items
    }
}

