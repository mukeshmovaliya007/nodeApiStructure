
let listenEmailQueue = async function () {  

    try {
        channel.ack(m);

    } catch (error) {
        channel.ack(m);
    }
}

module.exports = {
    listenEmailQueue
}