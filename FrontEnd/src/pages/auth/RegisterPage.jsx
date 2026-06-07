import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import { Form, Input, Button, message } from "antd";


export default function RegisterPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    const { email, password, username, confirmPassword } = values;

    setSubmitting(true);
    try {
      await register({ email, password, username, confirmPassword });

      message.success("Đăng ký thành công ✅");

      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err); // debug

      message.error(
        err.response?.data?.message || "Đăng ký thất bại"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background mesh-gradient min-h-screen flex flex-col">
      <main className="grow flex items-center justify-center py-stack-lg px-margin-mobile">
        <div className="w-full max-w-250 grid md:grid-cols-2 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden border border-outline-variant/20">
          {/* Branding Side */}
          <div className="hidden md:flex flex-col justify-between p-stack-lg bg-primary-container text-on-primary-container relative overflow-hidden">
            <div className="relative z-10">
              <span className="font-label-md text-label-md px-3 py-1 bg-on-primary-container/10 rounded-full inline-block mb-stack-md">
                Chào mừng bạn gia nhập [Tên Nền Tảng]
              </span>
              <h1 className="font-display text-display leading-tight mb-stack-md">
                Làm Chủ Tương Lai, Khóa Học Từng Bước.
              </h1>
              <p className="font-body-lg text-body-lg opacity-90 max-w-sm">
                Gia nhập hơn 50.000+ học viên, phát triển kỹ năng với sự hướng dẫn của các chuyên gia.
              </p>
            </div>

            <div className="relative z-10 space-y-stack-md">
              {[
                { icon: "verified", title: "Giảng Viên Đã Xác Minh", desc: "Chỉ học từ những chuyên gia giỏi nhất." },
                { icon: "history_edu", title: "Quyền Truy Cập Trọn Đời", desc: "Khóa học của bạn sẽ không bao giờ hết hạn." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex items-center gap-stack-md p-stack-md bg-white/5 rounded-lg border border-white/10 glass-card">
                  <span className="material-symbols-outlined text-on-primary-container bg-primary/20 p-2 rounded-lg">{icon}</span>
                  <div>
                    <p className="font-label-md text-label-md">{title}</p>
                    <p className="font-body-sm text-body-sm opacity-80">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <div className="p-stack-lg md:p-12 flex flex-col justify-center">
            <div className="mb-stack-lg">
              <h2 className="font-display text-headline-lg text-on-surface mb-2">Tạo tài khoản</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Nhập thông tin chi tiết để bắt đầu hành trình học tập.
              </p>
            </div>

            <Form
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
              className="space-y-4"
            >
              {/* USERNAME */}
              <Form.Item
                name="username"
                label={<span className="text-[12px]">Tên người dùng</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập username!" },
                ]}
              >
                <Input
                  placeholder="vd: phu123"
                  className="!h-[48px] !rounded-xl"
                />
              </Form.Item>

              {/* EMAIL */}
              <Form.Item
                name="email"
                label={<span className="text-[12px]">Địa chỉ Email</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="vd: abc@gmail.com"
                  className="!h-[48px] !rounded-xl"
                />
              </Form.Item>

              {/* PASSWORD */}
              <Form.Item
                name="password"
                label={<span className="text-[12px]">Mật khẩu</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  { min: 6, message: "Tối thiểu 6 ký tự!" },
                ]}
              >
                <Input.Password
                  placeholder="••••••••"
                  className="!h-[48px] !rounded-xl"
                />
              </Form.Item>

              {/* CONFIRM PASSWORD */}
              <Form.Item
                name="confirmPassword"
                label={<span className="text-[12px]">Xác nhận mật khẩu</span>}
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu không khớp!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="••••••••"
                  className="!h-[48px] !rounded-xl"
                />
              </Form.Item>

              {/* BUTTON */}
              <Button
                htmlType="submit"
                loading={submitting}
                className="!w-full !h-[48px] !rounded-xl !bg-primary !text-white"
              >
                Đăng ký
              </Button>

              {/* LOGIN */}
              <p className="text-center text-sm">
                Đã có tài khoản?
                <span
                  className="text-blue-600 hover:underline ml-1 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </span>
              </p>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}




