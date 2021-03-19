'use strict'

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

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
    const db = new sqlite.Database('tasks.db', (err) => { if (err) throw err; });
 
    this.getAll = () => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks' ;
          db.all(sql, [], (err, rows) => {
            if(err)
              reject(err);
            else {              
              const tasks = rows.map(row => new Task(row.id, row.description, row.priv, row.deadline));
              resolve(tasks);
            }
          });            
        });
      };       
}


const main = async () => {
    const taskList = new TaskList();   

    // get all the Tasks
    const tasks = await taskList.getAll();
    console.log(`${tasks}`);  
    
  }
  
  main();



