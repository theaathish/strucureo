"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         updateProfile } from "firebase/auth";
import { firebaseApp } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "@/types";

export default function SignupPage() {
  const auth = getAuth(firebaseApp);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login flow
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect based on displayName role (if available) or default to client dashboard
        const userRole = auth.currentUser?.displayName?.includes("(freelancer)")
                          ? "freelancer" : "client";
        router.push(userRole === "client" ? "/freelancer/client" : "/freelancer/freelancer");
      } else {
        // Signup flow
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: `${name} (${role})` });
        router.push(role === "client" ? "/freelancer/client" : "/freelancer/freelancer");
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      setError(firebaseError.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
      <h2 className="text-3xl font-bold mb-6 text-black">{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {/* Only show name and role fields if not in login mode */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </>
        )}
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
        {/* Role selection only for signup */}
        {!isLogin && (
          <div className="flex space-x-4 text-black">
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
        )}
        <button
          type="submit"
          className="w-full bg-green-500 text-black p-3 rounded hover:bg-green-600 transition-colors"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div className="mt-4 text-black">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-green-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setIsLogin(true)}
              className="text-green-500 hover:underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
