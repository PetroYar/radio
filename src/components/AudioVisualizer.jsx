import React, { useRef, useEffect } from "react";

const AudioVisualizer = ({ audioRef }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    const audioElement = audioRef.current;

    // Створення AudioContext
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source =
      audioContextRef.current.createMediaElementSource(audioElement);

    analyserRef.current = audioContextRef.current.createAnalyser();
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioContextRef.current.destination);

    analyserRef.current.fftSize = 2048;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyserRef.current.getByteFrequencyData(dataArray);

      // Очищення канвасу
      canvasCtx.fillStyle = "rgba(0, 0, 0, 0.2)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i];

        // Переконайтеся, що бари малюються
        canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        canvasCtx.fillRect(
          x,
          canvas.height - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        x += barWidth + 1; // Проміжок між стовпчиками
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [audioRef]);

  return <canvas ref={canvasRef} width="600" height="300"></canvas>;
};

export default AudioVisualizer;
