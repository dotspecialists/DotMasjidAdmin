"use client";
import { role } from "@/lib/data";
import { removeToken } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Masjids",
        href: "/list/masjids",
        visible: ["admin"],
      },
      {
        icon: "/announcement.png",
        label: "Prayers Time",
        href: "/list/prayers",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/student.png",
        label: "News",
        href: "/list/news",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/parent.png",
        label: "Programs",
        href: "/list/programs",
        visible: ["admin", "teacher"],
      },
      // {
      //   icon: "/subject.png",
      //   label: "Subjects",
      //   href: "/list/subjects",
      //   visible: ["admin"],
      // },
      // {
      //   icon: "/class.png",
      //   label: "Classes",
      //   href: "/list/classes",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/lesson.png",
      //   label: "Lessons",
      //   href: "/list/lessons",
      //   visible: ["admin", "teacher"],
      // },
      // {
      //   icon: "/exam.png",
      //   label: "Exams",
      //   href: "/list/exams",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/assignment.png",
      //   label: "Assignments",
      //   href: "/list/assignments",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/result.png",
      //   label: "Results",
      //   href: "/list/results",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/attendance.png",
      //   label: "Attendance",
      //   href: "/list/attendance",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
      // {
      //   icon: "/message.png",
      //   label: "Messages",
      //   href: "/list/messages",
      //   visible: ["admin", "teacher", "student", "parent"],
      // },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  const router = useRouter();
  const handleLogout = () => {
    // Remove token (clear cookie)
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC"; // Expiring the cookie

    // Redirect to login page after logout
    router.push("/login");
  };
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              if (item.label === "Logout") {
                return (
                  <button
                    onClick={() => {
                      if (item.label === "Logout") {
                        // removeToken();
                        handleLogout();
                        // router.push("/login");
                        // window.location.href = "/login";
                      }
                    }}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </button>
                );
              } else {
                return (
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.label === "Logout") {
                        removeToken();
                      }
                    }}
                    key={item.label}
                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                  >
                    <Image src={item.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              }
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
