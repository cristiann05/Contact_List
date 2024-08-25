import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import ConfirmModal from "./ConfirmModal";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [editingContact, setEditingContact] = useState(null);
    const [deletingContact, setDeletingContact] = useState(null);
    const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    useEffect(() => {
        actions.loadContacts();
    }, [actions]);

    const handleDelete = () => {
        if (deletingContact) {
            actions.deleteContact(deletingContact.id);
            setAlert({ message: 'Contact deleted successfully', type: 'danger' });
            setDeletingContact(null);
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
    };

    const handleSaveChanges = () => {
        if (editingContact) {
            actions.updateContact(editingContact.id, editingContact);
            setAlert({ message: 'Contact updated successfully', type: 'warning' });
            setEditingContact(null);
        }
    };

    const handleInputChange = (e) => {
        setEditingContact({
            ...editingContact,
            [e.target.name]: e.target.value
        });
    };

    const closeModal = () => setEditingContact(null);

    const openDeleteModal = (contact) => setDeletingContact(contact);
    const closeDeleteModal = () => setDeletingContact(null);

    const handleDeleteAll = () => {
        setIsDeleteAllModalOpen(true);
    };

    const confirmDeleteAll = () => {
        actions.deleteAllContacts();
        setAlert({ message: 'All contacts deleted successfully', type: 'danger' });
        setIsDeleteAllModalOpen(false);
    };

    const cancelDeleteAll = () => {
        setIsDeleteAllModalOpen(false);
    };

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => {
                setAlert({ message: '', type: '' });
            }, 3000); // Clear alert after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="container">
            <h1 className="text-center mt-5">Contact List</h1>
            <button className="btn btn-danger" onClick={handleDeleteAll}>
                Delete All Contacts
            </button>
            <div className="contact-list">
                {store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <div key={contact.id} className="contact-card">
                            <img
                                src={`https://i.pravatar.cc/150?img=${contact.id}`}
                                alt={contact.name}
                                className="contact-image"
                            />
                            <div className="contact-details">
                                <h3 className="contact-name">{contact.name}</h3>
                                <p className="contact-info">
                                    <i className="fas fa-phone-alt"></i> {contact.phone}
                                </p>
                                <p className="contact-info">
                                    <i className="fas fa-envelope"></i> {contact.email}
                                </p>
                                <p className="contact-info">
                                    <i className="fas fa-map-marker-alt"></i> {contact.address}
                                </p>
                            </div>
                            <div className="contact-actions">
                                <i
                                    className="fas fa-edit contact-action-icon fa-edit"
                                    onClick={() => handleEdit(contact)}
                                ></i>
                                <i
                                    className="fas fa-trash contact-action-icon fa-trash"
                                    onClick={() => openDeleteModal(contact)}
                                ></i>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No contacts available.</p>
                )}
            </div>

            {/* Modal para editar */}
            {editingContact && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title">Edit Contact</h2>
                            <button className="close-button" onClick={closeModal}>X</button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={editingContact.name || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={editingContact.phone || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editingContact.email || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={editingContact.address || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={closeModal}>
                                Cancel
                            </button>
                            <button className="btn-primary" onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para eliminar */}
            {deletingContact && (
                <ConfirmModal
                    isOpen={!!deletingContact}
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                />
            )}

            {/* Modal para eliminar todos */}
            {isDeleteAllModalOpen && (
                <ConfirmModal
                    isOpen={isDeleteAllModalOpen}
                    onClose={cancelDeleteAll}
                    onConfirm={confirmDeleteAll}
                />
            )}

            {/* Alertas */}
            {alert.message && (
                <div className={`alert ${alert.type === 'warning' ? 'alert-warning' : 'alert-danger'} notification`}>
                    {alert.message}
                </div>
            )}
        </div>
    );
};
