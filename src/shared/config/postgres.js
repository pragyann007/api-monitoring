import PG from "pg";
import { configs } from "./index.js"
import { logger } from "./logger.js"
import { log } from "winston";
const {Pool} = PG ; 

class PostgresConnection{
    constructor (){
        this.pool = null ; 
    }

    getPool(){
        if(!this.pool){
            this.pool = new Pool({
                host:configs.postgres.host,
                database:configs.postgres.databse,
                user:configs.postgres.user,
                password:configs.postgres.passwrod,
                port:configs.postgres.port , 
                max:20,
                idleTimeoutMillis:30000,
                connectionTimeoutMillis:2000

            })
            this.pool.on("error",(err)=>{
                logger.error("Unexpected error occured ..",err)
            })

            logger.info("PG pool created ..")
            return this.pool ; 
        }
    }


    async testConnection(){
        try {
            const pool = this.getPool();
            const client = pool.connect();

            const result = (await client).query("SELECT NOW()");
            (await client).release();

            logger.info("PG connected succefully at " , (await result).rows[0].now)
            
        } catch (error) {
            logger.error("Failed to connect to PG server " , error)
            throw error ; 
        }
    }

    async query (text,params){
        const pool = this.getPool();
        const start = Date.now();

        try {

            const result = await pool.query(text,params)
            const duration = Date.now()-start ; 

            logger.debug("Query executed sucessfully .. " , {text,duration,rows:result.rowCount})
            return result ; 
            
        } catch (error) {

            logger.error("error arised .." , error);
            throw error ; 


            
        }

    }

    async close(){
        if(this.pool){
            this.pool.end();
            this.pool = null;
            logger.info("PG pool closed ..")
        }
    }

}

export default new PostgresConnection() ; 
