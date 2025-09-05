import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingCart, Heart, Star } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-warm bg-clip-text text-transparent mb-6">
              Welcome to BookHaven
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover your next favorite book from our carefully curated
              collection. From bestsellers to hidden gems, find stories that
              inspire and captivate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-warm text-primary-foreground"
              >
                <Link to="/books">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Our Collection
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/cart">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vast Collection</h3>
              <p className="text-muted-foreground">
                Thousands of books across all genres, from fiction to
                non-fiction
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
              <p className="text-muted-foreground">
                Handpicked books by our team of literary enthusiasts
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-muted-foreground">
                Competitive pricing with free shipping on all orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Reading?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of readers who trust BookHaven for their literary
            journey
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-warm text-primary-foreground"
          >
            <Link to="/books">Start Shopping Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
