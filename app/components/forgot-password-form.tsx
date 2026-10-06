'use client';

import React, { useState, useEffect, useActionState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { sendPasswordResetOTP, resetPasswordWithOTP } from '@/app/utils/actions';

const initialSendState = {
  success: false,
  message: '',
  email: '',
  username: '',
};

const initialResetState = {
  success: false,
  message: '',
};

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<'request' | 'verify' | 'completed'>('request');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [sendState, sendAction, isSending] = useActionState(
    sendPasswordResetOTP,
    initialSendState
  );

  const [resetState, resetAction, isResetting] = useActionState(
    resetPasswordWithOTP,
    initialResetState
  );

  // 60-second countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendTimer]);

  // Handle successful OTP send response
  useEffect(() => {
    if (sendState?.success) {
      setStep('verify');
      setResendTimer(60);
    }
  }, [sendState]);

  // Handle successful password reset response
  useEffect(() => {
    if (resetState?.success) {
      setStep('completed');
    }
  }, [resetState]);

  const handleResendCode = async () => {
    if (resendTimer > 0 || isSending) return;
    const formData = new FormData();
    formData.append('emailOrUsername', emailOrUsername);
    await sendAction(formData);
  };

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 py-8 text-gray-800 shadow-md">
      <h1 className="mb-3 text-2xl font-semibold">
        {step === 'request' && 'Forgot Password'}
        {step === 'verify' && 'Reset Password'}
        {step === 'completed' && 'Password Reset Complete'}
      </h1>

      {step === 'request' && (
        <form action={sendAction} className="space-y-4">
          <p className="text-sm text-gray-600">
            Enter your registered email address or username to receive a temporary verification code.
          </p>

          {sendState?.message && !sendState?.success && (
            <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2.5 rounded-md border border-red-200">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
              <span>{sendState.message}</span>
            </div>
          )}

          <div>
            <label
              className="mb-2 block text-xs font-medium text-gray-900"
              htmlFor="emailOrUsername"
            >
              Email address or Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-12 pr-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="emailOrUsername"
                type="text"
                name="emailOrUsername"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter your email address or username"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="flex justify-center items-center mt-4 w-full bg-sky-200 hover:bg-sky-300 text-slate-800 font-medium px-3 py-2 rounded-full transition disabled:opacity-50"
          >
            <span>{isSending ? 'Sending Code...' : 'Send Verification Code'}</span>
            <ArrowRightIcon className="ml-2 h-5 w-5 text-slate-700" />
          </button>

          <div className="text-center mt-4">
            <Link href="/login" className="text-xs text-sky-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      )}

      {step === 'verify' && (
        <form action={resetAction} className="space-y-4">
          <p className="text-sm text-gray-600">
            A 6-digit verification code has been sent to your email. Please enter the code and set your new password below.
          </p>

          {sendState?.message && sendState?.success && (
            <div className="flex items-center space-x-2 text-green-700 text-sm bg-green-50 p-2.5 rounded-md border border-green-200">
              <CheckCircleIcon className="h-5 w-5 shrink-0" />
              <span>{sendState.message}</span>
            </div>
          )}

          {resetState?.message && !resetState?.success && (
            <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2.5 rounded-md border border-red-200">
              <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
              <span>{resetState.message}</span>
            </div>
          )}

          <input type="hidden" name="emailOrUsername" value={emailOrUsername} />

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-900" htmlFor="otpCode">
              Verification Code (OTP)
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-12 pr-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900 tracking-widest font-mono"
                id="otpCode"
                type="text"
                name="otpCode"
                placeholder="123456"
                maxLength={6}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-900" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-12 pr-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="newPassword"
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                minLength={6}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-gray-900" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-12 pr-3 text-sm outline-2 placeholder:text-gray-500 text-gray-900"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                minLength={6}
                required
              />
              <KeyIcon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isResetting}
            className="flex justify-center items-center mt-4 w-full bg-sky-200 hover:bg-sky-300 text-slate-800 font-medium px-3 py-2 rounded-full transition disabled:opacity-50"
          >
            <span>{isResetting ? 'Resetting Password...' : 'Reset Password'}</span>
            <ArrowRightIcon className="ml-2 h-5 w-5 text-slate-700" />
          </button>

          <div className="flex justify-between items-center text-xs mt-4 pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendTimer > 0 || isSending}
              className="text-sky-600 hover:underline disabled:opacity-50 disabled:no-underline font-medium"
            >
              {resendTimer > 0 ? `Resend code in ${resendTimer}s` : isSending ? 'Sending...' : 'Resend Code'}
            </button>

            <button
              type="button"
              onClick={() => setStep('request')}
              className="text-gray-500 hover:underline"
            >
              Change Email / Username
            </button>
          </div>
        </form>
      )}

      {step === 'completed' && (
        <div className="space-y-4 text-center py-4">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-14 w-14 text-green-500" />
          </div>
          <p className="text-gray-700 font-medium">
            {resetState.message || 'Your password has been successfully reset!'}
          </p>
          <div className="pt-4">
            <Link
              href="/login"
              className="inline-flex justify-center items-center bg-sky-200 hover:bg-sky-300 text-slate-800 font-medium px-6 py-2.5 rounded-full transition"
            >
              Go to Login
              <ArrowRightIcon className="ml-2 h-5 w-5 text-slate-700" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
