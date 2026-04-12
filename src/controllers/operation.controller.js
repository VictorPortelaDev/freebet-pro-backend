
const {
  createOperation,
  getAllOperations,
  updateOperations,
  deleteOperations,
} = require("../services/operation.service");

async function create(req, res, next) {
  try {
    const operation = await createOperation({
      ...req.body,
      userId: req.userId,
    });

    return res.json({
      success: true,
      data: operation,
    });
  } catch (error) {
    next(error);
  }
}

async function getAll(req, res, next) {
  try {
    const {
      page = 1,
      limit = 10,
      period,
      cpf,
      tipo,
      sort,
      order,
      minLucro,
      maxLucro,
    } = req.query;

    const result = await getAllOperations({
      page: Number(page),
      limit: Number(limit),
      period,
      cpf,
      tipo,
      sort,
      order,
      minLucro: minLucro ? Number(minLucro) : undefined,
      maxLucro: maxLucro ? Number(maxLucro) : undefined,
      userId: req.userId,
    });

    return res.json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { id } = req.params;

    const operation = await updateOperations({
      id,
      data: req.body,
      userId: req.userId,
    });
    return res.json({
      success: true,
      data: operation,
    });
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const { id } = req.params;

    await deleteOperations({
      id,
      userId: req.userId,
    });

    return res.json({
      success: true,
      message: "Operação deletada com sucesso",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
  update,
  remove,
};
