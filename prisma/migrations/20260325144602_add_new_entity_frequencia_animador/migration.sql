-- CreateEnum
CREATE TYPE "DescricaoFrequenciaAnimador" AS ENUM ('FORMACAO', 'ENCONTRO');

-- CreateTable
CREATE TABLE "FrequenciaAnimador" (
    "id" TEXT NOT NULL,
    "animadorId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" "StatusFrequencia" NOT NULL,
    "dataFrequencia" DATE NOT NULL,
    "justificativa" TEXT,

    CONSTRAINT "FrequenciaAnimador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FrequenciaAnimador_animadorId_dataFrequencia_tipo_key" ON "FrequenciaAnimador"("animadorId", "dataFrequencia", "tipo");

-- AddForeignKey
ALTER TABLE "FrequenciaAnimador" ADD CONSTRAINT "FrequenciaAnimador_animadorId_fkey" FOREIGN KEY ("animadorId") REFERENCES "Animador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
