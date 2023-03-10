var Datastore = require('nedb');
var db = new Datastore();
 
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

    db.insert(contacts);
    console.log("Inserted 2 contacts on start.");

    app.get(BASE_API_URL+"/contacts", (request,response) => {
        console.log("New GET to /contacts");
        db.find({}, (err, contacts)=>{
            if(err){
                console.log(`Error geting /contacts: ${err}`);
                response.sendStatus(500);
            }else{
                console.log(`Contacts returned ${contacts.length}`);
                response.json(contacts.map((c)=>{
                    delete c._id;
                    return c;
                }));  
            }
        });
        
    });

    app.post(BASE_API_URL+"/contacts", (request,response) => {
        var newContact = request.body;

        console.log(`newContact = ${JSON.stringify(newContact,null,2)}`);
        
        console.log("New POST to /contacts");

        contacts.push(newContact);

        response.sendStatus(201);
    });



};

