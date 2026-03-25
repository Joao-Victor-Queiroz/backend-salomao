/*
  Warnings:

  - Changed the type of `tipo` on the `FrequenciaAnimador` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FrequenciaAnimador" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "DescricaoFrequenciaAnimador" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FrequenciaAnimador_animadorId_dataFrequencia_tipo_key" ON "FrequenciaAnimador"("animadorId", "dataFrequencia", "tipo");
