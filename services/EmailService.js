const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_TO_SEND, // generated ethereal user
    pass: process.env.PASS_OF_EMAIL_TO_SEND, // generated ethereal password
  },
  tls:{
      rejectUnauthorized: false
  },
});

class EmailService {

	static async sendEmail(to, subject, html) {
		try {
			const emailSended = await transporter.sendMail({
				from: 'Tablero Jiraiya <no-remplay@correo.com>',
				to,
				subject,
				html
			});

			return emailSended;
		} catch(error) {
			return error;
		}
	}
}

module.exports = EmailService;