import * as winston from 'winston';
import * as dotenv from 'dotenv';
dotenv.config();

class LoggerService {
    private logger: winston.Logger;
    private route: string;

    constructor(route: string) {
        this.route = route;
        this.logger = this.createLogger();
    }

    private createLogger(): winston.Logger {
        const dateFormat = (): string => new Date(Date.now()).toLocaleString();
    
        const formatMessage = (info: winston.Logform.TransformableInfo) => {
            const message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `;
            return info.obj ? `${message}data ${JSON.stringify(info.obj)} | ` : message;
        };

        return winston.createLogger({
            level: 'info',
            format: winston.format.printf(formatMessage),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${this.route}.log`}),
            ],
        });
    }

    
    async info(message: string, obj?: any): Promise<void> {
        this.logger.log('info', message, obj? { obj } : undefined);
    }
    
    async error(message: string, obj?: any): Promise<void> {
        this.logger.log('error', message, obj? { obj } : undefined);
    }
    
    async debug(message: string, obj?: any): Promise<void> {
        this.logger.log('debug', message, obj? { obj } : undefined);
    }
}

export default LoggerService;