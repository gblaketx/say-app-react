import * as React from 'react';
import { History } from 'history';
import { Button, Form, FormGroup, Input, Jumbotron, Label } from 'reactstrap';
import { DocumentStyleType } from '../../schema';
import styles from './NewSubmissionPage.module.css';

interface SubmissionPageProps {
  history: History;
  title: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  uploadType: "File" | "Image";
  uploadInstructions: string;
}

// TODO: Add file and submission validation

function renderStyleDropdown(): React.ReactNode {
  return (
    <FormGroup className={styles.boldLabel}>
      <Label>Style</Label>
      <Input name="style" type="select">
        {Object.keys(DocumentStyleType).map((key: any): React.ReactNode => {
          const docStyle = DocumentStyleType[key];
          return <option key={docStyle}>{docStyle}</option>;
        })}
      </Input>
    </FormGroup>
  );
}

export default class NewSubmissionPage extends React.Component<SubmissionPageProps> {
  public render(): React.ReactNode {
    const { history, title, onSubmit, uploadInstructions, uploadType } = this.props;
    return (
      <div>
        <Jumbotron>
          <h1>{title}</h1>
        </Jumbotron>
        <Form className={styles.newSubmissionPage} onSubmit={onSubmit}>
          <FormGroup className={styles.boldLabel}>
            <Label>Title</Label>
            <Input name="title" />
          </FormGroup>
          { uploadType === "File" &&  renderStyleDropdown()}
          <FormGroup className={styles.boldLabel}>
            <Label>{uploadType}</Label>
            <div className={styles.fileUploadText}>
              {uploadInstructions}
            </div>
            <Input name="file" type="file"/>
          </FormGroup>
          <div className={styles.submissionContainer}>
            <Button color="danger" size="lg" onClick={history.goBack}>
              Back
            </Button>
            <Button type="submit" color="success" size="lg">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}