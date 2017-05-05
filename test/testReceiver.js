let messagingQueue = require("../messaging/messaging-queue");
let queueConfigurations = require("../configurations/queue-configurations");

let tQueue = queueConfigurations["tQueue"];

let tQueueContent = "Need users now!";

messagingQueue.connect("amqp://localhost:32769", null)
.then(() => {
    return messagingQueue.createChannel();
})
.then(() => {
    return messagingQueue.assertQueue(tQueue.name, tQueue.assertionOptions);
})
.then(() => {
    return messagingQueue.sendToQueue(tQueue.name, tQueueContent, null);
});