import { useState } from "react";
import React from "react";

const Contacts = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
    ]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingContact, setEditingContact] = useState(null);

    const handleAddContact = () => {
        if (!name || !email) return alert("Please fill in all fields");

        const newContact = { id: contacts.length + 1, name, email };
        setContacts([...contacts, newContact]);
        setName("");
        setEmail("");
    };

    const handleEditContact = () => {
        if (!editingContact) return;

        const updatedContacts = contacts.map(contact => 
            contact.id === editingContact.id ? { ...contact, name, email } : contact
        );
        setContacts(updatedContacts);
        setEditingContact(null);
        setName("");
        setEmail("");
    };

    const handleDeleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <div style={styles.container}>
            <h2>Contacts</h2>
            <div style={styles.inputContainer}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                {editingContact ? (
                    <button onClick={handleEditContact}>Update Contact</button>
                ) : (
                    <button onClick={handleAddContact}>Add Contact</button>
                )}
            </div>
            <ul style={styles.list}>
                {contacts.map(contact => (
                    <li key={contact.id} style={styles.card}>
                        <strong>{contact.name}</strong> - {contact.email}
                        <button onClick={() => setEditingContact(contact)}>Edit</button>
                        <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const styles = {
    container: { textAlign: "center", padding: "20px" },
    inputContainer: { marginBottom: "20px" },
    list: { listStyleType: "none", padding: 0 },
    card: { display: "flex", justifyContent: "space-between", padding: "10px", border: "1px solid #ddd", marginBottom: "5px", borderRadius: "5px" }
};

export default Contacts;
