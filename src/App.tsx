import './App.css';
import { EntryForm } from './components/entry/EntryForm.tsx';
import { useEffect, useState } from 'react';
import { socket } from './lib/socket.ts';
import { Product } from './components/room/components/ProductCard.tsx';
import { Room } from './components/room/Room.tsx';

export type RoomData = {
  participants: { name: string }[];
  currentProduct: Product;
  chatList: string[];
};

function App() {
  const [isConnected, setConnected] = useState(false);
  const [roomState, setRoomState] = useState<RoomData | null>(null);
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const onConnect = () => setConnected(true);

    const onDisconnect = () => {
      setConnected(false);
      alert('팅김!!!!!!!! 새로고침할게요!!!!!!!!!!');
      location.reload();
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    const onRoomUpdate = (room) => setRoomState(room);
    socket.on('room update', onRoomUpdate);

    const onAdmin = () => setAdmin(true);
    socket.on('admin', onAdmin);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('room update', onRoomUpdate);
      socket.off('admin', onAdmin);
    };
  }, []);

  return (
    <>{roomState ? <Room roomState={roomState} name={name} isAdmin={admin} /> : <EntryForm setName={setName} />}</>
  );
}

export default App;
