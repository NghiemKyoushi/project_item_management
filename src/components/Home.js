import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import DatePresent from "./DatePresent";
import NewItem from "./NewItem";
import HomeCard from "./HomeCard";
import Grid from "@mui/material/Grid";
import CommentForm from './CommentForm'
import Comment from "./Comment";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';


export default function Home(props) {
  const item = useSelector((state)=>{return state.item});
  const user = useSelector((state)=>{return state.users});
  // const [comments, setComments] = useState([]);
  // const [allComments, setAllComments] = useState([]);
  // const [userID, setUerID] = useState(localStorage.getItem("uid"));

  // console.log("djdjd", props.itemExpired)
  useEffect(() => {
    // getComments(localStorage.getItem("uid"));
  }, [localStorage.getItem("uid")]);

  // const getComments = async (id) => {
  //   console.log("jfjfjf");
  //   const result = await axios.get(`http://localhost:3030/comment/getAllComment/${id}`);
  //   let arrCmt = [];
  //   arrCmt = result.data.comment.filter((cmt) => cmt.parentId.toString() === "").sort(
  //     (a, b) =>
  //       new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  //   );

  //   console.log("comment", arrCmt);
  //   setComments(arrCmt);
  //   setAllComments(result.data.comment)
  //   // console.log("comment",result.data.comment);
  // }
  return (
    <>
    {/* <h1>Home</h1> */}
      {/* {props.visitHome ? (
        <>
          {props.checkUser ? <NewItem getAllItem={props.getAllItem} /> : ""}

          <Grid container spacing={1}>
            <Grid item xs={9}>
              <HomeCard homeData={props.allUser} />
            </Grid>
            <Grid item xs={2}>
              <DatePresent />
            </Grid>
          </Grid>
        </>
      ) : ( */}
        <>
          {user.user.isLogin ? <NewItem /> : ""}

          <Grid container spacing={1}>
            <Grid item xs={9}>
              {user.user.isLogin ? (
                <>
                  <ItemCard itemData={item.item} />

                  {/* <div>
                    <h3>Comment</h3>
                    <CommentForm labelButton="Send" getComments={getComments} />
                    {
                      comments ?
                        comments.map((cmt) => (
                          <Comment comment={cmt} userID={userID} comments={allComments} key={cmt._id} getComments={getComments} />
                        ))
                        :
                        ""
                    }
                  </div> */}
                </>
              ) : (
                "Log in to access your home"
              )}



            </Grid>
            <Grid item xs={2}>
              <DatePresent itemExpired={props.itemExpired} />
            </Grid>
          </Grid>

        </>
      {/* )} */}
    </>
  )
}