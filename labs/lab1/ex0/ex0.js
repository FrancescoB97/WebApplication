'use strict'

let array = ["Ciao", "Io", "adoro", "le", "stringhe"] 

console.log(array);

let i = 0;
for (const e of array)
{   
    const str = e.slice(0,2) + e.slice(e.length-2,e.length); 
    (e.length >= 4) ? array[i] = str : array[i] = "";          
    i++;    
}

console.log(array);
    

