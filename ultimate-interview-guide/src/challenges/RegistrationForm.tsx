import React, { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { SectionCard } from '../components/SectionCard';
import { SeniorSignal } from '../components/SeniorSignal';
import { Trap } from '../components/Trap';
import { InlineCode } from '../components/InlineCode';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function validate(values: FormValues): Partial<FormValues> {
  const errors: Partial<FormValues> = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.includes('@')) errors.email = 'Valid email required';
  if (values.password.length < 8) errors.password = 'At least 8 characters';
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords must match';
  return errors;
}

function FormField({
  label,
  name,
  type = 'text',
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${touched && error ? styles.inputError : ''}`}
      />
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

export default function RegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Derived every render — no effect needed.
  const errors = validate(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mark all fields touched on submit — show all errors at once.
    setTouched({ name: true, email: true, password: true, confirmPassword: true });
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); // simulate API call
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) return <p className={styles.success}>Registration complete!</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <FormField
        label="Name"
        name="name"
        value={values.name}
        error={errors.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={() => handleBlur('name')}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        touched={touched.email}
        onChange={handleChange}
        onBlur={() => handleBlur('email')}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
        onBlur={() => handleBlur('password')}
      />

      <FormField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        onChange={handleChange}
        onBlur={() => handleBlur('confirmPassword')}
      />

      <button type="submit" disabled={isSubmitting} className={styles.submit}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
}

export const RegistrationFormChallenge = {
  id: 'registration-form',
  title: 'Form with validation',
  demo: <RegistrationForm />,
  code: `interface FormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

// "Pure validation function — outside the component.
//  Takes values, returns errors object (same shape). Easy to test."
function validate(values: FormValues): Partial<FormValues> {
  const errors: Partial<FormValues> = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.includes('@')) errors.email = 'Valid email required'
  if (values.password.length < 8) errors.password = 'At least 8 characters'
  if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords must match'
  return errors
}

// "Extracted child — label + input + error. The atom of the form."
function FormField({
  label, name, type = 'text', value, error, touched,
  onChange, onBlur
}: {
  label: string; name: string; type?: string
  value: string; error?: string; touched?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={\`\${styles.input} \${touched && error ? styles.inputError : ''}\`}
      />
      {/* "Only show error if touched — no red on first render." */}
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

export default function RegistrationForm() {
  const [values, setValues] = useState<FormValues>({
    name: '', email: '', password: '', confirmPassword: ''
  })
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // "Derived every render — no effect needed."
  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  function handleBlur(field: keyof FormValues) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // "Mark all fields touched on submit — show all errors at once."
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    if (!isValid) return

    setIsSubmitting(true)
    try {
      await new Promise(res => setTimeout(res, 1000))  // simulate API call
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) return <p className={styles.success}>Registration complete!</p>

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <FormField label="Name" name="name" value={values.name}
        error={errors.name} touched={touched.name}
        onChange={handleChange} onBlur={() => handleBlur('name')} />

      <FormField label="Email" name="email" type="email" value={values.email}
        error={errors.email} touched={touched.email}
        onChange={handleChange} onBlur={() => handleBlur('email')} />

      <FormField label="Password" name="password" type="password" value={values.password}
        error={errors.password} touched={touched.password}
        onChange={handleChange} onBlur={() => handleBlur('password')} />

      <FormField label="Confirm password" name="confirmPassword" type="password" value={values.confirmPassword}
        error={errors.confirmPassword} touched={touched.confirmPassword}
        onChange={handleChange} onBlur={() => handleBlur('confirmPassword')} />

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submit}
      >
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}`,
  coachView: (
    <>
      <SectionCard title="How to think about it">
        <ul>
          <li>"Forms operate as state machines. A field has a value, a touched state, and an error. Touched is crucial — we don't display errors before the user has focused or typed in a field."</li>
          <li>"State layout: separate <InlineCode>values</InlineCode> and <InlineCode>touched</InlineCode>. The <InlineCode>errors</InlineCode> are derived on each render pass from values — never synced in a separate state box using effects."</li>
          <li>"Validate on blur (marks touched, showing errors if any) and validate on submit (marks all fields touched, blocking submit if errors exist)."</li>
        </ul>
      </SectionCard>

      <SeniorSignal>
        <ul>
          <li>Maintains separation between <InlineCode>touched</InlineCode> and <InlineCode>errors</InlineCode>. "Displaying errors before a user touches the field is bad UX."</li>
          <li>Derives errors during render passes using a pure <InlineCode>validate()</InlineCode> call above the return. Avoids effects.</li>
          <li>Knows when to utilize form libraries: "For simple 3-5 field forms in interviews, vanilla validation shows your understanding. In production, React Hook Form is optimal."</li>
          <li>Tracks an <InlineCode>isSubmitting</InlineCode> state to disable the submit trigger and avoid duplicate submits.</li>
        </ul>
      </SeniorSignal>

      <Trap>
        <ul>
          <li>Storing the errors object in local state and using a <InlineCode>useEffect</InlineCode> block to sync it, causing double renders and state lag.</li>
          <li>Showing inline errors on initial mount before fields are interacted with.</li>
        </ul>
      </Trap>

      <SectionCard title="Architecture Decisions">
        <ul>
          <li><strong>Form fields extraction:</strong> "Extracting a reusable <InlineCode>FormField</InlineCode> wrapper is a great first step. It encapsulates labels, validation statuses, and input attributes cleanly."</li>
        </ul>
      </SectionCard>
    </>
  ),
};
