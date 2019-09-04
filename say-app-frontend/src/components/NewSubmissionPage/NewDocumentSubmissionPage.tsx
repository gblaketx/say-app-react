import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import NewSubmissionPage from './NewSubmissionPage';

function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  // console.log('Submit document', event.currentTarget);
  const data = new FormData(event.currentTarget);
  fetch('/api/documents.json', { body: data, method: 'post' });
  event.preventDefault();
}

const NewDocumentSubmissionPage: React.FunctionComponent<RouteComponentProps> = ({ history }) => (
  <NewSubmissionPage
    history={history}
    onSubmit={handleSubmit}
    title="New Written Submission"
    uploadInstructions="Written submissions should be in a .doc, .docx, or .pdf file."
    uploadType="File"
  />
)

export default React.memo(NewDocumentSubmissionPage);