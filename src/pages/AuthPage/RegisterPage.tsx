import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import {
  register as registerUser,
  loginWithGoogle,
} from '../../utils/authService';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.scss';

type FormData = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: 'User',
          photoURL: '/img/default-user.png',
        });
      }

      toast.success('Реєстрація пройшла успішно!');

      navigate('/');
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        err.code === 'auth/email-already-in-use'
      ) {
        toast.error(
          'Користувач з таким email вже існує. Увійдіть або використайте інший email.',
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Сталася помилка при реєстрації');
      }
    }
  };

  const handleGoogle = async () => {
    try {
      setError(null);
      await loginWithGoogle();

      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google login failed');
      }
    }
  };

  return (
    <div className="register-page">
      <h1>Create Account</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form"
      >
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true, minLength: 6 })}
        />

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Register'}
        </button>
      </form>

      <div className="divider">or</div>

      <button
        onClick={handleGoogle}
        className="google-button"
      >
        Sign up with Google
      </button>
    </div>
  );
};
