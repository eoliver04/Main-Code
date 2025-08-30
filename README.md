# Telegram Inventory Bot 


A **Telegram bot** for managing a personal inventory or warehouse. This bot allows users to add, list, and delete products, keeping track of quantities and prices. Built with **Node.js**, **Express**, and **Grammy** for Telegram ![Static Badge](https://img.shields.io/badge/--black?logo=telegram)
 bot integration. Data is stored and managed using **Supabase** with Edge Functions.


**Click to use the bot**  =>  [![Static Badge](https://img.shields.io/badge/Telegram_Bot-Link-blue?logo=probot)](https://t.me/tuEspacio_bot)

---

## Features

* **Add Products**: Users can add products with name, quantity, and price.
* **List Products**: Displays only the products created by the user.
* **Delete Products**: Users can delete a product with a confirmation prompt.
* **User Management**: Registers Telegram users in the database if they do not exist.
* **Inline Keyboards**: Uses interactive buttons for easy navigation.

---

## How It Works

1. **Bot Initialization**: On `/start`, the bot registers the user and presents an interactive menu with options: Add Product, List Products, Delete Product.
2. **Adding Products**: The bot guides the user step by step to input product details (name → quantity → price) and stores them in Supabase along with the user ID.
3. **Listing Products**: Fetches user-specific products via an Edge Function using the Telegram `userId` as a filter.
4. **Deleting Products**: Presents a confirmation before removing a product to prevent accidental deletions.
5. **Edge Functions**: Handle backend operations (list, add, delete) securely and efficiently using Supabase as the database.

---

## Tech Stack

* **Node.js** – backend runtime
* **Express.js** – server for handling webhooks
* **Grammy** – Telegram Bot API library
* **Supabase** – backend database and Edge Functions
* **JavaScript (ES6)** – main programming language

---

## Project Purpose

This bot serves as a **portfolio project** to showcase backend development skills, including:

* RESTful API design with Edge Functions
* Telegram bot integration and interactive messaging
* Database CRUD operations with user-specific data
* Error handling and input validation
* Clean and modular code organization

---



