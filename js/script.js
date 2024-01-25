console.log("Vue OK", Vue);

const messages = contacts.messages;

const {createApp} = Vue;
const app = createApp ({
    name: "Boolzapp",
    data () {
        return {
            ...data,
        }
    },
    computed: {

    },
    methods: {

    }
})

app.mount("#root");