'use strict'

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Task(id, description, urgent = false, priv, deadline)
{
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.private = priv;
    this.deadline = dayjs(deadline);     

    this.toString = () => (`ID: ${this.id}, Description: ${this.description}, urgent: ${this.urgent}, private: ${this.private}, Deadline: ` + (this.deadline.isValid() === false ? "<not defined>" : this.deadline.format('YYYY-MM-DD')) + '\n');  
    //se data è null me la considera Invalid Date, quindi devo verificare con isValid se è valida o no
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
              const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
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
   // console.log(tasks.toString());  
   //console.log(tasks); 
  }
  
  main();



