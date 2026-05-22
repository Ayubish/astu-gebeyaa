
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connectDB } from "./config/db"; // ✅ use the correct file where you defined connectDB
import { PORT } from "./config/env"; // ✅ no need for "../src", since this file is already in src

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
  await connectDB(); // ✅ connect to Neon PostgreSQL through Prisma
});

