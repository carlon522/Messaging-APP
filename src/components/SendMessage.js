// src/components/SendMessage.js
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth';
import { TextField, Button, Box } from '@mui/material';

const SendMessage = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to send a message");
      return;
    }

    if (message.trim() === "") {
      alert("Message cannot be empty");
      return;
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        user: user.email,
        timestamp: serverTimestamp()
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSend} style={{ display: 'flex', margin: '10px 0' }}>
      <TextField
        label="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        fullWidth
        required
        variant="outlined"
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;