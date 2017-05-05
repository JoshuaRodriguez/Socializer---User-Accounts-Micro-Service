/**
 * Declare queue configurations here 
 */

let tQueue = {
    "name": "tQueue",
    "assertionOptions": {
        durable: true
    },
    "sendOptions": {

    },
    "consumptionOptions": {
        noAck: true
    },
    "consumptionCallBack": function (msg) {
        console.log(msg.content.toString());
    },
};

let tQueue2 = {
    "name": "tQueue2",
    "assertionOptions": {
        durable: true
    },
    "sendOptions": {

    },
    "consumptionOptions": {
        noAck: true
    },
    "consumptionCallBack": function (msg) {
        console.log(msg.content.toString());
    }
};

let tQueue3 = {
    "name": "tQueue3",
    "assertionOptions": {
        durable: true
    },
    "sendOptions": {

    },
    "consumptionOptions": {
        noAck: true
    },
    "consumptionCallBack": function (msg) {
        console.log(msg.content.toString());
    }
};

/**
 * Object that contains all queue configurations
 */

let queueConfigurations = {
    tQueue: tQueue,
    tQueue2: tQueue2,
    tQueue3: tQueue3
};

module.exports = queueConfigurations;