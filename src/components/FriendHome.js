import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import DatePresent from "./DatePresent";
import NewItem from "./NewItem";
import HomeCard from "./HomeCard";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Divider } from "@material-ui/core";
import CommentForm from './CommentForm'
import Comment from "./Comment";
export default function FriendHome() {
  const [detail, detailHome] = useState([]);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [edit, setEdit] = useState(true);
  // const [checkAuthen, ]
  const { id } = useParams();
  useEffect(() => {
    console.log("hahaha", id);

    getAllItemFriend(id);
    getComments(id);
  }, [id]);
  const getAllItemFriend = async (id) => {
    console.log("jdjdjdjd");
    const result = await axios.get(
      `http://localhost:3030/item/getAllItem/${id}`
    );
    const data = result.data.cart;
    const formatDate = data.map((item) => {
      var startTime = new Date(item.expired_date);
      item.expired_date = startTime.toISOString().substring(0, 10);
      return item;
    });
    console.log(formatDate);
    detailHome(formatDate);
  };
  const getComments = async (id) => {
    const result = await axios.get(`http://localhost:3030/comment/getAllComment/${id}`);
    let arrCmt = [];

    // const cmt = result.data.comment.map((cmt) => {
    //   if (cmt.parentId === "") {
    //     arrCmt.push(cmt);
    //   }
    // })
    arrCmt = result.data.comment.filter((cmt) => cmt.parentId.toString() === "").sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    console.log("comment", arrCmt);
    setComments(arrCmt);
    setAllComments(result.data.comment)
    // console.log("comment",result.data.comment);
  }
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <ItemCard edit={edit} itemData={detail} />
          <Divider />
          <div>
            <h3>Comment</h3>
            <CommentForm labelButton="Send" getComments={getComments} />
            {
              comments ?
                comments.map((cmt) => (
                  <Comment comment={cmt} userID={id} comments={allComments} key={cmt._id} getComments={getComments} />
                ))
                :
                ""
            }
          </div>
        </Grid>
        <Grid item xs={2}>
          <DatePresent />
        </Grid>
      </Grid>
    </>
  );
}
