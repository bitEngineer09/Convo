import express, { urlencoded } from 'express';
import { configDotenv } from 'dotenv';
import { connectToDb } from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import session from 'express-session';
import requestIp from 'request-ip';
import userRouter from './routes/user.routes.js';
configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret:"mysecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }
}));
app.use(requestIp.mw());


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
    connectToDb();
})

