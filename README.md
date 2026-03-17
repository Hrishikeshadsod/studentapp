# Student Management System (Full Stack)

A full-stack web application to manage student records with CRUD operations, built using Spring Boot, MySQL, and React. The project also includes a custom-built API testing tool for backend debugging.

---

## Features

* Add, Update, Delete Students
* View all students
* REST API with full CRUD support
* MySQL database integration
* React frontend (interactive UI)
* Custom API Testing Tool (Thymeleaf-based)
* Input validation and error handling

---

## Tech Stack

**Backend:**

* Java
* Spring Boot
* Spring Data JPA
* Hibernate

**Frontend:**

* React.js
* Bootstrap

**Database:**

* MySQL

**Tools:**

* Git & GitHub
* Eclipse IDE

---

## Project Structure

```
studentapp/
 ├── src/main/java/com/example
 │    ├── StudentRestController.java
 │    ├── ApiToolController.java
 │    ├── Student.java
 │    ├── StudentRepository.java
 │
 ├── src/main/resources
 │    ├── templates/
 │    │    └── apitool.html
 │    ├── application.properties
 │
 ├── .gitignore
 ├── pom.xml
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/Hrishikeshadsod/studentapp.git
cd studentapp
```

---

### 2. Setup MySQL

```
CREATE DATABASE studentdb;
```

Update `application.properties`:

```
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

### 3. Run the application

From Eclipse:

```
Run As → Java Application
```

OR using terminal:

```
./mvnw spring-boot:run
```

---

## API Endpoints

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /students      | Get all students |
| POST   | /students      | Add new student  |
| PUT    | /students/{id} | Update student   |
| DELETE | /students/{id} | Delete student   |

---

## API Testing Tool

Access the internal tool at:

```
http://localhost:8080/apitool
```

Features:

* Send GET, POST, PUT, DELETE requests
* Provide JSON body
* View API responses instantly

---

## Security Note

* Sensitive data like database passwords are excluded using `.gitignore`
* Git history cleaned to remove credentials

---

## Future Improvements

* Add authentication (Spring Security + JWT)
* Pagination and search
* Deploy to cloud (Render / Railway)
* Improve UI design

---

## Author

Hrishikesh Adsod

---

## If you like this project

Consider giving it a star on GitHub.
