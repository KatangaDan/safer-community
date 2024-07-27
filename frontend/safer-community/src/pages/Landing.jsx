import { Link } from "react-router-dom";
import hero from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import crimeHotspot from "../assets/crimehotspotslogo.svg";
import robot from "../assets/robot.svg";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#"
            className="flex items-center justify-center text-black hover:text-[#7D9B76]"
            prefetch="false"
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
            <a
              href="#about"
              className="text-xl text-black hover:text-[#7D9B76] font-medium hover:underline underline-offset-4"
            >
              About
            </a>
            <a
              href="#features"
              className="text-xl text-black hover:text-[#7D9B76] cursor-pointer font-medium hover:underline underline-offset-4"
            >
              Features
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1  bg-white">
        <section id="about" className="w-full py-12 sm:py-16 md:py-12 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl text-black font-bold tracking-tighter sm:text-5xl xl:text-6xl/none ">
                    Welcome to SaferCommunity
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl">
                    Worried about the safety of a city you are travelling to?
                    Our innovative app enhances community safety with advanced
                    features designed to keep you informed and connected.
                  </p>
                </div>
                <Link
                  to="/home"
                  className="inline-flex h-10 items-center justify-center rounded-md hover:scale-105 text-white hover:text-white bg-[#7D9B76] px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-[#7D9B76]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch="false"
                >
                  Get Started
                </Link>
              </div>
              <img
                src={hero}
                width="999"
                height="999"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 sm:py-16 md:py-12 lg:py-12 bg-muted "
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-black tracking-tighter sm:text-5xl">
                  Protecting neighborhoods, one app at a time.
                </h2>
                <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Leveraging the power of technology to provide a comprehensive
                  safety net for all. Our goal is to empower you with the tools
                  and information you need to proactively protect yourself and
                  those around you.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-1">
                <img
                  src={crimeHotspot}
                  width="30"
                  height="30"
                  alt="Logo"
                  //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
                <h3 className="text-xl font-bold text-black">
                  Visualize Crime Hotspots
                </h3>
                <p className="text-gray-700">
                  See real-time interactive maps highlighting crime hotspots in
                  your area to plan safer routes and stay informed.
                </p>
              </div>
              <div className="grid gap-1">
                <img
                  src={robot}
                  width="30"
                  height="30"
                  alt="Logo"
                  //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
                <h3 className="text-xl font-bold text-black">
                  Safety AI Chatbot
                </h3>
                <p className="text-gray-700">
                  Our AI chatbot provides support and information on crime and
                  related trauma, offering guidance and resources whenever you
                  need them.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 SaferCommunity. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-white"
            prefetch="false"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-white"
            prefetch="false"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
