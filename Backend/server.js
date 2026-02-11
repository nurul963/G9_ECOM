import express from 'express';
import bodyParser from 'body-parser';
import sequelize, { connectDB } from './config/database.js';
import cookieParser from 'cookie-parser';
import './modals/index.js';
import { PORT } from './util/constant.js';
import mainRoute from './routes/index.js';
const app=express();
app.use(bodyParser.json());
app.use(cookieParser());
app.get("/",(req,resp)=>{
    return resp.send("Hello world");
})
app.use("/api",mainRoute)
//http://localhost:8080/api/user/add
app.listen(PORT,async()=>{
    console.log(`App Start:http://localhost:${PORT}`);
    connectDB();
    await sequelize.sync({alter:true});
});