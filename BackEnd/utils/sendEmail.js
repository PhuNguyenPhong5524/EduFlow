import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
  await resend.emails.send({
    from: "EduFlow <onboarding@resend.dev>",
    to: email,
    subject: "Mã OTP đặt lại mật khẩu",
    html: `
      <div style="font-family: Arial;">
        <h2>Đặt lại mật khẩu</h2>
        <p>Mã OTP của bạn là:</p>
        <h1 style="color: #1677ff;">${otp}</h1>
        <p>Mã có hiệu lực trong 2 phút!</p>
      </div>
    `,
  });
};