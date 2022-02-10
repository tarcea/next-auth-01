import axios from "axios";
import { serialize } from "cookie";
const authApiUrl =
  process.env.NODE_ENV !== "development"
    ? process.env.AUTH_API_URL
    : "http://localhost:5050";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ message: "email and password are required" });
    }
    const response = await axios.post(`${authApiUrl}/users/login`, req.body);

    const user = response.data;
    const token = user.token;
    const serialised = serialize("tokenJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.json({ message: "success", userName: user.username });
  } catch (error) {
    return res.json({ message: "please provide valid credentials." });
  }
};

export default login;
