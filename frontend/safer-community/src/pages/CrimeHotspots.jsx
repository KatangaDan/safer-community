import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import crimeHotspot from "../assets/crimehotspotslogo.svg";
import robot from "../assets/robot.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Component() {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Create map centered around the current location
          map = L.map(mapRef.current).setView([latitude, longitude], 13);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(map);

          var marker = L.marker([latitude, longitude]).addTo(map);
          marker.bindPopup("You are here").openPopup();
          console.log("Latitude: " + latitude + ", Longitude: " + longitude);

          var dangerZones = [
            [-26.1386, 28.0873],
            [-26.1344, 28.104106],
            // Add more coordinate pairs here if needed
          ];

          dangerZones.forEach(function (coordinate) {
            var circle = L.circle(coordinate, {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.5,
              radius: 500,
            }).addTo(map);
            circle.bindPopup("This is a danger zone");
          });

          // Custom function to do something when the map is clicked on
          var popup2 = L.popup();

          function onMapClick(e) {
            popup2
              .setLatLng(e.latlng)
              .setContent("You clicked the map at " + e.latlng.toString())
              .openOn(map);
          }

          map.on("click", onMapClick);
        },
        function () {
          alert("Error in retrieving position.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-[100dvh] w-screen bg-white">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            to="#"
            className="flex items-center justify-center text-black hover:text-[#7D9B76]"
            prefetch={false}
          >
            <img src={logo} width="45" height="45" alt="Logo" />
            <span className="sr-only">SaferCommunity</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <img
              src={crimeHotspot}
              width="30"
              height="30"
              alt="Crime Hotspots"
            />
            <Link
              to="/home"
              className="text-xl text-black hover:text-[#7D9B76] font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Safety AI Chatbot
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <div>
          <div
            ref={mapRef}
            className="map"
            style={{ height: "500px", width: "100%" }}
          ></div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-black">
          &copy; 2024 SaferCommunity. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            to="#"
            className="text-xs hover:underline underline-offset-4 text-black"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            to="#"
            className="text-xs hover:underline underline-offset-4 text-black"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
