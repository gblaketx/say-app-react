import * as React from 'react';
import { Button } from 'reactstrap';
import SubmissionTable from './SubmissionTable/SubmissionTable';
import { tableColumns } from './SubmissionTable/SubmissionTableConstants';
import { ArtworkType } from '../schema';
import styles from './SubmissionTable/SubmissionTable.module.css';

// TODO: Verify submissionData typing and structure in schema
const submissionColumns = [
  tableColumns.GET_FLAG_FILTER(['title', 'author', 'school']),
  tableColumns.GET_TITLE_CELL('artworks'),
  tableColumns.THUMBNAIL,
  tableColumns.AUTHOR,
  tableColumns.SCHOOL,
  tableColumns.NUM_RATINGS,
  tableColumns.AVG_RATING,
];

interface ArtSubmissionsPageState {
  artworks?: ArtworkType[];
}

class ArtSubmissionsPage extends React.Component<ArtSubmissionsPageState> {
  public state: ArtSubmissionsPageState = { artworks: undefined }

  public componentDidMount(): void {
    fetch('http://localhost:3004/artworks')
      .then((response): Promise<ArtworkType[]> => response.json()) // TODO: Mark the return type
      .then((artworks): void => this.setState({ artworks }));
  }

  public render(): React.ReactNode {
    const { artworks } = this.state;
    if (artworks === undefined) {
      return null;
    }
    return (
      <div>
        <h1>
          {`Art Submissions (${artworks.length})`}
        </h1>
        <Button
          className={styles.floatSubmitButton}
          color="success"
          href="/artworks/456" // TODO: set programatically
          size="lg"
        >
          Start Rating!
        </Button>
        <SubmissionTable
          data={artworks}
          columns={submissionColumns}
        />
      </div>
    );
  }
}

export default ArtSubmissionsPage;
