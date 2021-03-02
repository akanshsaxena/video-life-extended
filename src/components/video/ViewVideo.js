import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import Header from "../Header";

export default function ViewVideo(props) {
  const [videoData, setVideoData] = useState([]);
  const { sort, message } = props;
  /********
  Sort values can be: 
  if(1) sort by views
  if(2) sort by date
  *********/

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        "https://video-life-extended-backend.herokuapp.com/api/videos/getVideo?_id=null&search=null"
      );
      const data = await response.data;
      setVideoData(data);
      console.log(data);
    };
    getVideos();
    console.log(videoData);
  }, []);

  return (
    <div className="section-container">
      <h3 className="message"> {message} </h3>{" "}
      <div className="video-card-container">
        {" "}
        {sort === "1"
          ? videoData
              .sort((a, b) => b.views - a.views)
              .map((video) => (
                <NavLink className="navLink" to={`/video/${video._id}`}>
                  <VideoCard video={video} />{" "}
                </NavLink>
              ))
          : videoData
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((video) => (
                <NavLink className="navLink" to={`/video/${video._id}`}>
                  <VideoCard video={video} />{" "}
                </NavLink>
              ))}{" "}
      </div>{" "}
    </div>
  );
}
