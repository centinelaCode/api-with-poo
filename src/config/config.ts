
import * as dotenv from 'dotenv';

export abstract class ConfigServer {   

   constructor(){                    
      // get the elpath
      const nodeNameEnv = this.craetePathEnv(this.nodeEnv);

      // config dotenv with the path
      dotenv.config({
         path: nodeNameEnv,
      })
   }

   // methods
   public getEnvironment(key: string): string | undefined {
      return process.env[key]; // lo lee de esta manera: porcess.env['PORT']
   }

   public getNumberEnv(key: string): number {
      return Number(this.getEnvironment(key))
   }

   // getter
   public get nodeEnv(): string {
      return this.getEnvironment("NODE_ENV")?.trim() || ""
   }

   public craetePathEnv(path: string): string {         
      const arrEnv: Array<string> = ['env'];  // example_join: ['hola', 'mundo'] => 'hola.mundo'      

      if(path.length > 0) {  //NODE_ENV => .production.release => ['production', 'release']
         const stringArray = path.split('.');
         arrEnv.unshift(...stringArray) // add in first position all elements of stringArray
      }

      return '.' + arrEnv.join('.')  // return => . + env => .env
   }

}

