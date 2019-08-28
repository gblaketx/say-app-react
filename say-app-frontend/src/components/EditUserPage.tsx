import * as React from 'react';
import AccountInfoForm from './SignUp/AccountInfoForm';
import styles from './SignUp/SignUpPage.module.css';
import { SubmitterType } from '../schema';

const passwordLabel: React.ReactNode = (
  <span>
    New Password
    {' '}
    <span className={styles.lightItalic}>
      (leave blank if you don&apos;t want to change it)
    </span>
  </span>
);

function submitUserEdit(event: React.FormEvent): void {
  console.log('Submitted user edit', event);
  // TODO: Implement
}

interface EditUserPageProps {
  match: {
    params: { id: number };
  };
}

interface EditUserPageState {
  user?: SubmitterType;
}

class EditUserPage extends React.Component<EditUserPageProps, EditUserPageState> {
  public state: EditUserPageState = { user: undefined }

  public componentDidMount(): void {
    const { match: { params: { id } } } = this.props;
    fetch(`http://localhost:3004/users/${id}`)
      .then((response): Promise<SubmitterType> => response.json())
      .then((user): void => this.setState({ user }));
  }

  public render(): React.ReactNode {
    const { user } = this.state;
    if (user === undefined) {
      return null;
    }

    return (
      <AccountInfoForm
        title={`Edit User: ${user.first_name} ${user.last_name}`}
        onSubmit={submitUserEdit}
        submitButtonText="Update"
        passwordConfig={{
          passwordTitle: passwordLabel,
          passwordConfirmTitle: 'New Password Confirmation',
        }}
        user={user}
      />
    );
  }
}

export default EditUserPage;
