import React, { useCallback, useEffect, useState } from 'react'
import '../styles/chat.scss'
import Menu from './menu';
import AddFriends from './addFriends';
import PrivateChat from './privateChat';
import MessageBoxPublic from './messageBoxPublic';
import { getUser, getUserContacts, getUserContactsMessages, getUserGroups, getUserGroupsMessages } from '../client';
import { useNavigate } from 'react-router-dom';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import PublicChat from './publicChat';
import SearchHeader from './searchHeader';
import MessageBoxPrivate from './messageBoxPrivate';
import ErrorPopUp from './errorPopUp';

var stompClient = null;

const ChatRoomv2 = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState('nan');
    const [privateChats, setPrivateChats] = useState([]);
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState({ chatroom: true });
    const [userData, setUserData] = useState({});
    const [search, setSearch] = useState('');
    const [userContacts, setUserContacts] = useState('nan');
    const [errorMessage, setErrorMessage] = useState('nan');

    const redirectToLogin = useCallback(() => navigate('/', { replace: true }), [navigate]);

    useEffect(() => {
        getUser().then(u => {
                delete u.data.accountNonExpired;
                delete u.data.accountNonLocked;
                delete u.data.authorities;
                delete u.data.credentialsNonExpired;
                delete u.data.enabled;
                setUser(u.data);
                setUserData({
                    username: u.data.username,
                    receivername: '',
                    connected: false,
                    message: ''
                })
            requestUserContacts();
            requestUserContactsMessages();
            requestUserGroups();
            requestUserGroupsMessages();
        })
            .catch((err) => redirectToLogin())
    }, [])

    useEffect(() => {
        if (userGroups !== 'nan' && userData.connected === false)
            connect();
    }, [userGroups])


    const requestUserGroupsMessages = () => {
        getUserGroupsMessages().then(groupMessages => {
            setPublicChats(groupMessages.data);
        });
    }

    const requestUserGroups = (name, addGroup) => {
        getUserGroups().then(groups => {
            setUserGroups(groups.data);
            if (addGroup) {
                groups.data
                    .filter(group => group.name === name)
                    .map(group => stompClient.subscribe(`/chatroom/${group.id}`, onMessageReceived));
            }
        })
    }

    const requestUserContacts = () => {
        getUserContacts().then(contacts => {
            setUserContacts(contacts.data);
        })
    }

    const requestUserContactsMessages = () => {
        getUserContactsMessages().then(messages => {
            setPrivateChats(messages.data);
        })
    }

    const connect = () => {
        let Sock = new SockJS('https://chatapp.alikhan-zaipoulaiev.fr/ws');
        stompClient = over(Sock);
        stompClient.debug = () => { };
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData((old) => { return { ...old, "connected": true } });
        userGroups.map(group => stompClient.subscribe(`/chatroom/${group.id}`, onMessageReceived));
        stompClient.subscribe('/user/' + user.username + '/private', onPrivateMessage);
        setTab(old => { return { ...userGroups[0]?.group, ...old } });
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.message)
            setPublicChats((current) => [...current, payloadData]);
    }

    const onPrivateMessage = (payload) => {
        var payloadData = JSON.parse(payload.body);
        if (payloadData.message) {
            if (!userContacts?.includes(payloadData.sender.username))
                requestUserContacts();
            setPrivateChats(old => [...old, payloadData]);
        }
    }

    const onError = (err) => {
        console.log(err);
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData((old) => { return { ...old, "message": value } });

    }


    const sendValue = () => {
        if (stompClient && userData.message !== '') {
            let chatMessage = {
                sender: user,
                message: userData.message,
                receiver: { id: tab.id, name: tab.name },
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData((old) => { return { ...old, "message": "" } });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient && userData.message !== '') {
            let receiver = {
                username: tab.name,
                first_name: null,
                last_name: null,
                email: null,
                dateofbirth: null,
            }
            let chatMessage = {
                sender: user,
                receiver: receiver,
                message: userData.message,
            };

            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData((old) => { return { ...old, "message": "" } });
        }
    }



    return (
        <div style={{ position: "fixed" }}>
            {errorMessage !== 'nan' ? <ErrorPopUp key={errorMessage} message={errorMessage} /> : null}
            <Menu stompClient={stompClient} user={user} requestUserGroups={requestUserGroups} redirectToLogin={redirectToLogin} setErrorMessage={setErrorMessage} onMessageReceived={onMessageReceived} />
            <div className="container-msg">
                <div className="messaging">
                    <div className="inbox_msg">
                        {userData.connected ?
                            <>
                                <div className="inbox_people">
                                    <SearchHeader setSearch={setSearch} />
                                    <div className="inbox_chat">
                                        {userGroups.map((group, index) => (group?.name?.toUpperCase().includes(search.toUpperCase()) || search === '') ? <PublicChat redirectToLogin={redirectToLogin} user={user} requestUserGroups={requestUserGroups} setTab={setTab} tab={tab} group={group} key={index} /> : null)}
                                        {userContacts.map((contact, index) => (contact?.toUpperCase().includes(search.toUpperCase()) || search === '') ? <PrivateChat redirectToLogin={redirectToLogin} setTab={setTab} requestUserContacts={requestUserContacts} tab={tab} name={contact} key={index} /> : null)}
                                    </div>
                                </div>
                                {tab.chatroom ? <MessageBoxPublic publicChats={publicChats} tab={tab} user={user} message={userData.message} handleMessage={handleMessage} sendValue={sendValue} />
                                    :
                                    <MessageBoxPrivate privateChats={privateChats} tab={tab} user={user} message={userData.message} handleMessage={handleMessage} sendPrivateValue={sendPrivateValue} />
                                }
                                <AddFriends onMessageReceived={onMessageReceived} stompClient={stompClient} redirectToLogin={redirectToLogin} setPrivateChats={setPrivateChats} setPublicChats={setPublicChats} requestUserGroups={requestUserGroups} requestUserContacts={requestUserContacts} />
                            </>
                            : null}
                    </div>
                </div>
            </div>
        </div>

    )
}


export default ChatRoomv2;