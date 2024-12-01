import { Server } from 'socket.io';
import { ProductData } from './productData.js';
import { log } from './logUtil.js';

const room = 'room';
let participants = [];
let currentProductIdx = 6;
let chatList = [];

/**
 * @param {Server} io
 */
export const handleSocket = (io) => {
  const updateRoomBroadcast = () => {
    io.to(room).emit('room update', {
      participants,
      currentProduct: ProductData[currentProductIdx],
      chatList,
    });
  };

  io.on('connection', (socket) => {
    log('a user connected');
    let user = null;
    let isAdmin = false;

    socket.on('disconnect', () => {
      log(`user ${user?.name ?? ''} disconnected`);
      socket.leave(room);
      participants = participants.filter((x) => x !== user);
      updateRoomBroadcast();
    });

    socket.on('join', (payload, callback) => {
      // 현재 방에 같은 이름 있는지 체크
      if (participants.some(({ name }) => name === payload.name)) {
        // 있으면 거절
        callback?.(false);
        log(`중복된 이름 요청 발생 - ${payload.name}`);
        return;
      }

      // 없으면 join
      socket.send('join');
      socket.join(room);

      user = { name: payload.name };

      if (payload.name === process.env.ADMIN_NAME) {
        log(`${payload.name} 입장`);

        socket.emit('admin');
        isAdmin = true;

        callback?.(true);
        updateRoomBroadcast();

        return;
      }

      participants.push(user);
      updateRoomBroadcast();

      log(`${payload.name} 입장`);

      callback?.(true);
    });

    // 어드민 기능
    socket.on('chat', ({ message }) => {
      chatList.push(message);
      updateRoomBroadcast();
    });

    socket.on('spin', () => {
      const randomIndex = Math.floor(Math.random() * participants.length);

      const cardWidth = 75;
      const randomize = Math.random() * (cardWidth * 0.6) + cardWidth * 0.2 - cardWidth / 2;

      log(`${ProductData[currentProductIdx].name}: ${participants[randomIndex].name}`);
      io.to(room).emit('spin', participants[randomIndex], randomize);
    });

    socket.on('prevProduct', () => {
      currentProductIdx = Math.max(0, currentProductIdx - 1);
      updateRoomBroadcast();
    });

    socket.on('nextProduct', () => {
      currentProductIdx = Math.min(ProductData.length - 1, currentProductIdx + 1);
      updateRoomBroadcast();
    });
  });
};
