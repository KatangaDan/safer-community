import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import logo from "../assets/logo.png";
import destination from "../assets/destination.png";
import dui from "../assets/racing.png";

export default function Chat() {
  // State to manage loading status

  const maxChars = 200;

  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  // const [userMessages, setUserMessages] = useState([]);
  // const [botMessages, setBotMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [triggerClick, setTriggerClick] = useState(false);

  useEffect(() => {
    if (triggerClick) {
      handleClick();
      setTriggerClick(false);
    }
  }, [triggerClick]);

  // useEffect(() => {
  //   console.log("BOT MESSAGES", botMessages); // This will log the botMessages state whenever it changes
  // }, [botMessages]);

  // useEffect(() => {
  //   console.log("USER MESSAGES", userMessages); // This will log the userMessages state whenever it changes
  // }, [userMessages]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever botMessages or userMessages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle button click
  const handleClick = () => {
    console.log("CLICK");

    //hide the div with id recPrompts
    document.getElementById("recPrompts").style.display = "none";

    // Get the user query
    const query = input;

    //if the user query is empty, tell the user
    if (query === "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "Please type a query" },
      ]);

      return;
    }

    //clear the input field
    setInput("");

    //add the user message to the userMessages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: query },
    ]);

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
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: response.data.response },
          ]);
        } else {
          //add the error message to the botMessages state
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              type: "bot",
              text: "Sorry, an error occurred. Please try again later.",
            },
          ]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        //add the error message to the botMessages state
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            type: "bot",
            text: "Sorry, something went wrong on our side. Please try again later.",
          },
        ]);
      });
  };

  const handleTravelPrompt = () => {
    setInput("I am travelling to Sandton, what should I be careful for?");
    console.log("INPUT: ", input);
    setTriggerClick(true);
  };

  const handleDUIPrompt = () => {
    setInput("What are the most common areas of DUIs?");
    console.log("INPUT: ", input);
    setTriggerClick(true);
  };

  // Combine bot and user messages for rendering
  //const messages = [];
  // for (let i = 0; i < Math.max(botMessages.length, userMessages.length); i++) {
  //   if (i < userMessages.length) {
  //     messages.push({ type: "user", text: userMessages[i] });
  //   }
  //   if (i < botMessages.length) {
  //     messages.push({ type: "bot", text: botMessages[i] });
  //   }
  // }

  // Function to process text
  const processText = (text) => {
    const boldText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    const formattedText = boldText.replace(/\n/g, "<br>");
    return { __html: formattedText };
  };

  return (
    <div className="flex flex-col h-full bg-[#7D9B76] p-4 w-[100%]">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-md"
      >
        {/* Pre-Prompt Recomendations */}
        <div id="recPrompts" className="">
          <div className=" flex justify-center">
            <img
              src={logo}
              width="85"
              height="85"
              alt="Logo"
              //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
          <div className="flex flex-col">
            <div className="mx-auto max-w-5xl gap-6 lg:gap-12 py-4 flex flex-col items-center">
              <div
                className="gap-1 border border-gray-500 rounded-lg p-1 flex flex-col justify-center items-center w-[417px] h-[80px] hover hover:bg-[#e3fadb] cursor-pointer"
                onClick={handleTravelPrompt}
              >
                <img
                  src={destination}
                  width="30"
                  height="30"
                  alt="Logo"
                  //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
                <p className="text-gray-700 text-sm">
                  I am travelling to Sandton, what should I be careful for?
                </p>
              </div>
              <div
                className="flex flex-col justify-center items-center gap-1 border border-gray-500 rounded-lg p-1 w-[417px] h-[80px] hover hover:bg-[#e3fadb] cursor-pointer"
                onClick={handleDUIPrompt}
              >
                <img
                  src={dui}
                  width="40"
                  height="40"
                  alt="Logo"
                  //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                />
                <p className="text-gray-700 text-sm">
                  What are the most common areas of DUIs?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {messages.map((message, index) =>
            message.type === "bot" ? (
              <div key={index}>
                <div className="flex flex-row items-center">
                  <img
                    src={logo}
                    width="30"
                    height="30"
                    alt="Logo"
                    //className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                  />
                  <div className="text-sm font-semibold text-black">
                    Safety AI Chatbot
                  </div>
                </div>

                <div
                  className="inline-block p-2 mt-1 text-sm text-black bg-[#F6F6E9] rounded-xl border border-gray-500"
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
          onClick={() => setTriggerClick(true)}
          disabled={isLoading} // Disable the button when loading
        >
          {isLoading ? (
            <div className="btnloader"></div> // Loader is displayed when loading
          ) : (
            <SendIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
      <div className="text-xs text-white mt-2">
        {maxChars - input.length} characters remaining
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
