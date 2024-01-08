import { AuthFormCard } from "@/app/(auth)/_components/card-auth";
import { LoginForm } from "@/components/forms/form-login";

function Login() {
  return (
    <AuthFormCard title="Welcome back" description="Login in to your account">
      <LoginForm />
    </AuthFormCard>
  );
}

export default Login;
