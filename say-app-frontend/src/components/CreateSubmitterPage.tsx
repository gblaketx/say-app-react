import * as React from 'react';
import AccountInfoForm from './SignUp/AccountInfoForm';

const onCreateSubmitter = (event: React.FormEvent): void => {
  event.preventDefault();
  console.log('Creating submitter ', event.target);
  const { firstName, lastName } = (event.target as HTMLFormElement);
  // console.log(firstName.value, lastName.value);
};

const CreateSubmitterPage: React.FunctionComponent = () => (
  <AccountInfoForm
    title="Create Submitter"
    onSubmit={onCreateSubmitter}
    submitButtonText="Sign Up Student"
  />
);

export default React.memo(CreateSubmitterPage);
