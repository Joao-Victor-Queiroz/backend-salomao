/*
  Warnings:

  - A unique constraint covering the columns `[crismandoId,dataFrequencia]` on the table `Frequencia` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Caixinha" ALTER COLUMN "dataPagamento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Crismando" ALTER COLUMN "dataNascimento" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Frequencia" ALTER COLUMN "dataFrequencia" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Frequencia_crismandoId_dataFrequencia_key" ON "Frequencia"("crismandoId", "dataFrequencia");
