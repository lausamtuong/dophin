import React, { useEffect, useState } from "react";
import {
  MainContainer,
  MessageInput,
  ChatContainer,
  TypingIndicator,
  MessageList,
  Message,
  MessageSeparator,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import { db, storage } from "../firebase";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  setDoc,
  doc,
  onSnapshot,
  collection,
  deleteDoc,
  addDoc,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import Moment from "react-moment";
const Chatbox = ({ currentUser, other, hidden }) => {
  const [input, setInput] = useState(null);
  const [listText, setListText] = useState([]);
  const [laodding,setLoadding] = useState(true)
  const send = async () => {
    const id = Number(currentUser?.uid) + Number(other?.uid);

    await addDoc(collection(db, "chat", String(id), "data"), {
      ...currentUser,
      text: input,
      timestamp: serverTimestamp(),
    });
  };
  useEffect(() => {
    const id = Number(currentUser?.uid) + Number(other?.uid);
    console.log("chatting")
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chat", String(id) || "1", "data"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setListText(snapshot.docs)
    );
    setLoadding(false)
  }, [db]);
  console.log(listText[0]?.data());
  return (
    <div
      className={`fixed bottom-0 w-[30%] h-[500px] ${
        hidden ? "hidden" : "block"
      }`}
      style={{
        overflow: "hidden",
      }}
    >
      {
          loadding?<p>Loading</p>:
    }
      
    </div>
  );
};

export default Chatbox;
