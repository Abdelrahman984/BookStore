import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import BookCard from "@/components/BookCard";
import { Loader2 } from "lucide-react";

const Books = () => {
  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: api.getBooks,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">
            Error Loading Books
          </h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Our Book Collection
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover your next great read
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books?.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books?.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-muted-foreground mb-2">
              No books found
            </h2>
            <p className="text-muted-foreground">
              Check back later for new arrivals!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books;
