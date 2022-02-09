import { serialize } from "cookie";

const logout = async (req, res) => {
  const { cookies } = req;

  const token = await cookies.tokenJWT;

  if (!token) {
    return res.json({ message: "already logged out" });
  } else {
    const serialised = serialize("tokenJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialised);
    res.json({ message: "successfuly logged out" });
  }
};

export default logout;
