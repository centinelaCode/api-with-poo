import express, {Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { UserRouter } from './router/user.router';


class ServerBootstrap {

   // Properties
   public app: express.Application = express();
   private port:number = 3000;

   // Contructor
   constructor() {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(morgan('dev'));
      this.app.use(cors());      

      // this.app.get('/api/hola', (req:Request, res: Response) => {
      //    res.status(200).json({
      //       message: 'Hola Mundo'
      //    })
      // });

      this.app.use('/api', this.routers());

      this.listen();
   }

   // methods

   routers():Array<express.Router> {
      return [new UserRouter().router];
   }

   public listen() {
      this.app.listen(this.port, () => {
         console.log(`Server listening on port ${this.port}`);
      });
   };
}

new ServerBootstrap();