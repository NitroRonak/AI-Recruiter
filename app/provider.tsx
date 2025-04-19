"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
  const createNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);
      if (Users?.length === 0) {
        const { data, error } = await supabase.from("Users").insert({
          email: user?.email,
          name: user?.user_metadata?.name,
          picture: user?.user_metadata?.picture,
        });
        if (error) {
          console.error("Insert error:", error.message);
        } else {
            setUser(data);
          console.log("User inserted:", data);
          return;
        }
      }
      setUser(Users[0]);
    });
  };
  useEffect(() => {
    createNewUser();
  }, []);
  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export default Provider;

export const userDetails = () => {
  return useContext(UserDetailsContext);
};
