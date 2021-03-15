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
    const db = new sqlite.Database('tasks.sqlite', (err) => { if (err) throw err; });
 
    this.getAll = () => {
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks' ;
          db.all(sql, [], (err, rows) => {
            if(err)
              reject(err);
            else {
              const tasks = rows.map(row => new Task(row.id, row.description, row.priv, row.deadline));
              resolve(exams);
            }
          });            
        });
      };   

    this.toString = () => (this.list.map((t)=>(t.toString())).join('\n')); //per la stampa senza le , 
}

const tasks = new TaskList();

console.log(tasks.getAll().toString());

