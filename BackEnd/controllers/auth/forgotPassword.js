import crypto from "crypto";
import userModel from "../../models/user.js";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../../utils/sendEmail.js";

// Quên mật khẩu - gửi OTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    // luôn trả về message giống nhau (security)
    if (!user) {
      return res.json({
        message: "Nếu email tồn tại, mã đã được gửi!",
      });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetOtp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    // gửi email bằng Resend
    await sendOtpEmail(email, otp);

    return res.json({
      message: "Đã gửi mã OTP qua email",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Xác thực OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user || user.resetOtp !== otp) {
      return res.status(400).json({
        message: "OTP không đúng",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        message: "OTP đã hết hạn",
      });
    }

    return res.json({
      message: "Xác thực thành công",
      isVerified: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Mật khẩu không khớp",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy user",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // reset OTP
    user.resetOtp = null;
    user.otpExpiry = null;

    // logout hết thiết bị
    user.refreshToken = null;

    await user.save();

    return res.json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};