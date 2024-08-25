import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/demo.css";

export const Demo = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });

    const addContact = (e) => {
        e.preventDefault();
        
        if (name && email && phone && address) {
            const newContact = { name, email, phone, address };

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContact),
            };

            fetch('https://playground.4geeks.com/contact/agendas/cristian05/contacts', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Contacto agregado:', data);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setAlert({ type: 'success', message: 'Contact added successfully.' });
                })
                .catch(error => {
                    console.error('Error al agregar el contacto:', error);
                    setAlert({ type: 'danger', message: 'Error adding contact.' });
                });
        } else {
            setAlert({ type: 'danger', message: 'Por favor, complete todos los campos.' });
        }
    };

    return (
        <div className="demo-container mt-5">
            <h1 className="demo-heading text-center mb-4">Add a New Contact</h1>
            {alert.message && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
            <form className="demo-form" onSubmit={addContact}>
                <div className="demo-form-group mb-3">
                    <label htmlFor="name" className="demo-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="demo-input"
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="demo-form-group mb-3">
                    <label htmlFor="email" className="demo-label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="demo-input"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="demo-form-group mb-3">
                    <label htmlFor="phone" className="demo-label">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="demo-input"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="demo-form-group mb-3">
                    <label htmlFor="address" className="demo-label">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="demo-input"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="demo-btn-submit">Add Contact</button>
            </form>
            <div className="mt-4 text-center">
                <Link to="/">
                    <button className="demo-btn-back">Back to Contacts</button>
                </Link>
            </div>
        </div>
    );
};
