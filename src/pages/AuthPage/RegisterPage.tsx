import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';

import {
  register as registerUser,
  loginWithGoogle,
} from '../../utils/authService';
import { auth } from '../../utils/firebase';
import { FormData } from '../../types/types';
import { AuthForm } from './components/AuthForm';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';

export const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleRegister = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: data.name,
          photoURL: '/img/default-user.png',
        });
      }

      toast.success('Registration successful!');
      navigate('/');
    } catch (err: unknown) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use':
          'An account with this email already exists.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/weak-password': 'Password must be at least 6 characters.',
        'auth/unauthorized-domain': 'This domain is not authorized.',
        'auth/network-request-failed':
          'Network error. Please check your connection.',
      };

      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        typeof err.code === 'string'
      ) {
        toast.error(errorMessages[err.code] || 'Registration failed.');
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Unknown registration error.');
      }
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch {
      toast.error('Google login failed');
    }
  };

  return (
    <section>
      <div className="catalog-page__breadcrumb">
        <Breadcrumbs />
      </div>
      <AuthForm
        title="Sign Up"
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleRegister}
        isRegister
        isSubmitting={isSubmitting}
        linkPath="/login"
        linkText="Already have an account?"
        buttonText="Sign Up"
        onGoogleClick={handleGoogle}
      />
    </section>
  );
};
