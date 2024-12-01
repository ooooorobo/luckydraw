import './App.css';
import { useSocketIO } from 'react-use-websocket';
import { Room } from './components/room/Room.tsx';

function App() {
  const { sendMessage, lastMessage, readyState } = useSocketIO('ws://localhost:3000');

  return (
    <>
      <Room />
    </>
  );
}

export default App;
