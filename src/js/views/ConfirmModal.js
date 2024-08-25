// ConfirmModal.js
import React from 'react';
import '../../styles/ConfirmModal.css'; 

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Confirm Deletion</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete all contacts?</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={onConfirm}>Yes, Delete All</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
