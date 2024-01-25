require('dotenv').config();
const amqp = require('amqplib');
const InfluencerIdList = require("./influencer-id-list");

const message = JSON.stringify(InfluencerIdList);
const queueName = process.env.INFLUENCER_ID_QUEUE;

async function sendMessage() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    setInterval(async () => {
      await channel.sendToQueue(queueName, Buffer.from(message))
      console.log(`Message sent to RabbitMQ: ${message}`);
    }, 1000)
  } catch (error) {
    console.error('Error sending message:', error.message);
  }
}

sendMessage();
