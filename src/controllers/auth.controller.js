
const { register, login } = require("../services/auth.services");

async function registerUser(req, res, next) {
  try {
    const user = await register(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });

  } catch (error) {
    next(error);
  }
}

async function loginUser(req, res, next) {
  try {
    const result = await login(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
