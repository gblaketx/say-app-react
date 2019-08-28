import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
} from 'reactstrap';
import { CommentType } from '../../../schema';
import styles from './RaterComment.module.css';

interface RaterCommentProps {
  authorName: string;
  comment: CommentType;
  onDelete?: (id: number) => void;
}

const timestampLocaleOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
};

/**
 * Component displaying a single comment. Because it is a stateless functional
 * component, its contents are entirely controlled by the RaterView displaying it
 * (TODO: link RaterView.tsx).
 */
const RaterComment: React.FunctionComponent<RaterCommentProps> = ({
  authorName,
  comment: { comment_text, created_at, id, title_suggestion},
  onDelete,
}) => (
  <Card className={styles.paddedSized}>
    <CardHeader>
      <div className={styles.bold}>
        {authorName}
      </div>
      <div>
        {created_at.toLocaleString(undefined, timestampLocaleOptions)}
      </div>
    </CardHeader>
    <CardBody className={styles.thinBody}>
      <CardText className={styles.commentCardText}>
        {title_suggestion ? `Title suggestion: ${comment_text}` : comment_text}
        <br />
      </CardText>
      {(onDelete !== undefined)
        && (
          <Button
            outline
            color="danger"
            size="sm"
            onClick={(): void => onDelete(id)}
          >
            Delete
          </Button>)
      }
    </CardBody>
  </Card>
);

RaterComment.defaultProps = {
  onDelete: undefined,
};

RaterComment.propTypes = {
  authorName: PropTypes.string.isRequired,
  comment: PropTypes.shape({
    comment_text: PropTypes.string.isRequired,
    created_at: PropTypes.instanceOf(Date).isRequired,
    document_id: PropTypes.number.isRequired,
    user_id: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title_suggestion: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func,
};

// TODO: Figure out how to memoize without complaints
export default RaterComment;
