/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropTable
DROP TABLE "Note";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "User";
