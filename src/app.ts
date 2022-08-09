import 'dotenv/config';
import express from 'express';
import { Connection } from './Model/conn';
import { errorConsole } from './Utils/errorConsole';

import UserRoute from './Routes/UserRoute';
import CompanyRoute from './Routes/CompanyRoute';
import CompanyUserRoute from './Routes/CompanyUserRoute';


export const main = async () => {
  try{

    const PORT = parseInt(process.env.PORT!, 10);
    const HOST = process.env.HOST!;

    await Connection();

    const app = express();
  
    app.use(express.json());
    app.use((error: any, req: any, res: any, next: any) => {
      const errM = {
        status: error.status,
        message: error.message,
        stack: error.stack
      }
      console.error(errM);
      res.status(error.status || 500);
      res.json(errM);
    })

    UserRoute(app);
    CompanyRoute(app);
    CompanyUserRoute(app);

    app.listen(PORT, HOST, () => {
      return console.log(`server is listening on ${PORT}`);
    });
  }
  catch(error){
    errorConsole(error);
  }  

}