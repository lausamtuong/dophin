import React from "react";
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

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
    const Chatbox = ({currentUser,other,hidden}) => {
  return (
    <div
      className={`fixed bottom-0 w-[30%] h-[500px] ${hidden?"hidden":'block'}`}
     
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

          <MessageInput placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chatbox;
