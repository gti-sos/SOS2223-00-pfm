const BASE_API_URL = "/api/v1";

module.exports = (app) =>{

    var contacts = [
            {
                name : "pepe",
                phone: 12345
            },
            {
                name : "pablo",
                phone: 6789
            }
        ];

    app.get(BASE_API_URL+"/contacts", (request,response) => {
        response.json(contacts);
        console.log("New GET to /contacts");
    });

    app.post(BASE_API_URL+"/contacts", (request,response) => {
        var newContact = request.body;

        console.log(`newContact = ${JSON.stringify(newContact,null,2)}`);
        
        console.log("New POST to /contacts");

        contacts.push(newContact);

        response.sendStatus(201);
    });



};

