/*
  Warnings:

  - You are about to drop the column `grupoId` on the `Animador` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animador" DROP CONSTRAINT "Animador_grupoId_fkey";

-- AlterTable
ALTER TABLE "Animador" DROP COLUMN "grupoId",
ADD COLUMN     "grupoAnimadorId" TEXT,
ADD COLUMN     "grupoCrismandoId" TEXT;

-- AddForeignKey
ALTER TABLE "Animador" ADD CONSTRAINT "Animador_grupoAnimadorId_fkey" FOREIGN KEY ("grupoAnimadorId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animador" ADD CONSTRAINT "Animador_grupoCrismandoId_fkey" FOREIGN KEY ("grupoCrismandoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
