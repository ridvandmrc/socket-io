import React from "react";
import { PanelManagement } from "./src/callManagementPanel/ManagementPanel";
import { SocketProvider } from "./src/context/Socket";
import { VideoStream } from "./src/video";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "1rem" }}>
      <SocketProvider>
        <VideoStream />
        <PanelManagement />
      </SocketProvider>
    </div>
  );
}

export default App;
