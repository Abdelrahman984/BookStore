import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const Orders = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: api.getOrders,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin m-6" />
      </div>
    );
  if (error)
    return <div className="p-6 text-red-500">Failed to load orders</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-0 shadow-elevated">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data!.map((o) => (
            <Link
              to={`/order-success/${o.id}`}
              key={o.id}
              className="block p-3 rounded-lg hover:bg-muted/30"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {o.customerName} — {o.customerEmail}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold">${o.total.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
