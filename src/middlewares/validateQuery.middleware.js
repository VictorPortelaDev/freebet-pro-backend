function validateQuery(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.query);

    if(!result.success) {
        return res.status(400).json({
            success: false,
            error: result.error.format()
        });
    }

    req.query = result.data;
    next();
  };
}

module.exports = validateQuery;
