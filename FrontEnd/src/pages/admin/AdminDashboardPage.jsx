import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const NAV_ITEMS = [
  {
    icon: "dashboard",
    label: "Dashboard",
    to: "/admin/dashboard",
    active: true,
    disabled: false,
  },
  {
    icon: "group",
    label: "Users",
    to: "/admin/users",
    active: false,
    disabled: false,
  },
  {
    icon: "co_present",
    label: "Providers",
    to: "#",
    active: false,
    disabled: true,
  },
  {
    icon: "school",
    label: "Courses",
    to: "#",
    active: false,
    disabled: true,
  },
  {
    icon: "category",
    label: "Categories",
    to: "#",
    active: false,
    disabled: true,
  },
  {
    icon: "settings",
    label: "Settings",
    to: "/security-settings",
    active: false,
    disabled: false,
  },
];

const KPI_CARDS = [
  {
    id: 1,
    icon: "payments",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary",
    badge: "+12.4%",
    badgeClass: "text-green-600 bg-green-100",
    label: "Gross Revenue",
    value: "$142,850",
  },
  {
    id: 2,
    icon: "group",
    iconBg: "bg-secondary-container/10",
    iconColor: "text-secondary",
    badge: "+8.1%",
    badgeClass: "text-green-600 bg-green-100",
    label: "Active Users",
    value: "24.5k",
  },
  {
    id: 3,
    icon: "pending_actions",
    iconBg: "bg-tertiary-container/10",
    iconColor: "text-tertiary",
    badge: "14 Pending",
    badgeClass: "text-amber-600 bg-amber-100",
    label: "Course Queue",
    value: "128",
  },
  {
    id: 4,
    icon: "report_problem",
    iconBg: "bg-error-container/20",
    iconColor: "text-error",
    badge: "High Priority",
    badgeClass: "text-error bg-error-container/40",
    label: "Open Tickets",
    value: "42",
  },
];

const USERS = [
  {
    id: 1,
    initials: "SM",
    initialsColor: "text-primary",
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    statusLabel: "Active",
    statusClass: "text-green-700 bg-green-100",
    dotClass: "bg-green-700",
    role: "Instructor",
    plan: "Pro Plus",
  },
  {
    id: 2,
    initials: "JR",
    initialsColor: "text-secondary",
    name: "James Rodrigo",
    email: "james.r@edu.com",
    statusLabel: "Flagged",
    statusClass: "text-amber-700 bg-amber-100",
    dotClass: "bg-amber-700",
    role: "Learner",
    plan: "Free",
  },
  {
    id: 3,
    initials: "LC",
    initialsColor: "text-tertiary",
    name: "Linda Chen",
    email: "lchen@global.net",
    statusLabel: "Active",
    statusClass: "text-green-700 bg-green-100",
    dotClass: "bg-green-700",
    role: "Admin",
    plan: "Enterprise",
  },
];

const MODERATION_QUEUE = [
  {
    id: 1,
    icon: "video_library",
    iconColor: "text-primary",
    title: "Advanced Neural Networks",
    subtitle: "By Prof. Elena Vance • 4h ago",
    primaryBtn: "Approve",
    secondaryBtn: "Review",
  },
  {
    id: 2,
    icon: "badge",
    iconColor: "text-secondary",
    title: "New Instructor: Marcus Aurelius",
    subtitle: "Verification required • 6h ago",
    primaryBtn: "Verify",
    secondaryBtn: "Hold",
  },
];

const PLATFORM_STATUS = [
  {
    label: "API Gateway",
    status: "99.9% Uptime",
    statusClass: "text-green-600",
    barClass: "bg-green-500",
    width: 100,
  },
  {
    label: "Video CDN",
    status: "Stable",
    statusClass: "text-green-600",
    barClass: "bg-green-500",
    width: 100,
  },
  {
    label: "Auth Service",
    status: "Latency +15ms",
    statusClass: "text-amber-600",
    barClass: "bg-amber-500",
    width: 65,
  },
];

