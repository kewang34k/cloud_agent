const createApp = require('./server/app');

const PORT = process.env.PORT || 3001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`Payment API running on port ${PORT}`);
});
