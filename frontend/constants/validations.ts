import * as yup from 'yup';

// Reusable regex patterns
const PHONE_REGEX = /^[6-9]\d{9}$/;
const OTP_REGEX = /^\d{4}$/;

/**
 * Reusable base validation fields to keep schemas DRY
 */
export const baseValidations = {
    phone: yup
        .string()
        .required('Phone number is required')
        .matches(PHONE_REGEX, 'Must be a valid 10-digit Indian phone number'),

    otp: yup
        .string()
        .required('OTP is required')
        .matches(OTP_REGEX, 'OTP must be exactly 6 digits'),

    email: yup
        .string()
        .required('Email is required')
        .email('Must be a valid email address'),

    name: yup
        .string()
        .required('Full name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot exceed 100 characters'),
};

/**
 * Authentication Form Schemas
 */

// Login - Step 1
export const loginPhoneSchema = yup.object({
    phone: baseValidations.phone,
}).required();

// Login/Register - Step 2 (Shared OTP Verification)
export const otpVerificationSchema = yup.object({
    phone: baseValidations.phone,
    otp: baseValidations.otp,
}).required();

// Register - Step 1
export const registerDetailsSchema = yup.object({
    phone: baseValidations.phone,
    name: baseValidations.name,
    email: baseValidations.email,
    userType: yup.string().required('Please select an account type'),
    agreeTerms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
}).required();
