This is a complete full-stack system with separated frontend and backend components.

The frontend is built with React, Vite, and TailwindCSS.
The backend is built with Java, Spring Boot, Hibernate, Maven, Lombok, and uses JWT-based authentication with role-based access control (RBAC).
📁 Project Structure
sea-challenge/ ├── backend/ # Spring Boot (API) └── frontend/ # React + Vite + Tailwind (UI)

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
cd ../frontend

2. Install dependencies:
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
npm run dev
# or
yarn dev
The frontend will run on:
📍 http://localhost:8081

✅ The frontend is configured to interact with the backend at port 8080.

🔧 If necessary, make sure vite.config.ts includes:

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

Frontend
React 18

Vite

Tailwind CSS

Fetch API

🚀 Future Improvements
Refresh token system

Email verification & password reset

Pagination and filtering for clients

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

📄 License
This project is licensed under the MIT License.

👤 Author
Lucas Guedes
📧 lucassgpr14@gmail.com
🚀 SEA Challenge - 2025
