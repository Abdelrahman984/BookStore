import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const OrderSuccess = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id],
    queryFn: () => api.getOrder(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen grid place-items-center text-center">
        <p className="text-red-500 mb-4">Could not load order.</p>
        <Link to="/books">
          <Button>Back to Books</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-10">
        <Card className="max-w-2xl mx-auto border-0 shadow-elevated">
          <CardHeader>
            <CardTitle>Thanks! Your order is confirmed 🎉</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Order ID: <span className="font-mono">{data.id}</span>
            </p>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {data.customer.name} — {data.customer.email}
              </p>
              <p>
                <span className="font-medium">Shipping:</span>{" "}
                {data.customer.address}
              </p>
              <p className="text-lg font-semibold">
                Total: ${data.total.toFixed(2)}
              </p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p className="font-medium">Items</p>
              <ul className="space-y-1">
                {data.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span>
                      {it.bookTitle ?? it.bookId} × {it.quantity}
                    </span>
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 flex gap-3">
              <Link to="/books">
                <Button>Continue Shopping</Button>
              </Link>
              <Link to="/orders">
                <Button variant="outline">View All Orders</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderSuccess;
