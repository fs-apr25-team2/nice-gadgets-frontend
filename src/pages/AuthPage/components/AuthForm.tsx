import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
              Name
              <input
                type="text"
                placeholder="Enter your name"
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                  validate: (value) =>
                    typeof value === 'string' && value.trim().length > 0 ?
                      true
                    : 'Name cannot be empty or spaces only',
                })}
                className="auth__input"
              />
              {errors.name && (
                <p className="auth__error">{errors.name.message}</p>
              )}
            </label>
          )}

          <label className="auth__label">
            Email
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email address',
                },
                validate: (value) =>
                  value.trim().length > 0 ||
                  'Email cannot be empty or spaces only',
              })}
              className="auth__input"
            />
            {errors.email && (
              <p className="auth__error">{errors.email.message}</p>
            )}
          </label>

          <label className="auth__label">
            Password
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="******"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                validate: (value) =>
                  value.trim().length > 0 || 'Password cannot be only spaces',
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
            {isSubmitting ? 'Submitting...' : buttonText}
          </button>
        </form>

        {onGoogleClick && (
          <>
            <div className="auth__text">Or Continue With</div>
            <button
              className="auth__button auth__button--google"
              onClick={onGoogleClick}
            >
              <GoogleButton />
              Google Account
            </button>
          </>
        )}

        <p className="auth__text">
          {linkText}{' '}
          <Link
            to={linkPath}
            className="auth__text auth__text--link"
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </section>
  );
};
