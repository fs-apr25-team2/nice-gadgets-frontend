import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormData } from '../../../types/types';
import { GoogleButton } from '../../../ui/icons/GoogleButton';
import { OpenEye } from '../../../ui/icons/OpenEye';
import { CloseEye } from '../../../ui/icons/CloseEye';

import './AuthForm.scss';

type AuthFormProps = {
  title: string;
  onSubmit: (data: FormData) => Promise<void>;
  register: ReturnType<typeof useForm<FormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<FormData>>['handleSubmit'];
  errors: ReturnType<typeof useForm<FormData>>['formState']['errors'];
  isRegister?: boolean;
  isSubmitting: boolean;
  linkPath: string;
  linkText: string;
  buttonText: string;
  onGoogleClick?: () => void;
};

export const AuthForm = ({
  title,
  onSubmit,
  isRegister = false,
  isSubmitting,
  linkPath,
  linkText,
  buttonText,
  onGoogleClick,
}: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="auth">
      <div className="auth__box">
        <h2 className="auth__title">{title}</h2>

        <form
          className="auth__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isRegister && (
            <label className="auth__label">
              {t('form.label.name')}
              <input
                type="text"
                placeholder={t('form.placeHolder.name')}
                {...register('name', {
                  required: t('form.error.requiredName') as string,
                  minLength: {
                    value: 2,
                    message: t('form.error.requiredNameTwoChars'),
                  },
                  validate: (value) =>
                    typeof value === 'string' && value.trim().length > 0 ?
                      true
                    : t('form.error.emptyName'),
                })}
                className="auth__input"
              />
              {errors.name && (
                <p className="auth__error">{errors.name.message}</p>
              )}
            </label>
          )}

          <label className="auth__label">
            {t('form.label.email')}
            <input
              type="email"
              placeholder={t('form.placeHolder.email')}
              {...register('email', {
                required: t('form.error.requiredEmail') as string,
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: t('form.error.invalidEmailAddress'),
                },
                validate: (value) =>
                  value.trim().length > 0 ||
                  (t('form.error.emptyEmail') as string),
              })}
              className="auth__input"
            />
            {errors.email && (
              <p className="auth__error">{errors.email.message}</p>
            )}
          </label>

          <label className="auth__label">
            {t('form.label.password', 'Password')}
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="******"
              {...register('password', {
                required: t('form.error.requiredPassword') as string,
                minLength: {
                  value: 6,
                  message: t('form.error.requiredPasswordSixChars'),
                },
                validate: (value) =>
                  value.trim().length > 0 ||
                  (t('form.error.emptyPassword') as string),
              })}
              className="auth__input"
            />
            <button
              type="button"
              className="auth__toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ?
                <OpenEye />
              : <CloseEye />}
            </button>
            {errors.password && (
              <p className="auth__error">{errors.password.message}</p>
            )}
          </label>

          <button
            className="auth__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('form.submitting') : buttonText}
          </button>
        </form>

        {onGoogleClick && (
          <>
            <div className="auth__text">
              {t('form.orContinue', 'Or Continue With')}
            </div>
            <button
              className="auth__button auth__button--google"
              onClick={onGoogleClick}
            >
              <GoogleButton />
              {t('form.googleButton', 'Google Account')}
            </button>
          </>
        )}

        <p className="auth__text">
          {linkText}{' '}
          <Link
            to={linkPath}
            className="auth__text auth__text--link"
          >
            {isRegister ? t('form.signInTitle') : t('form.signUpTitle')}
          </Link>
        </p>
      </div>
    </section>
  );
};
