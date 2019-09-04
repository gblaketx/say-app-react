import * as React from 'react';
import { Button, Jumbotron } from 'reactstrap';
import styles from './UserUploadPage.module.css';

// TODO: track user and session info
const CURRENT_USER = {
  first_name: 'Rasperry',
}

class UserUploadPage extends React.PureComponent {

  public render(): React.ReactNode {
    return (
      <div>
        <Jumbotron>
          <h1>{`Welcome, ${CURRENT_USER.first_name}!`}</h1>
        </Jumbotron>
        <div className={styles.guidelinesText}>
          <h2>Submission Guidelines:</h2>
          <p>
            The submission deadline has been extended! All submissions must be recieved no later than{' '}
            <b>January 16, 2019 at 11:59 PM.</b>{' '}
            Please submit{' '}
            <b>no more than TWO pieces of writing and THREE pieces of art.</b>{' '}
            Show us your very best work! Written submissions should be in a 
            .doc, .docx, or .pdf file. Art should be uploaded as high-quality JPEG files. 
            Art may be sent in color or in black and white.
          </p>
          <p>
            Note: By submitting, you give SAY permission to publish your work in the print 
            anthology as well as online and to do minimal amounts of editing.
          </p>

          <div className={styles.uploadButtonContainer}>
            <Button color="success" size="lg" href="/submission/new-document">Upload Written Submission</Button>
            <Button color="primary" size="lg" href="/submission/new-art">Upload Artwork</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserUploadPage;