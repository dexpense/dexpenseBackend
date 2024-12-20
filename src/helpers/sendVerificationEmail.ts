import nodemailer from "nodemailer";
export const sendVerificationEmail = async ({ email, otp }: any) => {
  try {
    const mail = process.env.MEXPENSE_GMAIL_ID || "";
    const mailpassword = process.env.MEXPENSE_GMAIL_PASSWORD || "";
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mail,
        pass: mailpassword,
      },
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transport.verify(function (error: any, success: any) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: {
        name: `MEXPENSE APP`,
        address: mail,
      },
      replyTo: email,
      to: email,
      subject: `Verify Your Email: Mail no ${Math.floor(
        Math.random() * 1000 + 1
      )}`,
      text: `Hello Dear ${email}!`,
      html: `<h2 style="text-align:center; color:blue;">Your OTP is ${otp}. Please use this OTP to Verify Your Email.</h2>`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailData, (err: any, info: any) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log("Email Sent: " + info.response);
          resolve(info);
        }
      });
    });
    return "Email sent successfully";
  } catch (error) {
    console.log(error);
  }
};
