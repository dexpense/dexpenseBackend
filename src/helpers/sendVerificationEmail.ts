import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
export const sendVerificationEmail = async ({ email, otp }: any) => {
  try {
    const mail = process.env.MEXPENSE_GMAIL_ID;
    const mailpassword = process.env.MEXPENSE_GMAIL_PASSWORD;
    const transport = nodemailer.createTransport(
      smtpTransport({
        service: "gmail",
        auth: {
          user: mail,
          pass: mailpassword,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    const mailOptions = {
      from: mail,
      to: email,
      subject: `Verify Your Email: Mail no ${Math.floor(
        Math.random() * 1000 + 1
      )}`,
      text: `Your OTP is ${otp}`,
    };
    const mailResponse = await transport.sendMail(
      mailOptions,
      function (error: any, info: any) {
        if (error) {
          console.log("error", error);
        } else {
          console.log("Email Sent: " + info.response);
        }
      }
    );

    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
