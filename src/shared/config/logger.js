import winston from "winston";
import { configs } from "./index.js"

export const logger = winston.createLogger({
    level:configs.node_env=="production"?"info":"debug",
    format:winston.format.combine(
        winston.format.timestamp({format:"YYYY-MM-DD HH:mm:ss "}),
        winston.format.json(),
        winston.format.errors({stack:true}),
        winston.format.splat()
    ),
    defaultMeta:{
        service:"api-monitoring"
    },
    transports:[
        new winston.transports.File({filename:"logs/error.log",level:"error"}),
        new winston.transports.File({filename:"logs/others.log"})
    ]
})

if(configs.node_env!=="production"){
    logger.add(new winston.transports.Console({
        format:winston.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }))
}