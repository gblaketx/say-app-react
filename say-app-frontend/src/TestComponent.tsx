import React from 'react';

type TestUser = { id: number, email: string };

interface TestComponentState {
  users?: TestUser[]
}

export default class TestComponent extends React.Component<{}, TestComponentState> {
  public state: TestComponentState = {
    users: undefined,
  }

  public componentDidMount() {
    fetch(`http://localhost:3001/api/users.json`)
      .then((response) => response.json())
      .then(users => this.setState({ users }))
  }

  public render() {
    const { users } = this.state;
    if (users === undefined) {
      return null;
    }

    return (
      <div>
        Hello, world
        {users.map(user => <div>{`id: ${user.id}, email: ${user.email}`}</div>)}
      </div>
    );
  }
}