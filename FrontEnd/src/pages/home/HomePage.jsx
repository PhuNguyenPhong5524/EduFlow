import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  getCategories,
  getFeatureCourses,
  getProviders,
} from "../../services/homeService";

// Map icon_key from DB to Material Symbol names
const ICON_MAP = {
  web: "public",
  data: "analytics",
  mobile: "smartphone",
  language: "code",
  game: "sports_esports",
};
import { Dropdown, Avatar, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "../../contexts/AuthContext";
import { Modal } from "antd";

// Rotating bg colors for category small cards
const CATEGORY_BG = [
  "bg-secondary-container text-on-secondary-container",
  "bg-tertiary-container text-on-tertiary-container",
  "bg-surface-container-high text-on-surface",
  "bg-primary-container/30 text-primary",
];

function formatPrice(price) {
  if (price === 0) return "Miễn phí";
  return price.toLocaleString("vi-VN") + "₫";
}

// Skeleton loaders
function CourseSkeleton() {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 flex flex-col animate-pulse">
      <div className="aspect-video bg-surface-container" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-4 bg-surface-container rounded w-3/4" />
        <div className="h-3 bg-surface-container rounded w-1/2" />
        <div className="h-5 bg-surface-container rounded w-1/4 mt-auto" />
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="rounded-3xl h-47 bg-surface-container animate-pulse" />
  );
}

function ProviderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-outline-variant/30 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-surface-container" />
      <div className="h-4 bg-surface-container rounded w-24" />
      <div className="h-3 bg-surface-container rounded w-16" />
    </div>
  );
}

export default function HomePage() {
  const mainRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [loadingProv, setLoadingProv] = useState(true);

  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data.data))
      .catch(console.error)
      .finally(() => setLoadingCat(false));

    getFeatureCourses()
      .then(({ data }) => setCourses(data.data))
      .catch(console.error)
      .finally(() => setLoadingCourse(false));

    getProviders()
      .then(({ data }) => setProviders(data.data))
      .catch(console.error)
      .finally(() => setLoadingProv(false));
  }, []);

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add(
        "transition-all",
        "duration-1000",
        "opacity-0",
        "translate-y-8",
      );
      observer.observe(section);
    });

    // Hero is already in view
    const hero = container.querySelector("section");
    if (hero) {
      hero.classList.remove("opacity-0", "translate-y-8");
      hero.classList.add("opacity-100", "translate-y-0");
    }

    return () => observer.disconnect();
  }, []);


  
const { user, logout } = useAuth(); 
const navigate = useNavigate();


