/*
  Warnings:

  - You are about to drop the `ordered_services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ordered_services" DROP CONSTRAINT "ordered_services_orderId_fkey";

-- DropForeignKey
ALTER TABLE "ordered_services" DROP CONSTRAINT "ordered_services_serviceId_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "serviceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ordered_services";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
