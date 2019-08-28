import * as React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import logo from '../images/logoDark.png';

interface NavbarState {
  isOpen: boolean;
}

const onLogout = (): void => {
  // TODO: implement
  console.log('User logged out');
};

class NavbarTop extends React.Component<{}, NavbarState> {
  public state: NavbarState = {
    isOpen: true,
  };

  private toggle = (): void => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  public render(): React.ReactNode {
    const { isOpen } = this.state;

    // TODO: Get account id
    const accountId = '1';

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img height={50} src={logo} alt="SAY Logo" />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink href="/help">Help</NavLink>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Editor Tools
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/">Written Submissions</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/art">Art Submissions</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/title">Title Suggestions</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/leaderboard">Leaderboard</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Admin Tools
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <NavLink href="/admin/permissions">Permissions</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/create_submitter">Create Submitter</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/submitter_index">Submitter Index</NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/admin/settings">Settings</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavLink href={`/account/${accountId}`}>Account</NavLink>
            <NavLink onClick={onLogout}>Logout</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}


export default NavbarTop;
