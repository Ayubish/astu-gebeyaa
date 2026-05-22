import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";



dotenv.config();


// NOTE: IMPORTING ALL ROUTES HERE
import errorMiddleware from "./middlewares/error.middleware";
import path from "path";
const __dirname = path.resolve();


export const app = express();
app.use(express.json());
app.use(morgan("common"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Import routes
import uploadRoutes from "./routes/upload.routes";
import productRoutes from "./routes/product.routes";

// Define routes
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/images', express.static(path.join(__dirname, '/public/images')))
app.use('/api/v1/products', productRoutes);

app.get("/", function(req, res) {
  res.send("This is the homepage");
});

app.use(errorMiddleware);
