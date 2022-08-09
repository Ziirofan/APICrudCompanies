USE `test`

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(255),
  `lastname` varchar(255),
  `email_address` varchar(255),
  `postal_address` varchar(255),
  `city` varchar(255),
  `country` varchar(255),
  `created_at` datetime DEFAULT (now())
);

CREATE TABLE `companies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `siret` bigint,
  `created_at` timestamp,
  `city` varchar(255),
  `country` varchar(255)
);

CREATE TABLE `companies_users` (
  `company_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`company_id`, `user_id`)
);

ALTER TABLE `companies_users` ADD FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

ALTER TABLE `companies_users` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

CREATE USER 'user'@'%' IDENTIFIED BY 'test';
GRANT ALL PRIVILEGES ON `test`.* TO 'user'@'%';
FLUSH PRIVILEGES;

INSERT INTO `users` (`firstname`, `lastname`, `email_address`, `postal_address`, `city`, `country`)
VALUES ('John', 'DOE', 'jd@email.com', '8 Ter undefined', 'UCity', 'U');

INSERT INTO `companies` (`name`, `siret`, `city`, `country`)
VALUES ('UCompany', '87257349304', 'UCity', 'U');

INSERT INTO `companies_users` VALUES (1,1);

-- select user.id,user.firstname, name from user join companies_user on user.id = companies_user.user_id join companies on companies_user.companies_id = companies.id;

