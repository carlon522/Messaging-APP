 // src/components/MessageList.js
 import React, { useEffect, useState } from 'react';
 import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
 import { db } from '../firebase';
 import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';

 const MessageList = () => {
   const [messages, setMessages] = useState([]);

   useEffect(() => {
     const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
     const unsubscribe = onSnapshot(q, (querySnapshot) => {
       const messagesData = [];
       querySnapshot.forEach((doc) => {
         messagesData.push({ ...doc.data(), id: doc.id });
       });
       setMessages(messagesData);
     });

     // Cleanup on unmount
     return () => unsubscribe();

   }, []);

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
                 <span>{message.text}</span><br />
                 <small>{message.timestamp?.toDate().toLocaleString()}</small>
               </>
             }
           />
         </ListItem>
       ))}
     </List>
   );
 };

 export default MessageList;