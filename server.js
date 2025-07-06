import 'dotenv/config';
import app from './app/app.js'


import {createServer} from 'node:http';



const server =createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}, Show http://localhost:${PORT}`);
});