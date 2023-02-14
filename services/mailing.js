const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'birrappmt@gmail.com', // generated ethereal user
    pass: 'bdqhktfamztnchwe', // generated ethereal password
  },
  tls:{
      rejectUnauthorized: false
  },
});

class EmailService {

	static async sendEmail(to, subject, html) {
		try {
			const emailSended = await transporter.sendMail({
				from: 'BirrApp <no-remplay@correo.com>',
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