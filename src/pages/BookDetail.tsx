import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => api.getBook(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Book Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The book you're looking for doesn't exist.
          </p>
          <Button asChild variant="outline">
            <Link to="/books">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Books
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/books">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Books
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Book Cover */}
          <div className="flex justify-center lg:justify-start">
            <Card className="overflow-hidden border-0 shadow-book max-w-md w-full">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </Card>
          </div>

          {/* Book Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book.author}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${book.price.toFixed(2)}
                </span>
                {book.stock && book.stock > 0 ? (
                  <Badge variant="secondary">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            {book.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              {book.isbn && (
                <div>
                  <span className="font-medium">ISBN:</span>
                  <p className="text-muted-foreground">{book.isbn}</p>
                </div>
              )}
              {book.genre && (
                <div>
                  <span className="font-medium">Genre:</span>
                  <p className="text-muted-foreground">{book.genre}</p>
                </div>
              )}
              {book.publicationDate && (
                <div>
                  <span className="font-medium">Published:</span>
                  <p className="text-muted-foreground">
                    {book.publicationDate}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-gradient-warm text-primary-foreground hover:opacity-90 transition-opacity"
              disabled={book.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
