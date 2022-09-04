import { useEffect } from 'react';
import { useRef } from 'react';
import '../styles/chat.scss'


const MessageBoxPrivate = ({ sendPrivateValue, handleMessage, message, privateChats, user, tab }) => {

    let privateChat = privateChats?.filter(chat => chat.receiver.username === tab.name || chat.sender.username === tab.name);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef?.current?.scrollIntoView({ behavior: "instant" });
    }

    useEffect(scrollToBottom, [privateChats]);

    return (
        <div className="mesgs">
            <div className="msg_history">
                {privateChat?.map((chat, index) => (
                    chat?.sender?.username !== user?.username ?
                        <div key={index}>
                            <div className="received_msg">
                                <div className="received_withd_msg" ref={messagesEndRef}>
                                    <p><span className='sender'>{chat?.sender.username} : </span> {chat?.message}</p>
                                    <span className="time_date"> {chat?.date.substring(11,16)} | {chat?.date?.substring(0,10)}</span></div>
                            </div>
                        </div>
                        :
                        <div className="outgoing_msg"  key={index}>
                            <div className="sent_msg" ref={messagesEndRef}>
                                <p>{chat?.message}</p>
                                <span className="time_date"> {chat?.date?.substring(11,16)} | {chat?.date?.substring(0,10)}</span> </div>
                        </div>
                ))}

            </div>
            <div className="type_msg">
                <div className="input_msg_write">
                    <input type="text" className="write_msg" placeholder="Type a message" onKeyPress={(e) => e.key === 'Enter' ? sendPrivateValue() : null} onChange={handleMessage} value={message} />
                </div>
            </div>
        </div>
    )
}

export default MessageBoxPrivate;