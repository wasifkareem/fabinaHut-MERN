import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";

const Posts = (refresh) => {
  const [feedPosts, setFeedPosts] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("https://fabinahut.onrender.com/posts");
        const postInfo = res.data;
        setFeedPosts(postInfo);
      } catch (err) {
        console.log(err);
      }
    };
    getdata();
  }, [refresh]);

  return (
    <div>
      {feedPosts.map((item) => (
        <PostCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Posts;
