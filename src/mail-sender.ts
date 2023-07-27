// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');
import dotenv from 'dotenv';

dotenv.config();

interface MailOptions {
	targetEmail: string;
	content: string;
}

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: process.env.EMAIL,
		pass: process.env.PASSWORD_EMAIL,
		clientId: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		accessToken: process.env.ACCESS_TOKEN,
		refreshToken: process.env.REFRESH_TOKEN,
	},
});

const MailSender = {
	sendEmail: ({ targetEmail, content }: MailOptions): Promise<any> => {
		const message = {
			from: 'Notes App',
			to: targetEmail,
			subject: 'Export Notes',
			text: 'This is notes that you want.',
			attachments: [
				{
					filename: 'notes.json',
					content,
				},
			],
		};

		return transporter.sendMail(message);
	},
};

export default MailSender;
