CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`providerId` text NOT NULL,
	`accountId` text NOT NULL,
	`refreshToken` text,
	`refreshTokenExpiresAt` integer,
	`accessToken` text,
	`accessTokenExpiresAt` integer,
	`scope` text,
	`idToken` text,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`userId` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`ipAddress` text,
	`userAgent` text,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`emailVerified` integer DEFAULT false,
	`image` text,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expiresAt` integer NOT NULL,
	`createdAt` integer DEFAULT (current_timestamp) NOT NULL,
	`updatedAt` integer DEFAULT (current_timestamp) NOT NULL
);
