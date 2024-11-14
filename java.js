const contactForm = document.getElementById("contact-form");
const contactList = document.getElementById("contact-list");

document.addEventListener("DOMContentLoaded", loadContacts);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const contact = {
        id: Date.now(),
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
    };

    saveContact(contact);
    contactForm.reset();
});


function saveContact(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}

function getContacts() {
    return JSON.parse(localStorage.getItem("contacts")) || [];
}

function displayContacts() {
    contactList.innerHTML = "";
    const contacts = getContacts();
    contacts.forEach((contact) => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");
        contactCard.innerHTML = `
            <div class="contact-info">
                <p><strong>Nombre:</strong> ${contact.name}</p>
                <p><strong>Teléfono:</strong> ${contact.phone}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Dirección:</strong> ${contact.address}</p>
            </div>
            <div>
                <button class="edit" onclick="editContact(${contact.id})">Editar</button>
                <button class="delete" onclick="deleteContact(${contact.id})">Eliminar</button>
            </div>
        `;
        contactList.appendChild(contactCard);
    });
}


function loadContacts() {
    displayContacts();
}

function deleteContact(id) {
    let contacts = getContacts();
    contacts = contacts.filter(contact => contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}


function editContact(id) {
    const contacts = getContacts();
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
        document.getElementById("name").value = contact.name;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("email").value = contact.email;
        document.getElementById("address").value = contact.address;

        deleteContact(id); 
    }
}
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;

    
    if (!name || !phone) {
        alert("Por favor, ingresa el nombre y el teléfono del contacto.");
        return;
    }

    const contact = {
        id: Date.now(),
        name,
        phone,
        email,
        address,
    };

    saveContact(contact);
    contactForm.reset();
});
