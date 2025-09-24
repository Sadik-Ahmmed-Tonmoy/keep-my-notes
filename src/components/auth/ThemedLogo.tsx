"use client";
import blackLogo from "@/assets/logo/blackLogo.png";
import whiteLogo from "@/assets/logo/whiteLogo.png";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const ThemedLogo = () => {
  const { theme } = useTheme();
  return (
    <>
      <Link href="/">
        <div>
          {theme === "dark" ? (
            <Image
              src={blackLogo}
              alt="logo"
              width={500}
              height={500}
              className="h-20 w-36 flex-shrink-0 "
            />
          ) : (
            <Image
              src={whiteLogo}
              alt="logo"
              width={500}
              height={500}
              className="h-20 w-36 flex-shrink-0 "
            />
          )}
        </div>
      </Link>
    </>
  );
};

export default ThemedLogo;
