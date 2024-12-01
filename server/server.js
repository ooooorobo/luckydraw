import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import http from 'http';
import { Server } from 'socket.io';
import { handleSocket } from './socket.js';
import 'dotenv/config';
import * as fs from 'fs';

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

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist/client')));
    app.use('*', async (req, res, next) => {
      res.sendFile(path.join(__dirname, '../dist/client', 'index.html'));
    });
  } else {
    app.get('*', async (req, res, next) => {
      try {
        let template = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        vite.ssrFixStacktrace(error);
        next(error);
      }
    });
  }

  handleSocket(io);

  server.listen(3000, () => {
    console.log(`listening on http://localhost:3000`);
  });
}

createServer();
