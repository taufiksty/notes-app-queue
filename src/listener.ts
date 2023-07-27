import MailSender from './mail-sender';
import NotesService from './notes-service';

import { Message } from 'amqplib';

// interface Message {
// 	message: { content: string };
// }

const Listener = {
	listen: async (message: Message | null): Promise<void> => {
		try {
			if (message) {
				const { userId, targetEmail } = JSON.parse(message.content.toString());

				const notes = await NotesService.getNotes({ userId });
				const result = await MailSender.sendEmail({
					targetEmail,
					content: JSON.stringify(notes),
				});

				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}
	},
};

export default Listener;
