import * as React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import NavbarTop from './components/NavbarTop';
import WrittenSubmissionsPage from './components/WrittenSubmissionsPage';
import ArtSubmissionsPage from './components/ArtSubmissionsPage';
import TitleSuggestionsPage from './components/TitleSuggestionPage';
import LeaderboardPage from './components/LeaderboardPage';
import AccountPage from './components/AccountPage';
import SettingsPage from './components/SettingsPage';
import LoginPage from './components/LoginPage';
import SubmitterSignUpPage from './components/SignUp/SubmitterSignUpPage';
import EditorSignUpPage from './components/SignUp/EditorSignUpPage';
import PermissionsPage from './components/PermissionsPage';
import CreateSubmitterPage from './components/CreateSubmitterPage';
import SubmitterIndexPage from './components/SubmitterIndexPage';
import HelpPage from './components/HelpPage';
import UserInfoPage from './components/UserInfo/UserInfoPage';
import EditUserPage from './components/EditUserPage';
import DocumentRaterView from './components/RaterView/DocumentRaterView';
import ArtRaterView from './components/RaterView/ArtRaterView';
import './App.css';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <div className="App">
        <NavbarTop />
        <Switch>
          <Route path="/" exact component={WrittenSubmissionsPage} />
          <Route path="/art" component={ArtSubmissionsPage} />
          <Route path="/documents/:id" component={DocumentRaterView} />
          <Route path="/artworks/:id" component={ArtRaterView} />
          <Route path="/title" component={TitleSuggestionsPage} />
          <Route path="/leaderboard" component={LeaderboardPage} />
          <Route path="/account/:id" component={AccountPage} />
          <Route path="/admin/settings" component={SettingsPage} />
          <Route path="/admin/permissions" component={PermissionsPage} />
          <Route path="/admin/create_submitter" component={CreateSubmitterPage} />
          <Route path="/admin/submitter_index" component={SubmitterIndexPage} />
          <Route path="/help" component={HelpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/submitters/signup" component={SubmitterSignUpPage} />
          <Route path="/editors/signup" component={EditorSignUpPage} />
          <Route path="/users/:id" component={UserInfoPage} />
          <Route path="/edit/users/:id" component={EditUserPage} />
        </Switch>
      </div>
    </Router>
    // TODO: edit paths with params?
  );
};

export default App;
