This is a complete full-stack system with separated frontend and backend components.

The frontend is built with React, Vite, and TailwindCSS.
The backend is built with Java, Spring Boot, Hibernate, Maven, Lombok, and uses JWT-based authentication with role-based access control (RBAC).
📁 Project Structure
sea-challenge/ ├── backend/ # Spring Boot (API) └── frontend/ # React + Vite + Tailwind (UI)

yaml Copiar Editar

✅ Requirements
Backend
Java 17+
Maven 3+
MySQL 8+ (or compatible)
Frontend
Node.js 18+
Yarn or npm
⚙️ Backend Setup
1. Clone the repository and go to the backend folder:
git clone (https://github.com/Lucas-S-Guedes/Backend-challenge)
cd sea-challenge/backend
2. Create the MySQL database:
sql
Copiar
Editar
CREATE DATABASE sea_backend;
3. Configure application.properties:
Edit the file:
src/main/resources/application.properties

properties
Copiar
Editar
spring.datasource.url=jdbc:mysql://localhost:3306/sea_backend
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Swagger
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
4. Start the backend server:
bash
Copiar
Editar
./mvnw spring-boot:run
The backend API will be available at:
📍 http://localhost:8080

Swagger UI for API documentation:
📍 http://localhost:8080/swagger-ui.html

🔑 Authentication & Roles
The backend uses JWT tokens for stateless authentication.

On successful login, a JWT token is issued and should be included in the Authorization header of future requests:

makefile
Copiar
Editar
Authorization: Bearer <your_token_here>
Users have roles, such as ROLE_USER, ROLE_ADMIN, etc.

Certain API endpoints are protected and require specific roles to access.

🎨 Frontend Setup
1. Go to the frontend folder:
bash
Copiar
Editar
cd ../frontend
2. Install dependencies:
bash
Copiar
Editar
npm install
# or
yarn
3. Configure the API URL:
Create a .env file (or edit it if it exists):

env
Copiar
Editar
VITE_API_URL=http://localhost:8080/api
4. Start the frontend app:
bash
Copiar
Editar
npm run dev
# or
yarn dev
The frontend will run on:
📍 http://localhost:8081

✅ The frontend is configured to interact with the backend at port 8080.

🔧 If necessary, make sure vite.config.ts includes:

ts
Copiar
Editar
export default defineConfig({
  server: {
    port: 8081,
  },
});
🔐 System Features
JWT-based login and logout

Role-based access control (RBAC)

Secure protected routes

Client CRUD (Create, Read, Update, Delete)

Address lookup using the ViaCEP API

Responsive UI with TailwindCSS

Swagger/OpenAPI documentation

🧪 Testing
Backend
bash
Copiar
Editar
./mvnw test
⚙️ Technologies Used
Backend
Java 17

Spring Boot 3.5

Spring Security

JWT (jjwt)

Hibernate / JPA

Lombok

Maven

MySQL

SpringDoc OpenAPI

Frontend
React 18

Vite

Tailwind CSS

TypeScript (optional)

shadcn/ui components

React Context API

Fetch API or Axios

🚀 Future Improvements
Refresh token system

Admin dashboard with user management

Email verification & password reset

Cloud deployment (Vercel + Railway or similar)

Pagination and filtering for clients

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

📄 License
This project is licensed under the MIT License.

👤 Author
Lukas Guedes
📧 your-email@example.com
🚀 SEA Challenge - 2025

yaml
Copiar
Editar

---

Would you like me to generate a working `.env` file for the frontend and some sample curl/Postman requests for login and using protected routes with JWTs?







Você disse:
the data base is sea_backend and the github is lucas-s-guedes and repository backend-challenge


O ChatGPT disse:
Perfect! Here is the final, fully customized README.md with:

Correct database name (sea_backend)

Your GitHub username (lucas-s-guedes)

Correct repository name (backend-challenge)

Everything in English

JWT and Role-based access included

Proper port config (frontend: 8081, backend: 8080)

markdown
Copiar
Editar
# SEA Challenge - Client Registration System

This is a full-stack web application with **separated frontend and backend** components.

- The **frontend** is built with **React**, **Vite**, and **TailwindCSS**.
- The **backend** is built with **Java**, **Spring Boot**, **Hibernate**, **Maven**, **Lombok**, and uses **JWT-based authentication** with **role-based access control (RBAC)**.

---

## 📁 Project Structure

backend-challenge/
├── backend/ # Spring Boot (REST API)
└── frontend/ # React + Vite + Tailwind (UI)

yaml
Copiar
Editar

---

## ✅ Requirements

### Backend
- Java 17+
- Maven 3+
- MySQL 8+ (or compatible)

### Frontend
- Node.js 18+
- Yarn or npm

---

## ⚙️ Backend Setup

### 1. Clone the repository and go to the backend folder:

```bash
git clone https://github.com/lucas-s-guedes/backend-challenge.git
cd backend-challenge/backend
2. Create the MySQL database:
sql
Copiar
Editar
CREATE DATABASE sea_backend;
3. Configure application.properties:
Edit the file:
src/main/resources/application.properties

properties
Copiar
Editar
spring.datasource.url=jdbc:mysql://localhost:3306/sea_backend
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Swagger
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
4. Start the backend server:
bash
Copiar
Editar
./mvnw spring-boot:run
The backend API will be available at:
📍 http://localhost:8080

Swagger UI (API documentation):
📍 http://localhost:8080/swagger-ui.html

🔑 Authentication & Roles
JWT is used for stateless authentication.

On successful login, the server returns a JWT token.

Include the token in the Authorization header for protected endpoints:

makefile
Copiar
Editar
Authorization: Bearer <your_token>
Users have roles such as ROLE_USER or ROLE_ADMIN.

Backend routes are secured using Spring Security + role-based access.

🎨 Frontend Setup
1. Go to the frontend folder:
bash
Copiar
Editar
cd ../frontend
2. Install dependencies:
bash
Copiar
Editar
npm install
# or
yarn
3. Configure the API URL:
Create a .env file (or edit it if it already exists):

env
Copiar
Editar
VITE_API_URL=http://localhost:8080/api
4. Start the frontend server:
bash
Copiar
Editar
npm run dev
# or
yarn dev
Frontend will run at:
📍 http://localhost:8081

✅ Ensure vite.config.ts includes:

ts
Copiar
Editar
export default defineConfig({
  server: {
    port: 8081,
  },
});
🔐 Features
Secure login with JWT

Role-based access control (RBAC)

CRUD operations for clients

Auto address filling via ViaCEP API

Responsive UI with TailwindCSS

Swagger/OpenAPI for API documentation

🧪 Testing
Backend
bash
Copiar
Editar
./mvnw test
⚙️ Technologies Used
Backend
Java 17

Spring Boot 3.5

Spring Security

Hibernate (JPA)

Lombok

JWT (jjwt)

Maven

MySQL

SpringDoc OpenAPI

Frontend
React 18

Vite

TailwindCSS

TypeScript (optional)

shadcn/ui components

React Context API

Fetch API or Axios

🚀 Future Improvements
JWT refresh token support

Admin user management panel

Cloud deployment (e.g., Railway + Vercel)

Email verification and password reset

Pagination and filtering on client list

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss the proposed change.

📄 License
This project is licensed under the MIT License.

👤 Author
Lukas Guedes
📧 your-email@example.com
🔗 github.com/lucas-s-guedes
🚀 SEA Challenge - 2025
