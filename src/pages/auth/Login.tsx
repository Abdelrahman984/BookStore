import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const loginMutation = useMutation({
    mutationFn: api.login,
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${user.name}`,
      });
      navigate(from, { replace: true });
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-6 bg-card rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Login"
          )}
        </Button>
        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
