
const { createApp } = Vue;
const app = createApp({
    name: "Boolzapp",
    data() {
        return {
            ...data,
            nowActiveID: null,
            nowActiveContact: false,
            newMessage: "",
            active: true,
            textSearch: "",
            activeDropdownId: null
        }
    },
    computed: {
        defaultClass() {
            return {
                "d-none": this.nowActiveContact === false
            }
        },
        nowActive() {
            return {
                "d-none": this.nowActiveContact !== false
            }
        },
        contactsFilter() {
            const loweredTextSearch = this.textSearch.toLowerCase()

            return this.contacts.filter(contact =>
                contact.name.toLowerCase().includes(loweredTextSearch)
            );
        }
    },
    methods: {
        changeActiveID(id) {
            for (let i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].id === id) {
                    this.nowActiveID = id,
                        this.nowActiveContact = this.contacts[i]
                }
            }
        },
        newTime() {
            // Creo una data da stampare alla creazione di un nuovo messaggio
            const currentDate = new Date();

            return currentDate;
        },
        getTime(date) {
            //stampo in pagina l'orario di invio/ricezione di un messaggio
            const newDate = new Date(date)
            const hours = newDate.getHours()
            const minutes = newDate.getMinutes()
            return `${hours}:${minutes}`
        },
        addMessage() {
            // se il campo del nuovo messaggio è vuoto non lo invio
            if (!this.newMessage) return;

            // alternativamente creo il nuovo messaggio
            const updateMessages = this.nowActiveContact.messages;
            const newMessage = {
                id: updateMessages.length + 1,
                date: this.newTime(),
                text: this.newMessage,
                status: 'sent'
            };
            updateMessages.push(newMessage);
            this.newMessage = "";
            this.reply();
        },
        reply() {
            // dopo un secondo dall'invio del nuovo messaggio riceverò 
            // una risposta automatica
            setTimeout(() => {
                const updateMessages = this.nowActiveContact.messages;

                const newMessage = {
                    id: updateMessages.length + 1,
                    date: this.newTime(),
                    text: "ok",
                    status: 'received'
                };
                updateMessages.push(newMessage);
            }, 1000);
        },
        onSubmit(e) {
            e.preventDefault();
        },
        getAvatarUrl(avatar) {
            return `img/avatar${avatar}.jpg`
        },
        lastMessage(messages) {
            // recupero la data dell'ultimo messaggio
            const lastMessageDate = messages[messages.length - 1].date;
            const currentDate = new Date(lastMessageDate);
            return currentDate.toLocaleString();

        },
        lastMessageText(messages) {
            // creo un abstract dell'ultimo messaggio
            const lastMessageText = messages[messages.length - 1].text
            const splitWords = lastMessageText.split("")
            const splittedWords = []
            for (let i = 0; i < splitWords.length; i++) {
                if (i <= 15) {
                    splittedWords.push(splitWords[i])
                }
            }
            return `${splittedWords.join("")}...`
        },
        deleteMessage(messageId) {
            //cancello un messaggio nella conversazione
            const messages = this.nowActiveContact.messages
            this.nowActiveContact.messages = messages.filter(message => message.id !== messageId);
        },
        toggleDropdown(messageId) {
            //faccio il toggle del dropdown con id corrispondente
            if (this.activeDropdownId === messageId) {
                this.activeDropdownId = null;
            } else {
                this.activeDropdownId = messageId;
            }
        },
    },
    mounted() {
        let lowestId = Infinity;
        for (contact of this.contacts) {
            if (contact.id < lowestId) {
                lowestId = contact.id;
            }
        }
        this.nowActiveID = lowestId
    }

})

app.mount("#root");