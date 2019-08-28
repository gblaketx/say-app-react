import * as React from 'react';
import { Button } from 'reactstrap';
import AccountInfoForm from './SignUp/AccountInfoForm';
import signUpStyles from './SignUp/SignUpPage.module.css';
import PasswordConfirmModal from './PasswordConfirmModal';
import styles from './AccountPage.module.css';

interface AccountPageState {
  isConfirmVisible: boolean;
  confirmTitle: string;
  confirmText: string;

}

const passwordLabel: React.ReactNode = (
  <span>
    New Password
    {' '}
    <span className={signUpStyles.lightItalic}>
      (leave blank if you don&apos;t want to change it)
    </span>
  </span>
);

// TODO: Preload user info

// TODO: Pass component state?
class AccountPage extends React.Component {
  public state: AccountPageState = {
    isConfirmVisible: false,
    confirmTitle: 'Confirm Changes',
    confirmText: 'Please enter your password to confirm your changes:',
  }

  private onUpdate = (event: React.FormEvent): void => {
    event.preventDefault();
    this.setState({
      confirmTitle: 'Confirm Changes',
      confirmText: 'Please enter your password to confirm your changes:',
    });
    this.toggleConfirm();
  }

  private onCancelAccount = (): void => {
    // TODO: Use password confirm
    this.setState({
      confirmTitle: 'Cancel Account',
      confirmText: 'Are you sure you want to cancel your account? Please enter your password to confirm',
    });
    this.toggleConfirm();
    console.log('Canceling account');
  }

  private toggleConfirm = (): void => {
    const { isConfirmVisible } = this.state;
    this.setState({ isConfirmVisible: !isConfirmVisible });
  }

  private onConfirm = (event: React.FormEvent): void => {
    event.preventDefault();

    const password = (event.target as HTMLFormElement).passwordConfirm.value;
    if (!password) {
      // TODO: log error / pop toast
      console.log('Password confirmation is empty');
      return;
    }
    // TODO: Check password validity and close confirm if correct
    console.log('Password confirmed', password);
    this.toggleConfirm();
  }

  public render(): React.ReactNode {
    const { confirmText, confirmTitle, isConfirmVisible } = this.state;
    return (
      <div>
        <AccountInfoForm
          title="Edit Account"
          showStudentInputs={true} // TODO: Link to account session
          validateOnSubmit={false}
          onSubmit={this.onUpdate}
          submitButtonText="Update"
          passwordConfig={{
            passwordTitle: passwordLabel,
            passwordConfirmTitle: 'New Password Confirmation',
          }}
        />
        <PasswordConfirmModal
          title={confirmTitle}
          text={confirmText}
          isOpen={isConfirmVisible}
          toggle={this.toggleConfirm}
          onConfirm={this.onConfirm}
        />
        <Button
          className={styles.cancelButton}
          color="danger"
          onClick={this.onCancelAccount}
        >
          Cancel My Account
        </Button>
      </div>
    );
  }
}

// TODO: Cancel account button

export default AccountPage;
