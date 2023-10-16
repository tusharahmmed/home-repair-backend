/*
  Warnings:

  - Added the required column `visiting_hour` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "visiting_hour" TEXT NOT NULL;
