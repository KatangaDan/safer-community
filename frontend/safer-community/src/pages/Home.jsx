import { Link } from "react-router-dom";
import hero from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import crimeHotspot from "../assets/crimehotspotslogo.svg";
import robot from "../assets/robot.svg";
import Chat from "./Chat";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex items-center justify-center text-black hover:text-[#7D9B76]"
            prefetch={false}
          >
            <img
              src={logo}
              width="45"
              height="45"
              alt="Logo"
              //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
            <span className="sr-only">SaferCommunity</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <img
              src={robot}
              width="30"
              height="30"
              alt="Logo"
              //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
            <Link
              to="/crimehotspots"
              className="text-xl text-black hover:text-[#7D9B76] font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Crime Hotspots
            </Link>
          </nav>
        </div>
      </header>

      <main className=""></main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 SaferCommunity. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
