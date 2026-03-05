import dotenv from "dotenv"
dotenv.config();

export const configs = {
    // genral configs
    node_env:process.env.node_env||"development",
    port:parseInt(process.env.PORT)||8080,

    // mongo db
    mongo:{
        uri:process.env.MONGO_URI,
        db_name:process.env.MONGO_NAME ||"api_db"
    },

    // postgre db

    postgres:{
        host:process.env.PG_HOST||"localhost",
        port:parseInt(process.env.PG_PORT||5432, 10) ,

        databse:process.env.PG_DATABASE || "api-monitoring",
        user:process.env.PG_USER||"postgres",
        passwrod:process.env.PG_PASSWORD || "postgres"

    },

    // rabbit_mq

    rabbitmq:{
        url:process.env.RABBITMQ_URL || "amqplib://localhost:5672",
        quee:process.env.RABBITMQ_QUEE || "api-hits-quee",
        publisherConfirms: process.env.RABBITMQ_PUBLISHER_CONFIRMS === "true" || false ,
        retryAttempts:process.env.RABBITMQ_RETRY_ATTEMPTS,
        retryDelay:process.env.RABBITMQ_RETRY_DELAY

    },
    jwt:{

        secret:process.env.JWT_SECRET || "ab1810001jjsksk1l1l91k10%^%$$##@#$%^&*()_+}|CVBNM",
        expiresIn:process.env.JWT_EXPIRES_IN||"7d"

    },
    rateLimit:{
        windowMs:process.env.RATE_LIMIT_WINDOW_MS || 900000 ,
        maxRequest:process.env.RATE_LIMIT_MAX_REQUESTS || 1000
    }




    
}
