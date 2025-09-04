import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";

const NavBar = () => {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              BookHaven
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/books"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/books"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Books
            </Link>
            <Link
              to="/orders"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === "/orders"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Orders
            </Link>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild className="relative">
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground"
                  >
                    {itemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 text-sm font-medium transition-colors hover:text-primary"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
