-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL,
    "casa" TEXT NOT NULL,
    "esporte" TEXT NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,
    "stake" DOUBLE PRECISION NOT NULL,
    "retorno" DOUBLE PRECISION NOT NULL,
    "cpf" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);
