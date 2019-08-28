import * as React from 'react';
import { Button } from 'reactstrap';
import SubmissionTable from './SubmissionTable/SubmissionTable';
import { tableColumns } from './SubmissionTable/SubmissionTableConstants';
import { DocumentType } from '../schema';
import styles from './SubmissionTable/SubmissionTable.module.css';

// TODO: Verify submissionData typing and structure in database
const submissionColumns = [
  tableColumns.GET_FLAG_FILTER(['title', 'style', 'author', 'school']),
  tableColumns.GET_TITLE_CELL('documents'),
  tableColumns.STYLE,
  tableColumns.AUTHOR,
  tableColumns.NUM_RATINGS,
  tableColumns.AVG_RATING,
];

interface WrittenSubmissionsPageState {
  documents?: DocumentType[]; // TODO: document wire type
}

class WrittenSubmissionsPage extends React.Component<WrittenSubmissionsPageState> {
  public state: WrittenSubmissionsPageState = { documents: undefined }

  public componentDidMount(): void {
    fetch('http://localhost:3004/documents')
      .then((response): Promise<DocumentType[]> => response.json()) // TODO: Mark the return type
      .then((documents): void => this.setState({ documents }));
  }

  public render(): React.ReactNode {
    const { documents } = this.state;
    if (documents === undefined) {
      return null;
    }
    return (
      <div>
        <h1>
          {`Written Submissions (${documents.length})`}
        </h1>
        <Button
          className={styles.floatSubmitButton}
          color="success"
          href="/documents/123" // TODO: set programatically
          size="lg"
        >
          Start Rating!
        </Button>
        <SubmissionTable
          data={documents}
          columns={submissionColumns}
        />
      </div>
    );
  }
}

export default WrittenSubmissionsPage;
