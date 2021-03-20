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

      
      /*load and print, through a parametric query, a TaskList containing only the list of tasks whose
          deadline is after a given date*/
      this.afterDate = (date) => {        
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks WHERE deadline > ?' ;
          db.all(sql, [date], (err, rows) => {
            if(err)
              reject(err);
            else {              
              const tasks = rows.map(row => new Task(row.id, row.description, row.urgent, row.private, row.deadline));
              resolve(tasks);
            }
          });            
        });
      }; 

      /*load and print, through a parametric query, a TaskList containing only the list of tasks that contain a given word*/
      this.getTask = (word) => {        
        return new Promise((resolve, reject) => {
          const sql = 'SELECT * FROM tasks WHERE description LIKE ?';
          db.all(sql, ['%' + word + '%'], (err, rows) => { //serve LIKE '%word%' e controlla ambo i lati
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
    console.log("****** Tasks: ******");
    const tasks = await taskList.getAll();
    console.log(`${tasks}`);  //= console.log(tasks.toString());     
    //console.log(tasks); 


   // get all the Tasks after a given date
   console.log("****** Tasks over Deadline: ******");
   const tasksOverDeadline = await taskList.afterDate("2021-03-09");   
   console.log(`${tasksOverDeadline}`);  //= console.log(tasksOverDeadline.toString());    
  
   // get all the Tasks with a given word in description
   console.log("****** Tasks with desc: ******");
   const tasksWithWord = await taskList.getTask("lab");   //anche a, p vanno bene
   console.log(`${tasksWithWord}`);  //= console.log(tasksWithWord.toString());  
  }
  
  main();