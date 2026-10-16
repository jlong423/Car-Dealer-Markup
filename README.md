🚗 Car Dealer Markup API
A Node.js + Express backend application that calculates dealer markups for vehicle listings using car, user, state, and markup data. This project demonstrates backend development, REST API design, data modeling, and dynamic price calculation logic used in real dealership pricing systems.

🎯 Purpose
This project simulates how dealerships adjust vehicle prices using business rules such as dealer‑specific markups, state fees, and car type adjustments. It highlights my ability to build structured APIs, implement pricing logic, seed data, and organize backend architecture.

🛠️ Tech Stack
Node.js

Express.js

JavaScript (ES6+)

JSON data modeling

Environment configuration

Seed scripts for initial data

📁 Features
✔ Dealer Markup Engine
Applies markup rules based on:

Car type

Dealer

State

Base price

✔ REST API Endpoints
Includes endpoints for managing:

Cars

Users / Dealers

States

Dealer markups

Final price calculations

✔ Seeded Data
Preloaded sample data for:

Car inventory

Dealer profiles

State markup rules

Dealer‑specific markup percentages

✔ Dynamic Price Calculation
Final vehicle price =
Base Price + Dealer Markup + State Markup

📐 Data Model
The system uses four core entities:

Cars
id

make

model

year

base_price

Dealers (Users)
id

name

state

dealer_type

States
id

name

markup_percentage

Dealer Markups
id

dealer_id

car_type

markup_percentage

📡 API Endpoints
GET /cars
Returns all cars.

GET /cars/:id/price
Returns the final price after applying dealer + state markups.

POST /dealer-markups
Create a new markup rule.

GET /states
Returns state markup data.

GET /dealers
Returns dealer information.

🔍 Summary
This project demonstrates backend logic for real‑world dealership pricing systems. It highlights my ability to design APIs, model data relationships, implement business rules, and build dynamic calculation engines — essential skills for backend and full‑stack development.
