"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "@/types";

export default function LoginPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Assume displayName is stored as "Name (role)"
      const display = result.user.displayName || "";
      const roleMatch = display.match(/\((client|freelancer)\)/);
      const role = roleMatch ? roleMatch[1] : "freelancer";
      router.push(role === "client" ? "/freelancer/client" : "/freelancer/freelancer");
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setError(firebaseError.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
