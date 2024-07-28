// src/components/Chat.js
import React from 'react';
import MessageList from './MessageList';
import SendMessage from './SendMessage';
import { Container, Box, Typography } from '@mui/material';

const Chat = () => {
  return (
    <Container
      maxWidth="md"
      style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }} // Adjust height to avoid overlapping with the AppBar
    >
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>
        Chat
      </Typography>
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