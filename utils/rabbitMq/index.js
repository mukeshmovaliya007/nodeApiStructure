const { listenEmailQueue } = require('./emailQueueListener');
const makeRabbitMQConnection = async () => {    

    listenEmailQueue();
};

makeRabbitMQConnection();