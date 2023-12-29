import React, { useState } from "react";
// styles
import styles from "./Message.module.scss";
// custom_hooks
import useLongPress from "../../hooks/useLongPress";

const Message = ({ message, user, time, onLongPress }) => {
  const [isVisibleName, setVisibleName] = useState(false);

  const isFromMe = user.uid === message.uid;
  const alignClass = isFromMe ? styles.fromMe : styles.fromThem;

  const handleLongPress = () => {
    console.log("longPress is triggered");
    onLongPress(message);
  };

  const onClick = () => {
    console.log("click is triggered");
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 800,
  };

  const longPressEvent = useLongPress(handleLongPress, onClick, defaultOptions);

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
          {...longPressEvent}
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
