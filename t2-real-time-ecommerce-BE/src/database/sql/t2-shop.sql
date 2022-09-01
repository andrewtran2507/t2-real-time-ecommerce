CREATE TABLE "product_color" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_e586d22a197c9b985af3ac82ce3" PRIMARY KEY ("id"));
CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"));
CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, "category_id" uuid, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"));
CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "imageURL" character varying NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, "product_color_id" uuid, "branch_id" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"));
CREATE TABLE "order_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "price" integer NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, "order_id" uuid, "product_id" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"));
CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, "user_id" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"));
CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"));
CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "name" character varying NOT NULL, "setPassword" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_activated" boolean NOT NULL DEFAULT true, "role_id" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"));
ALTER TABLE "branch" ADD CONSTRAINT "FK_8d00a5c9f884eaecc2d364d9d45" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product" ADD CONSTRAINT "FK_957dcb6400d1d168d50434ddd97" FOREIGN KEY ("product_color_id") REFERENCES "product_color"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "product" ADD CONSTRAINT "FK_47ec9f981fac28851de1d6bd8db" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a6ac5c99b8c02bd4ee53d3785be" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "order_detail" ADD CONSTRAINT "FK_985d5f728e1eebe4a3eabc43aac" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "order" ADD CONSTRAINT "FK_199e32a02ddc0f47cd93181d8fd" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

INSERT INTO category (name) VALUES ('Smart Phone');
INSERT INTO category (name) VALUES ('Tablet');
INSERT INTO category (name) VALUES ('Accessory');
INSERT INTO category (name) VALUES ('Smart watch');
INSERT INTO category (name) VALUES ('Household Appliance');

INSERT INTO "role" (name) VALUES ('admin');
INSERT INTO "role" (name) VALUES ('customer');

---- 'a283dea7-68d1-403b-a7a5-9c21057d2970' "Accessory"
INSERT INTO branch (name, category_id) VALUES ('Panasonic', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Samsung', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('LG', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Electrolux', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Toshiba', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Aqua', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Sharp', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Bosch', 'a283dea7-68d1-403b-a7a5-9c21057d2970');
INSERT INTO branch (name, category_id) VALUES ('Apple', 'a283dea7-68d1-403b-a7a5-9c21057d2970');

