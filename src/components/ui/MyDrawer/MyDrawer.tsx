"use client";
import { cn } from "@/lib/utils";
import { MenuFoldOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./MyDrawer.css";

const MyDrawer = ({
  title,
  className,
  isOpen = null,
  children,
}: {
  title?: string;
  className?: string;
  isOpen?: boolean | null;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen !== null) {
      setOpen(isOpen);
    }
  }, [isOpen]);
  return (
    <div className={cn("text-black dark:text-white", className)}>
      <div className="ps-5">
        <MenuFoldOutlined onClick={showDrawer} />
      </div>
      <Drawer
        placement="left"
        width="90%"
        closeIcon={false}
        onClose={onClose}
        open={open}
        extra={
          <Button onClick={onClose}>
            <IoMdClose size={25} />
          </Button>
        }
      >
        <div className="m-2 flex justify-between items-center">
          <div>{title && <h5 className="ps-2">{title}</h5>}</div>

          <Button className=" m-2" onClick={onClose}>
            <IoMdClose size={18} />
          </Button>
        </div>
       <div className="">
       {children}
       </div>
      </Drawer>
    </div>
  );
};

export default MyDrawer;
