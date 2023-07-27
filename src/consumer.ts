import amqp, { Channel, Connection } from 'amqplib';
import dotenv from 'dotenv';
import Listener from './listener';

dotenv.config();

const init = async () => {
	const connection: Connection = await amqp.connect(
		process.env.RABBITMQ_SERVER as string,
	);
	const channel: Channel = await connection.createChannel();

	await channel.assertQueue('export:notes', { durable: true });

	channel.consume('export:notes', Listener.listen, { noAck: true });
};

init();
