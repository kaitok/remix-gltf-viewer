/*
  Warnings:

  - You are about to drop the column `x` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `y` on the `Note` table. All the data in the column will be lost.
  - Added the required column `position` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rotation` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "x",
DROP COLUMN "y",
ADD COLUMN     "position" JSONB NOT NULL,
ADD COLUMN     "rotation" JSONB NOT NULL;
