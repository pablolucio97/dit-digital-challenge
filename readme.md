# DTI Digital Assignment

This repository contains two applications required for the assignment: one for the **server** and another for the **web** interface.

---

## Server Application

### Technologies Used:
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**
- **Jest**

### Steps to Run the Server Application

1. Clone the repository.
2. Navigate to the server directory (`dti-digital-challenge-server`).
3. Run `npm install` to install the dependencies.
4. Create a `.env` file based on the `.env.example` file and provide the required environment variables.
5. Run `docker-compose up` to start the database and the server.
6. In a separated terminal, with the server application running on Docker, run `npx prisma migrate dev --name initial-migration` to apply the initial database migrations.

#### Running Tests
- To run tests, navigate to the server directory and execute: `npm run test`.

---

## Web Application

### Technologies Used:
- **React**
- **React Router DOM**
- **Vite**
- **Tailwind CSS**
- **ShadCN**
- **Zustand**
- **Vitest**
- **React Testing Library**

### Steps to Run the Web Application

1. Clone the repository.
2. Navigate to the web directory (`dti-digital-challenge-web`).
3. Run `npm install` to install the dependencies.
4. Create a `.env` file based on the `.env.example` file and provide the required environment variables.
5. Run `npm run dev` to start the application. By default, the application will be accessible at [http://localhost:5173](http://localhost:5173).

#### Running Tests
- To run tests, navigate to the web directory and execute: `npm run test`.

---

### Important Notes
- Ensure the server application is running before starting the web application to avoid connection issues.
- Prisma only supports Node.js >= 18.18. Recommended versions is Node 20 or higher.
- If you have any questions or issues, feel free to [contact me via WhatsApp](https://api.whatsapp.com/send?phone=5531985187963&text=Hello).


