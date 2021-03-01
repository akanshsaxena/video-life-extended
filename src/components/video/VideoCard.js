import React from "react";

export default function VideoCard(props) {
  const { video } = props;
  return (
    <>
      <div className="video-card">
        <div className="video-image-container">
          <img
            className="video-thumbnail-img"
            src={video.thumbnail}
          ></img>{" "}
          <p className="video-play-time">
            {" "}
            {video.hours > 0 && video.hours}{" "}
            {`${video.minutes}:${video.seconds}`}{" "}
          </p>{" "}
        </div>{" "}
        <h3 className="video-title"> {video.title} </h3>{" "}
      </div>{" "}
    </>
  );
}
