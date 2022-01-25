import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import {deleteItem1} from "../redux/reducers/reducers";
import { useDispatch } from 'react-redux';



const useStyle = makeStyles(() => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      height: "30%",
      // margin: useTheme().spacing(0.5),
    },
    "& .MuiOutlinedInput-input MuiInputBase-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
    {
      height: "30%",
      borderRadius: "40px",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 550,
    },
  },
};
export default function DialogItem(props) {
  const classes = useStyle();

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState("");
  const [position, setPosition] = useState('');
  const [expired_date, setExpired_date] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemId, setItemId] = useState("");

  const dispatch = useDispatch();


  useEffect(() => {
    setName(props.item.name);
    setItemId(props.item._id)
    setShortName(props.item.shortName);
    setPosition(props.item.position);
    setExpired_date(props.item.expired_date);
    setCategory(props.item.category);
    setDescription(props.item.description);
    setPrice(props.item.price);
  }, [props])

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(name)

  };
  const onChangeShortName = (e) => {
    setShortName(e.target.value);
  };
  const onChangePosition = (e) => {
    setPosition(e.target.value);
  };
  const onChangeExpired_date = (e) => {
    setExpired_date(e.target.value);
  };
  const onChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const editItem = async (e) => {
    e.preventDefault();
    console.log("edit");
    const body = {
      userID: localStorage.getItem("uid"),
      itemId: itemId,
      name: name,
      shortName: shortName,
      position: position,
      expired_date: expired_date,
      category: category,
      description: description,
      price: price,
    };
    console.log(body);
    const editItem = await axios.post("http://localhost:3030/item/editItem", body);
    console.log(editItem.data.message);
    if (editItem.data.message === "success") {
      props.handleClose();
      props.getAllItem(localStorage.getItem("uid"));
    }
  };

  const deleteItem = async () => {
    const body = {
      userID: localStorage.getItem("uid"),

      itemId: props.item._id,
    };
    deleteItem1(body)(dispatch).then((res) => {
      if(res === "success"){
        props.handleClose();
      }
    })
  };

  return (
    <div>
      <Dialog
        maxWidth="lg"
        fullWidth={true}
        open={props.open}
        onClose={props.handleClose}
      >
        <form className={classes.root} onSubmit={editItem}>

          <DialogTitle sx={{ color: "#1fc3ff" }}>{props.edit ? "View item" :  "Edit item"}</DialogTitle>
          <DialogContent>
            <div className="content">
              <Grid container>
                <Grid item xs={6}>

                  <div>
                    <label className="labelSize">name of item</label>
                    <br />
                    <TextField
                      size="small"
                      variant="outlined"
                      value={name}
                      onChange={onChangeName}
                      type="text"
                      required
                    />
                  </div>
                  <div>
                    <label className="labelSize">stand for item</label>
                    <br />
                    <TextField
                      size="small"
                      variant="outlined"
                      value={shortName}
                      onChange={onChangeShortName}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelSize">position</label>
                    <br />
                    <TextField
                      size="small"
                      value={position}
                      variant="outlined"
                      onChange={onChangePosition}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelSize">expired date</label>
                    <br />
                    <TextField
                      size="small"
                      value={expired_date}
                      type="date"
                      variant="outlined"
                      onChange={onChangeExpired_date}
                      required
                    />
                  </div>
                  <div>
                    <label className="labelSize">choose application</label>
                    <br />
                    <Select
                      sx={{ m: 1, width: 565 }}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      defaultValue={category}
                      input={<OutlinedInput size="small" />}
                      MenuProps={MenuProps}
                      onChange={onChangeCategory}
                    >
                      <MenuItem value="decorate">decorate</MenuItem>
                      <MenuItem value="using">using</MenuItem>
                    </Select>
                  </div>
                  <div>
                    <label className="labelSize">price</label>
                    <br />
                    <TextField
                      onChange={onChangePrice}
                      required
                      size="small"
                      variant="outlined"
                      value={price}
                    />
                  </div>
                  <div>
                    <label className="labelSize">description</label>
                    <br />
                    <TextareaAutosize
                      onChange={onChangeDescription}
                      value={description}
                      aria-label="empty textarea"
                      style={{ width: 1150, height: 100, borderRadius: "10px" }}
                      required
                    />
                  </div>

                </Grid>
                <Grid item xs={4}>
                  <div
                    style={{
                      marginLeft: 118,
                      marginTop: 40,
                      maxWidth: "100%",
                      width: "fit-content",
                      maxHeight: "50%",
                    }}
                  >
                    <label htmlFor="btn-upload">
                      <img
                        width="296"
                        height="275"
                        src={
                          props.item.picture_url
                            ? props.item.picture_url
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ_fAACs6UF4F8AHUPEpLpzWdt1hmme9u6zQoRk7iLabIRkC6VnBLGltFfiXJo4rw16Ps&usqp=CAU"
                        }
                        alt={name}
                      />
                      <br />
                    </label>
                  </div>
                  <div></div>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <Divider />
          {
            props.edit ? <></>
            :
            <DialogActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={deleteItem}
            >
              delete
            </Button>
            <Button
              // onClick={editItem}
              type="submit"
              size="small"
              variant="contained"
              sx={{ color: "#ffff", background: "#1fc3ff" }}
            >
              save edit item
            </Button>
          </DialogActions>
          }
         
        </form>

      </Dialog>
    </div>
  );
}
