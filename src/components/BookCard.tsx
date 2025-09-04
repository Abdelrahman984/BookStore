import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Book } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(book);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-book border-0 bg-card">
      <Link to={`/books/${book.id}`}>
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-card-foreground line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">by {book.author}</p>
          <p className="text-lg font-bold text-primary">
            ${book.price.toFixed(2)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-warm text-primary-foreground hover:opacity-90 transition-opacity"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
