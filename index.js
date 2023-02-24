const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs/promises");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
let team = []

createTeam();
// async function to allow for await use
async function createTeam(){
    // prompts for info on the team manager and creates a new Manager object
    let {name, id, email, officeNumber} = await inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: "What is the name of the team manager?",
          },
          {
            type: 'number',
            name: 'id',
            message: "What is the team manager's employee ID?",
          },
          {
            type: 'input',
            name: 'email',
            message: "What is the team manager's email address?",
          },
          {
            type: 'number',
            name: 'officeNumber',
            message: "What is the team manager's office number?",
          }]);

    const manager = new Manager(name, id, email, officeNumber);
    team.push(manager);
    
}

