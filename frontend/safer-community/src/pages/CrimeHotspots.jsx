import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/hero1.jpg";
import logo from "../assets/logo.png";
import crimeHotspot from "../assets/crimehotspotslogo.svg";
import robot from "../assets/robot.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Loader from "./Loader"; // Ensure this is the correct path to your Loader component
import axios from "axios";
import Footer from "@/components/ui/footer";

import {
  violentCrimeHotspots,
  propertyCrimeHotspots,
  drugWeaponHotspots,
  childRelatedHotspots,
} from "../../../../backend/data.js";

export default function Component() {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true); // State for managing loader visibility

  // Function to get GPS coordinates using Nominatim API
  const getCoordinates = async (area) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: area + ", Johannesburg, South Africa", // Ensure area context
            format: "json",
            limit: 1,
          },
        }
      );
      if (response.data.length > 0) {
        return {
          area,
          latitude: response.data[0].lat,
          longitude: response.data[0].lon,
        };
      } else {
        return { area, latitude: null, longitude: null };
      }
    } catch (error) {
      console.error(`Error fetching coordinates for ${area}:`, error);
      return { area, latitude: null, longitude: null };
    }
  };

  // Get coordinates for all hotspots
  const getAllHotspotCoordinates = async (hotspots) => {
    const promises = hotspots.map((area) => getCoordinates(area));
    const results = await Promise.all(promises);
    return results;
  };

  useEffect(() => {
    let map;

    console.log(violentCrimeHotspots);

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

          // Define colors for different crime types
          const crimeColors = {
            "Violent Crimes": "#f03",
            "Property Related Crimes": "#ff7800",
            "Drug and Weapon Related Crimes": "#800080",
            "Child Related Crime": "#0000ff",
          };

          const legend = L.control({ position: "bottomleft" });
          legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const categories = Object.keys(crimeColors);
            div.style.backgroundColor = "white";
            div.style.padding = "10px";
            div.style.borderRadius = "5px";

            // Add styles for the <i> elements
            const style = document.createElement("style");
            style.innerHTML = `
            .info.legend i {
              width: 15px;
              height: 15px;
              float: left;
              margin-right: 8px;
              opacity: 0.7;

            }
          `;
            document.head.appendChild(style);
            for (let i = 0; i < categories.length; i++) {
              div.innerHTML +=
                '<i style="background:' +
                crimeColors[categories[i]] +
                '"></i> ' +
                '<span style="color: black;">' +
                categories[i] +
                "</span><br>";
            }

            return div;
          };

          legend.addTo(map);

          // populate the map with crime hotspots

          getAllHotspotCoordinates(violentCrimeHotspots).then((coordinates) => {
            coordinates.forEach((location) => {
              if (location.latitude && location.longitude) {
                var circle = L.circle([location.latitude, location.longitude], {
                  color: "red",
                  fillColor: "#f03",
                  fillOpacity: 0.5,
                  radius: 500,
                }).addTo(map);
                circle.bindPopup("This is a Violent Crime Hotspot");
              }
            });
          });

          getAllHotspotCoordinates(propertyCrimeHotspots).then(
            (coordinates) => {
              coordinates.forEach((location) => {
                if (location.latitude && location.longitude) {
                  var circle = L.circle(
                    [location.latitude, location.longitude],
                    {
                      color: "orange",
                      fillColor: "#ff7800",
                      fillOpacity: 0.5,
                      radius: 500,
                    }
                  ).addTo(map);
                  circle.bindPopup("This is a Property Related Crime Hotspot");
                }
              });
            }
          );

          getAllHotspotCoordinates(drugWeaponHotspots).then((coordinates) => {
            coordinates.forEach((location) => {
              if (location.latitude && location.longitude) {
                var circle = L.circle([location.latitude, location.longitude], {
                  color: "purple",
                  fillColor: "#800080",
                  fillOpacity: 0.5,
                  radius: 500,
                }).addTo(map);
                circle.bindPopup(
                  "This is a Drug and Weapon Related Crime Hotspot"
                );
              }
            });
          });

          getAllHotspotCoordinates(childRelatedHotspots).then((coordinates) => {
            coordinates.forEach((location) => {
              if (location.latitude && location.longitude) {
                var circle = L.circle([location.latitude, location.longitude], {
                  color: "blue",
                  fillColor: "#0000ff",
                  fillOpacity: 0.5,
                  radius: 500,
                }).addTo(map);
                circle.bindPopup("This is a Child Related Crime Hotspot");
              }
            });
          });

          // Hide the loader once the map is successfully initialized
          setIsLoading(false);
        },
        function () {
          alert("Error in retrieving position.");
          setIsLoading(false); // Hide the loader even if there's an error
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoading(false); // Hide the loader if geolocation is not supported
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
            prefetch="false"
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
              prefetch="false"
            >
              Safety AI Chatbot
            </Link>
          </nav>
        </div>
      </header>
      <main>
        {isLoading && <Loader />} {/* Show loader while loading */}
        <div
          ref={mapRef}
          className="map"
          style={{ height: "500px", width: "100%" }}
        ></div>
      </main>
      <Footer />
    </div>
  );
}
