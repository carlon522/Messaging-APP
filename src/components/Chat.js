import React from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import { Container, Box, Button } from '@mui/material';
import { collection, getDocs, deleteDoc, writeBatch } from 'firebase/firestore';
import { db } from '../auth';

const Chat = () => {
  const handleClearChat = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const batch = writeBatch(db); // Using writeBatch for bulk operations

    querySnapshot.forEach(docSnapshot => {
      batch.delete(docSnapshot.ref);
    });

    await batch.commit();
    console.log("Chat cleared!");
  };

  return (
    <Container
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }} // Adjust height to avoid overlapping with the AppBar
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        mb={1}
      >
        <Button variant="contained" color="secondary" onClick={handleClearChat}>
          Clear Chat
        </Button>
      </Box>
      <Box
        style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}
      >
        <MessageList />
      </Box>
      <Box>
        <SendMessage />
      </Box>
    </Container>
  );
};

export default Chat;