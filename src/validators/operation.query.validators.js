const { z } = require("zod");

const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),

  period: z.enum(["7d", "30d"]).optional(),

  cpf: z.string().optional(),

  tipo: z.enum(["freebet", "surebet", "normal"]).optional(),

  sort: z.enum(["lucro", "roi", "createdAt"]).default("createdAt"),
  order: z.enum(["asc", "desc"]).default("desc"),

  minLucro: z.coerce.number().optional(),
  maxLucro: z.coerce.number().optional(),
});

module.exports = {querySchema}