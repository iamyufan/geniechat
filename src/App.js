import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

const Chat = lazy(() => import('./pages/Chat'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const SetAvatar = lazy(() => import('./pages/SetAvatar'));
const SetUserName = lazy(() => import('./pages/SetUserName'));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/setusername" element={<SetUserName />} />
          <Route path="/" element={<Chat />} />
          {/* Default Route */}
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
