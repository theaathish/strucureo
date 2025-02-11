"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseApp } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "@/types";

export default function SignupPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Combine name and role in displayName e.g. "John Doe (client)"
      await updateProfile(result.user, { displayName: `${name} (${role})` });
      router.push(role === "client" ? "/freelancer/client" : "/freelancer/freelancer");
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
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
        <div className="flex space-x-4">
          <label>
            <input
              type="radio"
              name="role"
              value="client"
              checked={role === "client"}
              onChange={() => setRole("client")}
            />
            <span className="ml-2">Client</span>
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="freelancer"
              checked={role === "freelancer"}
              onChange={() => setRole("freelancer")}
            />
            <span className="ml-2">Freelancer</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
