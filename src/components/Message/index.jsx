import React, { useState } from "react";
import styles from "./Message.module.scss";

const Message = ({ message, user, time }) => {
  const [isVisibleName, setVisibleName] = useState(false);

  const isFromMe = user.uid === message.uid;
  const alignClass = isFromMe ? styles.fromMe : styles.fromThem;

  return (
    <>
      <div
        className={
          isFromMe
            ? `${styles.messageContainer} ${styles.reverse} ${styles.toEnd}`
            : styles.messageContainer
        }
      >
        <div
          className={
            isFromMe
              ? `${styles.messageWrapper} ${styles.reverse}`
              : styles.messageWrapper
          }
        >
          <div
            className={styles.avatar}
            onClick={() => setVisibleName(!isVisibleName)}
          >
            <img src={message.photoURL} alt="avatar" />
          </div>
          <div className={`${styles.content} ${alignClass}`}>
            {isVisibleName && (
              <div className={styles.username}>{message.displayName}</div>
            )}
            <div className={styles.messageText}>{message.text}</div>
            <div className={styles.time}>{time}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
