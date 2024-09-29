import { config } from 'dotenv';
config();

import express from 'express';


const app = express();

app.get('/hello', (_req, res) => {
  res.status(200).json({ message: 'World!' });
});

app.listen(3000, () => {
  console.log('Server started port 3000.');
});