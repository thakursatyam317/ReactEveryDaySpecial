// server.js or index.js (main backend file)
import express from "express";
import cors from "cors";
import connectDb from "./src/config/db.js";
import AuthRouter from "./src/router/authRouter.js"; // login/register etc.
import AuthProfile from "./src/router/profile.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/authProfile", AuthProfile);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});

const port = process.env.PORT || 4500;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb();
});
