import React, { useState } from "react";
// styles
import styles from "./Message.module.scss";
// custom_hooks
import useLongPress from "../../hooks/useLongPress";
// icons
import selectedMessageIcon from "../../assets/icons/checked_message.svg";

const Message = ({ message, user, time, onLongPress, isSelected }) => {
  const [isVisibleName, setVisibleName] = useState(false);

  const isFromMe = user.uid === message.uid;
  const alignClass = isFromMe ? styles.fromMe : styles.fromThem;
  const selected = isSelected ? styles.selected : null;

  const handleLongPress = () => {
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
            className={
              isFromMe
                ? `${styles.avatar} ${selected}`
                : `${styles.avatar} ${styles.fromThem} ${selected}`
            }
            onClick={() => setVisibleName(!isVisibleName)}
          >
            <img
              src={selected ? selectedMessageIcon : message.photoURL}
              alt="avatar"
            />
          </div>
          <div className={`${styles.content} ${alignClass} ${selected}`}>
            {isVisibleName && (
              <div className={styles.username}>{message.displayName}</div>
            )}
            {message.quotedText ? (
              <>
                <div className={styles.messageText}>
                  <div className={styles.quotedName}>
                    от {message.quotedName}
                  </div>
                  <div className={styles.quotedText}>{message.quotedText}</div>
                  {message.text}
                </div>
              </>
            ) : (
              <div className={styles.messageText}>{message.text}</div>
            )}
            <div className={styles.time}>{time}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
