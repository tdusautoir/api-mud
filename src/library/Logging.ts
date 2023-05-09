import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf } = format;

const logFormat = printf(({ message, level, timestamp }) => {
    return `${timestamp} [${level}] ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        logFormat
    ),
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`.
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(
                format.colorize({
                    all: true
                })
            )
        })
    );
}

export = logger;
