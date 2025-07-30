"use client";
import React, { useState } from "react";


import { cn } from "@/lib/utils";
import {
  IconArchive,
  IconCategory,
  IconFolder,
  IconHeart,
  IconHistory,
  IconShare,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";

export default function SidebarDemo({
  children,
}: {
  children: React.ReactNode;
}) {

  const links = [
    {
      label: "Categories",
      href: "#",
      icon: (
        <IconCategory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "My Files",
      href: "#",
      icon: (
        <IconFolder className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Favorites",
      href: "#",
      icon: (
        <IconHeart className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Starred",
      href: "#",
      icon: (
        <IconStar className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Recent",
      href: "#",
      icon: (
        <IconHistory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Shared",
      href: "#",
      icon: (
        <IconShare className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },

    {
      label: "Archive",
      href: "#",
      icon: (
        <IconArchive className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Trash",
      href: "#",
      icon: (
        <IconTrash className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "  bg-gray-100 dark:bg-neutral-800 w-full   over",
        "h-screen w-full overflow-hidden"
      )}
    >
    

      <div className="flex flex-col md:flex-row w-full flex-1 mx-auto h-full">
        <div className="  overflow-hidden ">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
             
              <div className="px-6 mt-44">
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
              {/* <Sider trigger={null} collapsible collapsed={!open}>
                <Menu
                  // theme="light"
                  className="bgtra"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  items={[
                    {
                      key: "1",
                      icon: <UserOutlined />,
                      label: "nav 1",
                      children: [
                        {
                          key: "2",
                          icon: <VideoCameraOutlined />,
                          label: "nav 2",
                        },
                      ],
                    },
                    {
                      key: "3",
                      icon: <UploadOutlined />,
                      label: "nav 3",
                    },
                  ]}
                />
              </Sider> */}
              <div className=" px-6">
                <div>
                  <ThemeSwitcher />
                </div>
                <SidebarLink
                  link={{
                    label: "Manu Arora",
                    href: "#",
                    icon: (
                      <Image
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>
        <div className="w-full h-full overflow-hidden overflow-y-auto md:slim-scroll">
          {children}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Acet Labs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
