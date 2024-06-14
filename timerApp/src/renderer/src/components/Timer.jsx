import React, { useState, useEffect, useRef } from 'react';
import Input from "./Input.jsx";
import alarm from "../assets/sounds/pera.mp3";

export default function Timer({ isOverLay }) {
  const [isEditing, setIsEditing] = useState(true);
  const [minutes, setMinutes] = useState(1);
  const [hours, setHours] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(new Audio(alarm));

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0 || hours > 0) {
          if (minutes === 0 && hours > 0) {
            setMinutes(59);
            setHours((prevHours) => prevHours - 1);
          } else if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
          }
          setSeconds(59);
        } else {
          clearInterval(intervalId);
          setIsActive(false);
          audioRef.current.currentTime = 20; // Start playing from 20 seconds
          audioRef.current.play();

          // Pause the audio after 5 seconds
          setTimeout(() => {
            audioRef.current.pause();
            console.log(`Audio paused at: ${audioRef.current.currentTime} seconds`);
          }, 5000);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds, minutes, hours]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isEditing ? (
        <div className='flex justify-center'>
          <div>
            <Input label="hours" value={hours} onChange={(e) => {
              setHours(parseInt(e.target.value));
            }} />
            <Input label="minutes" value={minutes} onChange={(e) => {
              setMinutes(parseInt(e.target.value));
            }} />
            <Input label="seconds" value={seconds} onChange={(e) => {
              setSeconds(parseInt(e.target.value));
            }} />
            <button className='bg-blue-500 rounded-xl px-20 py-1 text-stone-200' onClick={() => {
              setIsEditing(false);
            }}>&#10004;</button>
          </div>
        </div>
      ) : (
        <div>
          <div className='flex justify-center'>
            <h1 className='text-green-500 text-7xl'>{`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</h1>
          </div>
          <div className='timer-bottom text-stone-500 flex justify-center bg-black bg-opacity-40 rounded-xl'>
            {isActive ? (
              <>
                <button className='start text-5xl m-2 text-red-500' onClick={() => {
                  setIsActive(false);
                  setHours(0);
                  setMinutes(0);
                  setSeconds(0);
                }}>&#9632;</button>
                <button className='start text-5xl m-2 text-blue-500' onClick={() => {
                  setIsActive(false);
                }}>&#10074;&#10074;</button>
              </>
            ) : (
              <>
                <button className={!isOverLay ?'start text-5xl m-2 text-green-500':"hidden"} onClick={() => {
                  setIsActive(true);
                }}>&#9658;</button>
                <button className={!isOverLay ?'start text-5xl m-2 text-green-500':"hidden"} onClick={() => {
                  setIsEditing(true);
                }} >&#9998;</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
