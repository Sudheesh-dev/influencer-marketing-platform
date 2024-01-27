import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';

@Injectable()
export class InfluencerStatisticsRMQService implements OnModuleInit {
  private readonly logger = new Logger(InfluencerStatisticsRMQService.name)
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private rabbitmqURL;
  private queueName;

  constructor(private readonly configService:ConfigService){
    this.rabbitmqURL = configService.get("INFLUENCER_STATISTICS_RMQ")
    this.queueName = configService.get("INFLUENCER_STATISTICS_QUEUE_NAME")
  }

  async onModuleInit() {
    try {
      this.connection = await amqp.connect(this.rabbitmqURL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.logger.log('Connected to Influencer Statistics RabbitMQ');
    } catch (error) {
      this.logger.error('Error connecting to RabbitMQ:', error);
      throw error
    }
  }

  async pushToQueue(message: string) {
    try {
      await this.channel.sendToQueue(this.queueName, Buffer.from(message), { persistent: true });
      this.logger.log(`Message sent to ${this.queueName}: ${message}`);
    } catch (error) {
      this.logger.error('Error pushing message to queue:', error);
      throw error
    }
  }

  async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
      this.logger.log('Connection to RabbitMQ closed');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection:', error);
      throw error
    }
  }
}

