import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DialogItem from "./DialogItem";
export default function ItemCard({ itemData,getAllItem,edit }) {
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({ item2: "", open: false });

  const handleClose = () => {
    setItem({ item2: "", open: false });
  };
  console.log(item.open);
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
      {itemData.map((item, index) => (
        <ImageListItem
          sx={{
            boxShadow: "-0.2px 0px 3px 1px #ced4de",
            paddingLeft: 2,
            width: "fit-content",
            borderRadius: "3px",
          }}
          key={item._id}
        >
          <img
            src={item.picture_url}
            alt={item.name}
            loading="lazy"
            style={{ borderRadius: "3px", height: 190, width: 150, paddingRight: 15 }}
            onClick={() => setItem({ item2: item, open: true })}
          />

          <ImageListItemBar
            title={item.name}
            subtitle={
              <div>
                <p className="usage">{item.category}</p>
                <span style={{ width: 30 }}>{item.description}</span>
              </div>
            }
            position="below"
          />
        </ImageListItem>
      ))}
      {
        <DialogItem
          edit= {edit}
          open={item.open}
          item={item.item2}
          handleClose={handleClose}
          getAllItem={getAllItem}
        />
      }
    </ImageList>
  );
}
