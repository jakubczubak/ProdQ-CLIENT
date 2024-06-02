# INFRABOX - Enhance Your CNC Machining

## Table of Contents

1. [General Information](#general-information)
2. [Technologies Used](#technologies-used)
3. [Key Features](#key-features)
4. [Screenshots](#screenshots)
5. [Configuration](#configuration)
6. [Project Status](#project-status)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## General Information

INFRABOX is a robust solution to support CNC machining in your CNC production facility. This application, built on React frontend and Spring Boot backend, efficiently manages your organization's inventory of tools and materials. It offers advanced management options for both materials and tools. Additionally, it features a unique project cost calculation function, taking into account expenses on materials and tools. The primary goal of this project is to provide your CNC machining facility with a reliable solution to monitor stock levels and quickly respond to any shortages, ensuring the smooth operation of your organization.

## Technologies Used

INFRABOX leverages a combination of advanced technologies to deliver its comprehensive functionality:

- **Frontend**: Developed using React, a popular JavaScript library for building user interfaces.
- **Backend**: Powered by Spring Boot, a Java-based framework for creating robust and scalable applications.
- **Java**: Version 17
- **MySQL**: Version 5.7
- **JavaScript**: ECMAScript 6
- **HTML**: Version 5
- **CSS**: Version 3

## Key Features

INFRABOX offers a rich set of features tailored to meet the demands of effective inventory management in CNC machining facilities:

- **JWT-Based Authentication**: Utilizes JWT (JSON Web Tokens) for secure and efficient user authentication and authorization.
- **Login/Logout**: Users can securely log in and out of the system, ensuring data privacy.
- **Admin Account Creation**: Administrators have the privilege to create new user accounts, and there's no user self-registration option.
- **Material Management**: Create material categories, associate specific items with precise dimensions and price attributes, manage quantities, and set minimum stock levels.
- **Tool Management**: Similar capabilities for tools, facilitating efficient inventory control.
- **CNC Project Calculations**: Provides a section for detailed CNC project calculations, incorporating parameters such as operating costs (including labor, energy, machine leasing, and depreciation), material costs, tool costs, and CNC machining duration.
- **Orders Management**: The "orders" section allows for creating orders for missing materials and tools. It automatically generates lists of missing items, permits monitoring of order statuses, and streamlines the procurement process.
- **Recycling**: The "Recycling" tab enables you to monitor the recycling of production waste materials, contributing to sustainability and environmental responsibility.
- **Contact Network**: The "Contact Network" section contains a network of contact information for partner companies involved in your CNC machining processes.

## Screenshots

(Include relevant screenshots of your application here to provide a visual reference for users. You can include images directly within your README.)

## Configuration

To run INFRABOX, follow these steps using Docker Compose:

1. Make sure you have Docker and Docker Compose installed on your system.
2. Navigate to the project's root directory where the `docker-compose.yml` file is located.
3. Open a terminal or command prompt in the project directory.
4. Start the application by running the following command:

   ```sh
   docker-compose --env-file local.env up -d
   ```

5. Access the application by visiting `http://localhost:3000` in your web browser.
6. Log in using the default admin credentials:

   - **Username**: root@gmail.com
   - **Password**: root

7. You can now explore the various features of INFRABOX.
8. To stop the application, run the following command:

   ```sh
   docker-compose down
   ```
