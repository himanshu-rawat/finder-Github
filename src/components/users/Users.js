import React from 'react';

import UserItem from './UserItem';
import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';


function Users({ users, loading }) {
	const userStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3,1fr)',
		gap: '1rem'
	};
	if (loading) {
		return <Spinner />;
	}
	return (
		<div style={userStyle}>
			{users.map((user) => <UserItem key={user.id} user={user} />)}
		</div>
	);
}

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
};

export default Users;
