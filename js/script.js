console.log("Vue OK", Vue);

const messages = contacts.messages;
let lowestId = Infinity;

const {createApp} = Vue;
const app = createApp ({
    name: "Boolzapp",
    data () {
        return {
            ...data,
            nowActiveID: lowestId,
        }
    },
    computed: {
        
    },
    methods: {
        getLowestID () {
            for (contact in contacts) {
                if (contact.id < lowestId) {
                    lowestId = contact.id;
                    console.log(lowestId);
                    return lowestId
                }
            }
        }
    },
})

app.mount("#root");