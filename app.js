/** 
 * Require express app instance, appConfiguration, queueConfigurations, and the messagingQueue
 */
require("dotenv").config();
let app = require("express")();
let queueConfigurations = require("./configurations/queue-configurations");
let messagingQueue = require("./messaging/messaging-queue");

/**
 * Get testingQueue configuration
 */
let tQueueConfig = queueConfigurations.tQueue;

/**
 * Connect to docker container with RabbitMQ instance,
 * then create a channel, assert a queue, and finally consume from queue
 */
messagingQueue.connect(process.env.RABBIT_MQ_DOCKER_URL, null)
    .then(() => {
        return messagingQueue.createChannel();
    })
    .then(() => {
        return messagingQueue.assertQueue(tQueueConfig.name, tQueueConfig.assertionOptions);
    })
    .then(() => {
        return messagingQueue.consumeFromQueue(tQueueConfig.Name, tQueueConfig.consumptionCallBack, tQueueConfig.consumptionOptions);
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = app;