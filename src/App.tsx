import './App.css';
import { useSocketIO } from 'react-use-websocket';

function App() {
  const { sendMessage, lastMessage, readyState } = useSocketIO('ws://localhost:3000');

  return <></>;
}

export default App;
