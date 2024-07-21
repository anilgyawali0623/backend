import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();

//  middleware to solve cross origin policy

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// this are all the middle wware

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
