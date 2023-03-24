<script>
    // @ts-nocheck
    
        import { onMount } from 'svelte';
        import { dev } from '$app/environment';

        
        let API = '/api/v1/contacts';
        
        if(dev)
            API = 'http://localhost:12345'+API
            

        let contacts = [];
    
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
    
    
    
    
        onMount(async () => {
            getContacts();
        });
    
    </script>
    <h1> Contacts</h1>
    
    <ul>
        {#each contacts as contact}
            <li>{contact.name}</li>
        {/each}        
    </ul>
    
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
    {resultStatus}
    {result}
        </pre>
    {/if}
    
    