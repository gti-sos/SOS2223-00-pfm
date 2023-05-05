<svelte:head>
    <title>Contact List</title>
</svelte:head>

<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';
        import { Button, Table } from 'sveltestrap';

        onMount(async () => {
            getContacts();
        });
        
        let API = '/api/v1/contacts';
        
        if(dev)
            API = 'http://localhost:12345'+API
            

        let contacts = [];
        let newContactName = 'name';
        let newContactPhone = 'phone';
        let message = "";
    
        let result = "";
        let resultStatus = "";
    
        async function getContacts () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'GET'
            });
            try{
                const data = await res.json();
                result = JSON.stringify(data,null,2);
                contacts = data;
            }catch(error){
                console.log(`Error parsing result: ${error}`);
            }
            const status = await res.status;
            resultStatus = status;	
        }
      

        async function createContact () {
            resultStatus = result = "";
            const res = await fetch(API, {
                method: 'POST',
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    name: newContactName,
                    phone: newContactPhone
                })
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==201){
                getContacts();
            }

        }
    
        async function deleteContact (contactName) {
            resultStatus = result = "";
            const res = await fetch(API+"/"+contactName, {
                method: 'DELETE'
            });
            const status = await res.status;
            resultStatus = status;	           
            if(status==200){
                getContacts();
            }
        }
      


    </script>
    <h1> Contacts</h1>
    
    <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
           <tr>
                <td><input bind:value={newContactName}></td>
                <td><input bind:value={newContactPhone}></td>
                <td><Button on:click={createContact}>Create</Button></td>
            </tr>
    
        {#each contacts as contact}
          <tr>
            <td><a href="/contacts/{contact.name}">{contact.name}</a></td>
            <td>{contact.phone}</td>
            <td><Button on:click={deleteContact(contact.name)}>Delete</Button></td>
          </tr>
          {/each} 
        </tbody>
      </Table>

      {#if message != ""}
      <h1 style="color:red">{message}</h1>
      {/if}
      
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}
    
    