import { configs } from "./index.js";
import { logger } from "./logger.js"
import mongoose from "mongoose"
export class mongoConnections {
    constructor() {
        this.connection = null;
    }

    async connect() {
        if (this.connection) {
            logger.info("Db already connected ....")

            return this.connection()
        }

        await mongoose.connect(configs.mongo.uri, {
            dbName: configs.mongo.db_name
        })
        logger.info("Mongo db connected ... ", configs.mongo.uri);

        this.connection.on("error", (err) => {
            logger.error("error occured...", err)

        })

        this.connection.on("disconnected", () => {
            logger.info("Mongo db disconnected ....")
        })


    }

    async disconnect(){
      try {
          if(this.connection){
              await mongoose.disconnect();
              logger.info("mongo db disconnected ...")
              this.connection = null ; 
          }
      } catch (error) {
        logger.error("Error is " , error)
        throw error ; 
        
      }
    }

    getConnection(){
        return this.connection ; 
    }

}