import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './DocumentViewer.module.css';

interface DocumentViewerProps {
  docSrc: string;
}

/**
 * Displays a PDF (TODO verify) document in a scrollable viewer.
 * Includes a download link to the source document.
 */
const DocumentViewer: React.FunctionComponent<DocumentViewerProps> = ({ docSrc }) => (
  <div className={styles.sizedDocument}>
    <div>
      Preview window not showing up? Try
      {' '}
      <a href="/">(TODO: set link) downloading the file directly</a>
      .
    </div>
    <iframe
      src={`/pdfjs/web/viewer.html?file=${docSrc}`}
      title="Document Viewer"
      width="100%"
      height="100%"
    />
  </div>
);

DocumentViewer.propTypes = {
  /** The source of the document to display. */
  docSrc: PropTypes.string.isRequired,
};

export default DocumentViewer;
