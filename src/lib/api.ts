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

// Order shapes as backend returns
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

// Payload for POST
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

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5068";

export const api = {
  getBooks: async (): Promise<Book[]> => {
    const res = await fetch(`${API_BASE_URL}/api/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  },

  getBook: async (id: string): Promise<Book> => {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return res.json();
  },

  // POST /api/orders
  createOrder: async (order: OrderCreatePayload): Promise<{ id: string }> => {
    const res = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
    const res = await fetch(`${API_BASE_URL}/api/orders/${id}`);
    if (!res.ok) throw new Error("Failed to fetch order");
    return res.json();
  },

  // GET /api/orders
  getOrders: async (): Promise<OrderSummary[]> => {
    const res = await fetch(`${API_BASE_URL}/api/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },
};
