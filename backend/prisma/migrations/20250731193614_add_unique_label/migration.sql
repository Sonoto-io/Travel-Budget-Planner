/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_label_key" ON "User"("label");
