/** 
 * Require express app instance, appConfiguration, queueConfigurations, and the messagingQueue
 */
let app = require('express')();
let appConfiguration = require('./configurations/app-configuration');
let queueConfigurations = require('./configurations/queue-configurations');
let exchangeConfigurations = require('./configurations/exchange-configurations');
let messagingQueue = require('./messaging/messaging-queue');

/**
 * Get testingQueue configuration
 */
let tQueueConfig = queueConfigurations.tQueue;

/**
 * Connect to docker container with RabbitMQ instance,
 * then create a channel, assert a queue, and finally consume from queue
 */
messagingQueue.connect(appConfiguration.dockerUrl, null)
.then((messagingQueueResponse) => {
    return messagingQueue.createChannel();
})
.then((messagingQueueResponse) => {
    return messagingQueue.assertQueue(tQueueConfig.name, tQueueConfig.assertionOptions);
})
.then((messagingQueueResponse) => {
    return messagingQueue.consumeFromQueue(tQueueConfig.Name, tQueueConfig.consumptionCallBack, tQueueConfig.consumptionOptions);
});

module.exports = app;