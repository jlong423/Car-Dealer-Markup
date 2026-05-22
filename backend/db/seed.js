import db from "#db/client";
import { createUser } from "#db/queries/users";

// import { Client } from "undici-types";

await db.connect();
console.log("Connected to Client database.");
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  try {
    // Create table if it doesn't exist
    await db.query(`INSERT INTO cars (id, make, model, trim, year, hp, torque, engine_spec, msrp, image_slug) VALUES

-- Ford Mustang (no images available)
(1, 'Ford', 'Mustang', 'GT', 2023, 450, 410, '5.0L V8', 43000, 'car-placeholder.png'),
(2, 'Ford', 'Mustang', 'EcoBoost', 2023, 310, 350, '2.3L Turbo I4', 28000, 'car-placeholder.png'),
(3, 'Ford', 'Mustang', 'Shelby GT350', 2020, 526, 429, '5.2L V8', 60000, 'car-placeholder.png'),
(4, 'Ford', 'Mustang', 'Shelby GT500', 2022, 760, 625, '5.2L Supercharged V8', 80000, 'car-placeholder.png'),
(5, 'Ford', 'Mustang', 'Mach 1', 2022, 480, 420, '5.0L V8', 55000, 'car-placeholder.png'),

-- Dodge Challenger (all have images)
(6, 'Dodge', 'Challenger', 'SXT', 2023, 303, 268, '3.6L V6', 31000, 'challenger-sxt.jpg'),
(7, 'Dodge', 'Challenger', 'R/T', 2023, 375, 410, '5.7L V8', 41000, 'challenger-rt.jpg'),
(8, 'Dodge', 'Challenger', 'Scat Pack', 2023, 485, 475, '6.4L V8', 47000, 'challenger-scat.jpg'),
(9, 'Dodge', 'Challenger', 'Hellcat', 2023, 717, 656, '6.2L Supercharged V8', 70000, 'challenger-hellcat.jpg'),
(10, 'Dodge', 'Challenger', 'SRT Demon', 2018, 808, 717, '6.2L Supercharged V8', 85000, 'challenger-demon.jpg'),

-- Chevrolet Camaro (all have images)
(11, 'Chevrolet', 'Camaro', 'LT', 2023, 275, 295, '2.0L Turbo I4', 27000, 'camaro-lt1.jpg'),
(12, 'Chevrolet', 'Camaro', 'SS', 2023, 455, 455, '6.2L V8', 42000, 'camaro-ss.jpg'),
(13, 'Chevrolet', 'Camaro', 'ZL1', 2023, 650, 650, '6.2L Supercharged V8', 72000, 'camaro-zl1.jpg'),

-- Dodge Charger (images available)
(14, 'Dodge', 'Charger', 'R/T', 2023, 370, 395, '5.7L V8', 42000, 'charger-rt.jpg'),
(15, 'Dodge', 'Charger', 'Hellcat', 2023, 717, 650, '6.2L Supercharged V8', 80000, 'charger-hellcat.jpg'),

-- Chevrolet Corvette (only Z06 has an image)
(16, 'Chevrolet', 'Corvette', '1LT', 2020, 490, 465, '6.2L V8', 60000, 'car-placeholder.png'),
(17, 'Chevrolet', 'Corvette', '2LT', 2020, 490, 465, '6.2L V8', 67000, 'car-placeholder.png'),
(18, 'Chevrolet', 'Corvette', '3LT', 2020, 490, 465, '6.2L V8', 72000, 'car-placeholder.png'),
(19, 'Chevrolet', 'Corvette', 'Z51', 2020, 495, 470, '6.2L V8', 65000, 'car-placeholder.png'),
(20, 'Chevrolet', 'Corvette', 'Z06', 2020, 670, 460, '5.5L Flat-Plane V8', 105000, 'corvette-z06.jpg'),

(21, 'Chevrolet', 'Corvette', '1LT', 2021, 490, 465, '6.2L V8', 61000, 'car-placeholder.png'),
(22, 'Chevrolet', 'Corvette', '2LT', 2021, 490, 465, '6.2L V8', 68000, 'car-placeholder.png'),
(23, 'Chevrolet', 'Corvette', '3LT', 2021, 490, 465, '6.2L V8', 73000, 'car-placeholder.png'),
(24, 'Chevrolet', 'Corvette', 'Z51', 2021, 495, 470, '6.2L V8', 66000, 'car-placeholder.png'),
(25, 'Chevrolet', 'Corvette', 'Z06', 2021, 670, 460, '5.5L Flat-Plane V8', 106000, 'corvette-z06.jpg'),

(26, 'Chevrolet', 'Corvette', '1LT', 2022, 490, 465, '6.2L V8', 62000, 'car-placeholder.png'),
(27, 'Chevrolet', 'Corvette', '2LT', 2022, 490, 465, '6.2L V8', 69000, 'car-placeholder.png'),
(28, 'Chevrolet', 'Corvette', '3LT', 2022, 490, 465, '6.2L V8', 74000, 'car-placeholder.png'),
(29, 'Chevrolet', 'Corvette', 'Z51', 2022, 495, 470, '6.2L V8', 67000, 'car-placeholder.png'),
(30, 'Chevrolet', 'Corvette', 'Z06', 2022, 670, 460, '5.5L Flat-Plane V8', 107000, 'corvette-z06.jpg'),

(31, 'Chevrolet', 'Corvette', '1LT', 2023, 490, 465, '6.2L V8', 63000, 'car-placeholder.png'),
(32, 'Chevrolet', 'Corvette', '2LT', 2023, 490, 465, '6.2L V8', 70000, 'car-placeholder.png'),
(33, 'Chevrolet', 'Corvette', '3LT', 2023, 490, 465, '6.2L V8', 75000, 'car-placeholder.png'),
(34, 'Chevrolet', 'Corvette', 'Z51', 2023, 495, 470, '6.2L V8', 68000, 'car-placeholder.png'),
(35, 'Chevrolet', 'Corvette', 'Z06', 2023, 670, 460, '5.5L Flat-Plane V8', 108000, 'corvette-z06.jpg'),

(36, 'Chevrolet', 'Corvette', '1LT', 2024, 490, 465, '6.2L V8', 64000, 'car-placeholder.png'),
(37, 'Chevrolet', 'Corvette', '2LT', 2024, 490, 465, '6.2L V8', 71000, 'car-placeholder.png'),
(38, 'Chevrolet', 'Corvette', '3LT', 2024, 490, 465, '6.2L V8', 76000, 'car-placeholder.png'),
(39, 'Chevrolet', 'Corvette', 'Z51', 2024, 495, 470, '6.2L V8', 69000, 'car-placeholder.png'),
(40, 'Chevrolet', 'Corvette', 'Z06', 2024, 670, 460, '5.5L Flat-Plane V8', 109000, 'corvette-z06.jpg'),

(41, 'Chevrolet', 'Corvette', '1LT', 2025, 490, 465, '6.2L V8', 65000, 'car-placeholder.png'),
(42, 'Chevrolet', 'Corvette', '2LT', 2025, 490, 465, '6.2L V8', 72000, 'car-placeholder.png'),
(43, 'Chevrolet', 'Corvette', '3LT', 2025, 490, 465, '6.2L V8', 77000, 'car-placeholder.png'),
(44, 'Chevrolet', 'Corvette', 'Z51', 2025, 495, 470, '6.2L V8', 70000, 'car-placeholder.png'),
(45, 'Chevrolet', 'Corvette', 'Z06', 2025, 670, 460, '5.5L Flat-Plane V8', 110000, 'corvette-z06.jpg'),

-- Silverado (no images)
(46, 'Chevrolet', 'Silverado 1500', 'WT', 2020, 355, 383, '5.3L V8', 35000, 'car-placeholder.png'),
(47, 'Chevrolet', 'Silverado 1500', 'LT', 2020, 355, 383, '5.3L V8', 42000, 'car-placeholder.png'),
(48, 'Chevrolet', 'Silverado 1500', 'RST', 2020, 355, 383, '5.3L V8', 45000, 'car-placeholder.png'),
(49, 'Chevrolet', 'Silverado 1500', 'LTZ', 2020, 420, 460, '6.2L V8', 52000, 'car-placeholder.png'),
(50, 'Chevrolet', 'Silverado 1500', 'High Country', 2020, 420, 460, '6.2L V8', 58000, 'car-placeholder.png'),
(51, 'Chevrolet', 'Silverado 1500', 'Trail Boss', 2020, 355, 383, '5.3L V8', 48000, 'car-placeholder.png'),
(52, 'Chevrolet', 'Silverado 1500', 'ZR2', 2020, 420, 460, '6.2L V8', 65000, 'car-placeholder.png'),

-- Tahoe (no images)
(53, 'Chevrolet', 'Tahoe', 'LS', 2020, 355, 383, '5.3L V8', 50000, 'car-placeholder.png'),
(54, 'Chevrolet', 'Tahoe', 'LT', 2020, 355, 383, '5.3L V8', 55000, 'car-placeholder.png'),
(55, 'Chevrolet', 'Tahoe', 'RST', 2020, 420, 460, '6.2L V8', 60000, 'car-placeholder.png'),
(56, 'Chevrolet', 'Tahoe', 'Premier', 2020, 420, 460, '6.2L V8', 65000, 'car-placeholder.png'),
(57, 'Chevrolet', 'Tahoe', 'High Country', 2020, 420, 460, '6.2L V8', 72000, 'car-placeholder.png'),

-- GMC Yukon (no images)
(58, 'GMC', 'Yukon', 'SLE', 2020, 355, 383, '5.3L V8', 52000, 'car-placeholder.png'),
(59, 'GMC', 'Yukon', 'SLT', 2020, 355, 383, '5.3L V8', 57000, 'car-placeholder.png'),
(60, 'GMC', 'Yukon', 'AT4', 2020, 420, 460, '6.2L V8', 62000, 'car-placeholder.png'),
(61, 'GMC', 'Yukon', 'Denali', 2020, 420, 460, '6.2L V8', 72000, 'car-placeholder.png'),

-- Ford Raptor (no images)
(62, 'Ford', 'F-150 Raptor', 'Raptor', 2020, 450, 510, '3.5L Twin Turbo V6', 65000, 'car-placeholder.png'),
(63, 'Ford', 'F-150 Raptor', 'Raptor R', 2020, 700, 640, '5.2L Supercharged V8', 110000, 'car-placeholder.png'),

-- Ford Bronco (no images)
(64, 'Ford', 'Bronco', 'Big Bend', 2021, 275, 315, '2.3L Turbo I4', 33000, 'car-placeholder.png'),
(65, 'Ford', 'Bronco', 'Black Diamond', 2021, 275, 315, '2.3L Turbo I4', 36000, 'car-placeholder.png'),
(66, 'Ford', 'Bronco', 'Outer Banks', 2021, 275, 315, '2.3L Turbo I4', 39000, 'car-placeholder.png'),
(67, 'Ford', 'Bronco', 'Badlands', 2021, 315, 410, '2.7L Twin Turbo V6', 45000, 'car-placeholder.png'),
(68, 'Ford', 'Bronco', 'Wildtrak', 2021, 315, 410, '2.7L Twin Turbo V6', 50000, 'car-placeholder.png'),
(69, 'Ford', 'Bronco', 'Raptor', 2022, 418, 440, '3.0L Twin Turbo V6', 70000, 'car-placeholder.png'),

-- Ram TRX (no image)
(70, 'Ram', '1500 TRX', 'TRX', 2020, 702, 650, '6.2L Supercharged V8', 90000, 'car-placeholder.png'),

-- Dodge Durango (no images)
(71, 'Dodge', 'Durango', 'GT', 2020, 295, 260, '3.6L V6', 35000, 'car-placeholder.png'),
(72, 'Dodge', 'Durango', 'R/T', 2020, 360, 390, '5.7L V8', 45000, 'car-placeholder.png'),
(73, 'Dodge', 'Durango', 'Citadel', 2020, 295, 260, '3.6L V6', 48000, 'car-placeholder.png'),
(74, 'Dodge', 'Durango', 'SRT 392', 2020, 475, 470, '6.4L V8', 65000, 'car-placeholder.png'),
(75, 'Dodge', 'Durango', 'SRT Hellcat', 2021, 710, 645, '6.2L Supercharged V8', 90000, 'car-placeholder.png'),

-- Dodge Demon 170 (closest match = demon)
(76, 'Dodge', 'Challenger', 'SRT Demon 170', 2023, 1025, 945, '6.2L Supercharged V8', 120000, 'challenger-demon.jpg'),

-- Honda Civic (no images)
(77, 'Honda', 'Civic', 'LX', 2020, 158, 138, '2.0L I4', 22000, 'car-placeholder.png'),
(78, 'Honda', 'Civic', 'Sport', 2020, 158, 138, '2.0L I4', 24000, 'car-placeholder.png'),
(79, 'Honda', 'Civic', 'EX', 2020, 174, 162, '1.5L Turbo I4', 26000, 'car-placeholder.png'),
(80, 'Honda', 'Civic', 'Touring', 2020, 174, 162, '1.5L Turbo I4', 29000, 'car-placeholder.png'),
(81, 'Honda', 'Civic', 'Si', 2020, 205, 192, '1.5L Turbo I4', 27000, 'car-placeholder.png'),
(82, 'Honda', 'Civic', 'Type R', 2020, 306, 295, '2.0L Turbo I4', 38000, 'car-placeholder.png'),

-- Honda Accord (no images)
(83, 'Honda', 'Accord', 'LX', 2020, 192, 192, '1.5L Turbo I4', 25000, 'car-placeholder.png'),
(84, 'Honda', 'Accord', 'EX', 2020, 192, 192, '1.5L Turbo I4', 28000, 'car-placeholder.png'),
(85, 'Honda', 'Accord', 'Sport', 2020, 252, 273, '2.0L Turbo I4', 32000, 'car-placeholder.png'),
(86, 'Honda', 'Accord', 'Touring', 2020, 252, 273, '2.0L Turbo I4', 36000, 'car-placeholder.png'),

-- Cadillac Escalade (no images)
(87, 'Cadillac', 'Escalade', 'Luxury', 2020, 420, 460, '6.2L V8', 77000, 'car-placeholder.png'),
(88, 'Cadillac', 'Escalade', 'Premium Luxury', 2020, 420, 460, '6.2L V8', 85000, 'car-placeholder.png'),
(89, 'Cadillac', 'Escalade', 'Sport', 2020, 420, 460, '6.2L V8', 90000, 'car-placeholder.png'),
(90, 'Cadillac', 'Escalade', 'V-Series', 2023, 682, 653, '6.2L Supercharged V8', 150000, 'car-placeholder.png'),

-- Cadillac CTS (no images)
(91, 'Cadillac', 'CTS', 'Standard', 2020, 268, 295, '2.0L Turbo I4', 47000, 'car-placeholder.png'),
(92, 'Cadillac', 'CTS', 'Luxury', 2020, 335, 285, '3.6L V6', 52000, 'car-placeholder.png'),
(93, 'Cadillac', 'CTS', 'Premium Luxury', 2020, 335, 285, '3.6L V6', 57000, 'car-placeholder.png'),
(94, 'Cadillac', 'CTS', 'V-Series', 2020, 640, 630, '6.2L Supercharged V8', 90000, 'car-placeholder.png');`);

    // THIS SEEDS STATE INFO
    await db.query(`INSERT INTO states (id, state_name, state_code) VALUES
(1, 'Alabama', 'AL'),
(2, 'Alaska', 'AK'),
(3, 'Arizona', 'AZ'),
(4, 'Arkansas', 'AR'),
(5, 'California', 'CA'),
(6, 'Colorado', 'CO'),
(7, 'Connecticut', 'CT'),
(8, 'Delaware', 'DE'),
(9, 'Florida', 'FL'),
(10, 'Georgia', 'GA'),
(11, 'Hawaii', 'HI'),
(12, 'Idaho', 'ID'),
(13, 'Illinois', 'IL'),
(14, 'Indiana', 'IN'),
(15, 'Iowa', 'IA'),
(16, 'Kansas', 'KS'),
(17, 'Kentucky', 'KY'),
(18, 'Louisiana', 'LA'),
(19, 'Maine', 'ME'),
(20, 'Maryland', 'MD'),
(21, 'Massachusetts', 'MA'),
(22, 'Michigan', 'MI'),
(23, 'Minnesota', 'MN'),
(24, 'Mississippi', 'MS'),
(25, 'Missouri', 'MO'),
(26, 'Montana', 'MT'),
(27, 'Nebraska', 'NE'),
(28, 'Nevada', 'NV'),
(29, 'New Hampshire', 'NH'),
(30, 'New Jersey', 'NJ'),
(31, 'New Mexico', 'NM'),
(32, 'New York', 'NY'),
(33, 'North Carolina', 'NC'),
(34, 'North Dakota', 'ND'),
(35, 'Ohio', 'OH'),
(36, 'Oklahoma', 'OK'),
(37, 'Oregon', 'OR'),
(38, 'Pennsylvania', 'PA'),
(39, 'Rhode Island', 'RI'),
(40, 'South Carolina', 'SC'),
(41, 'South Dakota', 'SD'),
(42, 'Tennessee', 'TN'),
(43, 'Texas', 'TX'),
(44, 'Utah', 'UT'),
(45, 'Vermont', 'VT'),
(46, 'Virginia', 'VA'),
(47, 'Washington', 'WA'),
(48, 'West Virginia', 'WV'),
(49, 'Wisconsin', 'WI'),
(50, 'Wyoming', 'WY');
  `);

    //THIS SEEDS DEALER MARKUP INFO
    await db.query(`INSERT INTO dealer_markups(id, year, average_markup_percent, average_markup_dollar, car_id, state_id) VALUES
(1, 2023, 8.5, 3655, 1, 42),
(2, 2023, 6.0, 1680, 2, 42),
(3, 2020, 10.0, 6000, 3, 42),
(4, 2022, 12.0, 9600, 4, 42),
(5, 2022, 7.5, 4125, 5, 42),

(6, 2023, 5.0, 1550, 6, 42),
(7, 2023, 7.0, 2870, 7, 42),
(8, 2023, 9.0, 4230, 8, 42),
(9, 2023, 11.0, 7700, 9, 42),
(10, 2018, 13.0, 11050, 10, 42),

(11, 2023, 4.5, 1215, 11, 42),
(12, 2023, 6.5, 2730, 12, 42),
(13, 2023, 9.5, 6840, 13, 42),

(14, 2023, 6.0, 2520, 14, 42),
(15, 2023, 10.0, 8000, 15, 42),
(16, 2023, 6.0, 2580, 1, 17),
(17, 2023, 4.0, 1120, 2, 17),
(18, 2020, 7.0, 4200, 3, 17),
(19, 2022, 9.0, 7200, 4, 17),
(20, 2022, 5.0, 2750, 5, 17),

(21, 2023, 3.5, 1085, 6, 17),
(22, 2023, 5.0, 2050, 7, 17),
(23, 2023, 7.0, 3290, 8, 17),
(24, 2023, 9.0, 6300, 9, 17),
(25, 2018, 10.0, 8500, 10, 17),

(26, 2023, 3.0, 810, 11, 17),
(27, 2023, 5.0, 2100, 12, 17),
(28, 2023, 7.5, 5400, 13, 17),
(29, 2023, 4.5, 1890, 14, 17),
(30, 2023, 8.0, 6400, 15, 17),
(31, 2023, 9.0, 3870, 1, 10),
(32, 2023, 7.0, 1960, 2, 10),
(33, 2020, 11.0, 6600, 3, 10),
(34, 2022, 13.0, 10400, 4, 10),
(35, 2022, 8.0, 4400, 5, 10),

(36, 2023, 6.0, 1860, 6, 10),
(37, 2023, 8.0, 3280, 7, 10),
(38, 2023, 10.0, 4700, 8, 10),
(39, 2023, 12.0, 8400, 9, 10),
(40, 2018, 14.0, 11900, 10, 10),

(41, 2023, 5.0, 1350, 11, 10),
(42, 2023, 7.0, 2940, 12, 10),
(43, 2023, 10.0, 7200, 13, 10),

(44, 2023, 7.0, 2940, 14, 10),
(45, 2023, 11.0, 8800, 15, 10),
(46, 2023, 10.0, 4300, 1, 43),
(47, 2023, 8.0, 2240, 2, 43),
(48, 2020, 12.0, 7200, 3, 43),
(49, 2022, 15.0, 12000, 4, 43),
(50, 2022, 9.0, 4950, 5, 43),

(51, 2023, 7.0, 2170, 6, 43),
(52, 2023, 9.0, 3690, 7, 43),
(53, 2023, 11.0, 5170, 8, 43),
(54, 2023, 13.0, 9100, 9, 43),
(55, 2018, 15.0, 12750, 10, 43),

(56, 2023, 6.0, 1620, 11, 43),
(57, 2023, 8.0, 3360, 12, 43),
(58, 2023, 12.0, 8640, 13, 43),

(59, 2023, 8.0, 3360, 14, 43),
(60, 2023, 12.0, 9600, 15, 43),


-- Corvette 2020 (IDs 16-20)
(61, 2020, 11.0, 6600, 16, 5),
(62, 2020, 7.0, 4200, 16, 10),
(63, 2020, 14.0, 9380, 17, 43),
(64, 2020, 6.0, 4020, 17, 32),
(65, 2020, 9.0, 6480, 18, 9),
(66, 2020, 12.0, 8640, 18, 42),
(67, 2020, 8.0, 5200, 19, 3),
(68, 2020, 5.0, 3250, 19, 21),
(69, 2020, 13.0, 13650, 20, 43),
(70, 2020, 9.0, 9450, 20, 6),

-- Corvette 2021 (IDs 21-25)
(71, 2021, 10.0, 6100, 21, 10),
(72, 2021, 6.0, 4080, 21, 44),
(73, 2021, 8.0, 5440, 22, 5),
(74, 2021, 12.0, 8160, 22, 9),
(75, 2021, 7.0, 5110, 23, 42),
(76, 2021, 4.0, 2920, 23, 1),
(77, 2021, 9.0, 5940, 24, 43),
(78, 2021, 5.0, 3300, 24, 17),
(79, 2021, 14.0, 14840, 25, 32),
(80, 2021, 11.0, 11660, 25, 3),

-- Corvette 2022 (IDs 26-30)
(81, 2022, 9.0, 5580, 26, 6),
(82, 2022, 5.0, 3100, 26, 10),
(83, 2022, 12.0, 8280, 27, 5),
(84, 2022, 7.0, 4830, 27, 9),
(85, 2022, 10.0, 7400, 28, 43),
(86, 2022, 6.0, 4440, 28, 42),
(87, 2022, 8.0, 5360, 29, 3),
(88, 2022, 4.0, 2680, 29, 21),
(89, 2022, 13.0, 13910, 30, 32),
(90, 2022, 9.0, 9630, 30, 17),

-- Corvette 2023 (IDs 31-33)
(91, 2023, 7.0, 4410, 31, 10),
(92, 2023, 11.0, 6930, 31, 5),
(93, 2023, 6.0, 4200, 32, 9),
(94, 2023, 8.0, 5600, 32, 43),
(95, 2023, 12.0, 9000, 33, 42),
(96, 2023, 5.0, 3750, 33, 6),

-- Silverado 2020-2023 (IDs 34-48)

(97, 2020, 6.0, 3000, 34, 10),
(98, 2020, 9.0, 4500, 34, 43),
(99, 2020, 7.0, 3850, 35, 5),
(100, 2020, 4.0, 2200, 35, 21),

(101, 2021, 8.0, 4400, 36, 9),
(102, 2021, 5.0, 2750, 36, 42),
(103, 2021, 10.0, 5500, 37, 3),
(104, 2021, 6.0, 3300, 37, 17),

(105, 2022, 7.0, 3850, 38, 10),
(106, 2022, 12.0, 6600, 38, 43),
(107, 2022, 9.0, 4950, 39, 5),
(108, 2022, 4.0, 2200, 39, 6),

(109, 2023, 11.0, 6050, 40, 9),
(110, 2023, 8.0, 4400, 40, 32),
(111, 2023, 6.0, 3300, 41, 42),
(112, 2023, 5.0, 2750, 41, 1),

-- Tahoe 2020-2023 (IDs 49-63)

(113, 2020, 7.0, 4200, 49, 10),
(114, 2020, 5.0, 3000, 49, 43),
(115, 2020, 9.0, 5400, 50, 5),

(116, 2021, 6.0, 3600, 51, 9),
(117, 2021, 10.0, 6000, 51, 42),
(118, 2021, 8.0, 4800, 52, 3),

(119, 2022, 12.0, 7200, 53, 17),
(120, 2022, 7.0, 4200, 53, 10),
(121, 2022, 4.0, 2400, 54, 21),

(122, 2023, 9.0, 5400, 55, 5),
(123, 2023, 11.0, 6600, 55, 9),
(124, 2023, 6.0, 3600, 56, 43),

-- Yukon 2020-2023 (IDs 64-78)

(125, 2020, 8.0, 4800, 64, 10),
(126, 2020, 5.0, 3000, 64, 6),

(127, 2021, 9.0, 5400, 65, 5),
(128, 2021, 7.0, 4200, 65, 42),

(129, 2022, 12.0, 7200, 66, 9),
(130, 2022, 6.0, 3600, 66, 3),

(131, 2023, 10.0, 6000, 67, 43),
(132, 2023, 4.0, 2400, 67, 21),

-- Bronco 2020-2023 (IDs 79-93)

(133, 2020, 7.0, 3500, 79, 10),
(134, 2020, 5.0, 2500, 79, 5),

(135, 2021, 9.0, 4500, 80, 9),
(136, 2021, 6.0, 3000, 80, 42),

(137, 2022, 11.0, 5500, 81, 3),
(138, 2022, 8.0, 4000, 81, 43),

(139, 2023, 10.0, 5000, 82, 6),
(140, 2023, 4.0, 2000, 82, 21),

-- High-performance trucks & SUVs

(141, 2020, 12.0, 9600, 94, 10),
(142, 2020, 8.0, 6400, 94, 5);`);
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    await db.end();
  }
}

// (143, 2021, 14.0, 11200, 95, 9),
// (144, 2021, 9.0, 7200, 95, 42),

// (145, 2022, 15.0, 12000, 96, 3),
// (146, 2022, 10.0, 8000, 96, 43),

// (147, 2023, 13.0, 10400, 97, 6),
// (148, 2023, 7.0, 5600, 97, 21),

// -- Sedans & luxury SUVs

// (149, 2020, 5.0, 1250, 121, 10),
// (150, 2020, 3.0, 750, 121, 5),

// (151, 2021, 6.0, 1500, 122, 9),
// (152, 2021, 4.0, 1000, 122, 42),

// (153, 2022, 7.0, 1750, 123, 3),
// (154, 2022, 5.0, 1250, 123, 43),

// (155, 2023, 8.0, 2000, 124, 6),
// (156, 2023, 4.0, 1000, 124, 21),

// (157, 2023, 10.0, 9000, 125, 10),
// (158, 2023, 6.0, 5400, 125, 5
// )
