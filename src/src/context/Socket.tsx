import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext({
  myId: null,
  callSomeone: (user: { name: string; targetId: string }) => {},
  inComing: null,
  setMyStream: (stream: MediaStream) => {},
});

const socket = io("http://192.168.1.44:5500");

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [myId, setMyId] = useState(null);
  const [inComing, setInComing] = useState(null);
  const [myStream, setMyStream] = useState<MediaStream>();

  useEffect(() => {
    socket.on("myId", (myId) => {
      setMyId(myId);
    });

    socket.on("callUser", ({ targetId, name, stream }) => {
      console.log("incoming: ", targetId, name, stream);
      setInComing(name);
    });
  }, []);

  const callSomeone = ({
    name,
    targetId,
  }: {
    name: string;
    targetId: string;
  }) => {
    console.log("call userr: ", myStream);
    socket.emit("callUser", { name, targetId, myStream });
  };

  return (
    <SocketContext.Provider
      value={{ myId, callSomeone, inComing, setMyStream }}
    >
      {children}
    </SocketContext.Provider>
  );
};
