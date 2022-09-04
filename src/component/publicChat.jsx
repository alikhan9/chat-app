import React from 'react'
import { deleteGroup, leaveGroup } from '../client'
import { HiUserGroup} from 'react-icons/hi'
import '../styles/chat.scss'


const PublicChat = ({ setTab, tab, group, requestUserGroups, user, redirectToLogin }) => {


    const sendLeaveRequest = () => {
        leaveGroup(group)
            .then(() => {
                requestUserGroups();
            })
            .catch(err => redirectToLogin());
        setTab({ chatroom: true })
    }

    const sendDeleteGroupRequest = () => {
        deleteGroup(group.id).then((response) => {
            requestUserGroups();
        })
        .catch((err) => redirectToLogin());
    }

    return (
        <div className={`contactContainer  ${tab.id === group?.id && "active"}`}>
            <div onClick={() => { setTab({ ...group, chatroom: true }); }} className={`chat_list `}>
                <div className="chat_people ">
                    <div>
                        <HiUserGroup size={30} className='img'/>
                    </div>
                    <div>
                        <h5>{group?.name}</h5>
                    </div>
                </div>
            </div>
            <div>
                {parseInt(user.id) === group.owner.id ?
                    <button className="join_button leave_button" onClick={() => sendDeleteGroupRequest()}>Delete</button>
                    :
                    <button className="join_button leave_button" onClick={() => sendLeaveRequest()}>Leave</button>}
            </div>
        </div>
    )
}

export default PublicChat;