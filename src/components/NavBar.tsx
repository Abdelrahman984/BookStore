import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeSwitcher } from "./ui/shadcn-io/theme-switcher";

const NavBar = () => {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
    ${
      theme === "dark"
        ? "bg-neutral-900 border-neutral-800"
        : "bg-background border-b"
    }
  `}
    >
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 ${
          theme === "dark" ? "text-neutral-100" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen
              className={`h-8 w-8 ${
                theme === "dark" ? "text-yellow-400" : "text-primary"
              }`}
            />
            <span
              className={`text-xl font-bold bg-gradient-warm bg-clip-text text-transparent ${
                theme === "dark" ? "text-yellow-400" : ""
              }`}
            >
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

          <div className="flex items-center space-x-4">
            {/* Cart */}
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
            <ThemeSwitcher
              defaultValue="system"
              onChange={toggleTheme}
              value={theme}
            />

            {user ? (
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-neutral-200" : ""
                  }`}
                >
                  Hello, {user.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className={
                    theme === "dark"
                      ? "border-neutral-700 text-neutral-200 hover:bg-neutral-800"
                      : ""
                  }
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div
                className={`border w-fit rounded-xl m-5 shadow-sm ${
                  theme === "dark" ? "border-neutral-700 bg-neutral-900" : ""
                }`}
              >
                <button
                  className={`px-2 py-1 rounded-l-xl  m-0 bg-yellow-400 hover:bg-yellow-300 transition ${
                    theme === "dark" ? "text-neutral-900" : ""
                  }`}
                >
                  <Link className="text-sm" to="/login">
                    Login
                  </Link>
                </button>
                <button
                  className={`px-2 py-1 rounded-r-xl bg-neutral-50 hover:bg-neutral-100 transition ${
                    theme === "dark"
                      ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-200"
                      : ""
                  }`}
                >
                  <Link className="text-sm" to="/register">
                    Register
                  </Link>
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
