import { useCallback, useState, useEffect } from "react";
import "./App.css";
import Login from "./component/login";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { login } from "./client";
import SignUp from "./component/signUp";
import ChatRoomv2 from "./component/chatRoom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const handleOnClick = useCallback(() => navigate('/chat', { replace: true }), [navigate]);

  useEffect(() => {
    document.title = "ChatApp"
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSuccessMessage('');
    login(formData.get('username'), formData.get('password'))
      .then(response => {
        setError('');
        handleOnClick();
        setUsername(formData.get('username'));
      }).catch((err) => {
        if (err.response.data.includes('ECONNREFUSED'))
          setError("Server unreachable");
        else
          setError(err.response.data);
      });
  }

  return (
    <Routes>
      <Route path="/chat" element={<ChatRoomv2 username={username} />} />
      <Route path="/" element={<Login error={error} onSubmit={onSubmit} successMessage={successMessage} />} />
      <Route path="/signUp" element={<SignUp error={error} setError={setError} setSuccessMessage={setSuccessMessage} onSubmit={onSubmit} />} />
    </Routes>
  );
}

export default App;
