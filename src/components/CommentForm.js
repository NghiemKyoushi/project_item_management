import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function CommentForm(props) {
  const [text, setText] = useState("");
   const { id } = useParams();

  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  useEffect(() => {
    console.log("id user", props.userID)
  }, [props])
  const submitComment = async (e) =>  {
      e.preventDefault();
      console.log("jdjdjdjd")
      if(props.userID !== ""){
        console.log("comment uid")

        const body ={
          userID: localStorage.getItem("uid"),
          body: text,
          username: localStorage.getItem("username"),
          parentId: ""

      }
      console.log(body)
      const sendComment = await axios.post("http://localhost:3030/comment/addComment", body);
      setText("");

      props.getComments(localStorage.getItem("uid"));
      }else{
        console.log("comment nao", id)

        const body ={
          userID: id,
          body: text,
          username: localStorage.getItem("username"),
          parentId: ""

      }
      const sendComment = await axios.post("http://localhost:3030/comment/addComment", body);
      setText("");

      props.getComments(id);
      }
  }
  const submitReply =  async (e) =>  {
    e.preventDefault();

    if(props.userID !== ""){
      const body ={
        userID: localStorage.getItem("uid"),
        body: text,
        username: localStorage.getItem("username"),
        parentId: props.parentId
    }
    const sendComment = await axios.post("http://localhost:3030/comment/addComment", body);
    props.getComments(localStorage.getItem("uid"));
    props.cancelReply()
    console.log("sendComment", sendComment.data.message);
    }else{
      const body ={
        userID: id,
        body: text,
        username: localStorage.getItem("username"),
        parentId: props.parentId
    }
    const sendComment = await axios.post("http://localhost:3030/comment/addComment", body);
    props.getComments(id);
    props.cancelReply()
    console.log("sendComment", sendComment.data.message);
    }
}
  return (
    <>
      <div className={props.labelButton === "Reply" ? "Reply" : ""}>
      <form onSubmit={props.labelButton === "Reply" ? submitReply : submitComment }>
        <TextareaAutosize
          required
          value={text}
          onChange={handleChangeText}
          aria-label="empty textarea"
          style={{
            width: 950,
            height: 100,
            borderRadius: "10px",
            marginTop: 5,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          {props.labelButton}
        </Button>
        {
            props.labelButton === "Reply" ?
            <Button onClick={()=> props.cancelReply()} variant="contained" color="error">
          cancel
        </Button>
            :""
        }
        </form>
      </div>
    </>
  );
}
