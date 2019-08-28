import * as React from 'react';
import { CellInfo } from 'react-table';
import SubmissionTable from './SubmissionTable/SubmissionTable';
import { getFilterMethod, textCellStyle } from './SubmissionTable/SubmissionTableConstants';
import { deserializeComment } from './RaterView/RaterView';
import {
  CommentType,
  DocumentType,
  EditorType,
  WireCommentType,
} from '../schema';

const submissionColumns = [
  {
    // A dummy column to make the others searchable
    header: '',
    id: 'all',
    filterMethod: getFilterMethod(['suggestion', 'title', 'suggester']),
    filterAll: true,
    width: 0,
    headerStyle: { padding: 0 },
    style: { padding: 0 },
  },
  {
    Header: 'Title Suggestion',
    accessor: 'suggestion',
    style: { whiteSpace: 'unset' },
  },
  {
    Header: 'Submission',
    accessor: 'title',
    style: textCellStyle,
    minWidth: 120,
    Cell: (row: CellInfo): React.ReactNode => (
      <a href={`/documents/${row.original.doc_id}`}>
        {row.value}
      </a>
    ),
  },
  {
    Header: 'Suggested By',
    accessor: 'suggester',
    style: { whiteSpace: 'unset' },
  },
];

interface TitleSuggestionsPageState {
  suggestions?: Suggestion[];
}

interface Suggestion {
  suggestion: string;
  doc_id: number;
  title: string;
  suggester: string;
}

function fetchSuggestionData(comment: CommentType): Promise<Suggestion> {
  // TODO: current code assumes no title suggestions from artwork
  return Promise.all([
    fetch(`http://localhost:3004/documents/${comment.document_id}`)
      .then((response): Promise<DocumentType> => response.json())
      .then((document): string => document.title),
    fetch(`http://localhost:3004/users/${comment.user_id}`)
      .then((response): Promise<EditorType> => response.json())
      .then((editor): string => `${editor.first_name} ${editor.last_name}`),
  ]).then(([title, suggester]): Suggestion => ({
    doc_id: comment.document_id,
    suggester,
    suggestion: comment.comment_text,
    title,
  }));
}

/**
 * Displays a table with suggested titles, their source stories, the suggester,
 * and (if finalized) TODO: whether or not the story was accepted.
 */
class TitleSuggestionsPage extends React.Component<TitleSuggestionsPage> {
  public state: TitleSuggestionsPageState = {
    suggestions: undefined,
  };

  public componentDidMount(): void {
    fetch('http://localhost:3004/comments')
      .then((response): Promise<WireCommentType[]> => response.json())
      .then((serializedComments: WireCommentType[]): void => {
        const comments = serializedComments
          .filter((comment): boolean => comment.title_suggestion)
          .map(deserializeComment);
        Promise.all(comments.map(fetchSuggestionData))
          .then((suggestions: Suggestion[]): void => this.setState({ suggestions }));
      });
  }

  public render(): React.ReactNode {
    const { suggestions } = this.state;
    if (suggestions === undefined) {
      return null;
    }

    return (
      <div>
        <h1>Title Suggestions</h1>
        <SubmissionTable
          data={suggestions}
          columns={submissionColumns}
        />
      </div>
    );
  }
}

export default TitleSuggestionsPage;
