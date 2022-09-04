import React from 'react'
import { deleteUserContact } from '../client';
import { AiOutlineUser } from 'react-icons/ai'
import '../styles/chat.scss'


const PrivateChat = ({ setTab, tab, name, requestUserContacts, redirectToLogin }) => {

    const sendLeaveRequest = () => {
        deleteUserContact(name)
        .then(() => {
            requestUserContacts();
        })
        .catch(err => redirectToLogin());
        setTab({ chatroom: true })
    }

    return (
        <div className={`contactContainer ${tab?.name === name && "active"}`}>
            <div onClick={() => { setTab({ name, chatroom: false }); }} className={`chat_list `}>
                <div className="chat_people">
                    <div> <AiOutlineUser className='img' size={30}/> </div>
                    <div>
                        <h5>{name}</h5>
                    </div>
                </div>
            </div>
            <div>
                <button className="join_button leave_button" onClick={() => sendLeaveRequest()}>Remove</button>
            </div>
        </div>
    )
}

export default PrivateChat;