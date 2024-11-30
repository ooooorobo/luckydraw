import './App.css';
import { useSocketIO } from 'react-use-websocket';
import { EntryForm } from './components/entry/EntryForm.tsx';

function App() {
  const { sendMessage, lastMessage, readyState } = useSocketIO('ws://localhost:3000');

  return (
    <>
      <EntryForm />
    </>
  );
}

export default App;
