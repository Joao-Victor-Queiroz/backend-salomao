-- DropForeignKey
ALTER TABLE "Animador" DROP CONSTRAINT "Animador_grupoId_fkey";

-- AlterTable
ALTER TABLE "Animador" ALTER COLUMN "grupoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Animador" ADD CONSTRAINT "Animador_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
