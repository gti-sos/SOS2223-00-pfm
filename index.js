function log(msg){
    console.log(msg);
}

var numbers = [1,2,3,4];

var i = numbers
            .filter((n)=>{
                return n > 2;
            }).map((n)=>{
                return n + 1;
            }).reduce((a,n)=>{
                return n + a;
            });

log(i);