const menuItems = user
? [
    {
      key: "change-password",
      label: "Đổi mật khẩu",
      onClick: () => navigate("/change-password"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Đăng xuất",
      danger: true,
      onClick: () => {
        Modal.confirm({
        title: "Bạn muốn đăng xuất?",
        onOk: logout,
      });
      }

    },
  ]
: [
    {
      key: "login",
      label: "Đăng nhập",
      onClick: () => navigate("/login"),
    },
    {
      key: "register",
      label: "Đăng ký",
      onClick: () => navigate("/register"),
    },
  ];



  return (
    <div className="bg-background text-on-surface font-body-md">
      {/* ── Top Navigation Bar ── */}
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm">
        <div className="flex items-center justify-between px-margin-desktop h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-stack-lg">
            <a
              className="font-headline-md text-headline-md font-bold text-primary"
              href="#"
            >
              EduFlow
            </a>
            <nav className="hidden md:flex gap-6 items-center">
              <a
                className="font-label-md text-label-md text-primary border-b-2 border-primary pb-1"
                href="#"
              >
                Browse
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                href="#"
              >
                My Courses
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                href="#"
              >
                Instructors
              </a>
              <a
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors duration-200"
                href="#"
              >
                Resources
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center bg-surface-container px-4 py-2 rounded-full gap-2 border border-outline-variant/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <span className="material-symbols-outlined text-on-surface-variant">
                search
              </span>
              <input
                className="bg-transparent border-none focus:ring-0 text-body-sm w-48 outline-none"
                placeholder="Search courses..."
                type="text"
              />
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-primary-container/10 rounded-full transition-colors active:scale-95">
                <span className="material-symbols-outlined text-on-surface-variant">
                  shopping_cart
                </span>
              </button>
              <button className="p-2 hover:bg-primary-container/10 rounded-full transition-colors active:scale-95">
                <span className="material-symbols-outlined text-on-surface-variant">
                  notifications
                </span>
              </button>
            </div>

            {/* <div className="hidden sm:flex items-center gap-3 ml-2">
              <Link
                to="/login"
                className="font-label-md text-label-md text-primary px-4 py-2 hover:bg-primary-container/10 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="font-label-md text-label-md bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg shimmer-btn shadow-md active:scale-95 transition-transform"
              >
                Get Started
              </Link>
            </div> */}

            <div className="hidden sm:flex items-center gap-3 ml-2">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="font-label-md text-label-md text-primary px-4 py-2 border-[0.5px] p-5 hover:bg-primary-container/10 rounded-lg"
                  >
                    Sign In
                  </Link>
{/* 
                  <Link
                    to="/register"
                    className="font-label-md bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg"
                  >
                    Get Started
                  </Link> */}
                </>
              ) : (
                <Dropdown
                  menu={{ items: menuItems }}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-primary-container/10 px-3 py-2 rounded-lg transition">
                    
                    <Avatar
                      style={{ backgroundColor: "#1677ff" }}
                    >
                      {user.username?.charAt(0).toUpperCase()}
                    </Avatar>

                    <span className="text-sm font-medium">
                      {user.username}
                    </span>

                    <DownOutlined className="text-xs" />
                  </div>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>

      <main ref={mainRef} className="pt-16">
        {/* ── Hero Section ── */}
        <section className="relative min-h-217.5 flex items-center justify-center hero-gradient px-margin-mobile md:px-margin-desktop overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="max-w-4xl w-full text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-bounce">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <span className="font-label-sm text-label-sm text-primary tracking-wide">
                TRUSTED BY 2M+ LEARNERS
              </span>
            </div>

            <h1 className="font-display text-display mb-8 leading-[1.1]">
              Unlock Your Potential with{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-tertiary">
                Expert-Led
              </span>{" "}
              Courses
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 opacity-90">
              Master new skills from the world&apos;s top instructors. Flexible
              learning designed to help you reach your professional goals and
              artistic dreams.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto glass-card p-2 rounded-2xl shadow-xl">
              <div className="flex items-center flex-1 w-full px-4 gap-3">
                <span className="material-symbols-outlined text-on-surface-variant">
                  search
                </span>
                <input
                  className="w-full bg-transparent border-none focus:ring-0 text-body-md py-3 outline-none"
                  placeholder="What do you want to learn today?"
                  type="text"
                />
              </div>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-primary text-on-primary font-label-md text-label-md rounded-xl shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
                Browse Catalog
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
              <span className="font-label-md flex items-center gap-2 italic">
                Trusted by
              </span>
              <span className="font-headline-md font-extrabold tracking-tighter">
                CLOUDSTRAT
              </span>
              <span className="font-headline-md font-extrabold tracking-tighter">
                NEXUS_AI
              </span>
              <span className="font-headline-md font-extrabold tracking-tighter">
                VANTAGE
              </span>
            </div>
          </div>
        </section>

        {/* ── Categories Bento Grid ── */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-stack-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-2">
                Explore Popular Categories
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Tailored paths for your personal growth.
              </p>
            </div>
            <a
              className="text-primary font-label-md hover:underline flex items-center gap-1 group"
              href="#"
            >
              View All{" "}
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* First category — large featured card */}
            {loadingCat ? (
              <div className="md:col-span-2 md:row-span-2 rounded-3xl h-100 bg-surface-container animate-pulse" />
            ) : categories[0] ? (
              <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl h-100">
                <img
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxGqrFq_Mfu9T8YiROyyrbmtZm-_Wj7hc5oYF11sFeWzJPyiKLsP32MjnSGoh2gh3AmJRZ1H3QTD7jig8nJX-M8nviNPQ250dVTn4i49l2YYQ3GHMIysMY7kL6oNDmrRysoeedKE7drmo5nGsIE5GgZuEzHrBprufhH2wqQZpf9OJt9hBFr-27W8SLATM1h8GUVnVTWpoDlXiDHwkQ4wf8jKUYPettxSZ4YE4SrwMPY0HfAjbAQP-Tr4ImqJFEn4050Qtddr9Yk_c"
                  alt={categories[0].cate_name}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4 inline-block">
                    {categories[0].quantity}+ COURSES
                  </span>
                  <h3 className="font-headline-lg text-headline-lg mb-2">
                    {categories[0].cate_name}
                  </h3>
                </div>
              </div>
            ) : null}

            {/* Remaining categories — small cards */}
            {loadingCat
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CategorySkeleton key={i} />
                ))
              : categories.slice(1).map((cat, i) => (
                  <div
                    key={cat._id}
                    className={`group relative overflow-hidden rounded-3xl h-47 ${CATEGORY_BG[i % CATEGORY_BG.length]}`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <span className="material-symbols-outlined text-[120px]">
                        {ICON_MAP[cat.icon_key] ?? "school"}
                      </span>
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="font-headline-md text-headline-md mb-1">
                        {cat.cate_name}
                      </h3>
                      <p className="opacity-80 text-label-sm">
                        {cat.quantity} khóa học
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* ── Trending Courses ── */}
        <section className="py-stack-lg bg-surface-container-low">
          <div className="px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-headline-lg text-headline-lg mb-3">
                Trending Courses
              </h2>
              <p className="font-body-md text-on-surface-variant">
                The most highly-rated sessions this month.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {loadingCourse
                ? Array.from({ length: 4 }).map((_, i) => (
                    <CourseSkeleton key={i} />
                  ))
                : courses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 hover:shadow-xl transition-all group flex flex-col"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={course.image_url}
                          alt={course.course_title}
                        />
                        {course.price_promotion !== null && (
                          <div className="absolute top-3 left-3 px-2 py-1 bg-error text-on-error rounded-lg font-label-sm text-[10px] tracking-wider uppercase">
                            Sale
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h4 className="font-headline-md text-[16px] mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {course.course_title}
                        </h4>
                        <p className="text-on-surface-variant font-body-sm mb-1">
                          {course.provider}
                        </p>
                        <p className="text-on-surface-variant/60 font-body-sm mb-4 text-[12px]">
                          {course.students.toLocaleString()} học viên
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <div>
                            <span className="font-headline-md text-[18px] text-primary">
                              {course.price_promotion !== null
                                ? formatPrice(course.price_promotion)
                                : formatPrice(course.price)}
                            </span>
                            {course.price_promotion !== null && (
                              <span className="ml-2 text-[12px] text-on-surface-variant line-through">
                                {formatPrice(course.price)}
                              </span>
                            )}
                          </div>
                          <button className="p-2 bg-surface-container-highest rounded-full hover:bg-primary hover:text-white transition-colors">
                            <span className="material-symbols-outlined">
                              add_shopping_cart
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* ── Providers / Instructors ── */}
        <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-stack-lg">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-2">
                Gặp gỡ Giảng viên
              </h2>
              <p className="font-body-md text-on-surface-variant">
                Học từ những chuyên gia hàng đầu trong ngành.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-gutter">
            {loadingProv
              ? Array.from({ length: 5 }).map((_, i) => (
                  <ProviderSkeleton key={i} />
                ))
              : providers.slice(0, 10).map((prov) => (
                  <div
                    key={prov._id}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-surface border border-outline-variant/30 hover:shadow-md hover:border-primary/30 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-high flex items-center justify-center ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all">
                      {prov.images?.[0] ? (
                        <img
                          src={prov.images[0]}
                          alt={prov.provider_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="material-symbols-outlined text-primary text-[32px]">
                          person
                        </span>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-label-md text-label-md text-on-surface line-clamp-2">
                        {prov.provider_name}
                      </p>
                      <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 line-clamp-1">
                        {prov.career}
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image side */}
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHjU2BZjfifAdbPFWwDY-kCGukHLKy_AgVQzSCFh20IdG2eZkWsbIpO92lTa9_3Q8Smlmb21e6AJzfnmLoNnxp526DYVrCW6XBkWd3cXW4bvQroqJf9ObRuhbgZ7NuGyvzEHux0L4pQnYpX2UQgH8sooW584JSqFmM6Qqusva3Tz9mcHZhO1nggVYjc-GqESFqXRSSO2PeySf7H8b24L95ICHiyLlWjiHjUyWMXlhw7sjElZseiYwqD0OQi8fbHGtd4rIQ5Hsab74"
                  alt="Professional woman learning with headphones"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-tertiary-container/20 rounded-full blur-2xl" />
              {/* Floating stat card */}
              <div className="absolute bottom-10 right-10 glass-card p-6 rounded-2xl shadow-xl z-20">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-[32px]">
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <p className="font-headline-md text-headline-md text-primary">
                      15,000+
                    </p>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Certified Students
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="lg:w-1/2">
              <h2 className="font-headline-lg text-headline-lg mb-6">
                Why EduFlow is the #1 Choice for Digital Learning
              </h2>
              <p className="font-body-md text-on-surface-variant mb-10">
                We believe in quality over quantity. Our platform is curated by
                industry experts to ensure you&apos;re learning the most
                relevant skills for today&apos;s market.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: "school",
                    title: "Elite Instructors",
                    desc: "Learn from professionals currently working at Google, Apple, and Netflix.",
                  },
                  {
                    icon: "all_inclusive",
                    title: "Lifetime Access",
                    desc: "Buy once, learn forever. Get all future updates to the course at no extra cost.",
                  },
                  {
                    icon: "groups",
                    title: "Private Community",
                    desc: "Join exclusive Discord channels for networking and collaborative learning.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 group">
                    <div className="mt-1 shrink-0 w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[20px] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-on-surface-variant font-body-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="py-24 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto bg-inverse-surface rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="font-display text-[40px] text-inverse-on-surface mb-6 leading-tight">
                  Ready to start your professional journey?
                </h2>
                <p className="font-body-lg text-white/70 mb-8">
                  Join 2 million learners and start building your future today
                  with 7 days of free premium access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md shadow-xl hover:shadow-primary/40 transition-all hover:-translate-y-0.5 text-center"
                  >
                    Join Now for Free
                  </Link>
                  <button className="px-8 py-4 border border-white/20 text-white rounded-xl font-label-md text-label-md hover:bg-white/10 transition-all">
                    View All Plans
                  </button>
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="w-64 h-64 bg-linear-to-br from-primary to-tertiary rounded-[3rem] rotate-12 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-white text-[120px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    rocket_launch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="w-full py-stack-lg bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-7xl mx-auto gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              className="font-headline-md text-headline-md font-bold text-on-surface"
              href="#"
            >
              EduFlow
            </a>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs text-center md:text-left">
              Empowering learners worldwide through high-quality, accessible
              education platform.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-8">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Help Center",
              "Contact Us",
              "Careers",
            ].map((link) => (
              <a
                key={link}
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all hover:underline"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a
                className="text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">public</span>
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>
              <a
                className="text-on-surface-variant hover:text-primary transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">share</span>
              </a>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 EduFlow Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
