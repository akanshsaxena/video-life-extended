import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import Header from "../Header";

export default function PlayVideo() {
  const [videoData, setVideoData] = useState({});
  const [videoFilePath, setVideoPath] = useState(null);
  const [thumbnailPath, setThumbnailPath] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const { _id } = useParams();

  const handleChange = (childData) => {
    setSearchText(childData);
    console.log(searchText);
  };

  const handleClick = (childData) => {
    setIsClicked(childData);
    console.log(isClicked);
  };
  useEffect(() => {
    const getVideoDetails = async () => {
      console.log("called api");
      const response = await axios.get(
        `https://video-life-extended-backend.herokuapp.com/api/videos/getVideo?_id=${_id}`
      );
      const data = await response.data;
      setVideoData(data[0]);
      setThumbnailPath(data[0].thumbnail);
      setVideoPath(data[0].filePath);
      console.log(data);
    };
    getVideoDetails();
  }, []);
  useEffect(() => {
    const updateVotes = async () => {
      console.log("updating votes");
      const response = await axios.post(
        `https://video-life-extended-backend.herokuapp.com/api/videos/updateVotes?_id=${videoData._id}`
      );
      const data = await response.data;
    };
    updateVotes();
  }, [videoData]);
  return (
    <>
      <Header
        onChangeCallback={handleChange}
        onClickCallback={handleClick}
        searchText={searchText}
      />{" "}
      <div className="player-container">
        <ReactPlayer
          className="react-player"
          url={videoFilePath}
          width="100%"
          height="100%"
          controls={true}
        />{" "}
        <div className="video-details-1">
          <div>
            <img src={thumbnailPath} /> <h3> {videoData.title} </h3>
          </div>{" "}
          <div>
            <p className="basic-details"> Published On {videoData.createdAt} </p> <br />
            <p className="basic-details">
              {" "}
              {videoData.views}
              views{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
        <div className="video-details-2">
          <div className="video-details-2-div">
            <h4> Category: </h4> <p> {videoData.category} </p>
          </div>{" "}
          <div className="video-details-2-div">
            <h4> Description: </h4> <p> {videoData.description} </p>
          </div>{" "}
          <div className="video-details-2-div">
            <h4> Tags: </h4> <p> {videoData.tags} </p>
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
