import amqp from "amqplib"
import { configs } from "./index.js"
import { logger } from "./logger.js"

class RabbitMqConnector{
    constructor(){
        this.connection = null; 
        this.channel = null ; 
        this.isConnecting = false ; 

    


    }
    async connect(){
        if(this.channel){
            return this.channel ; 
        }

        if(this.isConnecting){
            await new Promise((resolve)=>{
                const checkInterval = setInterval(() => {
                    if(!this.isConnecting){
                        clearInterval(checkInterval)
                        resolve()
                    }
                    
                }, 100);
                return this.channel ; 
            })
        }

        try {
            this.isConnecting=true;

            logger.info("connecting to rabbit mq " , configs.rabbitmq.url);

            this.connection = await amqp.connect(configs.rabbitmq.url);
            this.channel = await this.connection.createChannel();

            const dlqname = `${configs.rabbitmq.quee}.dlq`


            await this.channel.assertQueue(dlqname,{
                durable:true
            })

            await this.channel.assertQueue(configs.rabbitmq.quee,{
                durable:false,
                arguments:{
                    "x-dead-letter-exchange":"",
                    "x-dead-letter-routing-key":dlqname
                }
            })

            logger.info("Rabbit mq connected ..",configs.rabbitmq.quee);


            this.connection.on("close",()=>{
                logger.warn("Rabot mq closed ");
                this.connection = null ; 
                this.channel = null
            })

            this.connection.on("error",(err)=>{
                logger.error("Somethin error happend" , err);
                this.connection = null ;
                this.channel = null
            })

            this.isConnecting = false;
            return this.channel ; 
            
        } catch (error) {

            this.isConnecting = false
            logger.error("Sometging error happened" , error)
            throw error ; 
            
        }
            
    }

    getChanne(){
        return this.channel ; 

    }

    getStatus(){
        if(!this.connect || !this.channel ) return "disconnected..."

        if(this.connect.closing) return "closing "
        return "connected.."
    }

    async close(){
        try {
            if(this.channel){
                await this.channel.close();
                this.channel = null ; 
            }

            if(this.connection){
                await this.connection.close();
                this.connection = null ; 
            }

            logger.info("Rabbit mq connection closed ...")

            
        } catch (error) {
            
            logger.error("error in closing rabbit mq connection ",error)
        }
    }
}


export default new RabbitMqConnector()