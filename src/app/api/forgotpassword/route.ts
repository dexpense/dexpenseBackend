import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { sendForgotPasswordEmail } from "../../../helpers/forgotPasswordMailer";
import Otp from "../../../models/otp";
import User from "../../../models/user";
dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email }: any = reqBody;

    let data = await User.findOne({ email });

    const otp = Math.floor(Math.random() * 1000000 + 1);
    if (data) {
      let otpdata = new Otp({
        email: email,
        code: otp,
        expiresIn: new Date().getTime() + 300 * 1000,
      });

      await sendForgotPasswordEmail({ email, otp });

      await otpdata.save();
      return NextResponse.json(
        {
          message: "OTP Sent, Please check your Email",
          success: true,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User Email Not Found",
          success: false,
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
