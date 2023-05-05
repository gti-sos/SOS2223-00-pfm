<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
</svelte:head>

<script>
    // @ts-nocheck
    import {onMount} from 'svelte';
    import { dev } from '$app/environment';
        
        
    let API = '/api/v1/data';

    if(dev)
        API = 'http://localhost:12345'+API
      
    let data = [];
    let result = "";
    let resultStatus = "";

    async function getData() {
        resultStatus = result = "";
         
        const res = await fetch(API, {
            method: 'GET'
        });
 
        
        try{
            const dataReceived = await res.json();
            result = JSON.stringify(dataReceived,null,2);
            data = dataReceived;
            loadChart(data);
        }catch(error){
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;

    }
    
    async function loadChart(graphData){
        var d = [[1,2,3],[2,3,4],[6,2,1]];

        Highcharts.chart('container', {

            title: {
                text: 'U.S Solar Employment Growth by Job Category, 2010-2020',
                align: 'left'
            },

            subtitle: {
                text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
                align: 'left'
            },

            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },

            xAxis: {
                accessibility: {
                    rangeDescription: 'Range: 2010 to 2020'
                }
            },

            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },

            series: [{
                name: 'A',
                data: d.map((n)=>(n[0])),
            },{
                name: 'B',
                data: d.map((n)=>(n[1])),
            },{
                name: 'C',
                data: d.map((n)=>(n[2])),
            }
        ],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

            });

    }

    onMount(async () =>{
        getData();
    });


</script>

<main>
    <h1>Graph</h1>
    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
    
        </p>
    </figure>    


      
    {#if resultStatus != ""}
        <p>
            Result:
        </p>
        <pre>
{resultStatus}
{result}
        </pre>
    {/if}
</main>
