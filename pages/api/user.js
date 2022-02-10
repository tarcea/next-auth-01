const user = async (req, res) => {
  const { cookies } = req;

  const token = await cookies.tokenJWT;

  if (!token) {
    return res.json({ message: "invalid token" });
  }
  res.json({
    data: "If you see this, you are logged in :-)",
    message: "logged in successfully",
  });
};

export default user;
