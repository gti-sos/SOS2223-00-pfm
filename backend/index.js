import Datastore from 'nedb';
var db = new Datastore();
 
const BASE_API_URL = "/api/v1";

function loadBackend(app){

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

    app.get(BASE_API_URL+"/contacts/:name", (request,response) => {
        var name = request.params.name;
        console.log("New GET to /contacts/"+name);
        db.find({name}, (err, contacts)=>{
            if(err){
                console.log(`Error geting /contacts/${name}: ${err}`);
                response.sendStatus(500);
            }else{
                console.log(`Contacts returned ${contacts.length}`);
                response.json(contacts.map((c)=>{
                    delete c._id;
                    return c;
                })[0]);  
            }
        });
        
    });


    app.post(BASE_API_URL+"/contacts", (request,response) => {
        var newContact = request.body;

        console.log(`newContact = ${JSON.stringify(newContact,null,2)}`);
        
        console.log("New POST to /contacts");

        db.insert(newContact);

        response.sendStatus(201);
    });

    
    app.put(BASE_API_URL+"/contacts/:name", (request,response) => {
        var name = request.params.name;
        var updatedContact = request.body;

        console.log(`updatedContact = ${JSON.stringify(updatedContact,null,2)}`);
        
        console.log("New UPDATE to /contacts/"+name);

        db.update({ name }, updatedContact, {}, function (err, numReplaced) {
            if(numReplaced == 1)
                response.sendStatus(200);
            else  if(numReplaced == 0)
                response.sendStatus(404);
            else 
                response.sendStatus(500);
            
            if(err)
                console.log("ERROR: "+err);
            
          });
          

        
    });

    app.delete(BASE_API_URL+"/contacts/:name", (request,response) => {
        var name = request.params.name;

        console.log(`New DELETE to /contacts/${name}`);
        
        db.remove({"name" : name},{},(err, numRemoved)=>{
            if(err){
                console.log(`Error deleting /contacts/${name}: ${err}`);
                response.sendStatus(500);
            }else{
                console.log(`Contacts removed ${numRemoved}`);
                response.sendStatus(200);
               
            }
        });
    });



};

export { loadBackend };
