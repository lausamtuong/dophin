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
  const [laodding,setLoaddin]
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
  }, [db,currentUser]);
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
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={<TypingIndicator content="Emily is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />
            {listText &&
              listText?.map((text, ind) => (
                <Message
                  key={ind}
                  model={{
                    message: text?.data().text,
                    sentTime: "1",
                    sender: text?.data().name,
                    direction:
                      currentUser?.uid === other?.uid ? "incoming" : "outgoing",
                    position: "single",
                  }}
                ></Message>
              ))}
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar src={other?.image} name="Emily" />
            </Message>
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "first",
              }}
              avatarSpacer={true}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer={true}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "normal",
              }}
              avatarSpacer={true}
            />
            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "last",
              }}
            >
              <Avatar src={"emilyIco"} name="Emily" />
            </Message>

            <Message
              model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single",
              }}
            />
          </MessageList>

          <MessageInput
            placeholder="Type message here"
            onChange={(e) => setInput(e)}
            onSend={() => {
              send();
            }}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chatbox;
