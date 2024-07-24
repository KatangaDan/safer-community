import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Chat() {
  // State to manage loading status
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [botMessages, setBotMessages] = useState([
    "Hey guys! I'm here to help you with any safety related questions within the Johannesburg area.",
  ]);

  useEffect(() => {
    console.log("BOT MESSAGES", botMessages); // This will log the botMessages state whenever it changes
  }, [botMessages]);

  useEffect(() => {
    console.log("USER MESSAGES", userMessages); // This will log the userMessages state whenever it changes
  }, [userMessages]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever botMessages or userMessages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botMessages, userMessages]);

  // Handle button click
  const handleClick = () => {
    // Get the user query
    const query = input;

    //clear the input field
    setInput("");

    //add the user message to the userMessages state
    setUserMessages([...userMessages, query]);

    // Set loading to true when button is clicked
    setIsLoading(true);

    //send the user query to the backend
    axios
      .post("http://localhost:3000/query", { query })
      .then((response) => {
        //hide the loader
        setIsLoading(false);

        //successful response
        if (response.status === 200) {
          console.log(response.data.response);

          //add the bot response to the botMessages state
          setBotMessages((prevMessages) => [
            ...prevMessages,
            response.data.response,
          ]);
        } else {
          console.log("Error");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  // Combine bot and user messages for rendering
  const messages = [];
  for (let i = 0; i < Math.max(botMessages.length, userMessages.length); i++) {
    if (i < botMessages.length) {
      messages.push({ type: "bot", text: botMessages[i] });
    }
    if (i < userMessages.length) {
      messages.push({ type: "user", text: userMessages[i] });
    }
  }

  // Function to process text
  const processText = (text) => {
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    const formattedText = boldText.replace(/\n/g, "<br>");
    return { __html: formattedText };
  };

  return (
    <div className="flex flex-col h-full bg-[#7D9B76] p-4">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md"
      >
        {/* ChatBot Message */}
        {/* <div className="space-y-4 ">
          <div>
            <div className="text-sm font-semibold text-black">
              Safety AI Chatbot
            </div>
            <div className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl">
              Hey guys! I'm here to help you with any safety related questions
              within the Johannesburg area.
            </div>
          </div>
        </div> */}

        {/* User Message */}
        {/* <div className="space-y-4 ">
          <div className=" flex flex-col items-end ">
            <div className="text-sm font-semibold text-black text-right">
              You
            </div>
            <div className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl ">
              I'm going to Sandton City tomorrow, is it safe?
            </div>
          </div>
        </div> */}

        <div className="space-y-4">
          {messages.map((message, index) =>
            message.type === "bot" ? (
              <div key={index}>
                <div className="text-sm font-semibold text-black">
                  Safety AI Chatbot
                </div>
                <div
                  className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl"
                  dangerouslySetInnerHTML={processText(message.text)}
                ></div>
              </div>
            ) : (
              <div key={index} className="flex flex-col items-end">
                <div className="text-sm font-semibold text-black text-right">
                  You
                </div>
                <div className="inline-block p-2 mt-1 text-sm text-white bg-[#1F5014] rounded-xl">
                  {message.text}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <Input
          type="text"
          value={input}
          placeholder="Type a message..."
          className="w-full p-4 text-sm bg-white border rounded-full shadow-md text-black"
          onChange={(e) => setInput(e.target.value)}
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
