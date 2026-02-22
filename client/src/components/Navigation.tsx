import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  Search, 
  Home, 
  Heart,
  UserCircle,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useLogoutMutation } from "@/store/auth/authApi";
import { logout as logoutAction } from "@/store/auth/authSlice";
import { toast } from "sonner";

interface NavigationProps {
  transparent?: boolean;
}

export const Navigation = ({ transparent = false }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const isLoggedIn = isAuthenticated;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      navigate("/");
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(logoutAction());
      navigate("/");
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      transparent 
        ? "bg-transparent" 
        : "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className={cn(
              "text-xl font-bold",
              transparent ? "text-white" : "text-foreground"
            )}>
              Access Crip
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/explore" 
              className={cn(
                "hover:text-primary transition-colors",
                transparent ? "text-white/90 hover:text-white" : "text-muted-foreground"
              )}
            >
              Explore
            </Link>
            <Link 
              to="/list-property" 
              className={cn(
                "hover:text-primary transition-colors",
                transparent ? "text-white/90 hover:text-white" : "text-muted-foreground"
              )}
            >
              List Your Property
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "hover:text-primary transition-colors",
                transparent ? "text-white/90 hover:text-white" : "text-muted-foreground"
              )}
            >
              About
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <Button
                  variant={transparent ? "glass" : "ghost"}
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>{user?.name || "Account"}</span>
                </Button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-border py-2 z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-primary mt-1 capitalize">{user?.role}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/favorites" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Heart className="w-4 h-4 inline mr-2" />
                      Favorites
                    </Link>
                    {user?.role === 'owner' && (
                      <Link 
                        to="/list-property" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        List Property
                      </Link>
                    )}
                    <hr className="my-2" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant={transparent ? "glass" : "ghost"} size="sm" asChild>
                  <Link to="/auth/login">Sign In</Link>
                </Button>
                <Button variant={transparent ? "hero" : "default"} size="sm" asChild>
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant={transparent ? "glass" : "ghost"}
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/explore"
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Explore
              </Link>
              <Link
                to="/list-property"
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                List Your Property
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                About
              </Link>
              
              {isLoggedIn ? (
                <div className="pt-4 space-y-2 border-t border-border mt-4">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                  >
                    Favorites
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth/login">Sign In</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/auth/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};