import * as React from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Jumbotron,
  Label,
} from 'reactstrap';


const scaledFormStyle: React.CSSProperties = {
  maxWidth: 300,
  margin: 'auto',
};

const boldLabelStyle: React.CSSProperties = {
  fontWeight: 'bold',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
};

const footerButtonStyle: React.CSSProperties = {
  marginRight: 16,
  marginBottom: 16,
  position: 'absolute',
  bottom: 0,
  right: 0,
};

interface LoginPageState {
  isLoginValid: boolean;
}

class LoginPage extends React.Component {
  public state: LoginPageState = {
    isLoginValid: true,
  }

  // const attemptLogin = ()

  // TODO: Hide header based on auth, show title

  // TODO: Make footer button display on bottom
  public render(): React.ReactNode {
    const { isLoginValid } = this.state;
    return (
      <div>
        <Jumbotron>
          <h1>Welcome to the Stanford Anthology for Youth Submission System</h1>
        </Jumbotron>
        <h2>Please Sign In</h2>
        <Form style={scaledFormStyle}>
          <FormGroup>
            <Label style={boldLabelStyle}>Username</Label>
            <Input type="email" />
          </FormGroup>
          <FormGroup>
            <Label style={boldLabelStyle}>Password</Label>
            <Input invalid={!isLoginValid} type="password" />
            <FormFeedback>Invalid username or password</FormFeedback>
            <Label check>
              <Input type="checkbox" />
              Remember me
            </Label>
            <Button color="link" block>Forgot your password?</Button>
          </FormGroup>
          <Button color="primary" size="lg" block>Log In</Button>
        </Form>
        <h5 style={{ marginTop: 24 }}>Don&apos;t have an account?</h5>
        <Button href="/submitters/signup" color="success" size="lg" style={{ width: 300 }}>Sign Up</Button>
        <div style={footerStyle}>
          <Button href="/editors/signup" color="info" size="lg" style={footerButtonStyle}>Editor Sign Up</Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
