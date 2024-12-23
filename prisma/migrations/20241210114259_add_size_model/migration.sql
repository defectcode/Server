/*
  Warnings:

  - You are about to drop the column `color_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_color_id_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "color_id",
ADD COLUMN     "discountPrice" INTEGER;

-- CreateTable
CREATE TABLE "size" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSize" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductColors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSize_AB_unique" ON "_ProductToSize"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSize_B_index" ON "_ProductToSize"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductColors_AB_unique" ON "_ProductColors"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductColors_B_index" ON "_ProductColors"("B");

-- AddForeignKey
ALTER TABLE "_ProductToSize" ADD CONSTRAINT "_ProductToSize_A_fkey" FOREIGN KEY ("A") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSize" ADD CONSTRAINT "_ProductToSize_B_fkey" FOREIGN KEY ("B") REFERENCES "size"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductColors" ADD CONSTRAINT "_ProductColors_A_fkey" FOREIGN KEY ("A") REFERENCES "color"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductColors" ADD CONSTRAINT "_ProductColors_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
