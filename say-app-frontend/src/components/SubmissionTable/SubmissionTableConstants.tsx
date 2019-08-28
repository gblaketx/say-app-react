import * as React from 'react';
import {
  CellInfo,
  Column,
  Filter,
  RowInfo,
} from 'react-table';
import matchSorter from 'match-sorter';
import submissionStyles from './SubmissionTable.module.css';
import discussionFlag from '../../images/discussionFlag.svg';

export const textCellStyle = {
  whiteSpace: 'unset',
  textAlign: 'left',
};

export const getFilterMethod = (keys: string[]):
((filter: Filter, rows: RowInfo[]) => RowInfo[]) => (
  (filter: Filter, rows: RowInfo[]): RowInfo[] => {
    const result = matchSorter(rows, filter.value, {
      keys,
      threshold: matchSorter.rankings.WORD_STARTS_WITH,
    });
    return result;
  }
);

/**
 * Constants used to populate columns in the submission table.
 * TODO: Change to default if no other exports
 */
export const tableColumns = {
  GET_FLAG_FILTER: (keys: string[]): Column => ({
    Header: 'Flag',
    accessor: 'flag',
    id: 'all',
    width: 50,
    Cell: (row: CellInfo): React.ReactNode => (
      row.value
        ? <img src={discussionFlag} alt="Flag" className={submissionStyles.smallIcon} />
        : null
    ),
    // Filters rows by matching search text to any of the columns in keys.
    filterMethod: getFilterMethod(keys),
    filterAll: true,
  }),
  GET_TITLE_CELL: (type: 'documents' | 'artworks'): Column => ({
    Header: 'Title',
    accessor: 'title',
    style: textCellStyle,
    minWidth: 120,
    Cell: (row: CellInfo): React.ReactNode => (
      <a href={`/${type}/${row.original.id}`}>
        {row.value}
      </a>
    ),
  }),
  STYLE: {
    Header: 'Style',
    accessor: 'style',
  },
  AUTHOR: {
    Header: 'Author',
    accessor: 'user_id', // TODO: Access user data, make link
  },
  SCHOOL: {
    Header: 'School',
    accessor: 'school', // TODO: access user data
    style: textCellStyle,
  },
  NUM_RATINGS: {
    Header: '# of Ratings',
    accessor: 'ratings_count',
    headerStyle: { whiteSpace: 'unset' },
    width: 70,
  },
  AVG_RATING: {
    Header: 'Avg rating',
    accessor: 'average_rating',
    headerStyle: { whiteSpace: 'unset' },
    width: 70,
  },
  THUMBNAIL: {
    Header: 'Thumbnail',
    accessor: 'image_file_name',
    Cell: (row: CellInfo): React.ReactNode => (
      <img src={row.value} alt="Thumbnail" />
    ),
  },
  ROW_NUMBER: {
    Header: '#',
    id: 'row',
    Cell: (row: CellInfo): React.ReactNode => (
      <span>{row.index + 1}</span>
    ),
    width: 50,
  },
};
