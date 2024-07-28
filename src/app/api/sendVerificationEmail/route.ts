import dbConnect from "../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { sendVerificationEmail } from "../../../helpers/sendVerificationEmail";
import Otp from "../../../models/otp";

dbConnect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email }: any = reqBody;

    const otp = Math.floor(Math.random() * 1000000 + 1);

    let otpdata = new Otp({
      email: email,
      code: otp,
      expiresIn: new Date().getTime() + 300 * 1000,
    });

    await sendVerificationEmail({ email, otp });

    await otpdata.save();
    return NextResponse.json(
      {
        message: "OTP Sent, Please check your Email",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
