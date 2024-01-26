console.log("Vue OK", Vue);


const {createApp} = Vue;
const app = createApp ({
    name: "Boolzapp",
    data () {
        return {
            ...data,
            nowActiveID: null,
            nowActiveContact: false,
            newMessage: "",
            active: true,
            textSearch: "",
        }
    },
    computed: {
        defaultClass (){ 
            return {
                "d-none": this.nowActiveContact === false
            }
        },
        nowActive(){
            return {
                "d-none": this.nowActiveContact !== false
            }
        },
        contactsFilter(){
            const loweredTextSearch = this.textSearch.toLowerCase()

            return this.contacts.filter(contact => 
                contact.name.toLowerCase().includes(loweredTextSearch)
            );
        },
    },
    methods: {
        changeActiveID(id) {
            for (let i=0; i < this.contacts.length; i++){
                if (this.contacts[i].id === id) {
                    this.nowActiveID = id,
                    this.nowActiveContact = this.contacts[i]
                }
            }
        },
        newDate (){
            const currentDate = new Date();
            console.log(currentDate)

            return currentDate.toLocaleString();
        },
        getTime (date){
            const newDate = new Date(date)
            const hours = newDate.getHours()
            const minutes = newDate.getMinutes()
            console.log(newDate)
            return `${hours}:${minutes}`
        },
        addMessage (){
            if (!this.newMessage) return

            const updateMessages = this.nowActiveContact.messages
            
            const newMessage = {
                id: updateMessages.length,
                date: this.newDate(),
                text: this.newMessage,
                status: 'sent'
            }
            updateMessages.push(newMessage)
            this.newMessage = "";
            this.reply()
        },
        reply() {
            setTimeout(() => {
                const updateMessages = this.nowActiveContact.messages
            
                const newMessage = {
                    id: updateMessages.length,
                    date: this.newDate(),
                    text: "ok",
                    status: 'received'
                }
                updateMessages.push(newMessage)
            },1000)
        },
        onSubmit(e) { 
            e.preventDefault();
        },
        getAvatarUrl (avatar) {
            return `img/avatar${avatar}.jpg`
        },
        lastMessage(messages) {
            const lastMessageDate = messages[messages.length - 1].date
            return lastMessageDate
        },
        lastMessageText(messages) {
            const lastMessageText = messages[messages.length - 1].text
            const splitWords = lastMessageText.split("")
            const splittedWords = []
            for (let i=0; i < splitWords.length; i++) {
                if (i <= 15){
                    splittedWords.push(splitWords[i])
                }
            }
            return `${splittedWords.join("")}...`
        }
    },
    mounted(){
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