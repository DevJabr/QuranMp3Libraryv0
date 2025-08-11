import React, { useEffect, useState } from "react";
import "./Content.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { Routes, Route, Link } from "react-router-dom";

const Content = () => {
  return (
    <div className="content-container">
      <div className="website-title">
        <h1>مكتبة القرآن الكريم</h1>
        <p>ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ</p>
      </div>
      <div className="reciting">
        <h1>البث المباشر</h1>
        <AudioPlayer
          autoPlay
          src="https://s34.radiolize.com/radio/8050/radio.mp3"
          onPlay={(e) => console.log("onPlay")}
          style={{
            borderRadius: 10,
            padding: 20,
            width: 365,
            backgroundColor: "#e8e6deff",
           }}
        />
        <div className="recorded">
          <h1>التسجيلات الصوتية</h1>
          <Link to="/recite">
            <button>الذهاب إلى قائمة التسجيلات</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Content;
