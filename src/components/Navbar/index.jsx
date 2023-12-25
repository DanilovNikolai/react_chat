import React, { useContext } from "react";
// @material-ui
import Button from "@material-ui/core/Button";
// react-router-dom
import { Link } from "react-router-dom";
// utils
import { LOGIN_ROUTE } from "../../utils/consts";
// context
import { Context } from "../../index";
// react-firebase-hooks
import { useAuthState } from "react-firebase-hooks/auth";
// styles
import styles from "./Navbar.module.scss";

function Navbar() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  console.log(user);

  return (
    <nav className={styles.container}>
      <p className={styles.title}>Real-time Chat</p>
      {user && (
        <>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img alt="user_avatar" src={user.photoURL} />
            </div>
            <div className={styles.username}>{user.displayName}</div>
          </div>
          <Button
            className={styles.button}
            onClick={() => auth.signOut()}
            style={{ textDecoration: "none" }}
            variant="outlined"
          >
            Logout
          </Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
