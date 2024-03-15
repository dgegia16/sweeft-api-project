import nodemailer from 'nodemailer';

export type TMailBody = {
  from: string;
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail(mailBody: TMailBody) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env['MAIL_USER'] as string,
      pass: process.env['MAIL_PASS'] as string
    }
  });

  transporter.sendMail(mailBody, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
