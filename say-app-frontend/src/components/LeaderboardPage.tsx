import * as React from 'react';
import SubmissionTable from './SubmissionTable/SubmissionTable';
import { getFilterMethod } from './SubmissionTable/SubmissionTableConstants';
import { RatingType } from '../schema';

const staticLeaderboardData = [
  {
    name: 'Gordon Blake',
    total_ratings: 245,
    average_doc_rating: 2.33,
    average_art_rating: 2.25,
  },
  {
    name: 'Ali Vaughan',
    total_ratings: 289,
    average_doc_rating: 2.31,
    average_art_rating: 2.37,
  },
];

const submissionColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Total Ratings',
    accessor: 'total_ratings',
    id: 'all',
    filterMethod: getFilterMethod(['name']),
    filterAll: true,
  },
  {
    Header: 'Average Doc Rating', // TODO: can report overall
    accessor: 'average_doc_rating',
  },
  {
    Header: 'Average Art Rating',
    accessor: 'average_art_rating',
  },
];

const defaultSort = [
  {
    id: 'total_ratings',
    desc: true,
  },
];

interface LeaderboardItem {
  name: string;
  totalRatings: number;
  docRating: number;
  artRating: number;
}

interface LeaderboardPageState {
  leaderboardItems?: LeaderboardItem[];
}


/**
 * Displays a table showing a leaderboard of raters, how many pieces they've rated,
 * and their average rating.
 */
class LeaderboardPage extends React.Component<LeaderboardPageState> {
  public componentDidMount(): void {
    // fetch('http://localhost:3004/users')
    //   .then((response): Promise<UserType[]> => response.json())
    //   .then((users): void => {
    //     const editors = users.filter((user): boolean => user.role !== 'Submitter');
    //     Promise.all(
    //       editors.map((editor: EditorType) => {

    //       })
    //     ).then((leaderboardItems: LeaderboardItem[]) => this.setState({ leaderboardItems}));
    //     // this.setState({
    //     //   raters: users.filter((user): boolean => user.role !== 'Submitter'),
    //     // }); // TODO: User role enum?
    //   });
    // fetch('http://localhost:3004/ratings')
    //   .then((response): Promise<RatingType> => response.json())
    //   .then((ratings: RatingType[]) => {
        
    //   })
  }

  public render(): React.ReactNode {
    return (
      <div>
        <h1>Leaderboard</h1>
        <SubmissionTable
          data={staticLeaderboardData}
          columns={submissionColumns}
          defaultSorted={defaultSort}
          singlePage
        />
      </div>
    );
  }
}
export default LeaderboardPage;
