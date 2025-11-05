import { Button } from "../../components/ui/button";
import { Link2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 pt-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Link2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">ZipLinks</span>
          </div>

          {/* desktop */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/shorten"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Shorten
            </a>
            <a
              href="/geo-redirect"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Geo-Redirect
            </a>
            <a href="/auth">
              <Link to="/auth/signin">
                <Button variant="gradient" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </a>
          </div>

          {/* mobile */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col items-center gap-4">
              <a
                href="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/shorten"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Shorten
              </a>
              <a
                href="/geo-redirect"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Geo-Redirect
              </a>
              <div className="pt-2">
                <Link to="/auth/signin">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="w-full cursor-pointer"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
