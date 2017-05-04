/**
 * Required dependency on AMQPLIB 
 */
let messagingQueue = require('../messaging/messaging-queue');
let queueConfigurations = require('../configurations/queue-configurations');

let tQueue = queueConfigurations["tQueue"];
let tQueue2 = queueConfigurations["tQueue2"];

messagingQueue.connect("amqp://localhost:32769", null)
.then((messagingQueueResponse) => {
    return messagingQueue.createChannel();
})
.then((messagingQueueResponse) => {
    return messagingQueue.assertQueue(tQueue.name, tQueue.assertionOptions);
})
.then((messagingQueueResponse) => {
    return messagingQueue.checkQueue(tQueue2.name);
});