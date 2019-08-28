import * as React from 'react';
import UserInfoDisplay from './UserInfoDisplay';
import { ArtworkType, DocumentType, SubmissionType, SubmitterType } from '../../schema';

const staticStudentInfo = {
  user_id: 1,
  fullName: 'Gordon Blake',
  email: 'gblake@stanford.edu',
  school: 'Steiner Ranch',
  teacher: 'Mr. Zylla',
  bio: 'A prodigy of prodigious prognosticative propensities.',
};

const staticWrittenSubmissions = [
  {
    id: 123,
    title: 'Doom',
    style: 'Fiction',
    submittedOn: 'June 13, 2019',
    accepted: false,
  },
];

const staticArtSubmissions = [
  {
    id: 3753,
    title: 'Tango of Trees',
    submittedOn: 'April 19, 2019',
    thumbnail: 'https://s3.amazonaws.com/stanforday/artworks/images/000/000/665/thumb/The_Tango_of_Trees.jpg?1547096193',
    accepted: false,
  },
];

interface UserInfoPageProps {
  match: {
    params: { id: number };
  };
}

interface UserInfoPageState {
  artworks?: ArtworkType[];
  documents?: DocumentType[];
  user?: SubmitterType;
}

// TODO: More rigorusly type the returned user?
export default class UserInfoPage extends React.Component<UserInfoPageProps, UserInfoPageState> {
  public state: UserInfoPageState = {
    artworks: undefined,
    documents: undefined,
    user: undefined,
  }

  public componentDidMount(): void {
    const { match: { params: { id } } } = this.props;
    fetch(`http://localhost:3004/users/${id}`)
      .then((response): Promise<SubmitterType> => response.json())
      .then((user): void => {
        this.setState({ user });
        this.fetchSubmissions('documents', user.documents);
        this.fetchSubmissions('artworks', user.artworks);
      });
  }

  private fetchSubmissions = (type: 'documents' | 'artworks', ids: number[]): void => {
    Promise.all(
      ids.map((id: number): Promise<SubmissionType> => (
        fetch(`http://localhost:3004/${type}/${id}`)
          .then((response): Promise<SubmissionType> => response.json())
      )),
    ).then((submissions): void => this.setState({ [type]: submissions }));
  }


  public render(): React.ReactNode {
    const { artworks, documents, user } = this.state;

    if (artworks === undefined || documents === undefined || user === undefined) {
      return null;
    }

    return (
      <UserInfoDisplay
        studentInfo={user}
        writtenSubmissions={documents}
        artSubmissions={artworks}
      />
    );
  }
}
