# INFRABOX - Comprehensive Inventory Management Solution for CNC Machining

## Table of Contents

1. [General Info](#general-info)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Screenshots](#screenshots)
5. [Setup](#setup)
6. [Project Status](#project-status)

## General Information

INFRABOX is a powerful and versatile inventory management solution tailored for CNC machining facilities. It combines a frontend developed in React with a robust backend powered by Spring Boot. This application offers seamless control and efficient management of tools and materials within your organization's inventory. It includes fundamental CRUD (Create, Read, Update, Delete) capabilities for both materials and tools, along with a unique feature to calculate project costs while taking material expenses into account.

The primary goal of this project is to provide your CNC machining facility with a reliable solution to monitor stock levels and respond swiftly to any shortages, ensuring the smooth operation of your organization.

## Technologies Used

INFRABOX leverages a combination of advanced technologies to deliver its comprehensive functionality:

- **Frontend (React)**: The frontend is developed using React, a popular JavaScript library for building user interfaces.
- **Backend (Spring Boot)**: The backend is powered by Spring Boot, a Java-based framework for creating robust and scalable applications.
- **Java** - Version 17
- **MySQL** - Version 5.7
- **JavaScript** - ECMAScript 6
- **HTML** - Version 5
- **CSS** - Version 3

## Features

INFRABOX includes a rich set of features tailored to meet the demands of effective inventory management in CNC machining facilities:

- **JWT-Based Authentication**: The application utilizes JWT (JSON Web Tokens) for secure and efficient user authentication and authorization.
- **Login/Logout**: Users can securely log in and out of the system, ensuring data privacy.
- **Admin Account Creation**: Admins have the privilege to create new user accounts, and there's no user self-registration option.
- **Materials Section**

The "Materials" section in the INFRABOX application plays a crucial role in efficient CNC material management. It allows the creation of various material groups (categories), such as "Aluminum Sheets," "Stainless Steel Sheets," "Rods," and "Bushings." Each of these categories can be finely customized to meet specific needs, and individual items within each category can be associated with precise dimensions, as well as price and material density information.

## Key Features

**1. Material Groups (Categories):** INFRABOX enables users to create material groups, which help in organizing and classifying materials effectively. This makes it easy to differentiate and manage various types of materials, such as aluminum sheets or rods.

**2. Specific Material Items:** Within each material group, specific material items can be defined. Each item can have precise dimensions, price attributes, density, and other information related to the material. For example, within the "Aluminum Sheets" category, you can add an item like "Sheet A" with exact dimensions, price, and density.

**3. Quantity Management:** The application allows for real-time tracking of material quantities in stock. Users can continuously update the available quantity for each material item, facilitating the monitoring of inventory levels.

**4. Minimum Stock Levels:** Users have the ability to define minimum stock levels for each material item. When the available quantity falls below this threshold, the system automatically marks the material as low in stock, informing users to take necessary actions.

**5. Automatic Shortage Lists:** One of the key features of the "Materials" section is the capability to automatically generate lists of material shortages. When material quantities drop below the set minimum stock levels, the system generates a list of items that require replenishment. This simplifies the process of ordering the necessary materials and ensures that materials are always available when needed.

This comprehensive materials management section allows for precise tracking, classification, and management of materials, ensuring that shortages do not occur at critical moments in the CNC machining process.
- **CRUD for Tools**: Similar capabilities for tools, facilitating efficient inventory control.
- **CNC Project Calculations**: The application provides a section for detailed CNC project calculations, taking into account parameters such as operating costs (including labor, energy, machine leasing, and depreciation), material costs, tool costs, and CNC machining duration.
- **Orders Management**: The "orders" section allows for creating orders for missing materials and tools. It automatically generates lists of missing items, permits monitoring of order statuses, and streamlines the procurement process.

## Screenshots

(Please include relevant screenshots of your application here to provide a visual reference for users. You can include images directly within your README.)

## Setup

To set up INFRABOX, follow these steps:

**Frontend (React)**

1. Navigate to the 'frontend' directory.
2. Install the necessary dependencies using `npm install`.
3. Start the frontend application using `npm start`.

**Backend (Spring Boot)**

1. Navigate to the 'backend' directory.
2. Configure your MySQL database connection in the `application.properties` file.
3. Build and run the Spring Boot application.

Please refer to the specific README files in the 'frontend' and 'backend' directories for more detailed setup instructions.

## Project Status

INFRABOX is an ongoing project with a strong commitment to continuous improvement and feature expansion. Our development team is dedicated to enhancing the user experience and adding new functionalities that further streamline inventory management and project cost estimation in CNC machining facilities. For the latest updates and contributions, please refer to the project's repository.

If you have any questions or need further assistance regarding INFRABOX, please feel free to reach out. We are committed to delivering an effective and user-friendly inventory management solution for your CNC machining facility.
