import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { login } = useAuth();

  const registerMutation = useMutation({
    mutationFn: api.register,
    onSuccess: (user) => {
      login(user);
      toast({
        title: "Account created!",
        description: `Welcome, ${user.name}`,
      });
      navigate("/books");
    },
    onError: () => {
      toast({
        title: "Registration failed",
        description: "Please try again",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 space-y-6 bg-card rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
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
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          ) : (
            "Register"
          )}
        </Button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
