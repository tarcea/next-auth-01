import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = { email, password };
    const res = await axios.post("/api/auth/login", credentials);
    const user = res.data;
    const { userName, message } = user;
    user && setLogged(true);
    setMessage(message);
    console.log(userName, message);
  };

  const getUser = async () => {
    const user = await axios.get("/api/user");

    console.log(user);
  };

  const logOut = async () => {
    await axios.get("/api/auth/logout");
    setLogged(false);
  };

  return (
    <div className={styles.container}>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
      <button onClick={getUser}>get current user</button>
      {logged && <button onClick={logOut}>logout</button>}
    </div>
  );
}
