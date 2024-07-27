import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer = () => {
  return (
    <footer className="bg-black flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="text-xs text-black">
        <p>&copy; {new Date().getFullYear()} SaferCommunity. All rights reserved.</p>
        <ul className="sm:ml-auto flex gap-4 sm:gap-6">
          <li>
            <Link
              to="/terms-of-service" // Updated with a sample path
              className="text-xs hover:underline underline-offset-4 text-white"
              prefetch="false" // Note: `prefetch` is not a standard Link attribute
            >
              Terms of Service
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy" // Updated with a sample path
              className="text-xs hover:underline underline-offset-4 text-white"
              prefetch="false" // Note: `prefetch` is not a standard Link attribute
            >
              Privacy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
