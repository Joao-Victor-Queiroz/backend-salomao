-- DropForeignKey
ALTER TABLE "Caixinha" DROP CONSTRAINT "Caixinha_crismandoId_fkey";

-- DropForeignKey
ALTER TABLE "Frequencia" DROP CONSTRAINT "Frequencia_crismandoId_fkey";

-- AddForeignKey
ALTER TABLE "Frequencia" ADD CONSTRAINT "Frequencia_crismandoId_fkey" FOREIGN KEY ("crismandoId") REFERENCES "Crismando"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caixinha" ADD CONSTRAINT "Caixinha_crismandoId_fkey" FOREIGN KEY ("crismandoId") REFERENCES "Crismando"("id") ON DELETE CASCADE ON UPDATE CASCADE;
