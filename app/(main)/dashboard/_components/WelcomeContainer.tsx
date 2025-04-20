"use client";
import { userDetails } from "@/app/provider";
import Image from "next/image";
const WelcomeContainer = () => {
  const { user } = userDetails();
  return (
    <div>
      <div className=" bg-[rgb(16,23,39)] shadow-md rounded-md px-10 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">Welcome Back , {user?.name}</h2>
          <h2 className="text-blue-300">
            AI-Driven Interviews , Hiring Made Easy
          </h2>
        </div>
        <div>
          {user && (
            <Image src={user?.picture} alt="user" width={50} height={50} className="rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeContainer;
