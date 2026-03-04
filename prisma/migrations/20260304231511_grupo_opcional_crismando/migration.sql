-- AlterTable
ALTER TABLE "Crismando" ADD COLUMN     "grupoId" TEXT;

-- AddForeignKey
ALTER TABLE "Crismando" ADD CONSTRAINT "Crismando_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
