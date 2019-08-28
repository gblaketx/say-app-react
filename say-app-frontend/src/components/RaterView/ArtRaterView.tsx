import * as React from 'react';
import { loadComments, RaterView } from './RaterView';
import styles from './RaterView.module.css';
import { ArtworkType, CommentType, SubmitterType } from '../../schema';

interface ArtRaterViewProps {
  match: {
    params: { id: number };
  };
}

interface ArtRaterViewState {
  artwork?: ArtworkType;
  author?: SubmitterType;
  comments?: CommentType[];
}

// TODO: Remove this silliness once we have real data
interface SubmissionData {
  [id: number]: { src: string };
}

class ArtRaterView extends React.Component<ArtRaterViewProps, ArtRaterViewState> {
  public state: ArtRaterViewState = {
    artwork: undefined,
    author: undefined,
    comments: undefined,
  }

  public componentDidMount(): void {
    const { match: { params: { id } } } = this.props;
    fetch(`http://localhost:3004/artworks/${id}`)
      .then((response): Promise<ArtworkType> => response.json()) // TODO: set wire type
      .then((artwork): void => {
        this.setState({ artwork });
        loadComments(
          artwork.comments,
          (comments: CommentType[]): void => this.setState({ comments }),
        );
        fetch(`http://localhost:3004/users/${artwork.user_id} `)
          .then((response): Promise<SubmitterType> => response.json())
          .then((author): void => this.setState({ author })); // TODO: Select only needed)
      });
  }

  public render(): React.ReactNode {
    const { artwork, author, comments } = this.state;
    if (artwork === undefined || author === undefined || comments === undefined) {
      return null;
    }
    // TODO: Add author
    return (
      <RaterView
        author={author}
        comments={comments}
        submission={artwork}
        title={artwork.title}
        nextAddress="/artworks/3753"
      >
        <div className={styles.sizedImage}>
          <img width="100%" alt="Artwork" src={artwork.image_file_name} />
        </div>
      </RaterView>
    );
  }
}

export default ArtRaterView;
