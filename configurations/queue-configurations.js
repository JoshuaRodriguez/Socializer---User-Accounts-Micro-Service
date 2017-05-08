/**
 * Declare queue configurations here 
 */

let tQueue = {
    "name": "tQueue",
    "options": {
        "forAsserting": {
            durable: true
        },
        "forSending": {

        },
        "forConsuming": {
            noAck: true
        }
    }
};

let tQueue2 = {
    "name": "tQueue2",
    "options": {
        "forAsserting": {
            durable: true
        },
        "forSending": {

        },
        "forConsuming": {
            noAck: true
        }
    }
};

let tQueue3 = {
    "name": "tQueue3",
    "options": {
        "forAsserting": {
            durable: true
        },
        "forSending": {

        },
        "forConsuming": {
            noAck: true
        }
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