module.exports = {
    notes: [{
        title: "my first note",
        body: "is very short",
        color: 'white',
        author: "user",
        archive: false,
        reminder: false,
        timecreated: null,
        timeedited: null,
        id: "ABCDE"
    },{
        title: "my second note",
        body: "is very short too",
        color: 'white',
        author: "user",
        archive: false,
        reminder: false,
        timecreated: null,
        timeedited: null,
        id: "12345"
    }],
    status: -1,
    frage: "",
    timestamp: "",
    dateTime: "",
    wordlist: [],
    amountResponses: 0,
    settings: {
        currentcustomer: 0, // default value, describes picture filename
        currentibm: 0, // default value, describtes picture filename
        listcustomer: [
            { name: "Allianz", picture: "allianz.png" },
            { name: "AOK", picture: "aok.png" },
            { name: "Bitmarck", picture: "bitmarck.png" },
            { name: "DAK", picture: "dak.png" },
            { name: "VKB", picture: "vkb.png" }
        ],
        listibm: [
            { name: "GBS", picture: "ibm.png" },
            { name: "GBS Insurance", picture: "ibm.png" },
            { name: "HIT", picture: "ibm.png" },
            { name: "IBM", picture: "ibm.png" },
            { name: "Watson Group", picture: "ibm.png" }
        ]
    }
};