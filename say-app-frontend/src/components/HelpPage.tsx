import * as React from 'react';
import { Jumbotron } from 'reactstrap';

const pageStyle: React.CSSProperties = {
  maxWidth: 1140,
  padding: 36,
  textAlign: 'left',
  margin: 'auto',
};

// TODO: link submissions
// TODO: fix linting errors/update rule
// TODO: Show editor/admin help

const HelpPage: React.FunctionComponent = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Help</h1>
      </Jumbotron>
      <div style={pageStyle}>

        <h2>Submitting</h2>
        <h3>How do I submit?</h3>
        <p>To upload a written submission, click on &quot;Upload Written Submission&quot; from the <a href="/submissions/TODO">My Submissions</a> page.  Type in the title and style, upload a WORD DOCUMENT or PDF version of your masterpiece, and click submit!  You should then see a page with a preview of your document.  From there you can either edit the title title and style or click to remove the submission.</p>

        <h3>I uploaded the wrong file or need to upload an updated version.  What should I do?</h3>
        <p>No worries!  From the <a href="/submissions/TODO">My Submissions</a> page, find the submission for which you want to change the file, and click &quot;Remove.&quot;  You can now upload a revised version.  Once you have uploaded a submission, the only way to change the file is the remove the original submission and create a new submission.</p>

        <h3>I can&apos;t see my document/image!  What should I do?</h3>
        <p>If you cannot see your file in the preview window after submitting, please be sure that your submission was in a valid format (.doc, .docx, or .pdf for written submissions and .jpg for artwork).  Remove the submission (see above) and try uploading the file again.  If none of these work, you can email us your submission at stanforday@gmail.com</p>
      </div>
    </div>
  );
};

export default React.memo(HelpPage);
