import React, { useContext, useState, useEffect, useRef } from "react";
// context
import { Context } from "../../index";
// firebase
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
// components
import Loader from "../Loader";
import Message from "../Message";
// styles
import styles from "./Chat.module.scss";
// icons
import sendIcon from "../../assets/icons/send_message.svg";
import fromIcon from "../../assets/icons/from_message.svg";
import deleteIcon from "../../assets/icons/delete_quoted_message.svg";
// utils
import formatTimestamp from "../../utils/formatTimestamp";

function Chat() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );
  const messagesEndRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const handleLongPress = (message) => {
    setSelectedMessage(message); // Создаем копию сообщения
  };

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
      return;
    }

    if (value.length > 200) {
      alert("Максимальная длина сообщения - 200 символов");
      return;
    }

    await firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      quotedText: selectedMessage?.text || null,
      quotedName: selectedMessage?.displayName || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
    setSelectedMessage(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        {messages?.map((message, index) => (
          <React.Fragment key={message.createdAt}>
            {(index === 0 ||
              (index > 0 &&
                formatTimestamp(message.createdAt).date !==
                  formatTimestamp(messages[index - 1].createdAt).date)) && (
              <div className={styles.dateDivider}>
                {formatTimestamp(message.createdAt).date}
              </div>
            )}
            <Message
              message={message}
              user={user}
              time={formatTimestamp(message.createdAt).time}
              onLongPress={handleLongPress}
              isSelected={selectedMessage === message}
            />
          </React.Fragment>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {selectedMessage && (
        <div className={styles.selectedMessageContainer}>
          <div className={styles.selectedMessageText}>
            <div>
              <img src={fromIcon} alt="" />
            </div>
            От <span>{selectedMessage.displayName}</span>:{" "}
            {window.innerWidth < 500 && selectedMessage.text.length > 30
              ? `${selectedMessage.text.slice(0, 30)}...`
              : `${selectedMessage.text.slice(0, 70)}...`}
          </div>
          <img
            src={deleteIcon}
            alt=""
            onClick={() => setSelectedMessage(null)}
          />
        </div>
      )}
      <div className={styles.inputContainer}>
        <textarea
          className={styles.inputMessage}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <img
          src={sendIcon}
          alt="icon"
          onClick={sendMessage}
          className={styles.sendButton}
        />
      </div>
    </div>
  );
}

export default Chat;
