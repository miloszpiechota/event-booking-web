import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "../../supabaseClient.ts";

interface AuthForm {
  email: string;
  password: string;
}

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AuthForm>();

  // Opcjonalnie: sprawdzamy, czy użytkownik już jest zalogowany i przekierowujemy go
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/home");
      }
    };
    checkSession();
  }, [navigate]);

  async function signInWithEmail(data: AuthForm) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
    } else {
      navigate("/home"); // Przekierowanie po poprawnym logowaniu
    }
    setLoading(false);
  }

  async function signUpWithEmail(data: AuthForm) {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Please check your inbox for email verification!");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <div className="w-full max-w-md bg-white/5 backdrop-blur p-8 rounded-2xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome to GoEvent
        </h2>

        <form onSubmit={handleSubmit(signInWithEmail)} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              required
              className="w-full px-4 py-2 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              required
              className="w-full px-4 py-2 bg-black/20 text-white border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p className="mb-2">Don't have an account?</p>
          <button
            onClick={handleSubmit(signUpWithEmail)}
            disabled={loading}
            className="w-full py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
