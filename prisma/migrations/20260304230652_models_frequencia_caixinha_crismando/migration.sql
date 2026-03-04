-- CreateEnum
CREATE TYPE "StatusFrequencia" AS ENUM ('P', 'FNJ', 'FJ');

-- CreateTable
CREATE TABLE "Crismando" (
    "id" TEXT NOT NULL,
    "nomeCrismando" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "cidadeNascimento" TEXT NOT NULL,
    "estadoNascimento" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numEndereco" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "telefoneCrismando" TEXT NOT NULL,
    "nomePai" TEXT NOT NULL,
    "nomeMae" TEXT NOT NULL,
    "telefonePai" TEXT NOT NULL,
    "telefoneMae" TEXT NOT NULL,
    "batizado" TEXT NOT NULL,
    "primeiraEucaristia" TEXT NOT NULL,
    "justificativa" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Crismando_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Frequencia" (
    "id" TEXT NOT NULL,
    "crismandoId" TEXT NOT NULL,
    "status" "StatusFrequencia" NOT NULL,
    "dataFrequencia" TIMESTAMP(3) NOT NULL,
    "justificativa" TEXT,

    CONSTRAINT "Frequencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Caixinha" (
    "id" TEXT NOT NULL,
    "crismandoId" TEXT NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Caixinha_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Frequencia" ADD CONSTRAINT "Frequencia_crismandoId_fkey" FOREIGN KEY ("crismandoId") REFERENCES "Crismando"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caixinha" ADD CONSTRAINT "Caixinha_crismandoId_fkey" FOREIGN KEY ("crismandoId") REFERENCES "Crismando"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
