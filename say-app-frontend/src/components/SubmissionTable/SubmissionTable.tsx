import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'reactstrap';
import * as ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from './SubmissionTable.module.css';


interface SubmissionTableProps {
  columns: ReactTable.Column[];
  data: object[]; // TODO: More strongly check data type somewhere
  defaultSorted?: ReactTable.SortingRule[];
  displaySearch?: boolean;
  singlePage?: boolean;
}

interface SubmissionTableState {
  filtered: ReactTable.Filter[];
}

/**
 * Component for displaying information in a searchable table.
 * The table inclues a search bar that filters on the title, style, author,
 * and school rows.
 * TODO: Elaborate
 */
class SubmissionTable extends React.Component<SubmissionTableProps, SubmissionTableState> {
  private static propTypes = {
    /** The columns to render in the table. */
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,

    /** Whether or not the search bar is displayed. */
    displaySearch: PropTypes.bool,

    /** Whether to render all rows of the table on a single page. */
    singlePage: PropTypes.bool,
  };

  private static defaultProps = {
    displaySearch: true,
    singlePage: false,
  };

  public state: SubmissionTableState = { filtered: [] }

  private onSearch = (event: React.FormEvent): void => {
    const { value } = (event.target as HTMLFormElement).searchText;
    this.setState({ filtered: [{ id: 'all', value }] });
    event.preventDefault();
  }

  public render(): React.ReactNode {
    const {
      columns,
      data,
      defaultSorted,
      displaySearch,
      singlePage,
    } = this.props;
    const { filtered } = this.state;

    if (singlePage && !displaySearch && data.length === 0) {
      return null;
    }

    return (
      <div className={styles.padded}>
        {displaySearch && (
          <Form className={styles.centerPadded} onSubmit={this.onSearch} inline>
            <Input style={{ width: '50%' }} placeholder="Search..." name="searchText" />
            <Button type="submit">Search</Button>
          </Form>
        )}

        <ReactTable.default
          data={data}
          filtered={filtered}
          columns={columns}
          defaultSorted={defaultSorted}
          minRows={singlePage ? 0 : undefined}
          defaultPageSize={singlePage ? 100 : 20}
          showPagination={!singlePage}
        />
      </div>
    );
  }
}

export default SubmissionTable;
