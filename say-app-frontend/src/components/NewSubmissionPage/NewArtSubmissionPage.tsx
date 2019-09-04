import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewSubmissionPage from './NewSubmissionPage';

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  console.log('Submit artwork', event);
}

const NewArtSubmissionPage: React.FunctionComponent<RouteComponentProps> = ({ history }) => (
  <NewSubmissionPage
    history={history}
    onSubmit={handleSubmit}
    title="New Art Submission"
    uploadInstructions="Art should be sent as high-quality JPEG files. Art may be sent in color or in black and white."
    uploadType="Image"
  />
)

export default React.memo(NewArtSubmissionPage);