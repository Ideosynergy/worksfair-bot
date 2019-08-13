import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import messageReceiver from './src/controller';

dotenv.config();

// Set up express app
const app = express();

// Log requests
app.use(morgan('dev'));

app.use(cors());

// Parse the body of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/v1/receiver', messageReceiver)

app.all('*', (request, response) => {
  return response.status(404).json({
    status: 404,
    error: 'We could not handle this request',
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Stan's server listening on port ${port}`);
});

export default app;
