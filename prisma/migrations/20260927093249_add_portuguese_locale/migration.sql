-- Add Portuguese locale fields (temporary default '' for existing rows;
-- seed.ts backfills the real translations right after this migration runs)
ALTER TABLE "Category" ADD COLUMN "namePt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "namePt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "Product" ADD COLUMN "descriptionPt" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "titlePt" TEXT NOT NULL DEFAULT '';
ALTER TABLE "BlogPost" ADD COLUMN "excerptPt" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "contentPt" TEXT NOT NULL DEFAULT '';
