import React, {useState } from 'react';
import PropTypes from 'prop-types';

function Search (props) {
	const [text,setText]= useState('')

	const onChange = (e) => {
		setText(e.target.value)
		
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (text === '') {
			props.setAlert('Please enter something', 'light');
		} else {
			props.searchUsers(text);
			setText('')
		}
	};
		return (
			<div>
				<form className='form' onSubmit={onSubmit}>
					<input
						type='text'
						name='text'
						placeholder='Search Users...'
						value={text}
						onChange={onChange}
					/>
					<input
						type='submit'
						value='Search'
						className='btn btn-dark btn-block'
					/>
				</form>
				{props.users.length > 0 && (
					<button
						className='btn btn-light btn-block'
						onClick={props.clearUsers}
					>
						Clear
					</button>
				)}
			</div>
		);
	
}

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired,
	setAlert: PropTypes.func.isRequired
};

export default Search;
