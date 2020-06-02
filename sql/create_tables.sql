CREATE DATABASE acnh_catalog_manager;
USE acnh_catalog_manager;

CREATE TABLE `users` (
    `id` varchar(30) NOT NULL,
    `password` varchar(30) NOT NULL,
    `permission` int NOT NULL DEFAULT 1
    `sign_up_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);


CREATE TABLE `sheets` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` varchar(30) NOT NULL,
    `title` varchar(255) NOT NULL,
    `view` int DEFAULT 0,
    `is_need_update` boolean DEFAULT true,
    PRIMARY KEY(`id`),
    CONSTRAINT FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `variants` (
    `id` int NOT NULL AUTO_INCREMENT,
    `color_en` varchar(20) NOT NULL,
    `color_kr` varchar(30) NOT NULL,
    `image_url` varchar(10),
    `item_id` int NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `items` (
    `id` int NOT NULL,
    `name_en` varchar(50) NOT NULL,
    `name_kr` varchar(80) NOT NULL, 
    `preview_variant_id` int,
    UNIQUE KEY(`id`),
    PRIMARY KEY(`id`),
    CONSTRAINT FOREIGN KEY(`preview_variant_id`) REFERENCES `variants` (`id`)
);
ALTER TABLE `variants` ADD CONSTRAINT FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);

CREATE TABLE `rows` (
    `id` int NOT NULL AUTO_INCREMENT,
    `is_complete` boolean DEFAULT false,
    `is_deleted` boolean DEFAULT false,
    `sheet_id` int NOT NULL,
    `item_id` int NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT FOREIGN KEY (`sheet_id`) REFERENCES `sheets` (`id`),
    CONSTRAINT FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
);

CREATE TABLE `row_item_variants` (
    `id` int NOT NULL AUTO_INCREMENT,
    `is_owned` boolean DEFAULT false,
    `row_id` int NOT NULL,
    `variant_id` int NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT FOREIGN KEY (`row_id`) REFERENCES `rows` (`id`),
    CONSTRAINT FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`)
);

CREATE TABLE `tags` (
    `id` int NOT NULL AUTO_INCREMENT,
    `category` varchar(40) NOT NULL,
    `content` varchar(80) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `item_tags` (
    `tag_id` int NOT NULL,
    `item_id` int NOT NULL,
    CONSTRAINT FOREIGN KEY(`tag_id`) REFERENCES tags (`id`),
    CONSTRAINT FOREIGN KEY(`item_id`) REFERENCES items (`id`)
);
