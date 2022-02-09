const user = async (req, res) => {
  const { cookies } = req;

  const token = await cookies.tokenJWT;

  if (!token) {
    return res.json({ message: "invalid token" });
  }
  res.json({
    data: "some secret data related to the user",
    message: "was successful",
  });
};

export default user;
