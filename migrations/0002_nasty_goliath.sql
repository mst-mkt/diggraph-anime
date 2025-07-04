CREATE TABLE `collection_item` (
	`id` text PRIMARY KEY NOT NULL,
	`collectionId` text NOT NULL,
	`annictId` integer NOT NULL,
	`thumbnail` text NOT NULL,
	FOREIGN KEY (`collectionId`) REFERENCES `collection`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `collection` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
