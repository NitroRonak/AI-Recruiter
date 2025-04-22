"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import AI_RecruiterLogo from "@/assets/images/AI-Recruiter.png";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";

const StartInterview = () => {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState<boolean>(false);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY as string);

  useEffect(() => {
    interviewInfo && startInterview();
  }, [interviewInfo]);

  const startInterview = async () => {
    let questionList: string = "";
    interviewInfo?.interviewData?.questionList?.forEach(
      (item: any, index: number) => {
        questionList =
          item?.question + "  ,  Next Question is: " + questionList;
      }
    );
    console.log(questionList);
    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}? Let's get started!`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging-use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!" After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
.`.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions as any);
  };

  const stopInterview = () => {
    vapi.stop();
  };

  vapi.on("call-start", () => {
    console.log("Call has started");
    toast.success("Interview started successfully");
  });

  vapi.on("speech-start", () => {
    console.log("Assistant speech has started");
    setActiveUser(false);
  });
  vapi.on("speech-end", () => {
    console.log("Assistant speech has ended");
    setActiveUser(true);
  });

  vapi.on("call-end", () => {
    console.log("Call has ended");
    toast.success("Interview ended successfully");
  });

  const startMic = () => {
    
  }
    

  return (
    <div className="p-20 lg:px-48 xl:px-50 max-h-screen">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        AI Interview Session Started
        <span className="flex items-center gap-2 text-gray-400">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-[rgb(16,23,39)] rounded-md p-10 border border-gray-600 flex  flex-col items-center justify-center gap-2">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={AI_RecruiterLogo}
              alt="AI Interviewer"
              width={200}
              height={200}
              className="rounded-full object-contain"
            />
          </div>
          <h2 className="text-lg font-bold text-zinc-200">AI Recruiter</h2>
        </div>
        <div className="bg-[rgb(16,23,39)] rounded-md p-10 border border-gray-600 flex items-center justify-center">
          <div className="bg-gray-500 rounded-full w-[200px] h-[200px] flex items-center justify-center">
            <div className="relative">
              {activeUser && (
                <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
              )}
              <h2 className="text-lg font-bold text-zinc-200">
                {interviewInfo?.userName}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Mic className="h-12 w-12 bg-gray-500 p-3 rounded-full cursor-pointer" 
          onClick={startMic}
        />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="h-12 w-12 bg-red-500 p-3 rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-md font-bold mt-5 text-gray-500 text-center">
        Interview for {interviewInfo?.jobPosition} is in progress...
      </h2>
    </div>
  );
};
export default StartInterview;
