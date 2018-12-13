import agent from '../agent';
import React from 'react';
import Header from './Header'
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, DATABASE_LOADED } from '../constants/actionTypes';
import { store } from '../store';
import { push } from 'react-router-redux';
import WorkSpace from './WorkSpace'

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onDatabaseLoad: (payload) =>
    dispatch({type: DATABASE_LOADED, payload}),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if ("noam") {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
    this.props.onDatabaseLoad(Promise.all([
      agent.WorkSpace.getAllJobs(),
			agent.WorkSpace.getAllQueues()
    ]))
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>

            <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />
            
            <WorkSpace />
            
            

        </div>
      );
    }
    return (
      <div>
        Header
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
