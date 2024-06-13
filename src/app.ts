import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Bike Rental Reservation System is listening on port 5000");
});

export default app;
