import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const addUser = async () => {
    try {
      await axios.post('http://localhost:5000/api/users', { name, email });
      setMessage('User registered successfully!');
      setName('');
      setEmail('');
      setTimeout(() => setMessage(''), 4000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error adding user:', error);
      setMessage('Error registering user.');
    }
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '250px',
      margin: '0 auto',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px' }}
      />
      <button onClick={addUser} style={{ padding: '8px', cursor: 'pointer' }}>Add User</button>
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}
export default App;
