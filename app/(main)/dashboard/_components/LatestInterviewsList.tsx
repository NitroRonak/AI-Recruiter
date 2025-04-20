"use client";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useState } from "react";

const LatestInterviewsList = () => {
    const [interviewsList, setInterviewsList] = useState<any[]>([]);
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">Previously Created Interviews</h2>
      {
        interviewsList.length === 0 && (
            <div className="p-5 flex flex-col items-center gap-3 bg-[rgb(16,23,39)] rounded-md mt-5">
                <Camera className="h-10 w-10 text-blue-600"/>
                <h2 className="text-md">You have not created any interviews</h2>
                <Button className="mt-5">
                    Create New Interview
                </Button>
            </div>
        )
      }
    </div>
  )
}

export default LatestInterviewsList
