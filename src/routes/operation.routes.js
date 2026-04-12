const router = require("express").Router();
// Controllers
const controller = require("../controllers/operation.controller");
// Middlawares
const validate = require("../middlewares/validate.middleware");
const validateQuery = require("../middlewares/validateQuery.middleware");
// Validators
const { operationSchema } = require("../validators/operation.validators");
const { querySchema } = require("../validators/operation.query.validators");
const auth = require("../middlewares/auth.middleware");


router.get("/",auth, validateQuery(querySchema), controller.getAll);

router.post("/",auth, validate(operationSchema), controller.create);

router.put("/:id", auth, validate(operationSchema), controller.update);

router.delete("/:id", auth, controller.remove)


module.exports = router;
