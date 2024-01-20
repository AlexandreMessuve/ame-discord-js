const error = () => {
    const errorHandler = (error) => {
        console.error(error);
    }

    process.on('unhandledRejection', errorHandler);
    process.on('uncaughtException', errorHandler);
    process.on('uncaughtExceptionMonitor', errorHandler);
}

export default error;