import React, { useState, useContext, useRef, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore'
import UserContext from '../../context/user/userContext'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Paper, InputBase, IconButton, Avatar } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

firebase.initializeApp({
    apiKey: "AIzaSyBeZSRll5aeHstYFDqG5bM1fqy4jMW21TI",
    authDomain: "whiskchat.firebaseapp.com",
    projectId: "whiskchat",
    storageBucket: "whiskchat.appspot.com",
    messagingSenderId: "389547048403",
    appId: "1:389547048403:web:9e9b07f6e64990fe428326"
})

export function ChatRoom() {
    const userContext = useContext(UserContext);
    const { user } = userContext;
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();
        const uid = user.ID
        console.log(uid)

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
        })
        setFormValue('')
        dummy.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <>
            <Paper className='messaging'>
                <div className='messages'>
                    {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                    <div ref={dummy}></div>
                </div>
                <div className='message-input'>
                    <hr />
                    <form onSubmit={sendMessage}>
                        <div className='wrapper message-form'>
                            <InputBase className='input' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                            <IconButton type={"submit"}>
                                <SendIcon style={{ color: '#00d1ff' }} />
                            </IconButton>

                        </div>
                    </form>
                </div>
            </Paper>
        </>
    )

}

function ChatMessage(props) {
    const { text, uid } = props.message;
    const messageClass = uid === uid.ID ? 'msg-sent' : 'msg-received';

    return (<>
        <div className={`${messageClass}`} >
            <div className='wrapper'>
                <Avatar />
                <Paper className='msg-text'>{text}</Paper>
            </div>
        </div>
    </>)
}



const firestore = firebase.firestore();

