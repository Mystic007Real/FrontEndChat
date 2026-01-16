import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useRouter } from 'next/router';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      router.push('/'); // Redirect if no username
      return;
    }
    setUsername(storedUsername);

    // Real-time listener for messages (Supabase's real-time feature)
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('timestamp', { ascending: true });
      if (!error) setMessages(data);
    };
    fetchMessages();

    return () => supabase.removeChannel(channel);  // Cleanup
  }, [router]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const { error } = await supabase
      .from('messages')
      .insert([{ text: newMessage, username }]);
    if (!error) setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <h2>FrontEnd Chat</h2>
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <strong>{msg.username}:</strong> {msg.text}
            <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
