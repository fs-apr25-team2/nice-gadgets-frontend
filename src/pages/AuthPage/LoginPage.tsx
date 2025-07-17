import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';

import { login, loginWithGoogle } from '../../utils/authService';
import { FormData } from '../../types/types';
import { AuthForm } from './components/AuthForm';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';

export const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const error = err as FirebaseError;

      const errorMessages: Record<string, string> = {
        'auth/user-not-found':
          'No user found with this email. Please register.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-credential':
          'Invalid credentials or account does not exist.',
      };

      toast.error(
        errorMessages[error.code] || 'An error occurred during login.',
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Google login failed';
      toast.error(message);
    }
  };

  return (
    <section>
      <div className="catalog-page__breadcrumb">
        <Breadcrumbs />
      </div>
      <AuthForm
        title="Sign In"
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleLogin}
        isRegister={false}
        isSubmitting={isSubmitting}
        linkPath="/register"
        linkText="Don't have an account?"
        buttonText="Login"
        onGoogleClick={handleGoogleLogin}
      />
    </section>
  );
};
