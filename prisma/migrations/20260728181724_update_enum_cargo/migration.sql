-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Cargo" ADD VALUE 'COORDENADOR_COMUNICACAO';
ALTER TYPE "Cargo" ADD VALUE 'COORDENADOR_MUSICA';
ALTER TYPE "Cargo" ADD VALUE 'COORDENADOR_PESCARIA';
ALTER TYPE "Cargo" ADD VALUE 'COORDENADOR_LEMBRANCINHA';
ALTER TYPE "Cargo" ADD VALUE 'ANIMADOR_COMUNICACAO';
ALTER TYPE "Cargo" ADD VALUE 'ANIMADOR_MUSICA';
ALTER TYPE "Cargo" ADD VALUE 'ANIMADOR_LEMBRANCINHA';
