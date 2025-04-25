"use client";
import { FcGoogle } from "react-icons/fc";
import { FaMicrophoneAlt } from "react-icons/fa";
import { supabase } from "@/services/supabaseClient";
import { useState } from "react";
const page = () => {
  const [loading, setLoading] = useState(false)
  const signInWithGoogle = async() => {
    setLoading(true)
    const {error}=await supabase.auth.signInWithOAuth({
      provider: "google",
    })
    if(error){
      console.error("Error signing in with Google:", error.message);
    }
    setLoading(false)
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 rounded-2xl p-8 shadow-xl w-full max-w-lg mx-auto ">
        <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          Sign in to <span className="text-blue-600">Recruitron</span> <span className="text-red-600"><FaMicrophoneAlt/></span>
        </h1>
        <p className="text-muted-foreground text-center mb-6">
          Let AI do the hiring while you build the future.
        </p>
        <button
            onClick={signInWithGoogle}
            disabled={loading}
          className="cursor-pointer flex items-center justify-center gap-3 w-full py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          <FcGoogle size={24} />
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default page;
