import {Server} from 'socket.io';
import {ProductData} from "./productData.js";

const room = 'room';
let participants = [];
let currentProductIdx = 6;

/**
 * @param {Server} io
 */
export const handleSocket = (io) => {
    const updateRoomBroadcast = () => {
        io.to(room).emit('room update', {
            participants, currentProduct: ProductData[currentProductIdx]
        })
    }

    io.on('connection', (socket) => {
        console.log('a user connected');
        let user = null;

        socket.on('disconnect', () => {
            console.log('user disconnected');
            socket.leave(room);
            participants = participants.filter(x => x !== user)
            updateRoomBroadcast();
        });

        socket.on('message', () => {
        })

        socket.on('join', (payload, callback) => {
            // 현재 방에 같은 이름 있는지 체크
            if (participants.some(({name}) => name === payload.name)) {
                // 있으면 거절
                callback?.(false)
                console.log('중복된 이름 요청 발생')
                return;
            }
            // 없으면 join
            socket.send('join')
            socket.join(room);

            user = {name: payload.name};

            participants.push(user)
            updateRoomBroadcast();

            console.log(`${payload.name} 입장`)

            callback?.(true)
        })
    })
}