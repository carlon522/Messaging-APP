import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const DisplayData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users2"));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users List:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
            <p>Description: {user.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;