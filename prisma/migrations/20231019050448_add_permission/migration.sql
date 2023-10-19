-- CreateEnum
CREATE TYPE "USER_PERMISSION" AS ENUM ('category', 'service', 'portfolio', 'order');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permissions" "USER_PERMISSION"[] DEFAULT ARRAY[]::"USER_PERMISSION"[];
