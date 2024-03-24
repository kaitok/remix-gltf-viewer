-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT;
