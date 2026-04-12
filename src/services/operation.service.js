const prisma = require("../lib/prisma");

async function createOperation(data) {
  const lucro = data.retorno - data.stake;
  const roi = (lucro / data.stake) * 100
  return await prisma.operation.create({
    data: {
      ...data,
      lucro,
      roi
    },
  });
}

async function getAllOperations({
  page,
  limit,
  period,
  cpf,
  tipo,
  sort = "createdAt",
  order = "desc",
  minLucro,
  maxLucro,
  userId,
}) {
  const skip = (page - 1) * limit;

  let where = {
    userId,
  };

  // CPF
  if (cpf) {
    where.cpf = cpf;
  }

  // TIPO Múltiplo
  if (tipo) {
    const tipos = tipo.split(",");
    where.tipo = { in: tipos };
  }

  // Filtro por lucro
  if (minLucro !== undefined || maxLucro !== undefined) {
    where.lucro = {};
    if (minLucro !== undefined) {
      where.lucro.gte = minLucro;
    }

    if (maxLucro !== undefined) {
      where.lucro.lte = maxLucro;
    }
  }

  // filtro por DATA
  if (period) {
    const now = new Date();
    let startDate;

    if (period === "7d") {
      startDate = new Date(now.setDate(now.getDate() - 7));
    }

    if (period === "30d") {
      startDate = new Date(now.setDate(now.getDate() - 30));
    }

    if (startDate) {
      where.createdAt = {
        gte: startDate,
      };
    }
  }

  // Query
  const [operations, total] = await Promise.all([
    prisma.operation.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sort]: order,
      },
    }),
    prisma.operation.count({ where }),
  ]);

  return {
    data: operations,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function updateOperations({id, data, userId}) {
  const operation = await prisma.operation.findUnique({
    where: {id},
  });

  if(!operation) {
    const err = new Error("Operação não encontrada");
    err.status = 404;
    throw err;
  }

  // segurança 
  if(operation.userId !== userId) {
    const err = new Error("Não autorizado");
    err.status = 403;
    throw err;
  }

  const updated = await prisma.operation.update({
    where: {id},
    data,
  });

  return updated;
}

async function deleteOperations({id, userId}) {
  const operation = await prisma.operation.findUnique({
    where: {id},
  });

  if(!operation) {
    const err = new Error("Operação não encontrada");
    err.status = 404;
    throw err;
  }

  // segurança
  if(operation.userId !== userId) {
    const err = new Error("Não autorizado");
    err.status = 403;
    throw err;
  }

  await prisma.operation.delete({
    where: {id},
  });
}
module.exports = {
  createOperation,
  getAllOperations,
  updateOperations,
  deleteOperations
};
