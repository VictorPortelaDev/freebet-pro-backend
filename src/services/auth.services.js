const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function register(data) {
  const { email, password } = data;

  // Validação
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  // Verifica duplicado
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("Usuário já existe");
  }

  // hash
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    email: user.email,
  };
}

async function login(data) {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Senha inválida");
  }

  // gera token
  const token = jwt.sign(
    { userId: user.id },
    JWT_SECRET,
    {expiresIn: "7d"}
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email
    },
  };
}

module.exports = {
  register,
  login,
};
