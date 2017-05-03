/**
 * Required depedency on AMQPLIB 
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

MessagingQueue.prototype.connect = function (url, socketOptions) {
    return amqp.connect(url, socketOptions)
        .then((connection) => {
            connection.on("error", (err) => {
                if (err.message !== "Connection closing") {
                    console.error("[AMQP] connection error", err.message);
                }
            });
            connection.on("close", (err) => {
                console.error("[AMQP] reconnecting");
                setTimeout(this.connect, 5000, url, socketOptions);
            });
            console.log("[AMQP] connected");
            this.connection = connection;
            return {
                connection: this.connection
            };
        }, (error) => {
            console.log(error);
        });
}

MessagingQueue.prototype.createChannel = function () {
    return this.connection.createChannel().then((channel) => {
        this.channel = channel;
        return {
            channel: this.channel
        };
    }, (error) => {
        console.log(error);
    });
}

MessagingQueue.prototype.assertQueue = function (queueName, options) {
    return this.channel.assertQueue(queueName, options)
        .then((queue) => {
            this.queues.push(queue);
            console.log(" [*] Waiting for messages in %s", queueName);
            return {
                channel: this.channel,
                queues: this.queues
            };
        }, (error) => {
            console.log(error);
        });
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
    this.channel.sendToQueue(queueName, new Buffer(content), options);
    return {
        channel: this.channel
    };
}

MessagingQueue.prototype.assertExchange = function (exhangeName, type, options) {
    return this.channel.assertExchange(exchangeName, type, options).then((exchange) => {
        this.exchanges.push(exchange);
        return {
            channel: this.channel,
            exchanges: this.exchanges
        };
    });
}

module.exports = new MessagingQueue();