import * as React from 'react';
import SubmissionTable from './SubmissionTable/SubmissionTable';
import { getFilterMethod, tableColumns, textCellStyle } from './SubmissionTable/SubmissionTableConstants';
import { UserType, SubmitterType } from '../schema';

const indexColums = [
  {
    Header: 'Name',
    accessor: 'first_name', // TODO: full name method for User
    style: textCellStyle,
  },
  {
    Header: 'Accepted Art',
    accessor: 'accepted_art',
    width: 80,
    headerStyle: { whiteSpace: 'unset' },
  },
  {
    Header: 'Accepted Writing',
    accessor: 'accepted_writing',
    width: 80,
    headerStyle: { whiteSpace: 'unset' },
  },
  {
    Header: 'Email',
    accessor: 'email',
    style: textCellStyle,
    minWidth: 300,
  },
  tableColumns.SCHOOL,
  {
    Header: 'Teacher',
    accessor: 'teacher',
    id: 'all',
    filterMethod: getFilterMethod(['user_id', 'email', 'school']),
    filterAll: true,
    style: textCellStyle,
  },
  {
    Header: 'Grade',
    accessor: 'grade',
  },
];

// TODO: Check user_id filter

interface SubmitterIndexState {
  submitters?: SubmitterType[];
}

class SubmitterIndexPage extends React.Component<SubmitterIndexState> {
  public state: SubmitterIndexState = {
    submitters: undefined,
  }

  public componentDidMount(): void {
    fetch('/api/users.json')
      .then((response): Promise<UserType[]> => response.json())
      .then((submitters): void => {
        this.setState({ submitters });
      });
  }

  public render(): React.ReactNode {
    const { submitters } = this.state;
    if (submitters === undefined) {
      return null;
    }

    return (
      <div>
        <h1>Submitters</h1>
        <SubmissionTable
          data={submitters}
          columns={indexColums}
        />
      </div>
    );
  }
}
export default SubmitterIndexPage;
