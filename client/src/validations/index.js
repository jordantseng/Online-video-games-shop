import * as yup from 'yup';

export const loginFormValidationSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Required at least 6 characters'),
});

export const signupFormValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Required at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .min(6, 'Required at least 6 characters'),
});

export const profileFormValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  password: yup.string().min(6, 'Required at least 6 characters'),
  confirmPassword: yup.string().min(6, 'Required at least 6 characters'),
});

export const eventFormValidationSchema = yup.object({
  redirectUrl: yup.string().required('Redirect url is required'),
});

export const userFormValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
});

export const productFormValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup
    .number()
    .typeError('Must be a number')
    .required('Price is required'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Category is required'),
  countInStock: yup
    .number()
    .typeError('Must be a number')
    .required('CountInStock is required'),
  description: yup.string().required('Description is required'),
});

export const reviewFormValidationSchema = yup.object({
  rating: yup.string().required('Rating is required'),
});

export const addressFormValidationSchema = yup.object({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  postalCode: yup.number(),
  country: yup.string().required('Country is required'),
});
