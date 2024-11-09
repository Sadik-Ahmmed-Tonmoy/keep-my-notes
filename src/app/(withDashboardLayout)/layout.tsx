// "use client";
// import { ThemeSwitcher } from "@/components/ui/ThemeSwitcher";
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
// } from "@ant-design/icons";
// import { Layout, Menu } from "antd";
// import { useTheme } from "next-themes";
// import React, { useState } from "react";
// import { BsPerson } from "react-icons/bs";
// import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
// import { SlNotebook } from "react-icons/sl";

// const { Header, Sider, Content } = Layout;

// const MainLayout = ({ children }: { children: React.ReactNode }) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const { theme } = useTheme();
//   return (
//     <Layout className="h-screen">
//       <Sider
//         trigger={null}
//         collapsible
//         collapsed={collapsed}
//         className="bg-white dark:bg-dark-mode-bg dark:text-white"
//       >
//         <div className="demo-logo-vertical" />
//         <div className="pt-20">
//           <Menu
//             className="!border-none"
//             theme={theme == "dark" ? "dark" : "light"}
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             items={[
//               {
//                 key: "1",
//                 icon: <SlNotebook size={20} />,
//                 label: "Notes",
//               },
//               {
//                 key: "2",
//                 icon: <BsPerson size={20} />,
//                 label: "Profile",
//               },
//             ]}
//           />
//         </div>
//       </Sider>
//       <Layout>
//         <Header className="flex items-center gap-3 dark:text-white bg-white dark:bg-dark-mode-bg w-full !p-0">
//           <div
//             onClick={() => setCollapsed(!collapsed)}
//             className=" my-auto cursor-pointer"
//           >
//             {collapsed ? (
//               <RiMenuFold2Line size={25} />
//             ) : (
//               <RiMenuUnfold2Line size={25} />
//             )}
//           </div>
//           <ThemeSwitcher />
//         </Header>
//         <Content
//           className="bg-white dark:bg-dark-mode-bg dark:text-white p-2"
//           style={{
//             minHeight: 280,
//           }}
//         >
//           {children}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default MainLayout;

import SidebarDemo from '@/components/Dashboard/Dashboard';
import React from 'react';

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
       <SidebarDemo>
        {children}
       </SidebarDemo>
    </div>
  );
};

export default layout;
