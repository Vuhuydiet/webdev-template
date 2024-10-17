import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on('SIGINT', () => {
  server.close(() => {
    console.log('Server is closed.');
  });
});
