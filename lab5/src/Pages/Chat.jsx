import React, { useState, useEffect } from 'react';
import { useUser } from '../data/userService';
import { firestore } from '../firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, limit, addDoc } from 'firebase/firestore'; // Importuję metody zapytań

const ChatView = () => {
    const user = useUser();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedRecipient, setSelectedRecipient] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [uniqueContacts, setUniqueContacts] = useState([]); // Unikalne kontakty do wyboru w select

    // Pobierz wiadomości dla zalogowanego użytkownika
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'messages'), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const uniqueContactsArray = Array.from(new Set(data.map(message => message.sender === user.email ? message.recipient : message.sender)));
            setUniqueContacts(uniqueContactsArray);
            setMessages(data);
        });

        return () => unsubscribe();
    }, [user.email]);

    const sendMessage = async () => {
        try {
            const docRef = await addDoc(collection(firestore, 'messages'), {
                text: newMessage,
                sender: user.email,
                recipient: selectedRecipient,
                timestamp: new Date()
            });
            console.log('Document written with ID: ', docRef.id);
            setNewMessage('');
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const handleRecipientChange = (e) => {
        setSelectedRecipient(e.target.value);
    };

    const handleNewRecipientChange = (e) => {
        setRecipientEmail(e.target.value);
    };

    const handleConversationClick = (recipient) => {
        setSelectedRecipient(recipient);
    };

    return (
        <div>
            <section id="hero" className="hero-section">
                <h1>Chat</h1>
                <div style={{ display: 'flex' }}>
                    <select value={selectedRecipient} onChange={handleRecipientChange}>
                        <option value="">Select contact</option>
                        {uniqueContacts.map(contact => (
                            <option key={contact} value={contact}>{contact}</option>
                        ))}
                    </select>
                    <input type="email" value={recipientEmail} onChange={handleNewRecipientChange} placeholder="Enter recipient email" />
                    <button onClick={sendMessage} disabled={!selectedRecipient || newMessage.trim() === ''}>Send</button>
                </div>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {messages.filter(message => (message.sender === selectedRecipient && message.recipient === user.email) || (message.sender === user.email && message.recipient === selectedRecipient)).map(message => (
                        <div key={message.id} onClick={() => handleConversationClick(message.sender === user.email ? message.recipient : message.sender)}>
                            <strong>{message.sender === user.email ? 'You' : message.sender}: </strong>{message.text}
                        </div>
                    ))}
                </div>
                <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    style={{ width: '100%', marginTop: '10px' }}
                />
            </section>
        </div>
    );
}

export default ChatView;
