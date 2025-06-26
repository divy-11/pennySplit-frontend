import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import authService from "../api/authService";
import { useAppStore } from "../store/useAppStore";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  beforeLoad: async () => {
    const user = await useAppStore.getState().user;
    console.log("User in login:", user);
    if (user) {
      window.location.href = "/dashboard";
    }
  },
});

function RouteComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAppStore((state) => state.setUser);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      console.error("Email and password are required");
      return;
    }

    authService
      .login({ user: { email, password } })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          window.location.href = "/dashboard";
        } else {
          console.error("Login failed:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <>
      <h1 className="text-black">Login</h1>
      <form action="" onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password@^123"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
