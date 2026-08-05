/*
  Warnings:

  - You are about to drop the column `email` on the `Animador` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Animador` table. All the data in the column will be lost.
  - You are about to drop the column `animadorId` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Crismando` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Crismando` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_animadorId_fkey";

-- DropIndex
DROP INDEX "Animador_email_key";

-- AlterTable
ALTER TABLE "Animador" DROP COLUMN "email",
DROP COLUMN "password";

-- AlterTable
ALTER TABLE "Crismando" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "animadorId",
ADD COLUMN     "usuarioId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL DEFAULT 'ANIMADOR',
    "animadorId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_animadorId_key" ON "Usuario"("animadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Crismando_email_key" ON "Crismando"("email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_animadorId_fkey" FOREIGN KEY ("animadorId") REFERENCES "Animador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
