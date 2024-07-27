import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import hero from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import crimeHotspot from "../assets/crimehotspotslogo.svg";
import robot from "../assets/robot.svg";
import Chat from "./Chat";
import Loader from "./Loader";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] w-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-white">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
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
            {/* what does this code below actually do */}
            <span className="sr-only">SaferCommunity</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            {/* <img
              src={robot}
              width="30"
              height="30"
              alt="Logo"
              //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            /> */}
            <h2 className="text-xl text-[#7D9B76] hover:text-[#7D9B76] font-medium hover:underline underline-offset-4">
              Safety AI Chatbot
            </h2>

            <Link
              to="/crimehotspots"
              className="text-xl text-black hover:text-[#7D9B76] font-medium hover:underline underline-offset-4"
              prefetch="false"
            >
              Crime Hotspots
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-[80%] max-md:w-[100%] h-[calc(100dvh-56px)] mx-auto p-4">
        <Chat />
      </main>
    </div>
  );
}
