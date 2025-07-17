import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { login, loginWithGoogle } from '../../utils/authService';
import { FormData } from '../../types/types';
import { AuthForm } from './components/AuthForm';
import { Breadcrumbs } from '../../ui/components/Breadcrumbs';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      toast.success(t('toast.loginSuccess'));
      navigate('/');
    } catch (err) {
      const error = err as FirebaseError;

      const errorMessages: Record<string, string> = {
        'auth/user-not-found': t('form.error.userNotFound'),
        'auth/wrong-password': t('form.error.wrongPassword'),
        'auth/invalid-credential': t('form.error.invalidCredential'),
      };

      toast.error(errorMessages[error.code] || t('form.error.unknownLogin'));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch {
      toast.error(t('form.error.googleLoginFailed'));
    }
  };

  return (
    <section>
      <div className="catalog-page__breadcrumb">
        <Breadcrumbs />
      </div>
      <AuthForm
        title={t('form.signInTitle')}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleLogin}
        isRegister={false}
        isSubmitting={isSubmitting}
        linkPath="/register"
        linkText={t('form.noAccount')}
        buttonText={t('form.loginBtn')}
        onGoogleClick={handleGoogleLogin}
      />
    </section>
  );
};
