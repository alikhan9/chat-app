import { createGroup, logout } from '../client';
import "../styles/menu.scss"
import { useState } from 'react';

const Menu = ({ user, requestUserGroups, redirectToLogin, setErrorMessage, stompClient  }) => {

	const [groupName, setGroupName] = useState('');

	const performLogout = () => {
		stompClient.disconnect();
		logout()
			.then(() => redirectToLogin())
			.catch(err => redirectToLogin());
	}

	const sendCreateGroupRequest = () => {
		if (groupName !== '')
			createGroup(user, groupName).then((response) => {
				requestUserGroups(groupName, true);
			}).catch(err => {
				if (err.response.status === 400){
					setErrorMessage(err.response.data.message);
					setTimeout(() => setErrorMessage('nan'),3000);
				}
				else
					redirectToLogin();
			});
	}


	return (
		<div className='container-menu'>
			<div>ChatApp</div>
			<ul>
				<li>
					Create Group
					<input onKeyPress={(e) => e.key === 'Enter' ? sendCreateGroupRequest() : null} onChange={(e) => setGroupName(e.target.value)} placeholder="Name" />
				</li>
				<li onClick={performLogout}>Logout</li>
			</ul>
		</div>
	)
}

export default Menu;