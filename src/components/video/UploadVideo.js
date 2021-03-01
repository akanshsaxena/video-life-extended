import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
//import { getVideoDurationInSeconds } from "get-video-duration";
import firebase from "../Firebase";

export default function UploadVideo() {
  const [videoPath, setVideoPath] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");
  const [video, setVideo] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("Vlog");
  const [currentTime, setCurrentTime] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState("");
  
  const handleChange = (event) => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else if (event.target.name === "description") {
      setDescription(event.target.value);
    } else if (event.target.name === "tags") {
      setTags(event.target.value);
    } else if (event.target.name === "category") {
      setCategory(event.target.value);
    } else if(event.target.name === "duration"){
		setDuration(event.target.value);
		if(duration.split(":").length===3){
			setHours(duration.split(":")[0]);
			setMinutes(duration.split(":")[1]);
			setSeconds(duration.split(":")[2]);
			console.log(hours +" "+ minutes+" "+seconds);
		}
	}
  };
  const uploadFile = async (event) => {
    console.log(event.target.files[0]);
    if (event.target.files[0].type.includes("video")) {
		console.log("video")
      setVideo(event.target.files[0]);
    } else {
      setThumbnail(event.target.files[0]);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    setCurrentTime(new Date().getTime());
    if (e.target.name === "video") {
      let bucketName = "videos";
      let file = video;
	  let path = `${bucketName}/${file.name}_${currentTime}`;
      console.log(file);
      let storageRef = firebase
        .storage()
        .ref(path);
      let uploadTask = storageRef.put(file);
      console.log(`uploadTask ${uploadTask}`);
      await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        let storageRef2 = firebase.storage().ref();
        storageRef2
          .child(path)
          .getDownloadURL()
          .then((url) => {
            setVideoPath(url);
          });
      });
    } else {
      let bucketName = "images";
      let file = thumbnail;
	  let path = `${bucketName}/${file.name}_${currentTime}`;
      let storageRef = firebase
        .storage()
        .ref(path);
      let uploadTask = storageRef.put(file);
	  console.log(`uploadTask ${uploadTask}`);
      await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
        let storageRef2 = firebase.storage().ref();
        storageRef2
          .child(path)
          .getDownloadURL()
          .then((url) => {
            setThumbnailPath(url);
			
          });
      });
	  console.log(thumbnailPath);
    }
  };
  const submit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://video-life-extended-backend.herokuapp.com/api/videos/upload",
      {
        user: {
          _id: "603c9f8debc3d871388213eb",
          first_name: "Akansh",
          last_name: "Saxena",
          image: null,
          subscribers: [],
        },
        filePath: videoPath,
        title: title,
        description: description,
        tags: tags,
        category: category,
        createdAt: currentTime,
        views: 0,
        watch: currentTime,
        minutes: minutes,
        seconds: seconds,
        hours: hours,
        thumbnail: thumbnailPath,
      }
    );
    const data = await response.data;
    console.log(data);
  };
  
  return (
    <div>
      <form>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          ></input>
        </label><br/>
        <label>
          Description
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          ></input>
        </label>
		<br/>
        <label>
          Tags<span>Separated by ";"</span>
          <input
            type="text"
            name="tags"
            value={tags}
            onChange={handleChange}
          ></input>
        </label><br/>
        <label>
          <select
            id="dropdown"
            tags="category"
            value={category}
            onChange={handleChange}
          >
            <option value="Vlog">Vlog</option>
            <option value="Gaming">Gaming</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Documentary">Documentary</option>
            <option value="Travel">Travel</option>
            <option value="Cooking">Cooking</option>
            <option value="DIY">DIY</option>
            <option value="Animation">Animation</option>
            <option value="Others">Others</option>
          </select>
        </label><br/>
        <label htmlFor="video">
          Upload Video
          <input
            type="file"
            name="video"
            placeholder="Upload Video"
            onChange={uploadFile}
          />
          <button name="video" onClick={handleClick}>
            Upload Video
          </button>
        </label><br/>
		<label>
          Durations (in hh:mm:ss)
          <input
            type="text"
            name="duration"
            value={duration}
            onChange={handleChange}
          ></input>
        </label><br/>
        <label htmlFor="thumbnail">
          Upload Thumbnail
          <input
            type="file"
            name="thumbnail"
            placeholder="Upload Thumbnail Image"
            onChange={uploadFile}
          />
          <button name="image" onClick={handleClick}>
            Upload Thumbnail
          </button>
        </label><br/>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  );
}
