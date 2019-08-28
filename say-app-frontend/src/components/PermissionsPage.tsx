import * as React from 'react';
import { Button } from 'reactstrap';
import { CellInfo } from 'react-table';
import SubmissionTable from './SubmissionTable/SubmissionTable';

const onMakeEditor = (id: number): void => {
  console.log('Making editor: ', id);
};

const onDenyEditor = (id: number): void => {
  console.log('Making editor: ', id);
};

const onUnapproveEditor = (id: number): void => {
  console.log('Unapproving editor ', id);
};

const onMakeAdmin = (id: number): void => {
  console.log('Making Admin ', id);
};

const onUnapproveAdmin = (id: number): void => {
  console.log('Unapproving admin ', id);
};

const staticUnapprovedEditors = [
  {
    id: 1,
    name: 'Jay Richards',
    email: 'jrich@stanford.edu',
  },
  {
    id: 2,
    name: 'Rusty Walker',
    email: 'rwalker@gmail.com',
  },
];

const staticApprovedEditors = [
  {
    id: 3,
    name: 'Dolly Levi',
    email: 'dlvi@stanford.edu',
  },
  {
    id: 4,
    name: 'Anna Karenina',
    email: 'akren@gmail.com',
  },
];

const staticAdmins = [
  {
    id: 5,
    name: 'Gordon Blake',
    email: 'gblake@stanford.edu',
  },
  {
    id: 6,
    name: 'Ali Vaughan',
    email: 'avaughn@gmail.com',
  },
];


const permissionColumns = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },

];

const unapprovedColumns = [...permissionColumns,
  {
    Cell: (row: CellInfo): React.ReactNode => (
      <Button color="primary" size="sm" onClick={(): void => onMakeEditor(row.original.id)}>Approve</Button>
    ),
  },
  {
    Cell: (row: CellInfo): React.ReactNode => (
      <Button size="sm" onClick={(): void => onDenyEditor(row.original.id)}>Deny</Button>
    ),
  },
];

const editorColumns = [...permissionColumns,
  {
    Cell: (row: CellInfo): React.ReactNode => (
      <Button color="primary" size="sm" onClick={(): void => onMakeAdmin(row.original.id)}>Make Admin</Button>
    ),
  },
  {
    Cell: (row: CellInfo): React.ReactNode => (
      <Button size="sm" onClick={(): void => onUnapproveEditor(row.original.id)}>Unapprove</Button>
    ),
  },
];

const adminColumns = [...permissionColumns,
  {
    Cell: (row: CellInfo): React.ReactNode => (
      <Button size="sm" onClick={(): void => onUnapproveAdmin(row.original.id)}>Make Editor</Button>
    ),
  },
];

// TODO: Collapse empty rows and footer

const headerStyle: React.CSSProperties = {
  marginTop: 20,
};

/**
 * Displays permission controls to make users editors and admins.
 */
const PermissionsPage: React.FunctionComponent = () => (
  <div>
    <h2 style={headerStyle}>Unapproved Editors</h2>
    <SubmissionTable
      displaySearch={false}
      data={staticUnapprovedEditors}
      columns={unapprovedColumns}
      singlePage
    />
    <h2 style={headerStyle}>Approved Editors</h2>
    <SubmissionTable
      displaySearch={false}
      data={staticApprovedEditors}
      columns={editorColumns}
      singlePage
    />
    <h2 style={headerStyle}>Admins</h2>
    <SubmissionTable
      displaySearch={false}
      data={staticAdmins}
      columns={adminColumns}
      singlePage
    />
  </div>
);

export default PermissionsPage;
