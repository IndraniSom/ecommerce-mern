import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import helmet from "helmet";
import xssClean from "xss-clean";
import routes from "./routes/index.js";
import productsRouter from "./routes/product.js";
import orderRouter from "./routes/order.js"; 
import blogRouter from "./routes/blogs.js"; 
import logger from "../utils/logger.js";
dotenv.config();

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Cloudinary config missing");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.disable('x-powered-by');

const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
  credentials: true,
};


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ 
      success: false,
      message: 'Forbidden: Invalid Origin',
      error: 403
    });
  }
  next();
});

app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const blockedAgents = ['PostmanRuntime', 'k6', 'curl', 'insomnia', 'ApacheBench', 'Go-http-client']; 
  if (process.env.NODE_ENV === 'production' && blockedAgents.some(agent => userAgent.includes(agent))) {
    return res.status(403).json({ 
      success: false,
      message: 'Forbidden: Unauthorized User-Agent',
      error: 403
    });
  }
  next();
});

app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(xssClean());


app.use(cors(corsOptions));

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieParser(process.env.COOKIE_SECRET, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === 'production',
  })
);

app.get("/", (req, res) => {
  res.send("Hello This is created By Indrani som");
});


const rateLimit = (windowMs, max) => {
  const requests = {};
  
  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    requests[ip] = requests[ip] ? requests[ip].filter(time => now - time < windowMs) : [];

    if (requests[ip].length >= max) {
      return res.status(429).json({
        success: false,
        message: "Too many requests, please try again later",
        error: 429
      });
    }
    requests[ip].push(now);
    next();
  };
};

// Apply rate limiting to all routes
app.use(rateLimit(15 * 60 * 1000, 100)); // 100 requests per 15 minutes

app.use("/api", routes);
app.use("/products", productsRouter);
app.use("/api/order", orderRouter); // Use the order router
app.use("/blogs", blogRouter); // Use the blog router

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  logger.error(err.stack);
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.statusCode || 500
  });
});


app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    error: 404,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});

export default app;
export { cloudinary };