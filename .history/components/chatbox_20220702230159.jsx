import React from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react';
const Chatbox = () => {
    return (
        <div style={{
            height: "500px",
            overflow: "hidden"
          }}>
                      <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}>
                          <MessageSeparator content="Saturday, 30 November 2019" />
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "single"
              }}>
                              <Avatar src={emilyIco} name="Emily" />
                          </Message>
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single"
              }} />
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "first"
              }} avatarSpacer={true} />
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "normal"
              }} avatarSpacer={true} />
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "normal"
              }} avatarSpacer={true} />
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Emily",
                direction: "incoming",
                position: "last"
              }}>
                              <Avatar src={emilyIco} name="Emily" />
                          </Message>                
                          
                          <Message model={{
                message: "Hello my friend",
                sentTime: "15 mins ago",
                sender: "Patrik",
                direction: "outgoing",
                position: "single"
              }} />                                
                      </MessageList>
                  </div>
    );
}

export default Chatbox;
