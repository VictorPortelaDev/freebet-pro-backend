/*
  Warnings:

  - Added the required column `lucro` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roi` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "lucro" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "roi" DOUBLE PRECISION NOT NULL;
