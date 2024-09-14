/*
  Warnings:

  - The values [syrup] on the enum `medicine_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `medicine` MODIFY `type` ENUM('Syrup', 'Tablet', 'Powder') NOT NULL;
