import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DialogItem from "./DialogItem";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

export default function ItemCard() {
  const [open, setOpen] = useState(false);
  const home = useSelector((state)=>{return state.home})

  return (
    <ImageList
      cols={4}
      gap={91}
      sx={{
        overflow: "hidden",
        width: "fit-content",
        height: "fit-content",
        paddingLeft: 4,
        paddingRight: 3,
      }}
    >
      {home.home.map((user, index) => (
        <ImageListItem
          sx={{
            boxShadow: "-0.2px 0px 3px 1px #ced4de",
            paddingLeft: 2,
            width: "fit-content",
            borderRadius: "3px",
          }}
          key={index}
        >
          <img
            src="https://files.ontario.ca/cpo_homes_and_living_icon.png"
            alt={user.username}
            loading="lazy"
            style={{ borderRadius: "3px", height: 190, width: 160, paddingRight: 15 }}
          />

          <ImageListItemBar
            title={user.username}
            subtitle={
              <div>
              <Link to ={`/visitHome/${user._id}`} style={{ textDecoration: "none" }}> <Button variant="contained" color="error">Visit</Button></Link>
              </div>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
