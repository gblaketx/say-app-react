import * as React from 'react';
import { loadComments, RaterView } from './RaterView';
import DocumentViewer from './DocumentViewer/DocumentViewer';
import styles from './RaterView.module.css';
import { CommentType, DocumentType, SubmitterType } from '../../schema';

interface DocumentRaterViewProps {
  match: {
    params: { id: number };
  };
  history: { push: (route: string) => void };
}

interface DocumentRaterViewState {
  document?: DocumentType;
  author?: SubmitterType;
  comments?: CommentType[];
}

// TODO: Remove this silliness once we have real data
interface SubmissionData {
  [id: number]: { document: string };
}

class DocumentRaterView extends React.Component<DocumentRaterViewProps, DocumentRaterViewState> {
  public state: DocumentRaterViewState = {
    author: undefined,
    document: undefined,
    comments: undefined,
  }

  public componentDidMount(): void {
    const { match: { params: { id } } } = this.props;
    fetch(`http://localhost:3004/documents/${id}`)
      .then((response): Promise<DocumentType> => response.json()) // TODO: set wire type
      .then((document): void => {
        this.setState({ document });
        loadComments(
          document.comments,
          (comments: CommentType[]): void => this.setState({ comments }),
        );
        fetch(`http://localhost:3004/users/${document.user_id}`)
          .then((response): Promise<SubmitterType> => response.json())
          .then((author): void => this.setState({ author })); // TODO: Select only needed)
      });
  }

  private getAnotherDocument(): string {
    // TODO: Implement
    const { match: { params: { id } } } = this.props;
    console.log('More label!');
    const nextDocId = '123';
    return `/documents/${nextDocId}`;
  }

  public render(): React.ReactNode {
    const { author, comments, document } = this.state;
    if (document === undefined || author === undefined || comments === undefined) {
      return null;
    }
    // if ([author, comments, document].some(val => val === undefined)) {
    //   return null;
    // }
    return (
      <RaterView
        author={author}
        comments={comments}
        submission={document}
        showTitleSuggestion
        title={(
          <span>
            {document.title}
            {' '}
            <span className={styles.styleDescriptionText}>({document.style})</span>
          </span>
        )}
        nextAddress={this.getAnotherDocument()}
      >
        <DocumentViewer docSrc={document.file} />
      </RaterView>
    );
  }
}

export default DocumentRaterView;
