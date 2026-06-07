// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import Category from "./models/CategoriesModel.js";
// import Course from "./models/CoursesModel.js";
// import Provider from "./models/ProvidersModel.js";

// const app = express();

// mongoose.connect("mongodb://localhost:27017/Edu-Flow").then(() => {
//   console.log("Connect to database successfully!");
// });

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());

// app.get("/categories", async (req, res) => {
//   try {
//     const categories = await Category.find();
//     return res.json({ message: "Success", data: categories });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// app.get("/courses-feature", async (req, res) => {
//   try {
//     const courses = await Course.find({ isActive: true, feature: true })
//       .populate({
//         path: "category_id",
//         select: "cate_name",
//       })
//       .populate({
//         path: "provider_id",
//         select: "provider_name",
//       })
//       .sort({ createdAt: -1 });

//     const result = courses.map((c) => ({
//       _id: c._id,
//       category: c.category_id?.cate_name,
//       provider: c.provider_id?.provider_name,
//       course_title: c.course_title,
//       image_url: c.image_url,
//       price: c.price,
//       price_promotion: c.price_promotion,
//       students: c.students,
//       feature: c.feature,
//     }));

//     return res.status(200).json({
//       message: "Lấy danh sách khóa học nổi bật thành công!",
//       total: result.length,
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// app.get("/providers", async (req, res) => {
//   try {
//     const providers = await Provider.find();
//     return res.json({ message: "success", data: providers });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routerUser from "./routes/user.js";
import routerLogin from "./routes/auth/login.js";
import routerRegister from "./routes/auth/register.js";
import routerChangePassword from "./routes/auth/changePassword.js";
import routerCategory from "./routes/category.js";
import routerProvider from "./routes/provider.js";
import routerCourse from "./routes/course.js";
import routerRefreshToken from "./routes/auth/refreshToken.js";
import routerForgotPassword from "./routes/auth/forgotPassword.js";
import routerLogout from "./routes/auth/logout.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Thiếu MONGODB_URI trong file .env");
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
  })
  .catch((error) => {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1);
  });

// Tài khoản
app.use("/", routerUser);

// Đăng nhập
app.use("/", routerLogin);

// Đăng ký
app.use("/", routerRegister);

// Đăng xuất
app.use("/", routerLogout);


// Đổi mật khẩu
app.use("/", routerChangePassword);

// Quên mật khẩu
app.use("/", routerForgotPassword);

// Danh mục
app.use("/", routerCategory);

// Nhà cung cấp
app.use("/", routerProvider);

// Khóa học
app.use("/", routerCourse);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Refresh token
app.use("/", routerRefreshToken);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