const REVENUE_BARS = [
  { month: "Jan", height: 40, isCurrent: false, tooltip: "Jan: $42k" },
  { month: "Feb", height: 65, isCurrent: false, tooltip: "Feb: $68k" },
  { month: "Mar", height: 55, isCurrent: false, tooltip: "Mar: $59k" },
  { month: "Apr", height: 85, isCurrent: false, tooltip: "Apr: $92k" },
  { month: "May", height: 70, isCurrent: false, tooltip: "May: $78k" },
  {
    month: "Jun",
    height: 95,
    isCurrent: true,
    tooltip: "Jun (Forecast): $105k",
  },
];

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [hoveredRevBar, setHoveredRevBar] = useState(null);

  const username = user?.username || user?.fullName || user?.email || "Admin";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-low shadow-md flex flex-col py-[32px] gap-[16px] z-40">
        <div className="px-6 mb-8">
          <Link
            to="/admin/dashboard"
            className="font-headline-md text-headline-md font-bold text-primary"
          >
            EduFlow
          </Link>
          <p className="mt-1 text-xs text-on-surface-variant">
            Admin management
          </p>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-4">
          {NAV_ITEMS.map(({ icon, label, to, active, disabled }) =>
            disabled ? (
              <div
                key={label}
                className="flex cursor-not-allowed items-center gap-3 px-4 py-3 font-label-md text-label-md text-on-surface-variant/45"
                title="Coming soon"
              >
                <span className="material-symbols-outlined">{icon}</span>
                <span>{label}</span>
              </div>
            ) : (
              <Link
                key={label}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 font-label-md text-label-md transition-all group ${
                  active
                    ? "bg-primary-container/20 text-primary border-l-4 border-primary translate-x-1 duration-200"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${
                    !active ? "group-hover:text-primary" : ""
                  }`}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </Link>
            ),
          )}
        </nav>

        <div className="px-4 mt-auto">
          <div className="glass-card rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              {user?.avatarUrl ? (
                <img
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.avatarUrl}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary font-bold">
                  {username[0]?.toUpperCase() || "A"}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-label-md text-label-md text-on-surface font-bold">
                  {username}
                </p>
                <p className="text-xs capitalize text-on-surface-variant">
                  {user?.role || "admin"}
                </p>
              </div>
            </div>

            <Link
              to="/admin/users"
              className="block w-full rounded-lg bg-primary py-2 text-center font-label-sm text-label-sm text-on-primary transition-opacity hover:opacity-90"
            >
              Manage Users
            </Link>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-error transition-colors font-label-md text-label-md"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <header className="fixed top-0 right-0 left-64 h-16 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/30 z-30 shadow-sm">
        <div className="flex justify-between items-center h-full px-[40px] max-w-7xl mx-auto">
          <div className="flex items-center gap-[24px] flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant/50 rounded-full text-body-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                placeholder="Global system search..."
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-[16px] ml-[24px]">
            <div className="hidden md:flex items-center gap-[24px] mr-[24px]">
              {["Browse", "Mentors", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-on-surface-variant font-label-md text-label-md hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all scale-95 active:scale-90 relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
              </button>

              <button className="p-2 text-on-surface-variant hover:bg-surface-container rounded-full transition-all scale-95 active:scale-90">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>

              <Link
                to="/admin/users"
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:shadow-lg transition-all active:scale-95"
              >
                Manage Users
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main
        className="ml-64 pt-24 px-[40px] pb-12 max-w-7xl mx-auto transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <section className="mb-[32px] flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Platform Intelligence
            </h2>
            <p className="text-body-md text-on-surface-variant">
              System oversight for May 24, 2024
            </p>
          </div>

          <div className="flex gap-[8px]">
            <button className="flex items-center gap-2 px-4 py-2 glass-card rounded-lg font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                calendar_today
              </span>
              Last 30 Days
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-label-md text-label-md shadow-sm hover:shadow-md transition-all">
              <span className="material-symbols-outlined text-[20px]">
                download
              </span>
              Export Audit
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-[24px] mb-[32px]">
          {KPI_CARDS.map(
            ({
              id,
              icon,
              iconBg,
              iconColor,
              badge,
              badgeClass,
              label,
              value,
            }) => (
              <div
                key={id}
                className="glass-card p-[16px] rounded-xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 ${iconBg} rounded-lg`}>
                    <span className={`material-symbols-outlined ${iconColor}`}>
                      {icon}
                    </span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${badgeClass}`}
                  >
                    {badge}
                  </span>
                </div>

                <div>
                  <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    {label}
                  </p>
                  <h3 className="font-display text-[28px] text-on-surface font-bold mt-1">
                    {value}
                  </h3>
                </div>
              </div>
            ),
          )}
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px]">
          <div className="xl:col-span-2 glass-card rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-white/50">
              <h4 className="font-headline-md text-headline-md text-on-surface">
                Recent User Activity
              </h4>

              <Link
                to="/admin/users"
                className="text-primary font-label-md text-label-md hover:underline"
              >
                View All Users
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant">
                    {["User", "Status", "Role", "Plan", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-6 py-4 font-label-md text-label-md"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-outline-variant/20">
                  {USERS.map(
                    ({
                      id,
                      initials,
                      initialsColor,
                      name,
                      email,
                      statusLabel,
                      statusClass,
                      dotClass,
                      role,
                      plan,
                    }) => (
                      <tr
                        key={id}
                        className="hover:bg-primary-container/5 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center font-bold ${initialsColor} text-xs`}
                            >
                              {initials}
                            </div>

                            <div>
                              <p className="text-body-sm font-semibold text-on-surface">
                                {name}
                              </p>
                              <p className="text-[12px] text-on-surface-variant">
                                {email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-[12px] font-bold px-2 py-0.5 rounded-full ${statusClass}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${dotClass}`}
                            />
                            {statusLabel}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                          {role}
                        </td>

                        <td className="px-6 py-4 text-body-sm text-on-surface-variant">
                          {plan}
                        </td>

                        <td className="px-6 py-4">
                          <Link
                            to="/admin/users"
                            className="inline-flex p-1 hover:bg-surface-container rounded-lg transition-colors group-hover:text-primary"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              more_vert
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="xl:col-span-1 flex flex-col gap-[24px]">
            <div className="glass-card rounded-xl p-6">
              <h4 className="font-headline-md text-headline-md text-on-surface mb-[16px] flex items-center justify-between">
                Moderation Queue
                <span className="text-[12px] bg-primary text-on-primary px-2 py-1 rounded-full">
                  4 New
                </span>
              </h4>

              <div className="space-y-4">
                {MODERATION_QUEUE.map(
                  ({
                    id,
                    icon,
                    iconColor,
                    title,
                    subtitle,
                    primaryBtn,
                    secondaryBtn,
                  }) => (
                    <div
                      key={id}
                      className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-lg bg-white shadow-sm shrink-0 flex items-center justify-center">
                          <span
                            className={`material-symbols-outlined ${iconColor}`}
                          >
                            {icon}
                          </span>
                        </div>

                        <div className="flex-1">
                          <p className="font-label-md text-label-md text-on-surface font-bold">
                            {title}
                          </p>
                          <p className="text-xs text-on-surface-variant mb-3">
                            {subtitle}
                          </p>

                          <div className="flex gap-2">
                            <button className="flex-1 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-colors">
                              {primaryBtn}
                            </button>
                            <button className="flex-1 py-1.5 border border-outline-variant text-on-surface-variant rounded-lg text-xs font-bold hover:bg-surface-container-highest transition-colors">
                              {secondaryBtn}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              <button className="w-full mt-6 py-3 text-primary font-label-md text-label-md border-t border-outline-variant/30 hover:bg-primary/5 transition-colors">
                View All Moderation
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 bg-primary-container/10 border border-primary/20">
              <h5 className="font-label-md text-label-md text-primary font-bold mb-4 uppercase tracking-widest">
                Platform Status
              </h5>

              <div className="space-y-3">
                {PLATFORM_STATUS.map(
                  ({ label, status, statusClass, barClass, width }) => (
                    <div key={label}>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm text-on-surface">
                          {label}
                        </span>
                        <span
                          className={`text-[12px] font-bold ${statusClass}`}
                        >
                          {status}
                        </span>
                      </div>

                      <div className="w-full bg-surface-container rounded-full h-1.5 mt-1">
                        <div
                          className={`${barClass} h-1.5 rounded-full`}
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-[32px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            <div className="glass-card rounded-2xl p-8 relative overflow-hidden h-100">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h4 className="font-headline-md text-headline-md text-on-surface">
                    Revenue Growth
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    Real-time subscription and sales data
                  </p>
                </div>

                <div className="flex-1 flex items-end gap-3 pb-4">
                  {REVENUE_BARS.map(
                    ({ month, height, isCurrent, tooltip }, i) => (
                      <div
                        key={month}
                        title={tooltip}
                        onMouseEnter={() => setHoveredRevBar(i)}
                        onMouseLeave={() => setHoveredRevBar(null)}
                        className={`w-full rounded-t-lg transition-all cursor-help ${
                          isCurrent
                            ? "bg-primary shadow-[0_0_20px_rgba(53,37,205,0.3)]"
                            : hoveredRevBar === i
                              ? "bg-primary/40"
                              : "bg-primary-container/20"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>

                <div className="flex justify-between text-[12px] text-on-surface-variant font-medium px-1">
                  {REVENUE_BARS.map(({ month }) => (
                    <span key={month}>{month}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-[16px]">
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div className="p-3 bg-secondary-fixed rounded-xl w-fit">
                  <span className="material-symbols-outlined text-secondary">
                    star
                  </span>
                </div>

                <div>
                  <p className="text-on-surface-variant font-label-md text-label-md">
                    Avg Course Rating
                  </p>
                  <h5 className="font-display text-headline-lg text-on-surface mt-2">
                    4.82
                    <span className="text-body-sm font-normal text-on-surface-variant">
                      /5.0
                    </span>
                  </h5>

                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-amber-500 text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div className="p-3 bg-tertiary-fixed rounded-xl w-fit">
                  <span className="material-symbols-outlined text-tertiary">
                    conversion_path
                  </span>
                </div>

                <div>
                  <p className="text-on-surface-variant font-label-md text-label-md">
                    Conv. Rate
                  </p>
                  <h5 className="font-display text-headline-lg text-on-surface mt-2">
                    3.4%
                  </h5>
                  <p className="text-[12px] text-green-600 font-bold mt-1">
                    ↑ 0.8% this week
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between bg-on-surface text-surface">
                <div className="p-3 bg-surface/10 rounded-xl w-fit">
                  <span className="material-symbols-outlined text-surface">
                    database
                  </span>
                </div>

                <div>
                  <p className="text-surface-dim font-label-md text-label-md">
                    Storage Used
                  </p>
                  <h5 className="font-display text-headline-lg text-surface mt-2">
                    12.8 TB
                  </h5>

                  <div className="w-full bg-surface/20 rounded-full h-1.5 mt-2">
                    <div
                      className="bg-primary-fixed h-1.5 rounded-full"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                <div className="p-3 bg-error-container/20 rounded-xl w-fit">
                  <span className="material-symbols-outlined text-error">
                    bolt
                  </span>
                </div>

                <div>
                  <p className="text-on-surface-variant font-label-md text-label-md">
                    Peak Concurrent
                  </p>
                  <h5 className="font-display text-headline-lg text-on-surface mt-2">
                    1,842
                  </h5>
                  <p className="text-[12px] text-on-surface-variant mt-1">
                    Users currently online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}