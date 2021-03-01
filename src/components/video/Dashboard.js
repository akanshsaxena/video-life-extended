import React from "react";
import Header from "../Header";
import ViewVideo from "./ViewVideo";

export default function Dashboard() {
  return (
    <>
      <Header />
      <ViewVideo sort="1" message="By Views" />
      <ViewVideo sort="2" message="Newest first" />
    </>
  );
}
