/**
 * Required dependency on AMQPLIB 
 */
let amqp = require('amqplib');

/**
 * MessagingQueue constructor
 */
function MessagingQueue() {
    this.queues = [];
    this.exchanges = [];
    this.connection = null;
    this.channel = null;
};

/**
 * Connect to a RabbitMQ server
 * @param {String} url - Location of the RabbitMQ Server
 * @param {Object} socketOptions - Object containing socket options
 * @return {Promise} along with an object containing the connection object
 */
MessagingQueue.prototype.connect = function (url, socketOptions) {
    return amqp.connect(url, socketOptions)
        .then((connection) => {
            connection.on("error", (err) => {
                if (err.message !== "Connection closing") {
                    console.error("[AMQP] connection error", err.message);
                }
            });
            connection.on("close", (err) => {
                console.error("[AMQP] reconnecting", err.message);
                setTimeout(this.connect, 1000, url, socketOptions);
            });
            console.log("[AMQP] connected to " + url);
            this.connection = connection;
            return {
                connection: this.connection
            };
        });
}

MessagingQueue.prototype.createChannel = function () {
    return this.connection.createChannel()
        .then((channel) => {
            this.channel = channel;
            return {
                channel: this.channel
            };
        })
}

MessagingQueue.prototype.assertQueue = function (queueName, options) {
    return this.channel.assertQueue(queueName, options)
        .then((queue) => {
            this.queues.push(queue);
            return {
                channel: this.channel,
                queues: this.queues
            };
        })
}

MessagingQueue.prototype.consumeFromQueue = function (queueName, callBack, options) {
    this.channel.consume(queueName, callBack, options)
        .then((consumptionResponse) => {
            return {
                channel: this.channel,
                consumptionResponse: consumptionResponse
            }
        });
}

MessagingQueue.prototype.sendToQueue = function (queueName, content, options) {
    return this.channel.sendToQueue(queueName, Buffer.from(content), options)
}

MessagingQueue.prototype.assertExchange = function (exchangeName, type, options) {
    return this.channel.assertExchange(exchangeName, type, options)
        .then((exchange) => {
            this.exchanges.push(exchange);
            return {
                channel: this.channel,
                exchanges: this.exchanges
            };
        });
}

MessagingQueue.prototype.checkQueue = function (queueName) {
    return this.channel.checkQueue(queueName)
        .then((result) => {
            return {
                channel: this.channel,
                result: result
            }
        });
}

module.exports = new MessagingQueue();