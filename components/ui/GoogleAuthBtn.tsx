"use client";

import React from 'react'
import { supabase } from '@/lib/superbaseCLient';
// import { toast } from 'sonner';

const GoogleAuthBtn = () => {
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });

        if (error) {
            console.error(error.message);
        }
    }
    return (
        <button onClick={signInWithGoogle}>GoogleAuthBtn</button>
  )
}

export default GoogleAuthBtn