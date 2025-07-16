import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';
import { login, loginWithGoogle } from '../../utils/authService';
import './LoginPage.scss';

type FormData = {
  email: string;
  password: string;
};

const errorMessages: Record<string, string> = {
  'auth/user-not-found':
    'Користувача з таким email не знайдено. Зареєструйтесь.',
  'auth/wrong-password': 'Невірний пароль. Спробуйте ще раз.',
  'auth/invalid-credential': 'Неправильні облікові дані або акаунт не існує.',
};

export const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setError(null);
      await login(data.email, data.password);

      toast.success('Вхід успішний!');

      navigate('/');

      reset();
    } catch (err) {
      const error = err as FirebaseError;

      if (errorMessages[error.code]) {
        toast.error(errorMessages[error.code]);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Сталася помилка при вході');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await loginWithGoogle();

      navigate('/');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Google login failed';
      setError(message);
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login__form"
      >
        <input
          type="email"
          placeholder="Email"
          className="login__input"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login__input"
          {...register('password', { required: true })}
        />

        {error && <p className="login__error">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="login__btn"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="login__divider">or</div>

      <button
        onClick={handleGoogleLogin}
        className="login__btn login__btn--google"
      >
        Sign in with Google
      </button>
    </div>
  );
};