---- '5fc261dc-9826-40bd-b1ec-b849d07d00b1' Smart Phone
INSERT INTO branch (name, category_id) VALUES ('Apple', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');
INSERT INTO branch (name, category_id) VALUES ('LG', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');
INSERT INTO branch (name, category_id) VALUES ('Samsung', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');
INSERT INTO branch (name, category_id) VALUES ('Xiaomi', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');
INSERT INTO branch (name, category_id) VALUES ('Vivo', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');
INSERT INTO branch (name, category_id) VALUES ('Huawei', '5fc261dc-9826-40bd-b1ec-b849d07d00b1');


---- 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43' "Tablet"
INSERT INTO branch (name, category_id) VALUES ('Apple', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');
INSERT INTO branch (name, category_id) VALUES ('LG', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');
INSERT INTO branch (name, category_id) VALUES ('Samsung', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');
INSERT INTO branch (name, category_id) VALUES ('Xiaomi', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');
INSERT INTO branch (name, category_id) VALUES ('Vivo', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');
INSERT INTO branch (name, category_id) VALUES ('Huawei', 'b795d9be-e741-4fd1-b83e-8ebb00ce9c43');

---- '6366f019-bd4c-45f6-a789-5ade80018df3' "Smart watch"
INSERT INTO branch (name, category_id) VALUES ('Apple', '6366f019-bd4c-45f6-a789-5ade80018df3');
INSERT INTO branch (name, category_id) VALUES ('LG', '6366f019-bd4c-45f6-a789-5ade80018df3');
INSERT INTO branch (name, category_id) VALUES ('Samsung', '6366f019-bd4c-45f6-a789-5ade80018df3');
INSERT INTO branch (name, category_id) VALUES ('Xiaomi', '6366f019-bd4c-45f6-a789-5ade80018df3');
INSERT INTO branch (name, category_id) VALUES ('Vivo', '6366f019-bd4c-45f6-a789-5ade80018df3');
INSERT INTO branch (name, category_id) VALUES ('Huawei', '6366f019-bd4c-45f6-a789-5ade80018df3');

---- '76bf46f7-0f1a-42ca-8313-fae77822a3cc' "Household Appliance"
INSERT INTO branch (name, category_id) VALUES ('Samsung', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('LG', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('Electrolux', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('Toshiba', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('Aqua', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('Sharp', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');
INSERT INTO branch (name, category_id) VALUES ('Bosch', '76bf46f7-0f1a-42ca-8313-fae77822a3cc');

---- 'e2cf99e2-748c-45c7-9297-2da98661c160' "Laptop"
INSERT INTO branch (name, category_id) VALUES ('Apple', 'e2cf99e2-748c-45c7-9297-2da98661c160');
INSERT INTO branch (name, category_id) VALUES ('LG', 'e2cf99e2-748c-45c7-9297-2da98661c160');
INSERT INTO branch (name, category_id) VALUES ('Samsung', 'e2cf99e2-748c-45c7-9297-2da98661c160');
INSERT INTO branch (name, category_id) VALUES ('Lenovo', 'e2cf99e2-748c-45c7-9297-2da98661c160');
INSERT INTO branch (name, category_id) VALUES ('Dell', 'e2cf99e2-748c-45c7-9297-2da98661c160');


INSERT INTO product_color (name, code) VALUES ('Gold', '#ecdfc9');
INSERT INTO product_color (name, code) VALUES ('Graphite Black', '#4e4d4a');
INSERT INTO product_color (name, code) VALUES ('Sierra Blue', '#d0e3f9');
INSERT INTO product_color (name, code) VALUES ('Silver', '#eaebe7');
INSERT INTO product_color (name, code) VALUES ('Yellow', '#f7ce40');
INSERT INTO product_color (name, code) VALUES ('Peach', '#f8c377');
INSERT INTO product_color (name, code) VALUES ('Space Grey', '#5f5f5f');
INSERT INTO product_color (name, code) VALUES ('Red', '#90020f');
INSERT INTO product_color (name, code) VALUES ('Coral', '#f75c46');

--- laptop  '96cfbf20-f5e6-4b71-92aa-109ffe82d40d' grey ; apple '993deb01-c462-45eb-b457-b25c68376ec1';
--- 'Macbook Pro 2022 M1 Pro', 8150, 'https://media.karousell.com/media/photos/products/2022/8/23/macbook_pro_14_inch_1661242442_efa2d9eb_progressive_thumbnail.jpg'
--- 'Macbook pro 13inch M2 (2022)', 5200, 'https://media.karousell.com/media/photos/products/2022/7/19/macbook_pro_13inch_m2_2022_1658240060_1a72dc61_progressive_thumbnail.jpg'
--- 'Apple Macbook Pro M1 2020', 4199, 'https://media.karousell.com/media/photos/products/2022/8/21/apple_macbook_pro_m1_2020_1661062320_bd263f8e_progressive_thumbnail.jpg'
--- 'MacBook Pro Retina 15-inch Mid 2015', 4500, 'https://media.karousell.com/media/photos/products/2022/7/19/macbook_pro_13inch_m2_2022_1658240060_1a72dc61_progressive_thumbnail.jpg'

INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('Macbook Pro 2022 M1 Pro', 8150, 'https://media.karousell.com/media/photos/products/2022/8/23/macbook_pro_14_inch_1661242442_efa2d9eb_progressive_thumbnail.jpg', 10, '96cfbf20-f5e6-4b71-92aa-109ffe82d40d', '993deb01-c462-45eb-b457-b25c68376ec1');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('Macbook pro 13inch M2 (2022)', 5200, 'https://media.karousell.com/media/photos/products/2022/7/19/macbook_pro_13inch_m2_2022_1658240060_1a72dc61_progressive_thumbnail.jpg', 9, '96cfbf20-f5e6-4b71-92aa-109ffe82d40d', '993deb01-c462-45eb-b457-b25c68376ec1');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('Apple Macbook Pro M1 2020', 4199, 'https://media.karousell.com/media/photos/products/2022/8/21/apple_macbook_pro_m1_2020_1661062320_bd263f8e_progressive_thumbnail.jpg', 30, '96cfbf20-f5e6-4b71-92aa-109ffe82d40d', '993deb01-c462-45eb-b457-b25c68376ec1');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('MacBook Pro Retina 15-inch Mid 2015', 4500, 'https://media.karousell.com/media/photos/products/2022/7/19/macbook_pro_13inch_m2_2022_1658240060_1a72dc61_progressive_thumbnail.jpg', 8, '96cfbf20-f5e6-4b71-92aa-109ffe82d40d', '993deb01-c462-45eb-b457-b25c68376ec1');

--- Tablet; blue  'c3e7073e-32b7-4a90-94a4-8f1ae8719d3c' ; apple - '8565baf7-07b4-47f4-9d28-f3339c4a6ab5'
--- 'IPAD PRO 12.9 CELuLAR WIFI 64GB', 1900, 'https://media.karousell.com/media/photos/products/2022/8/31/ipad_pro_129_celular_wifi_64gb_1661932775_242f39a0_progressive_thumbnail.jpg'
--- 'IPad Pro 10.5 256GB', 1399, 'https://media.karousell.com/media/photos/products/2022/8/31/ipad_pro_105_256gb_1661925006_01e1fd48_progressive_thumbnail.jpg'
--- 'IPad Pro 12.9” 5th Gen M1 (Wifi + Cellular)', 3500, 'https://media.karousell.com/media/photos/products/2022/8/31/used_ipad_pro_129_5th_gen_m1_w_1661932998_be9cd884_progressive_thumbnail.jpg'
--- 'Ipad Pro 12.9 512GB wifi+cellular', 6500, 'https://media.karousell.com/media/photos/products/2022/8/30/ipad_pro_129_512gb_wificellula_1661843480_6bbac8f4_progressive_thumbnail.jpg'

INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPAD PRO 12.9 CELuLAR WIFI 64GB', 1900, 'https://media.karousell.com/media/photos/products/2022/8/31/ipad_pro_129_celular_wifi_64gb_1661932775_242f39a0_progressive_thumbnail.jpg', 10, 'c3e7073e-32b7-4a90-94a4-8f1ae8719d3c', '8565baf7-07b4-47f4-9d28-f3339c4a6ab5');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPad Pro 10.5 256GB', 1399, 'https://media.karousell.com/media/photos/products/2022/8/31/ipad_pro_105_256gb_1661925006_01e1fd48_progressive_thumbnail.jpg', 90, 'c3e7073e-32b7-4a90-94a4-8f1ae8719d3c', '8565baf7-07b4-47f4-9d28-f3339c4a6ab5');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPad Pro 12.9” 5th Gen M1 (Wifi + Cellular)', 3500, 'https://media.karousell.com/media/photos/products/2022/8/31/used_ipad_pro_129_5th_gen_m1_w_1661932998_be9cd884_progressive_thumbnail.jpg', 13, 'c3e7073e-32b7-4a90-94a4-8f1ae8719d3c', '8565baf7-07b4-47f4-9d28-f3339c4a6ab5');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('Ipad Pro 12.9 512GB wifi+cellular', 6500, 'https://media.karousell.com/media/photos/products/2022/8/30/ipad_pro_129_512gb_wificellula_1661843480_6bbac8f4_progressive_thumbnail.jpg', 25, 'c3e7073e-32b7-4a90-94a4-8f1ae8719d3c', '8565baf7-07b4-47f4-9d28-f3339c4a6ab5');


---- smart phone ; gold '3b48a419-3587-4388-9ed3-4d88b5cfb279' ; apple 'af7703df-e4ef-4ab5-8e5a-a91dcbec186a'
---- 'IPHONE 13 PRO MAX 256GB | ZP SET', 4599, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_256gb__zp_se_1661946606_5a5d68b5_progressive_thumbnail.jpg'
---- 'IPHONE 13 128GB NEW', 3499, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_128gb_used_like_new_1661934076_8f5039e6_progressive_thumbnail'
---- 'Iphone 13 pro max 256gb From Canada', 5200, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_256gb_1661928261_e5211fa1_progressive_thumbnail.jpg'
---- 'IPhone 13 Pro Max 128GB Graphite', 4100, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_128gb_graphi_1661933999_35cb9e17_progressive_thumbnail.jpg'

INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPHONE 13 PRO MAX 256GB | ZP SET', 4599, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_256gb__zp_se_1661946606_5a5d68b5_progressive_thumbnail.jpg', 34, '3b48a419-3587-4388-9ed3-4d88b5cfb279', 'af7703df-e4ef-4ab5-8e5a-a91dcbec186a');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPHONE 13 128GB NEW', 3499, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_128gb_used_like_new_1661934076_8f5039e6_progressive_thumbnail', 17, '3b48a419-3587-4388-9ed3-4d88b5cfb279', 'af7703df-e4ef-4ab5-8e5a-a91dcbec186a');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('Iphone 13 pro max 256gb From Canada', 5200, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_256gb_1661928261_e5211fa1_progressive_thumbnail.jpg', 18, '3b48a419-3587-4388-9ed3-4d88b5cfb279', 'af7703df-e4ef-4ab5-8e5a-a91dcbec186a');
INSERT INTO product (name, price, "imageURL", quantity, product_color_id, branch_id) VALUES ('IPhone 13 Pro Max 128GB Graphite', 4100, 'https://media.karousell.com/media/photos/products/2022/8/31/iphone_13_pro_max_128gb_graphi_1661933999_35cb9e17_progressive_thumbnail.jpg', 43, '3b48a419-3587-4388-9ed3-4d88b5cfb279', 'af7703df-e4ef-4ab5-8e5a-a91dcbec186a');

-- '161c22ea-ab04-45f4-8b47-5d079571c916' - 'admin'
-- 'e396f660-8780-429c-835f-48b45e3ea105' - 'customer'
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Jonny A', 'jonnya@t2.com', '123123$T', '161c22ea-ab04-45f4-8b47-5d079571c916');
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Peter A', 'petera@t2.com', '123123$T', '161c22ea-ab04-45f4-8b47-5d079571c916');
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Json A', 'jsona@t2.com', '123123$T', '161c22ea-ab04-45f4-8b47-5d079571c916');
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Edison A', 'edisona@t2.com', '123123$T', 'e396f660-8780-429c-835f-48b45e3ea105');
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Beethoven 007 A', 'beethoven007a@t2.com', '123123$T', 'e396f660-8780-429c-835f-48b45e3ea105');
INSERT INTO "user" (name, email, password, "role_id") VALUES ('Alfred Nobel 888 A', 'alfred.nobel888a@t2.com', '123123$T', 'e396f660-8780-429c-835f-48b45e3ea105');





