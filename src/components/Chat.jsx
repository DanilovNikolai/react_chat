import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../index";
import { TextField, Button, Container, Grid, Avatar } from "@material-ui/core";
import firebase from "firebase/compat/app";
import Loader from "./Loader";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async () => {
    console.log(value);
    console.log(user.uid);
    console.log(user.displayName);
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };

  useEffect(() => {
    console.log(messages);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <Grid
        container
        style={{
          height: window.innerHeight - 50,
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "70vh",
            border: "1px solid rgb(152, 61, 152)",
            borderRadius: "10px",
            overflowY: "auto",
          }}
        >
          {messages?.map((message) => (
            <div
              key={message.createdAt}
              style={{
                margin: "20px",
                border:
                  user.uid === message.uid
                    ? "2px solid green"
                    : "2px dashed red",
                marginLeft: user.uid === message.uid ? "auto" : "10px",
                color: user.uid === message.uid ? "green" : "red",
                width: "fit-content",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              <Grid container>
                <Avatar
                  style={{ borderRadius: "5px", margin: "5px" }}
                  src={message.photoURL}
                />
                <div
                  style={{
                    margin: "auto",
                    fontFamily: "Segoe UI",
                    fontWeight: "700",
                  }}
                >
                  {message.displayName}
                </div>
              </Grid>
              <div style={{ color: "#000", fontFamily: "Segoe UI" }}>
                {message.text}
              </div>
              <div>{new Date(message.createdAt?.seconds).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <Grid
          container
          direction={"column"}
          alignItems={"flex-end"}
          style={{ width: "80%" }}
        >
          <TextField
            variant="outlined"
            fullWidth
            maxRows={2}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            style={{ marginTop: "10px" }}
            variant="outlined"
          >
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Chat;
