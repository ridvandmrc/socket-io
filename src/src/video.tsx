import { FC, useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "./context/Socket";
import { Snackbar } from "@mui/material";

export const VideoStream: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContext = useContext(SocketContext);
  const [notificationOpen, setNotificationOpen] = useState(true);
  const { setMyStream } = useContext(SocketContext);

  useEffect(() => {
    if (videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((currentStream) => {
          videoRef!.current!.srcObject = currentStream;

          setMyStream(currentStream);
        });
    }
  }, [videoRef]);

  return (
    <div
      style={{
        minWidth: "500px",
        maxWidth: "500px",
        minHeight: "500px",
        maxHeight: "500px",
        borderRadius: "8px",
        margin: "12px",
        border: "1px solid gray",
        overflow: "hidden",
      }}
    >
      <Snackbar
        open={notificationOpen && !!videoContext.myId}
        autoHideDuration={6000}
        onClose={() => setNotificationOpen(false)}
        message={`Device is connected with ${videoContext.myId} `}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      />
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
};
