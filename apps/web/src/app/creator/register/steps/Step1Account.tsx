'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'

const schema = z
  .object({
    email: z.string().email('Valid email required'),
    password: z.string().min(8, 'Minimum 8 characters'),
    confirmPassword: z.string(),
    age: z.boolean().refine((v) => v === true, 'You must be 18+'),
    terms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

interface Step1AccountProps {
  onComplete: () => void
}

export default function Step1Account({ onComplete }: Step1AccountProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      age: false,
      terms: false,
    },
  })

  const onSubmit = (data: FormData) => {
    setSubmitError(null)
    const result = schema.safeParse(data)
    if (!result.success) {
      setSubmitError('Please fix the errors above.')
      return
    }
    onComplete()
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-warm-border">
      <h2 className="text-2xl font-bold text-charcoal mb-1">Create your account</h2>
      <p className="text-charcoal-muted mb-8">You must be 18 or older to register your likeness.</p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="input-field"
            {...register('email', {
              required: 'Valid email required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Valid email required' },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="input-field"
              {...register('password', {
                required: 'Minimum 8 characters',
                minLength: { value: 8, message: 'Minimum 8 characters' },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Confirm password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="input-field"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Checkboxes */}
        <div className="pt-2 space-y-3">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
              {...register('age', { required: 'You must be 18+' })}
            />
            <span className="text-sm text-charcoal">I confirm I am 18 years of age or older</span>
          </label>
          {errors.age && (
            <p className="text-sm text-red-500 -mt-1 ml-7">{errors.age.message}</p>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 accent-gold flex-shrink-0"
              {...register('terms', { required: 'You must accept the terms' })}
            />
            <span className="text-sm text-charcoal">
              I agree to the{' '}
              <Link href="/legal/terms" className="text-gold hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/legal/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms && (
            <p className="text-sm text-red-500 -mt-1 ml-7">{errors.terms.message}</p>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-red-500">{submitError}</p>
        )}

        <button type="submit" className="btn-primary w-full mt-2">
          Continue →
        </button>
      </form>
    </div>
  )
}
