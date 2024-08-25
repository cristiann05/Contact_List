const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [] // Inicialmente vacío, se llenará con los datos de la API
        },
        actions: {
            loadContacts: () => {
                fetch('https://playground.4geeks.com/contact/agendas/cristian05/contacts')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setStore({ contacts: data.contacts || [] });
                    })
                    .catch(error => {
                        console.error('Error al obtener contactos:', error);
                    });
            },
            addContact: (contact) => {
                fetch('https://playground.4geeks.com/contact/agendas/cristian05/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const store = getStore();
                    setStore({ contacts: [...store.contacts, data] });
                })
                .catch(error => {
                    console.error('Error al agregar contacto:', error);
                });
            },
            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/cristian05/contacts/${id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const store = getStore();
                    setStore({ contacts: store.contacts.filter(contact => contact.id !== id) });
                })
                .catch(error => {
                    console.error('Error al eliminar contacto:', error);
                });
            },
            updateContact: (id, updatedContact) => {
                fetch(`https://playground.4geeks.com/contact/agendas/cristian05/contacts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedContact)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const store = getStore();
                    setStore({
                        contacts: store.contacts.map(contact =>
                            contact.id === id ? data : contact
                        )
                    });
                })
                .catch(error => {
                    console.error('Error al actualizar contacto:', error);
                });
            },
            deleteAllContacts: () => {
                const store = getStore();
                const contacts = store.contacts;
                if (contacts.length === 0) {
                    return; // No hay contactos para eliminar
                }

                // Elimina cada contacto uno por uno
                Promise.all(
                    contacts.map(contact => 
                        fetch(`https://playground.4geeks.com/contact/agendas/cristian05/contacts/${contact.id}`, {
                            method: 'DELETE'
                        })
                    )
                )
                .then(responses => {
                    // Verifica que todas las respuestas sean exitosas
                    for (let response of responses) {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                    }
                    setStore({ contacts: [] }); // Vacía el estado de contactos
                })
                .catch(error => {
                    console.error('Error al eliminar todos los contactos:', error);
                });
            }
        }
    };
};

export default getState;
