import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import { FormControl, makeStyles } from '@mui/material';
import { makeStyles } from "@mui/styles";
// import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Divider from "@mui/material/Divider";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useDispatch } from 'react-redux';

import {addItem1 } from "../redux/reducers/reducers"


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
export default function NewItem() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [position, setPosition] = useState("");
  const [expired_date, setExpired_date] = useState(null);
  const [category, setCategory] = useState("decorate");
  const [picture_url, setPicture_url] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
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

  const dispatch = useDispatch();

  const saveItem = async (e) => {
    e.preventDefault();
    try {
      if (picture_url !== "" ) {
        const formData = new FormData();
        formData.append("file", picture_url[0]);
        formData.append("upload_preset", "ucq0mifj");
        const data = await axios.post(
          "https://api.cloudinary.com/v1_1/hanoi-university/image/upload",
          formData
        );

        console.log(data.data);
        const body = {
          name: name,
          shortName: shortName,
          position: position,
          expired_date: expired_date,
          category: category,
          picture_url: data.data.secure_url,
          description: description,
          price: price,
          userID: localStorage.getItem("uid").toString(),
        };
        console.log(body);

        addItem1(body)(dispatch).then((res) => {
          if (res === "success"){
            setOpen(false)
          }
        })
      }else{
        alert("Picture need upload")
      }
    } catch (err) {
      console.log(err);
    }
  };
  const classes = useStyle();

  const onFileChange = (event) => {
    // Update the state
    console.log("path", window.URL.createObjectURL(event.target.files[0]));
    setFile(window.URL.createObjectURL(event.target.files[0]));
    setPicture_url(event.target.files);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="medium"
        variant="contained"
        sx={{
          color: "#ffff",
          background: "#1fc3ff",
          marginLeft: "62%",
          marginBottom: 3,
        }}
        onClick={handleClickOpen}
      >
        <AddCircleOutlineIcon /> Add new item
      </Button>
      <Dialog maxWidth="lg" fullWidth={true} open={open} onClose={handleClose}>
      <form className={classes.root} onSubmit={saveItem}>

        <DialogTitle sx={{ color: "#1fc3ff" }}>Add new item</DialogTitle>
        <DialogContent>
          <div className="content">
            <Grid container>
              <Grid item xs={6}>
                  <div>
                    <label className="labelSize">name of item</label>
                    <br />
                    <TextField
                      onChange={onChangeName}
                      size="small"
                      variant="outlined"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="labelSize">stand for item</label>
                    <br />
                    <TextField
                      onChange={onChangeShortName}
                      size="small"
                      required

                      variant="outlined"
                    />
                  </div>
                  <div>
                    <label className="labelSize">position</label>
                    <br />
                    <TextField
                      onChange={onChangePosition}
                      required

                      size="small"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <label className="labelSize">expired date</label>
                    <br />
                    <TextField
                      onChange={onChangeExpired_date}
                      required

                      size="small"
                      type="date"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <label className="labelSize">choose application</label>
                    <br />
                    <Select
                      sx={{ m: 1, width: 565 }}
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      defaultValue={"decorate"}
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
                                          required

                      onChange={onChangePrice}
                      size="small"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <label className="labelSize">description</label>
                    <br />
                    <TextareaAutosize
                      onChange={onChangeDescription}
                      required

                      aria-label="empty textarea"
                      style={{ width: 1150, height: 100, borderRadius: "10px" }}
                    />
                  </div>
                  <Divider />
                  
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
                    <input
                      id="btn-upload"
                      name="btn-upload"
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                    <img
                      width="296"
                      height="275"
                      src={
                        file
                          ? file
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ_fAACs6UF4F8AHUPEpLpzWdt1hmme9u6zQoRk7iLabIRkC6VnBLGltFfiXJo4rw16Ps&usqp=CAU"
                      }
                      alt=""
                    />
                    <br />
                    <Button
                      className="btn-choose"
                      variant="outlined"
                      component="span"
                    >
                      Choose Image
                    </Button>
                  </label>
                </div>
                <div></div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button onClick={handleClose} size="small" variant="outlined">
            cancel
          </Button>
          <Button
          type="submit"
            // onClick={saveItem}
            size="small"
            variant="contained"
            sx={{ color: "#ffff", background: "#1fc3ff" }}
          >
            save and add item
          </Button>
        </DialogActions>
        </form>

      </Dialog>
    </div>
  );
}
