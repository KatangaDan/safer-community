import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  // Handle button click
  const handleClick = () => {
    // Set loading to true when button is clicked
    setIsLoading(true);

    // Simulate an async operation, then reset loading state
    setTimeout(() => {
      setIsLoading(false);
      // Perform any additional actions after loading completes
    }, 2000); // Adjust time as needed
  };

  return (
    <div className="flex flex-col h-full bg-[#7D9B76] p-4">
      <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md">
        <div className="space-y-4 ">
          <div>
            <div className="text-sm font-semibold text-black">
              Safety AI Chatbot
            </div>
            <div className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl">
              Hey guys!
            </div>
          </div>
        </div>

        <div className="space-y-4 ">
          <div className=" flex flex-col items-end ">
            <div className="text-sm font-semibold text-black text-right">
              You
            </div>
            <div className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl ">
              I'm going to Sandton City tomorrow, is it safe?
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-4 space-x-2">
        <Input
          type="text"
          placeholder="Type a message..."
          className="w-full p-4 text-sm bg-white border rounded-full shadow-md text-black"
        />
        <Button
          className={`p-2 text-white rounded-full w-14 ${
            isLoading
              ? "bg-[#1F5014] cursor-not-allowed hover:bg-none"
              : "bg-[#1F5014] hover:border-white hover:bg-[#163f0d]"
          }`}
          onClick={handleClick}
        >
          {isLoading ? (
            <div className="loader"></div> // Loader is displayed when loading
          ) : (
            <SendIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
