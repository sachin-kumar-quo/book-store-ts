export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'test',
  },
});
