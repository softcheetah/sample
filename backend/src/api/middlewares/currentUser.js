import User from "../../models/user";

const attachCurrentUser = async (req, res, next) => {
  const { token } = req;
  try {
    const userObj = await User.findById(token._id);
    if (!userObj) {
      return res.status(401).json({ message: "Cannot find user" });
    }
    req.currentUser = userObj;
    return next();
  } catch (err) {
    console.log(err);
  }
};

export default attachCurrentUser;
