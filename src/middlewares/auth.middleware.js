const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: "Token não enviado",
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({
      success: false,
      error: "Token mal formatado",
    });
  }

  const [scheme, token] = parts;

  if (!scheme || scheme !== "Bearer") {
    return res.status(401).json({
      success: false,
      error: "Formato do token inválido",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      error: "Token inválido",
    });
  }
}

module.exports = auth;