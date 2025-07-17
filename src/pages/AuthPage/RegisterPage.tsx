import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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

      toast.success(t('toast.registerSuccess'));
      navigate('/');
    } catch (err: unknown) {
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': t('form.error.emailAlreadyInUse'),
        'auth/invalid-email': t('form.error.invalidEmail'),
        'auth/weak-password': t('form.error.weekPassword'),
        'auth/unauthorized-domain': t('form.error.unauthorized-domain'),
        'auth/network-request-failed': t('form.error.networkRequestFailed'),
      };

      if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        typeof err.code === 'string'
      ) {
        toast.error(
          errorMessages[err.code] || t('form.error.registrationFailed'),
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(t('form.error.unknownRegistration'));
      }
    }
  };

  const handleGoogle = async () => {
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
        title={t('form.signUpTitle')}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={handleRegister}
        isRegister
        isSubmitting={isSubmitting}
        linkPath="/login"
        linkText={t('form.haveAccount')}
        buttonText={t('form.registerBtn')}
        onGoogleClick={handleGoogle}
      />
    </section>
  );
};
