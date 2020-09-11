const hasPermission = (perms = []) => async (req, res, next) => {
  const { currentUser } = req;
  const permissions = currentUser.permissions || [];

  for (let i = 0; i < perms.length; i++) {
    if (permissions.includes(perms[i])) {
      return next();
    }
  }

  res.status(403)
    .json({ message: `This endpoint requires one of '${perms.join(", ")}' permissions.` });
};

export default hasPermission;
