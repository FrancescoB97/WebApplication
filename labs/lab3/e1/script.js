let table = document.getElementById('TasksTable');
let tbody = table.getElementsByTagName('tbody')[0];

this.addToTable = (t) => {    
    let newR = document.createElement('tr') ;            

    this.addCheckbox = () => {
        let newC = document.createElement('td'); 

        newC.innerHTML += //visto che ho molta roba da aggiungere uso sta scrittura
        `<div class="custom-control custom-checkbox">`
        + `<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault"></div>` ;
        
        newR.appendChild(newC);             
    };

    this.addDescription = () => { 
        let newC = document.createElement('td');        
        let text = document.createTextNode(t.description);        
        if(t.urgent)
            newC.classList.add("important");     
        newC.appendChild(text); 
        newR.appendChild(newC); 
    };

    this.addStatus = () => { 
        let newC = document.createElement('td');  
       
        if(!t.private)
        {
            newR.appendChild(newC); 
            return;
        }      
        
        newC.innerHTML +=
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-person-fill" viewBox="0 0 16 16">
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm2 5.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-.245S4 12 8 12s5 1.755 5 1.755z"/>
        </svg>` ;
        /*newC.innerHTML += '<svg class="bi bi-person-square" width="1.2em" height="1.2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> '
                +  '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'
                +  '<path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'
                +'</svg>' ;*/
        
        newR.appendChild(newC); 
    };

    this.addDates = () => {
        let newC = document.createElement('td');  

        newC.innerHTML += //visto che ho molta roba da aggiungere uso sta scrittura
            `<ul class="list-group list-group-flush">`
            + `<li class="list-group-item">${t.deadline}</li>`
            + `<li class="list-group-item"><small>${dayjs()}</small></li></ul>` ;
        
        newR.appendChild(newC);
    };

    this.addDeleteBtn = () => {
        let newC = document.createElement('td');         
        newC.innerHTML +=  `<button class="btndeleteTask">X</button>` ;  
        newR.appendChild(newC); 
    };

    this.addUserBtn = () => {
        let newC = document.createElement('td'); 

        newC.innerHTML += //visto che ho molta roba da aggiungere uso sta scrittura
            `<div class="left">`
            + `<button class="btndoing"></button></div>`
            +`<div class="left"><button class="btnimportant"></button></div>` ;
               
        newR.appendChild(newC); 
    };

    addCheckbox();
    addDescription();
    addStatus();
    addDates();
    addDeleteBtn();   
    addUserBtn();          
    
    tbody.appendChild(newR);
};

let taskcnt = 0;
const t_1 = new Task(1, "Cantare sotto la doccia", false, true);
tasks.add(t_1); taskcnt++;
addToTable(t_1);
const t_2 = new Task(2, "Piangere sul latte versato", false, false, dayjs('2021-03-15')) ;
tasks.add(t_2); taskcnt++;
addToTable(t_2);
const t_3 = new Task(3, "Perdere su COD", false, true) ;
tasks.add(t_3); taskcnt++;
addToTable(t_3);
const t_4= new Task(4, "All u can eat", true, false, dayjs('2021-03-20')) ;
tasks.add(t_4); taskcnt++;
addToTable(t_4);

debugger ;