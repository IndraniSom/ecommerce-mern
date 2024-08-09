import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import productsRouter from './routes/product.js';
import orderRouter from './routes/order.js'; // Import the order router
dotenv.config();

const app = express();

// Array of allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3000/checkout'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization','x-auth-token'],
  credentials: true,
};

// Use CORS middleware with options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET, {
  httpOnly: true,
  sameSite: 'strict',
  secure: true
}));

app.get('/', (req, res) => {
  res.send('Hello This is ARC Backend Created by @lokesh-7977');
});

app.use('/api', routes);
app.use('/products', productsRouter);
app.use('/api/order', orderRouter); // Use the order router

app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: 404
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default app;
