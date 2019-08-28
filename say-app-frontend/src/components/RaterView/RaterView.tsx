import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Jumbotron,
  UncontrolledDropdown,
} from 'reactstrap';
import CommentBox from './CommentBox';
import RaterComment from './RaterComment/RaterComment';
import {
  CommentType,
  SubmissionType,
  UserType,
  WireCommentType,
} from '../../schema';
import discussionFlagGray from '../../images/discussionFlagGray.svg';
import discussionFlag from '../../images/discussionFlag.svg';
import styles from './RaterView.module.css';

interface RaterViewProps {
  author: Omit<UserType, 'role'>;
  comments: CommentType[];
  nextAddress: string;
  showTitleSuggestion?: boolean;
  submission: SubmissionType;
  title: React.ReactNode;
}

interface RaterViewState {
  dropdownValue: string;
  isGetAnotherVisible: boolean;
  comments: CommentType[];
  isFlagged: boolean;
}

const transparentButtonStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
};

export function deserializeComment(json: WireCommentType): CommentType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comment = json as any;
  comment.created_at = new Date(Date.parse(json.created_at));
  return comment;
}

// TODO: Make this better, either store in db or organize exports
export function loadComments(ids: number[], onload: (comments: CommentType[]) => void): void {
  Promise.all(
    ids.map((id: number): Promise<CommentType> => (
      fetch(`http://localhost:3004/comments/${id}`)
        .then((response): Promise<CommentType> => response.json().then(deserializeComment))
    )),
  ).then(onload);
}

export class RaterView extends React.Component<RaterViewProps, RaterViewState> {
  private static propTypes = {
    /** Whether the "Title Suggestion?" checkbox is visible on the comments. */
    showTitleSuggestion: PropTypes.bool,
  }

  private static defaultProps = {
    showTitleSuggestion: false,
  }

  public state: RaterViewState = {
    dropdownValue: 'Rate this piece',
    comments: this.props.comments, // eslint-disable-line react/destructuring-assignment
    isGetAnotherVisible: false,
    isFlagged: this.props.submission.flag, // eslint-disable-line react/destructuring-assignment
  }

  // TODO: Implement
  private flagItem = (): void => {
    const { isFlagged } = this.state;
    this.setState({ isFlagged: !isFlagged });
    // TODO: update db
  }

  private selectRating = (event: React.MouseEvent): void => {
    const dropdownValue = event.currentTarget.textContent || 'Rate this piece';
    this.setState({
      dropdownValue,
      isGetAnotherVisible: true,
    });
  }

  private addComment = (event: React.FormEvent): void => {
    event.preventDefault();
    const { submission } = this.props;
    const { comments } = this.state;
    const { commentArea, titleCheck } = (event.target as HTMLFormElement);

    // Ignore empty comments
    if (!commentArea.value) {
      return;
    }

    const isTitleSuggestion = titleCheck !== undefined && titleCheck.checked;
    // const commentText = isTitleSuggestion
    //   ? `Title Suggestion: ${commentArea.value}`
    //   : commentArea.value;

    comments.push({
      id: comments.length + 1, // TODO: backend generate uuid
      user_id: 4, // TODO: set logged in user
      created_at: new Date(),
      comment_text: commentArea.value as string,
      document_id: submission.id, // TODO: art vs document
      title_suggestion: isTitleSuggestion,
    });
    this.setState({ comments });
    commentArea.value = '';
  }

  private deleteComment = (id: number): void => {
    const { comments } = this.state;
    // TODO: Replace with backend
    // TODO: Check for title suggestions and remove from DB?
    this.setState({
      comments: comments.filter((comment): boolean => comment.id !== id),
    });
  }

  public render(): React.ReactNode {
    const { author, title, children, showTitleSuggestion, nextAddress } = this.props;
    const { comments, dropdownValue, isFlagged, isGetAnotherVisible } = this.state;

    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">
            {title}
            {' '}
            <Button onClick={this.flagItem} style={transparentButtonStyle}>
              <img
                width={50}
                src={isFlagged ? discussionFlag : discussionFlagGray}
                alt="Flag"
              />
            </Button>
          </h1>

          <p className="lead">
            By:
            {' '}
            <a href={`/users/${author.id}`}>
              {author.first_name}
              {' '}
              {author.last_name}
            </a>
          </p>
        </Jumbotron>
        <div className={styles.flexBlock}>
          <div className={styles.flexColumnWide}>
            { children }
          </div>
          <div className={styles.flexColumnNarrow}>
            <h4>Your Rating:</h4>
            <UncontrolledDropdown>
              <DropdownToggle caret className={styles.ratingDropdown}>
                {dropdownValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.selectRating}>1</DropdownItem>
                <DropdownItem onClick={this.selectRating}>2</DropdownItem>
                <DropdownItem onClick={this.selectRating}>3</DropdownItem>
                <DropdownItem onClick={this.selectRating}>4</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            { isGetAnotherVisible && (
              <Button color="primary" href={nextAddress}>
                Give Me Another!
              </Button>
            )}
            <CommentBox
              showTitleSuggestion={showTitleSuggestion}
              addComment={this.addComment}
            />
            <div className={styles.paddedHorizontal}>
              {comments.map((comment): RaterComment => (
                <RaterComment
                  key={comment.id} // TODO: Make this the db comment id
                  authorName="TODO: Rater name"
                  comment={comment}
                  onDelete={this.deleteComment}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
