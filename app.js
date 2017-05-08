/** 
 * Require express app instance, appConfiguration, queueConfigurations, and the messagingQueue
 */
require("dotenv").config();
let app = require("express")();
let mongoose = require("mongoose");
let queueConfigurations = require("./configurations/queue-configurations");
let messagingQueue = require("./messaging/messaging-queue");
let mongoDBConnection = null;

/**
 * Connect to Mongo DB
 */
mongoose.connect(process.env.MONGO_DB_DOCKER_URL);
mongoDBConnection = mongoose.connection;

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
        messagingQueue.assertQueue(tQueueConfig.name, tQueueConfig.options.forAsserting);
    })
    .then(() => {
        messagingQueue.sendToQueue(tQueueConfig.name, "hello", tQueueConfig.options.forSending);
    })
    .then(() => {
        messagingQueue.consumeFromQueue(tQueueConfig.Name, tQueueConfig.callBacks.consume, tQueueConfig.options.forConsuming);
    })
    .catch((err) => {
        console.error(err);
    });

module.exports = app;