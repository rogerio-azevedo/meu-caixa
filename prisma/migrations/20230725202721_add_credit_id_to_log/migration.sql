/*
  Warnings:

  - Added the required column `creditId` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Made the column `personId` on table `logs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdByPersonId` on table `logs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_createdByPersonId_fkey";

-- DropForeignKey
ALTER TABLE "logs" DROP CONSTRAINT "logs_personId_fkey";

-- AlterTable
ALTER TABLE "logs" ADD COLUMN     "creditId" TEXT NOT NULL,
ALTER COLUMN "personId" SET NOT NULL,
ALTER COLUMN "createdByPersonId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "credits"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_createdByPersonId_fkey" FOREIGN KEY ("createdByPersonId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logs" ADD CONSTRAINT "logs_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
