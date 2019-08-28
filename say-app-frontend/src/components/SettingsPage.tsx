import * as React from 'react';
import { Button } from 'reactstrap';
import LabeledSwitch from './LabeledSwitch/LabeledSwitch';

interface SettingsPageState {
  isAcceptingSubmissions: boolean;
  isFinalized: boolean;
  isShowingRatings: boolean;
}

const settingsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonContainerStyle: React.CSSProperties = {
  width: 400,
  marginTop: 16,
};

// TODO: Add tooltops to explain what the switches do
// TODO: Implement download functions

/**
 * Displays settings page site controls (accepting or rejecting submissions)
 * and downloads for submissions.
 */
class SettingsPage extends React.Component {
  public state: SettingsPageState = {
    isAcceptingSubmissions: true,
    isFinalized: true,
    isShowingRatings: true,
  }

  private onChangeAccepting = (checked: boolean): void => {
    this.setState({ isAcceptingSubmissions: checked });
  };

  private onChangeFinalized = (checked: boolean): void => {
    this.setState({ isFinalized: checked });
  }

  private onChangeShowRatings = (checked: boolean): void => {
    this.setState({ isShowingRatings: checked });
  }

  public render(): React.ReactNode {
    const { isAcceptingSubmissions, isFinalized, isShowingRatings } = this.state;

    return (
      <div style={settingsStyle}>
        <LabeledSwitch
          label="Accepting Submissions"
          isChecked={isAcceptingSubmissions}
          onChange={this.onChangeAccepting}
        />
        <LabeledSwitch
          label="Finalized"
          isChecked={isFinalized}
          onChange={this.onChangeFinalized}
        />
        <LabeledSwitch
          label="Show Ratings"
          isChecked={isShowingRatings}
          onChange={this.onChangeShowRatings}
        />
        <div style={buttonContainerStyle}>
          <Button color="primary" size="lg" block>Download Accepted Submissions</Button>
          <Button color="primary" size="lg" block>Download Accepted Artwork</Button>
          <Button color="primary" size="lg" block>Download Accepted Submitter Data</Button>
          <Button color="warning" size="lg" block>Download Rejected Submitter Data</Button>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
