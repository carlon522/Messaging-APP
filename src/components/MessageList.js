import React, { useEffect, useState, useRef } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from '../auth';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Box } from '@mui/material';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        messagesData.push({ ...data, id: doc.id });
      });
      setMessages(messagesData);
    });

    return () => unsubscribe();

  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <List>
      {messages.map((message) => (
        <ListItem key={message.id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{message.user.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={message.user}
            secondary={
              <>
                <span>{message.text}</span>
                {message.imageUrl && <Box component="img" src={message.imageUrl} style={{ maxWidth: '100%', marginTop: '10px' }} />}
                <br />
                <small>{message.timestamp?.toDate().toLocaleString()}</small>
              </>
            }
          />
        </ListItem>
      ))}
      <div ref={messagesEndRef} />
    </List>
  );
};

export default MessageList;
