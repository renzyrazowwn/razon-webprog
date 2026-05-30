import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await createUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: Number(formData.age), // Ensured structure passes type safety numbers
        gender: formData.gender,
        contactNumber: formData.contactNumber,
        email: formData.email,
        type: 'viewer', // Explicit default restriction flag matching controller fallback
        username: formData.username,
        password: formData.password,
        address: formData.address,
        isActive: true,
      });

      alert('Account created successfully!');

      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        contactNumber: '',
        email: '',
        username: '',
        password: '',
        address: '',
      });
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border-2 border-zinc-900 bg-white p-6 shadow-sm sm:p-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600">
        Join the Vibe
      </p>

      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
        Create Your Account
      </h1>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Sign up and become part of a high-energy fitness community built for progress and consistency.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-semibold text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              className={inputClasses}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-semibold text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              className={inputClasses}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-semibold text-zinc-700">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Age"
              className={inputClasses}
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="text-sm font-semibold text-zinc-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className={inputClasses}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="contact-number" className="text-sm font-semibold text-zinc-700">
            Contact Number
          </label>
          <input
            id="contact-number"
            name="contactNumber"
            type="text"
            placeholder="09123456789"
            className={inputClasses}
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-semibold text-zinc-700">
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            placeholder="example@email.com"
            autoComplete="email"
            className={inputClasses}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="username" className="text-sm font-semibold text-zinc-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Create a username"
            autoComplete="username"
            className={inputClasses}
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-semibold text-zinc-700">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className={inputClasses}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-semibold text-zinc-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Your address"
            autoComplete="street-address"
            className={inputClasses}
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className={actionButtonClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Google
          </Button>
          <Button type="button" variant="secondary" className={actionButtonClassName}>
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-bold text-violet-600 transition hover:text-violet-800">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;