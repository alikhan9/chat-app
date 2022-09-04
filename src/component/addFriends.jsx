import React, { useState } from 'react'
import { addContact, getGroupByName, getGroupMessages, getUserContactMessages, getUsersByUsername, joinGroup } from '../client';
import { FiUserPlus } from 'react-icons/fi'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import '../styles/chat.scss'


const AddFriends = ({ requestUserGroups, requestUserContacts, setPublicChats, setPrivateChats, redirectToLogin, stompClient, onMessageReceived }) => {

    const [search, setSearch] = useState('');
    const [groups, setGroups] = useState('');
    const [users, setUsers] = useState('');

    const updateSearchValue = e => {
        setSearch(e.target.value);
    }

    const sendSearchRequest = () => {
        getGroupByName(search).then(response => {
            setGroups(response.data);
        }).catch(err => redirectToLogin());

        getUsersByUsername(search).then(response => {
            setUsers(response.data);
        }).catch(err => redirectToLogin());
    }

    const sendJoinRequest = group => {
        joinGroup(group)
            .then(response => {
                requestUserGroups();
                getGroupMessages(group.id).then(messages => {
                    setPublicChats( old => [...old, ...messages.data]);
                });
                setGroups( grs => grs.filter( gr => gr!== group));
                stompClient.subscribe(`/chatroom/${group.id}`, onMessageReceived);
            })
            .catch(err => redirectToLogin());
    }

    const sendAddUserRequest = name => {
        addContact(name)
            .then(response => {
                requestUserContacts();
                getUserContactMessages(name).then(messages => {
                    setPrivateChats( old => [...old, ...messages.data]);
                });
                setUsers( u => u.filter( user => user!== name));
            })
            .catch(err => redirectToLogin());

    }

    return (
        <div className="inbox_people">
            <div className="headind_srch">
                <div className="recent_heading">
                    <h4> Add Groups/Users</h4>
                </div>
                <div className="srch_bar">
                    <input type="text" placeholder="Search" className='search_input' onChange={updateSearchValue} onKeyPress={(e) => e.key === 'Enter' ? sendSearchRequest() : null} />
                </div>
            </div>
            <div className="inbox_chat">
                {groups !== '' ? groups?.map((group, index) =>
                    <div className="chat_list" key={index}>
                        <div className="chat_people">
                            <div>
                            <AiOutlineUsergroupAdd size={30} className='imgAdd'/>
                            </div>
                            <div>
                                {group.name}
                            </div>
                            <div>
                                <button className="join_button" onClick={() => sendJoinRequest(group)} >Join</button>
                            </div>
                        </div>
                    </div>
                ) : null}

                {users !== '' ? users?.map((name, index) =>
                    <div className="chat_list" key={index}>
                        <div className="chat_people">
                            <div>
                                <FiUserPlus size={30} className='imgAdd'/>
                            </div>
                            <div>
                                {name}
                            </div>
                            <div>
                                <button className="join_button" onClick={() => sendAddUserRequest(name)} >Add</button>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </div>
    )
}

export default AddFriends