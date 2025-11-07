import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { validateEmail, validatePassword } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import { toast } from "sonner";

const Auth = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.warning("Invalid email address");
      return;
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError !== null) {
      toast.warning(passwordError);
      return;
    }

    const success = await signIn(formData.email, formData.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <Card className="border-0 bg-white/5 backdrop-blur-sm shadow-card">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Link2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Welcome back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your shortened URLs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-8 flex flex-col "
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground"
                  required
                />
              </div>

              <div className="relative space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[30px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="text-center text-sm flex flex-col gap-4">
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-1/2 cursor-pointer mx-auto"
                >
                  Sign In
                </Button>
                <Link
                  to="/auth/signup"
                  className="text-primary hover:text-primary-glow transition-colors"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
