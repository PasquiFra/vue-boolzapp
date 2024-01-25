console.log("Vue OK", Vue);


const {createApp} = Vue;
const app = createApp ({
    name: "Boolzapp",
    data () {
        return {
            ...data,
            nowActiveID: null,
            nowActiveContact: null,
        }
    },
    computed: {
        messageStatus(){
            const message = nowActiveContact.message

            message.status === 'sent' ? "sent" : "received"
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