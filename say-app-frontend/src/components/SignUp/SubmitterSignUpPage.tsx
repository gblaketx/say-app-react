import * as React from 'react';
import SignUpPage from './SignUpPage';

const onSignUpSubmitter = (event: React.FormEvent): void => {
  event.preventDefault();
  const { firstName, lastName } = (event.target as HTMLFormElement);
  console.log('Signing up submitter', firstName.value, lastName.value);
};

const SubmitterSignUpPage: React.FunctionComponent = () => (
  <SignUpPage
    onSignUp={onSignUpSubmitter}
    title="Sign Up"
    showStudentInputs
  />
);

export default SubmitterSignUpPage;
