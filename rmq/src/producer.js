require('dotenv').config();
const amqp = require('amqplib');
const InfluencerIdList = require("./influencer-id-list");

const message = JSON.stringify({
  pattern:process.env.MESSAGE_PATTERN,
  data:InfluencerIdList
});
const queueName = process.env.INFLUENCER_ID_QUEUE_NAME;

async function sendMessage() {
  try {
    const connection = await amqp.connect(process.env.INFLUENCER_ID_RMQ);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    setInterval(async () => {
      await channel.sendToQueue(queueName, Buffer.from(message))
      console.log(`Message sent to RabbitMQ: ${message}`);
    }, 5000)
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

sendMessage();
