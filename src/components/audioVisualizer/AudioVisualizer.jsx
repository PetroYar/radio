import React from "react";
import { useState, useRef, useEffect } from "react";
import { AudioVisualizer } from "react-audio-visualize";
import "./AudioVisualizer.scss";
import { useRadio } from "../hooks/useRadio";

const AudioVisualize = (props) => {
  
  const visualizerRef = useRef(null);

  const { audioRef, } = useRadio();


  return (
    <div className="audio-visualizer">
      {audioRef && audioRef.current ? (
        <AudioVisualizer
          ref={visualizerRef}
          audio={audioRef.current}
          width={500}
          height={75}
          barWidth={10}
          gap={1}
          barColor={"#F70808"}
        />
      ) : (
        <p>No audio source available</p> // Fallback message
      )}
    </div>
  );
};

export default AudioVisualize;
