import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  const handleEnter = () => {
    if (!username.trim()) {
      alert('Please enter a username.');
      return;
    }
    // Store username in localStorage for the chatroom
    localStorage.setItem('username', username);
    router.push('/chat');
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '20vh' }}>
      <h1>Welcome To The Front End</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: '20px', display: 'block', margin: '20px auto' }}
      />
      <button className="enter-button" onClick={handleEnter}>
        Enter
      </button>
    </div>
  );
}
