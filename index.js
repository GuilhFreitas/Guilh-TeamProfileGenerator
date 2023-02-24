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

// the array to be passed to the render function
let team = []

createTeam();

// async function to allow for 'await' use
async function createTeam(){

    // prompts for info on the team manager 
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

    // and creates a new Manager object
    const manager = new Manager(name, id, email, officeNumber);
    // which is pushed to the team array
    team.push(manager);
    

    addMember();
    // async function allows for await use
    async function addMember() {
        // asks user if they want to add a team member or end the program
        let {choice} = await inquirer

            .prompt({

                type: 'list',
                name: 'choice',
                message: 'Add a member to the team, or finalize and generate the team profile.',
                choices: ['Add an engineer', 'Add an intern', 'Finish building the team'],

            });
        
        if(choice === 'Add an engineer'){
            // prompts user for info on an engineer
            let {name, id, email, github} = await inquirer
                .prompt([{
                    type: 'input',
                    name: 'name',
                    message: "What is the name of the engineer?",
                  },
                  {
                    type: 'number',
                    name: 'id',
                    message: "What is the engineer's employee ID?",
                  },
                  {
                    type: 'input',
                    name: 'email',
                    message: "What is the engineer's email address?",
                  },
                  {
                    type: 'input',
                    name: 'github',
                    message: "What is the engineer's GitHub username?",
                  }]);
            
            // creates new Engineer object and pushes to 'team' array
            const engineer = new Engineer(name, id, email, github);
            team.push(engineer);
            
            // recursively runs the function
            addMember();

        }else if(choice === 'Add an intern'){
            // prompts user for info on an intern
            let {name, id, email, school} = await inquirer
            .prompt([{
                type: 'input',
                name: 'name',
                message: "What is the name of the intern?",
              },
              {
                type: 'number',
                name: 'id',
                message: "What is the intern's employee ID?",
              },
              {
                type: 'input',
                name: 'email',
                message: "What is the intern's email address?",
              },
              {
                type: 'input',
                name: 'school',
                message: "Which school is the intern enrolled in?",
              }]);
            
            // creates new intern object and pushes to 'team' array
            const intern = new Intern(name, id, email, school);
            team.push(intern);
            
            // recursively runs the function
            addMember();

        }else if(choice === 'Finish building the team'){
            // runs render to generate the html
            const html = render(team);
            // writes html to new file in output folder
            fs.writeFile(outputPath, html);
        };
    };
};




