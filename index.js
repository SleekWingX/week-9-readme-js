// packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// an array of questions for user input
const questions = [
    {
    type: 'input', // input takes user input for the data to be output later
    name: 'title', // type of data used to specify what part of the array is being used
    message: 'What is the title of your project?', // questions appear to user to prompt input
    },
    {
    type: 'input',
    name: 'description',
    message: 'Please give a short description of your project.',
    },
    {
    type: 'input',
    name: 'installation',
    message: 'How will the user install your program?',
    },
    {
    type: 'input',
    name: 'usage',
    message: 'What is the functionality of the project?',
    },
    {
    type: 'input',
    name: 'contributing',
    message: 'How can future developers contribute to your project?',
    },
    {
        type: 'list',  // 'list' type used here to indicate dropdown list
        name: 'license',
        message: 'Please choose the license for your project:',
        // lists licenses to choose from and their icon badge links (used shields.io for badges)
        choices: [
            { name: 'MIT', value: { name: 'MIT', badge: 'https://img.shields.io/badge/License-MIT-yellow.svg' }},
            { name: 'Apache 2.0', value: { name: 'Apache 2.0', badge: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg' }},
            { name: 'GPL v3', value: { name: 'GPL v3', badge: 'https://img.shields.io/badge/License-GPLv3-blue.svg' }},
            { name: 'BSD 3-Clause', value: { name: 'BSD 3-Clause', badge: 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg' }},
            { name: 'None', value: { name: 'None', badge: '' }}
        ]
    },
    {
    type: 'input',
    name: 'tests',
    message: 'What tests can a user go through to troubleshoot the application?',
    },
    {
    type: 'input',
    name: 'github',
    message: 'What is your github username?'
    },
    {
    type: 'input',
    name: 'email',
    message: 'Please provide an email address to send questions to:'
    },
];

// function to write README file
function writeToFile(fileName, data) {
    const dir = './output';  // set filepath for file output
    const filePath = path.join(dir, fileName);  // create the full file path if it doesnt exist

    // Check if the directory exists, create it if it doesn't
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write the data to the file in the specified directory
    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Successfully wrote to', filePath);
        }
    });
}

// function to initialize app
function init() {
    // uses inquirer to take array to prompt user and take input
    inquirer
        .prompt(questions)
        // creates the file content based on user input
        .then ((answers) => {
            // calls on the badge link from the answers variable
            const badge = answers.license.badge ? `![License: ${answers.license.name}](${answers.license.badge})\n` : '';
            const readMeContent = 
            // uses badge variable and then title from the answers variable
            `${badge}# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation
\`\`\`
${answers.installation}
\`\`\`

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## License
This project is licensed under the ${answers.license} license.

## Tests
${answers.tests}

## Questions
If you have any questions please go to my github:
https://github.com/${answers.github} 
or email at:
${answers.email}
`;
        // calls the function to write the readme file
            writeToFile('README.md', readMeContent.trim());
        })
        // sends out an error message if anything runs incorrectly
        .catch(error => {
            console.error('Error during inquirer prompt:', error);
        });
}

// Function call to initialize app
init();
