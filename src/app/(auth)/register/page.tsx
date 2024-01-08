import { RegisterForm } from "@/components/forms/form.-register";
import { AuthFormCard } from "@/app/(auth)/_components/card-auth";

function Register() {
  return (
    <AuthFormCard
      title="Create New Account"
      description="Participate, Share, Decide: Create Your Polls Today!"
    >
      <RegisterForm />
    </AuthFormCard>
  );
}

export default Register;
