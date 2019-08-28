import * as React from 'react';
import SignUpPage from './SignUpPage';

const onSignUpEditor = (event: React.FormEvent): void => {
  event.preventDefault();
  const { firstName, lastName } = (event.target as HTMLFormElement);
  console.log('Signing up editor', firstName.value, lastName.value);
};

const EditorSignUpPage: React.FunctionComponent = () => (
  <SignUpPage
    onSignUp={onSignUpEditor}
    title="Editor Sign Up"
  />
);

export default EditorSignUpPage;
