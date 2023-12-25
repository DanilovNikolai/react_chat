import React, { useContext, useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../index";
import firebase from "firebase/compat/app";
import Loader from "../Loader";
import Message from "../Message";
// styles
import styles from "./Chat.module.scss";
// icons
import sendIcon from "../../assets/icons/send_message.svg";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!value.trim()) {
      // Проверка на пустое сообщение
      return;
    }

    if (value.length > 200) {
      // Проверка на максимальное количество символов
      alert("Максимальная длина сообщения - 200 символов");
      return;
    }

    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        {messages?.map((message) => (
          <Message message={message} user={user} key={message.createdAt} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputMessage}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {window.innerWidth <= 500 ? (
          <img
            src={sendIcon}
            alt="icon"
            style={{ width: "30px", paddingRight: "10px" }}
            onClick={sendMessage}
          />
        ) : (
          <button className={styles.inputButton} onClick={sendMessage}>
            Отправить
          </button>
        )}
      </div>
    </div>
  );
}

export default Chat;
