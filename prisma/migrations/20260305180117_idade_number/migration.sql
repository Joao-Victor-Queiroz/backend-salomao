/*
  Warnings:

  - Changed the type of `numEndereco` on the `Crismando` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Crismando" DROP COLUMN "numEndereco",
ADD COLUMN     "numEndereco" INTEGER NOT NULL;
