import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatedBackground } from './components/AnimatedBackground';
import { LandingPage } from './pages/LandingPage';
import { RoomPage } from './pages/RoomPage';
import { JoinPage } from './pages/JoinPage';
import { PrivacyPage } from './pages/PrivacyPage';

function App() {
  return (
    <BrowserRouter>
      <AnimatedBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/r/:code" element={<RoomPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;