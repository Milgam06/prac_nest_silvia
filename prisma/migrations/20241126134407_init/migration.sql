/*
  Warnings:

  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - The `gender` column on the `Users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The required column `uuid` was added to the `Users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE',
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("uuid");
