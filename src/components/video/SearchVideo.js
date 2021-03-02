import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import VideoCard from "./VideoCard";
import ViewVideo from "./ViewVideo";
import Header from "../Header";
export default function SearchVideo() {
  const [videoData, setVideoData] = useState([]);
  const { search } = useParams();

  useEffect(() => {
    const getVideos = async () => {
      const response = await axios.get(
        `https://video-life-extended-backend.herokuapp.com/api/videos/getVideo?_id=null&search=${search}`
      );
      const data = await response.data;
      setVideoData(data);
      console.log(data);
    };
    getVideos();
    console.log(videoData);
  }, []);
  return (
    <>
      <Header />
      <div className="section-container">
        <h3 id="search-result"> Search results for "{search}" </h3>{" "}
        {videoData.length <= 0 ? (
          <p id="no-result"> Oops!No Result found for searched value </p>
        ) : (
          <div className="video-card-container">
            {" "}
            {videoData.map((video) => (
              <NavLink className="navLink" to={`/video/${video._id}`}>
                <VideoCard video={video} />{" "}
              </NavLink>
            ))}{" "}
          </div>
        )}{" "}
      </div>{" "}
      <ViewVideo message="Try exploring other videos" />
    </>
  );
}
