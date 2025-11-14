import express from 'express';
import { configDotenv } from 'dotenv';
import { connectToDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import session from 'express-session';
import requestIp from 'request-ip';
import userRouter from './routes/user.routes.js';
import chatRouter from './routes/chat.routes.js';
import cors from 'cors';
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(session({
    secret:"mysecret",
    resave:  false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
         maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));
app.use(requestIp.mw());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
    connectToDb();
});

