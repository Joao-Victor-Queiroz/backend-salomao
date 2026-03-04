-- CreateTable
CREATE TABLE "Animador" (
    "id" TEXT NOT NULL,
    "nomeAnimador" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,

    CONSTRAINT "Animador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nomeGrupo" TEXT NOT NULL,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Animador_email_key" ON "Animador"("email");

-- AddForeignKey
ALTER TABLE "Animador" ADD CONSTRAINT "Animador_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
