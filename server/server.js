import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import { Server } from 'socket.io';
import { handleSocket } from './socket.js';
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    allowEIO3: true,
    ...(process.env.NODE_ENV === 'development' && {
      cors: {
        origin: 'http://localhost:3000',
      },
    }),
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use(express.static(path.join(__dirname, '../dist/client')));

  app.use('*', async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../dist/client', 'index.html'));
  });

  handleSocket(io);

  server.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
  });
}

createServer();
