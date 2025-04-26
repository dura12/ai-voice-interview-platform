"use client";

import Image from "next/image";
import { cn } from "@/lib/utils"; 
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
interface AgentProps {
  userName: string;

}

const Agent = ({ userName }: AgentProps) => {
  const callStatus = CallStatus.INACTIVE as CallStatus;
  const isSpeaking = true;
  const messages = [
    "Hello, how are you?",
    "I am here to help you with your interview preparation.",
  ];
  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null; 
  return (
    <>
      <div className="call-view">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="agent"
              width={65}
              height={54}
              className="object-cover" // Corrected typo: objet-cover -> object-cover
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>AI Interviewer </h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user-avatar"
              width={540} // Note: width/height seem large for a 120px size display
              height={540}
              className="object-cover rounded-full size-[120px]" // Corrected typo: objet-cover -> object-cover
            />
            <h3 className="text-center">{userName}</h3>
          </div>
        </div>
      </div>

      {/* Check if lastMessage exists before rendering */}
      {lastMessage && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage} // Using message content as key is okay for simple cases
              className={cn(
                "transition-opacity duration-500 opacity-0",
                "animate-fadeIn opacity-100" // Assuming animate-fadeIn class provides the desired effect
              )}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {/* Corrected condition: show button if NOT ACTIVE */}
        {callStatus !== CallStatus.ACTIVE ? (
          <button
            className="relative btn-call"
            onClick={() => { /* Original empty handler */ }}
          >
            {/* Corrected logic: Show ping animation ONLY when CONNECTING */}
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                 callStatus === CallStatus.CONNECTING ? "" : "hidden" 
              )}
            />

            <span className="relative">
              {/* Corrected condition: Use enum values for comparison */}
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                ? "Call"
                : ". . ."} {/* Text shown for CONNECTING state */}
            </span>
          </button>
        ) : (
           // Show End button ONLY when ACTIVE
          <button
            className="btn-disconnect"
            onClick={() => { /* Original empty handler */ }}
          >
            End
          </button>
        )}
      </div>
    </>
  );
};

export default Agent;