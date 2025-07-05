DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `collection_item` ALTER COLUMN "thumbnail" TO "thumbnail" text;--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);