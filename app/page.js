"use client";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const Playref = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [ Levels, setLevels ] = useState([]);

  useEffect(() => {
    setIsClient(true);
    setTimeout(() => {
      setLevels(Playref?.current?.getInternalPlayer("hls").levels);
    }, 1000);
  }, []);
  const changeBitrate = (event) => {
    const internalPlayer = Playref?.current?.getInternalPlayer("hls");
    if (internalPlayer) {
      internalPlayer.currentLevel = event.target.value;
    }
  };

  return (
    <main className=" min-h-screen p-24">
      <div className="mx-auto">
        {isClient ? (
          <ReactPlayer
            ref={Playref}
            width={"600px"}
            height={"400px"}
            controls={true}
            url={
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
            }
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {isClient && Levels.length!==-1 ? (
          <div className="flex items-center gap-2 ">
            <span>Change Quality :</span>
            <select onChange={changeBitrate} className="text-black rounded-md">
              <option disabled selected>select Quality</option>
              {Levels.map((level, id) => (
                <option key={id} value={id}>
                  {level.height}
                  <span>p</span>
                </option>
              ))}
            </select>
          </div>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
