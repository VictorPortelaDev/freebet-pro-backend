const { z } = require("zod");

const operationSchema = z.object({
  casa: z.string().min(1, "Casa é obrigatória"),
  esporte: z.string().min(1, "Esporte é obrigatório"),

  odd: z.coerce.number().positive("Odd deve ser maior que 0"),
  stake: z.coerce.number().positive("Stake deve ser maior que 0"),
  retorno: z.coerce.number().positive("Retorno deve ser maior que 0"),

  cpf: z.string().min(11, "CPF inválido").max(14),

  tipo: z.enum(["freebet", "surebet", "normal"]),
});

module.exports = { operationSchema };
