'use strict'

let today = dayjs() ;

function Task(id, description, urgent = false, priv=true, deadline)
{
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.private = priv;
    this.deadline = deadline; 

    this.toString = () => (`ID: ${this.id}, Description: ${this.description}, urgent: ${this.urgent}, private: ${this.private}, Deadline: ` + (this.deadline === undefined ? "<not defined>" : this.deadline.format('YYYY-MM-DD')) + '\n');   
}

function TaskList()
{
    this.list = [];
    
    this.add = (t) => {this.list.push(t)};    

    this.getTask = (code) => {
        let i = 0;
        for (const c of this.list)
        {
            if(i === code)
            return c;
            i++;
        }          
        return undefined;
      };    
    this.toString = () => (this.list.map((t)=>(t.toString())).join('\n')); //per la stampa senza le , 
}

const tasks = new TaskList();