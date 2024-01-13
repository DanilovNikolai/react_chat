# **Realtime Chat App**

This is a web application where users can communicate with each other.

# **App description:**

The application consists of two pages with the login and chat page.
Login is performed by using the **_firebase authentication_** service via a google account.
The authorization status is saved in localStorage.
The authorized user gets to the chat page.
Your own messages are displayed on the right in the chat window, and from other people - on the left.
The time when it was sent is displayed under each message.
If the message is sent for the first time in a day, the current date is displayed in front of it.
When the page is refreshed, the chat will scroll down to the last message;
The chat data is stored in the **_firestore database_**.
The user's google avatar is located to the side of the message.
By clicking on the avatar, you can see the google nickname of the interlocutor.
At the moment, you can write text and reply to selected messages in the chat.

# **The following basic skills have been worked out:**

1. Using the useState, useEffect, useRef and useContext hooks;
2. Using onClick events on elements;
3. Import icons, libraries, hooks and components;
4. Using conditional rendering with the ternary operator;
5. Working with props and context;
6. Using Firebase auth and Firestore database;
7. Using a page routing;
8. Making adaptations for different screens;
9. Using a content loader;
10. Creating and using a custom hooks;
