import nodemailer from 'nodemailer';

export async function sendMail(usersEmail) {
  const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
      user: 'cami.the.developer@gmail.com',
      pass: process.env.GOOGLE_APP_PASSWORD
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"the health app team" <cami.the.developer@gmail.com>',
      to: usersEmail,
      subject: 'Login detected ',
      text: 'Someone just logged in to your health app account.',
      html: '<b>Someone just logged in to your health app  account.</b>'
    });

    console.log('Message sent:', info.messageId);
  } catch (err) {
    console.error('Error while sending mail:', err);
  }
}
