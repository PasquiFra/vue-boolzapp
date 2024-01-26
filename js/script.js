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
        }
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
        filtering(){

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