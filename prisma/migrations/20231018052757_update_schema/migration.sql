-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "review_ratings" DROP CONSTRAINT "review_ratings_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "review_ratings" ADD CONSTRAINT "review_ratings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
