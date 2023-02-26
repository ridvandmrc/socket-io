import { Box, Button, TextField, Typography } from "@mui/material";
import { useContext, useRef } from "react";
import { SocketContext } from "../context/Socket";

export const PanelManagement = () => {
  const { callSomeone, myId, inComing } = useContext(SocketContext);
  const targetRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <Box alignContent="center" display="flex">
      {inComing ? (
        <Box>
          <Typography>{inComing} is Calling you !</Typography>
          <Button variant="contained" sx={{ margin: 1 }}>
            Accept!!
          </Button>
          <Button variant="contained">Reject!!</Button>
        </Box>
      ) : (
        <>
          <TextField label="My Id" value={myId} focused />
          <TextField label="Your Name" inputRef={nameRef} />
          <TextField
            inputRef={targetRef}
            label="Call To Someone (ID)"
            sx={{ marginLeft: 1, marginRight: 1 }}
          />
          <Button
            variant="contained"
            onClick={() =>
              callSomeone({
                name: nameRef.current?.value || "",
                targetId: targetRef.current?.value || "",
              })
            }
          >
            Call!!
          </Button>
        </>
      )}
    </Box>
  );
};
