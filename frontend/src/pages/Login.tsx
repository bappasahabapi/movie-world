import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("demo@movie.com");
  const [password, setPassword] = useState("password");
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { status, error } = useAppSelector((s) => s.auth);
  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input
        className="w-full mb-3 p-2 bg-slate-800 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full mb-3 p-2 bg-slate-800 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn w-full"
        disabled={status === "loading"}
        onClick={async () => {
          await dispatch(login({ email, password }));
          nav("/");
        }}
      >
        {status === "loading" ? "Logging in..." : "Login"}
      </button>
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
