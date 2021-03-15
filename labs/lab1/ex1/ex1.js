'use strict'

const dayjs = require('dayjs');

function Task(id, description, urgent = false, priv=true, deadline)
{
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.private = priv;
    this.deadline = deadline;  
    
    

   //this.toString = () => (`ID: ${this.id}, Description: ${this.description}, urgent: ${this.urgent}, private: ${this.private}, Deadline:  ${this.deadline.format('YYYY-MM-DD')}`);
   this.toString = () => (`ID: ${this.id}, Description: ${this.description}, urgent: ${this.urgent}, private: ${this.private}, Deadline: ` + (this.deadline === undefined ? "<not defined>" : this.deadline.format('YYYY-MM-DD')) + '\n');
   
}

function TaskList()
{
    this.list = [];
    
    this.add = (t) => {this.list.push(t)};

    this.print = () => { return [...this.list]};
    

    this.sortAndPrint = () => {
        //return [...this.list].sort((a,b) => (a.deadline - b.deadline ? 1 : -1)); //isAfter non va bene per undefined
        return [...this.list].sort((a,b) => { (a != undefined || b != undefined) ? (a.deadline.isAfter(b.deadline) ? 1 : -1) : -1});
    }

    this.toString = () => (this.tasks.map((t)=>(t.toString())).join('\n'));
}

const t1 = new Task(1, "Clean hard disk", false, true) ;
const t2 = new Task(2, "Do the lab 01", false, false, dayjs('2021-03-15')) ;
const t4 = new Task(4, "Download sweng videolessons", false, true) ;
const t7 = new Task(7, "Join sweng groups", true, true, dayjs('2021-03-16')) ;
const t3 = new Task(3, "All u can eat", true, false, dayjs('2021-03-20')) ;

const tasks = new TaskList();
tasks.add(t1);
tasks.add(t2);
tasks.add(t4);
tasks.add(t7);
tasks.add(t3);

console.log(tasks.print().toString());

console.log("****** Tasks sorted by deadline (most recent first): ******");
console.log(tasks.sortAndPrint().toString());

debugger;