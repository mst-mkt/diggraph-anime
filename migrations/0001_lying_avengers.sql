CREATE TABLE `saved_graph` (
	`id` text PRIMARY KEY NOT NULL,
	`graph` text NOT NULL,
	`userId` text NOT NULL,
	`title` text NOT NULL,
	`public` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
