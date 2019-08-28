import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Input,
  Label,
} from 'reactstrap';
import styles from './RaterView.module.css';

interface CommentBoxProps {
  showTitleSuggestion?: boolean;
  addComment: (event: React.FormEvent) => void;
}

/**
 * Displays a box in which the user can type comments, including a header,
 * text input, optional title suggestion checkbox, and submission button
 * which fires the provided callback when clicked.
 */
const CommentBox: React.FunctionComponent<CommentBoxProps> = (
  { showTitleSuggestion, addComment },
) => (
  <div>
    <h4>Comment:</h4>
    <div className={styles.paddedHorizontal}>
      <Form onSubmit={addComment}>
        <Input
          type="textarea"
          name="commentArea"
          className={styles.paddedTextArea}
          style={{ height: 150 }}
        />
        {showTitleSuggestion
          && (
            <Label>
              <Input type="checkbox" name="titleCheck" />
              {' '}
              Title Suggestion?
            </Label>
          )}
        <div />
        <Button color="primary" type="submit">Add Comment</Button>
      </Form>
    </div>
  </div>
);

CommentBox.defaultProps = {
  showTitleSuggestion: false,
};

CommentBox.propTypes = {
  /** Whether or not the title sugestion checkbox should display. */
  showTitleSuggestion: PropTypes.bool,

  /** Function called on the form when the "Add Comment" button is pressed. */
  addComment: PropTypes.func.isRequired,
};

export default React.memo(CommentBox);
