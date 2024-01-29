
## Table of Contents

- [Overview](#overview)
- [Running the Applications](#running-the-applications)

## Overview

The application consists of two parts:

1. **Producer Application (RMQ):**
   - A Node.js script that publishes messages to a RabbitMQ queue.
   - Includes a Docker Compose file to create the RabbitMQ instance and run the producer script.
   - Docker Compose file will also create a second instance of RMQ where the sync-data-service will publish the processed messages.
   - Located in the `rmq` folder.

2. **Consumer Application (Sync Data Service):**
   - A NestJS application that consumes messages from the RabbitMQ queue and processes them and pushes the data to a second RMQ.
   - Located in the `sync-data-service` folder.


## Setup

### Producer Application Setup

To set up the Producer Application (RMQ):

1. **Install Docker:**
   - Install Docker on your system if not already installed.

2. **Run RabbitMQ and Producer Script:**
   - Navigate to the `rmq` folder.
   - Run the following command to start RabbitMQ and run the producer script:
     ```bash
     docker-compose up
     ```

### Consumer Application Setup

To set up the Consumer Application (Sync Data Service):

1. **Install Dependencies:**
   - Navigate to the `sync-data-service` folder.
   - Run the following command to install dependencies:
     ```bash
     npm install
     ```

2. **Start the Application:**
   - Run the following command to start the application:
     ```bash
     npm start
     ```
   - Once the application is up and running, it will subscribe to the messages from RMQ and will start processsig them.

## Dependencies

- **Node.js**
- **Docker**