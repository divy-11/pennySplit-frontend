import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import authService from "../api/authService";
export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  /*
{
   "user": {
  "name": "person3",
  "email": "person3@example.com",
  "password": "8318940526@^Aman",
  "avatarUrl":"https://thevivekyadav.me/images/img1"
    }
}
*/

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password) {
      console.error("Name, email, and password are required");
      return;
    }

    authService
      .register({ user: { name, email, password } })
      .then((response) => {
        console.log("Response from registration:", response.status);
        if (response.status === 201) {
          console.log("Registration successful:", response.data);
          window.location.href = "/login";
        } else {
          console.error("Registration failed:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form action="" onSubmit={handleRegister}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="password@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
