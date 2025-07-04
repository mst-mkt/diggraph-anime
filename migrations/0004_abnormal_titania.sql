PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_collection_item` (
	`collectionId` text NOT NULL,
	`annictId` integer NOT NULL,
	`thumbnail` text,
	PRIMARY KEY(`collectionId`, `annictId`),
	FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_collection_item`("collectionId", "annictId", "thumbnail") SELECT "collectionId", "annictId", "thumbnail" FROM `collection_item`;--> statement-breakpoint
DROP TABLE `collection_item`;--> statement-breakpoint
ALTER TABLE `__new_collection_item` RENAME TO `collection_item`;--> statement-breakpoint
PRAGMA foreign_keys=ON;