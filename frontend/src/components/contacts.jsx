import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get("/api/contacts");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    const handleAddContact = async () => {
        if (!name || !email) return alert("Please fill in all fields");

        try {
            const response = await axios.post("/api/contacts", { name, email });
            setContacts([...contacts, response.data]);
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    const handleEditContact = async () => {
        if (!editingContact) return;

        try {
            const response = await axios.put(`/api/contacts/${editingContact._id}`, { name, email });
            setContacts(contacts.map(contact => contact._id === editingContact._id ? response.data : contact));
            setEditingContact(null);
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await axios.delete(`/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    return (
        <div>
            <h2>Contacts</h2>
            <div>
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
            <ul>
                {contacts.map(contact => (
                    <li key={contact._id}>
                        <strong>{contact.name}</strong> - {contact.email}
                        <button onClick={() => setEditingContact(contact)}>Edit</button>
                        <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Contacts;
