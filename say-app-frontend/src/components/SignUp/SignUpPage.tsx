import * as React from 'react';
import PropTypes from 'prop-types';
import AccountInfoForm from './AccountInfoForm';
import styles from './SignUpPage.module.css';

const passwordLabel: React.ReactNode = (
  <span>
    Password
    {' '}
    <span className={styles.lightItalic}>
      (6 characters minimum)
    </span>
  </span>
);

// TODO: Hide toolbar and prevent authorized actions when not signed in

interface SignUpPageProps {
  onSignUp: (event: React.FormEvent) => void;
  title: string;
  showStudentInputs?: boolean;
}

/**
 * Displays the student sign up page, which is a form including name, email,
 * password, school information, and bio.
 */
const SignUpPage: React.FunctionComponent<SignUpPageProps> = (
  { onSignUp, title, showStudentInputs },
) => (
  <AccountInfoForm
    title={title}
    onSubmit={onSignUp}
    passwordConfig={{
      passwordTitle: passwordLabel,
      passwordConfirmTitle: 'Password Confirmation',
    }}
    submitButtonText="Sign Up"
    showStudentInputs={showStudentInputs}
  />
);

SignUpPage.propTypes = {
  /** Callback fired on sign up. Passed the sign up form event as an argument. */
  onSignUp: PropTypes.func.isRequired,

  /** Title displayed at the top of the page. */
  title: PropTypes.string.isRequired,

  showStudentInputs: PropTypes.bool,
};

SignUpPage.defaultProps = {
  showStudentInputs: false,
};

export default React.memo(SignUpPage);
