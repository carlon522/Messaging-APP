// src/components/SendMessage.js
import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../auth';
import { TextField, Button, Box, Input } from '@mui/material';

const SendMessage = () => {
  const [user] = useAuthState(auth);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const storage = getStorage();

  const handleSend = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to send a message");
      return;
    }

    if (message.trim() === "" && !image) {
      alert("Message cannot be empty");
      return;
    }

    let imageUrl = null;

    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        user: user.email,
        imageUrl: imageUrl,
        timestamp: serverTimestamp()
      });
      setMessage("");
      setImage(null);
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
      <Input 
        type="file" 
        onChange={(e) => setImage(e.target.files[0])} 
        inputProps={{ accept: 'image/*' }}
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
        Send
      </Button>
    </Box>
  );
};

export default SendMessage;