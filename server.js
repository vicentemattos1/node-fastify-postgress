import { DatabasePostgres } from './database-postgres.js';
import { fastify } from 'fastify';

const server = fastify();

const database = new DatabasePostgres();

server.get('/videos', async (request, reply) => {
  const search = request.query.search;
  const videos = await database.list(search);
  return videos;
});
server.post('/videos', async (request, reply) => {
  const { title, description, duration } = request.body;
  const newVideo = await database.create({
    title,
    description,
    duration,
  });
  return reply.status(201).send(newVideo);
});
server.put('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;
  const updatedVideo = await database.update(videoId, {
    title,
    description,
    duration,
  });

  return reply.status(204).send(updatedVideo);
});
server.delete('/videos/:id', async (request, reply) => {
  const videoId = request.params.id;

  await database.delete(videoId);
  return reply.status(204).send();
});

server.listen({
  port: '3333',
});
