import React, { useState } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';

import About from './components/pages/About';

import GithubState from './context/github/GithubState';

// It is just like linking CSS in HTML.
import './App.css';

function App() {
	const [ users, setUsers ] = useState([]);
	const [ user, setUser ] = useState({});
	const [ repos, setRepos ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	// const[search,setSearch] = useState('');
	const [ alert, setAlert ] = useState(null);

	// Search Github users
	const searchUsers = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/search/users?q=${username}&client_id=${process
				.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
				.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setUsers(res.data.items);
		setLoading(false);
	};
	// Get a single Github user
	const getUser = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env
				.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
				.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setUser(res.data);
		setLoading(false);
	};

	// Get user repo
	const getUserRepo = async (username) => {
		setLoading(true);
		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process
				.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env
				.REACT_APP_GITHUB_CLIENT_SECRET}`
		);
		setRepos(res.data);
		setLoading(false);
	};

	// Clear User from state
	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};
	const setAlertMessage = (msg, type) => {
		setAlert({ msg, type });
		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};
	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />

					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={(propType) => (
									<React.Fragment>
										<Search
											searchUsers={searchUsers}
											users={users}
											clearUsers={clearUsers}
											setAlert={setAlertMessage}
										/>
										<Users
											users={users}
											loading={loading}
										/>
									</React.Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={(propType) => (
									<User
										{...propType}
										getUser={getUser}
										getUserRepo={getUserRepo}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
}

export default App;
