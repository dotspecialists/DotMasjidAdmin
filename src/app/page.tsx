"use client";
import { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    window.location.href = "/login";
  }, []);
  return <div className=""></div>;
};

export default Homepage;
