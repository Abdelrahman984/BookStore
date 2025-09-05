const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5068";

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  description?: string;
  isbn?: string;
  genre?: string;
  publicationDate?: string;
  stock?: number;
}
export interface OrderItemRead {
  bookId: string;
  bookTitle?: string;
  quantity: number;
  price: number;
}
export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
}
export interface OrderRead {
  id: string;
  customer: CustomerInfo;
  total: number;
  items: OrderItemRead[];
  createdAt: string;
}
export interface OrderSummary {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  createdAt: string;
}
export interface OrderCreatePayload {
  customerName: string;
  customerEmail: string;
  total: number;
  items: Array<{
    bookId: string;
    quantity: number;
    price: number;
  }>;
}
export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // GET /api/books
  getBooks: async (): Promise<Book[]> => {
    const res = await fetch(`${API_BASE_URL}/api/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  },

  // GET /api/books/{id}
  getBook: async (id: string): Promise<Book> => {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return res.json();
  },

  // POST /api/orders
  createOrder: async (order: OrderCreatePayload): Promise<{ id: string }> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to create order");
    }
    // CreatedAtAction returns raw id (Guid) in body per controller above
    return res.json();
  },

  // GET /api/orders/{id}
  getOrder: async (id: string): Promise<OrderRead> => {
    const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch order");
    return res.json();
  },

  // GET /api/orders
  getOrders: async (): Promise<OrderSummary[]> => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },

  // POST /api/auth/login
  login: async (data: { email: string; password: string }): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to login");
    return response.json();
  },

  // POST /api/auth/register
  register: async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to register");
    return response.json();
  },
};
