import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Jumbotron,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { CellInfo } from 'react-table';
import Styles from './UserInfoDisplay.module.css';
import SubmissionTable from '../SubmissionTable/SubmissionTable';
import { tableColumns } from '../SubmissionTable/SubmissionTableConstants';
import { ArtworkType, DocumentType, SubmitterType } from '../../schema';

interface UserInfoDisplayProps {
  studentInfo: SubmitterType;

  writtenSubmissions: DocumentType[];

  artSubmissions: ArtworkType[]; // TODO: url?
}

const removeSubmission = (id: string) => {
  console.log('Removing submission:', id);
};

const submissionColumns = [
  {
    Header: 'Submitted On',
    accessor: 'submittedOn',
  },
  {
    Header: 'Status',
    accessor: 'accepted',
    Cell: (row: CellInfo): React.ReactNode => (
      <span>
        {row.value ? 'Accepted' : 'Not Accepted' }
      </span>
    ),
  },
  {
    accessor: 'id',
    Cell: (row: CellInfo): React.ReactNode => (
      <Button color="danger" size="sm" onClick={(): void => removeSubmission(row.value)}>Remove</Button>
    ),
  },
];

const writtenSubmissionColumns = [
  tableColumns.ROW_NUMBER,
  tableColumns.GET_TITLE_CELL('documents'),
  tableColumns.STYLE,
  ...submissionColumns,
];

const artSubmissionColumns = [
  tableColumns.ROW_NUMBER,
  tableColumns.GET_TITLE_CELL('artworks'),
  tableColumns.THUMBNAIL,
  ...submissionColumns,
];

const renderListGroupItem = (title: string, contents: string): React.ReactNode => (
  <ListGroupItem>
    <b>{title}</b> {contents}
  </ListGroupItem>
);

const UserInfoDisplay: React.FunctionComponent<UserInfoDisplayProps> = ({
  studentInfo, writtenSubmissions, artSubmissions,
}) => (
  <div className={Styles.paddedContent}>
    <Jumbotron>
      <h1>
        {studentInfo.first_name}
        {' '}
        {studentInfo.last_name}
      </h1>
      <h5>Submitter</h5>
    </Jumbotron>
    <ListGroup className={Styles.alignedListGroup}>
      {renderListGroupItem('Email:', studentInfo.email)}
      {renderListGroupItem('School:', studentInfo.school)}
      {renderListGroupItem('Teacher:', studentInfo.teacher)}
      {renderListGroupItem('Bio:', studentInfo.bio)}
      <ListGroupItem className={Styles.centeredButton}>
        <Button
          color="primary"
          href={`/edit/users/${studentInfo.id}`}
        >
          Edit Submitter
        </Button>
      </ListGroupItem>
    </ListGroup>

    <div className={Styles.paddedTable}>
      <h1>Written Submissions</h1>
      <SubmissionTable
        singlePage
        displaySearch={false}
        data={writtenSubmissions}
        columns={writtenSubmissionColumns}
      />
      <Button
        href={`/documents/new?user_id=${studentInfo.id}`}
        className={Styles.paddedButton}
        color="success"
      >
        Upload Written Submission
      </Button>
    </div>

    <div className={Styles.paddedTable}>
      <h1>Written Submissions</h1>
      <SubmissionTable
        singlePage
        displaySearch={false}
        data={artSubmissions}
        columns={artSubmissionColumns}
      />
      <Button
        href={`/artworks/new?user_id=${studentInfo.id}`}
        className={Styles.paddedButton}
        color="success"
      >
        Upload Artwork
      </Button>
    </div>
  </div>
);

// UserInfoDisplay.propTypes = {
//   studentInfo: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     first_name: PropTypes.string.isRequired,
//     last_name: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     role: PropTypes.oneOf(['Submitter', 'Editor', 'Admin']).isRequired,
//     school: PropTypes.string.isRequired,
//     teacher: PropTypes.string.isRequired,
//     bio: PropTypes.string.isRequired,
//   }).isRequired,

//   writtenSubmissions: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     submittedOn: PropTypes.string.isRequired, // TODO: Use a timestamp type?
//     accepted: PropTypes.bool.isRequired,
//     style: PropTypes.string.isRequired,
//   }).isRequired).isRequired,

//   artSubmissions: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     submittedOn: PropTypes.string.isRequired, // TODO: Use a timestamp type?
//     accepted: PropTypes.bool.isRequired,
//     thumbnail: PropTypes.string.isRequired, // TODO: better type?
//   }).isRequired).isRequired,

// };

export default React.memo(UserInfoDisplay);
