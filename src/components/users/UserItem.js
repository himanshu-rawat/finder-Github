import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function UserItem({ user: { login, avatar_url, html_url } }) {
	// const { login, avatar_url, html_url } = props.user;
	return (
		<div className='card text-center'>
			<img
				src={avatar_url}
				alt={login}
				className='round-img'
				style={{ width: '60px' }}
			/>
			<h3> {login} </h3>
			<div>
				<Link
					to={`/user/${login}`}
					// target='_blank'
					// rel='noopener noreferrer'
					className='btn btn-dark btn-sm my-1'
				>
					More
				</Link>
			</div>
		</div>
	);
}
UserItem.propTypes = {
	user: PropTypes.object.isRequired
};

export default UserItem;
