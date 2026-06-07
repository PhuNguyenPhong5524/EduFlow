

export const logout = async (req, res) => {
  res.clearCookie("refreshToken");

  return res.json({ message: "Logout thành công" });
};