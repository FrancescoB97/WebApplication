let table = document.getElementById('TasksTable');
let tbody = table.getElementsByTagName('tbody')[0];

this.addToTable = (t) => {    
    let newR = document.createElement('tr') ;            

    this.addCheckbox = () => {
        let newC = document.createElement('td'); 
        let checkbox = document.createElement("input");
        checkbox.classList.add("form-check-input");    
        checkbox.type = "checkbox"
        checkbox.id="flexSwitchCheckDefault";
        newC.appendChild(checkbox); 
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
              
        let text = document.createTextNode('P');                
        newC.appendChild(text); 
        newR.appendChild(newC); 
    };

    this.addDates = () => {
        let newC = document.createElement('td');  
        let list = document.createElement('ul');  
        list.classList.add("list-group"); 
        list.classList.add("list-group-flush"); 

        let deadlineDate = document.createElement('li');
        deadlineDate.classList.add("list-group-item"); 
        deadlineDate.appendChild(document.createTextNode(t.deadline)); 

        let actualDate = document.createElement('li');
        actualDate.classList.add("list-group-item"); 
        let now = document.createElement('small');
        
        now.appendChild(document.createTextNode(dayjs())); //current time
        actualDate.appendChild(now);

        list.appendChild(deadlineDate);
        list.appendChild(actualDate);

        newC.appendChild(list); 
        newR.appendChild(newC);
    };

    this.addDeleteBtn = () => {
        let newC = document.createElement('td'); 
        let btn = document.createElement("button");
        btn.classList.add("btndeleteTask");  
        btn.innerHTML = "X";     
        newC.appendChild(btn);         
        newR.appendChild(newC); 
    };

    this.addUserBtn = () => {
        let newC = document.createElement('td'); 
        let div1 = document.createElement('div'); 
        div1.classList.add("left"); 
        let btn1 = document.createElement("button");
        btn1.classList.add("btndoing")        
        let div2 = document.createElement('div');
        div2.classList.add("left");   
        let btn2 = document.createElement("button");
        btn2.classList.add("btnimportant")  

        newC.appendChild(div1); 
        newC.appendChild(btn1); 
        newC.appendChild(div2); 
        newC.appendChild(btn2); 
        
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