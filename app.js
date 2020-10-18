const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeList = [];

//User is prompted to select the type of employee they wish to enter information about
let employeeType = " ";
function getEmployeeType() {
    inquirer
        .prompt([
            {
                type: "checkbox",
                message: "Select 'employee type' to enter information about: ",
                name: "employeeType",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern"
                ]
            },
        ])
        .then(function (answers) {
            employeeType = (answers.employeeType[0])

            console.log(employeeType);

            getEmployeeNameIdEmail();   

        })
};

getEmployeeType();

//User is prompted to enter information about the employee: Name, ID, Email
let employeeName = " ";
let employeeId = " ";
let employeeEmail = " ";
function getEmployeeNameIdEmail() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the employee's first & last name: ",
                name: "employeeName"
            },
            {
                type: "input",
                message: "Enter the employee's ID: ",
                name: "employeeId"
            },
            {
                type: "input",
                message: "Enter the employee's email: ",
                name: "employeeEmail"
            }
        ])
        .then(function (answers) {
            employeeName = answers.employeeName;
            employeeId = answers.employeeId;
            employeeEmail = answers.employeeEmail;

            console.log(employeeName);
            console.log(employeeId);
            console.log(employeeEmail);

            if(employeeType === "Manager"){
                getManagerOfficeNumber();
            } else if(employeeType === "Engineer"){
                getEngineerGitHub();
            } else if(employeeType === "Intern"){
                getInternSchool();
            };
        })
};


//User is prompted to enter the manager's office phone number
let managerOfficeNumber = " ";
function getManagerOfficeNumber() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the manager's office number: ",
                name: "officeNumber"
            }
        ])
        .then(async function (answers) {
            managerOfficeNumber = answers.officeNumber;

            console.log(managerOfficeNumber);

            const employee = new Manager(employeeName, employeeId, employeeEmail, managerOfficeNumber);

            employeeList.push(employee);

            console.log(employeeList);

            getAdditionalEmployees();
        })
};


//User is prompted to enter the engineer's GitHub username
let engineerGitHub = " ";
function getEngineerGitHub() {
    inquirer
        .prompt([

            {
                type: "input",
                message: "Enter the engineer's GitHub user ID: ",
                name: "engineerGitHubUser"
            }
        ])
        .then(async function (answers) {
            engineerGitHub = answers.engineerGitHubUser;

            console.log(engineerGitHub);

            const employee = new Engineer(employeeName, employeeId, employeeEmail, engineerGitHub);

            employeeList.push(employee);

            console.log(employeeList);

            getAdditionalEmployees();
        })
};


//User is prompted to enter the intern's school
let internSchool = " ";
function getInternSchool() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the intern's school: ",
                name: "internSchool"
            }
        ])
        .then(async function (answers) {
            internSchool = answers.internSchool;

            console.log(internSchool);

            const employee = new Intern(employeeName, employeeId, employeeEmail, internSchool);

            employeeList.push(employee);

            console.log(employeeList);

            getAdditionalEmployees();

        })
};


//User is prompted to enter additional team members
let additionalEmployees = " ";
function getAdditionalEmployees() {
inquirer
    .prompt([
        {
            type: "checkbox",
            message: "Do you wish to enter information about more employees? ",
            name: "additionalEmployees",
            choices: [
                "Yes",
                "No (Generate Team Overview Webpage)"
            ]
        }
    ])
    .then(async function (answers) {
        additionalEmployees = answers.additionalEmployees[0];
        
        console.log(additionalEmployees);

        if(additionalEmployees === "Yes"){
            getEmployeeType();
        }

        // if (additionalEmployees != "Yes"){
        //     let employees = employeeList;
        //     render(employees);
        // };

    })
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
