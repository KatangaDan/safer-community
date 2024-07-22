/**
 * v0 by Vercel.
 * @see https://v0.dev/t/KEQWsECidlR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Chat() {
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
              Im going to sandton city tommorrow, is it safe?
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
        <Button className="p-2 text-white bg-[#1F5014] rounded-full">
          <SendIcon className="w-6 h-6" />
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

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
