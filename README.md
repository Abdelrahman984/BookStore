# BookStore Full-Stack Project

This is a full-stack Book Store application consisting of a **frontend** built with React and Vite, and a **backend API** built with .NET Core using Clean Architecture. The project is fully deployed online and ready to use.

- Go to [BookStoreApi](https://github.com/Abdelrahman984/BookStoreApi.git)
---

## Project Overview

### Features

* Display a list of books with details
* Shopping cart functionality
* Checkout process with order summary and payment method
* Order management via backend API
* MS SQL Server database with seeded data

### Tech Stack

**Frontend:**

* React + TypeScript
* Vite
* TailwindCSS + ShadCN UI
* TanStack Query
* React Router v6

**Backend:**

* .NET Core 9
* Clean Architecture
* Entity Framework Core
* MS SQL Server
* AutoMapper & DTOs

---

## Demo

* Frontend: [BookStore Frontend](https://book-store-k9135yelb-abdelrahman984s-projects.vercel.app/)
* Backend API: [BookStore API](https://bookrstoreapi.runasp.net/swagger/index.html)

---

## Setup Instructions

### Backend

1. Clone the backend repository:

```bash
git clone https://github.com/Abdelrahman984/BookStoreApi.git
```

2. Configure your SQL Server connection in `appsettings.json` or User Secrets:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=BookStoreDb;user=root;password=yourpassword"
}
```

3. Apply migrations and seed the database:

```bash
dotnet ef database update
```

4. Run the API:

```bash
dotnet run --project CleanArchitecture.Api
```

### Frontend

1. Clone the frontend repository:

```bash
git clone https://github.com/Abdelrahman984/BookStore.git
```

2. Install dependencies:

```bash
npm install
```

3. Set the backend API URL in `.env`:

```
VITE_API_URL=https://bookrstoreapi.runasp.net
```

4. Start the development server:

```bash
npm run dev
```

---

## Deployment Notes

* Frontend is deployed on **Vercel**.
* Backend is deployed on **Monster Asp.Net**.
* Ensure `VITE_API_URL` in the frontend points to the deployed backend URL.
* CORS is configured on the backend to allow frontend requests.

---

## Contributing

Contributions are welcome! Please submit pull requests for bug fixes or feature improvements.

---

## License

This project is open-source and available under the MIT License.
