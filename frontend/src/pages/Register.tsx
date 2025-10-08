import { useState } from "react";
import { useAppDispatch } from "../utils/hooks";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("New User");
  const [email, setEmail] = useState("new@movie.com");
  const [password, setPassword] = useState("password");
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  return (
    <div className="max-w-md mx-auto mt-10 card">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <input
        className="w-full mb-3 p-2 bg-slate-800 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={async () => {
          await dispatch(register({ name, email, password }));
          nav("/");
        }}
      >
        Create account
      </button>
    </div>
  );
}
