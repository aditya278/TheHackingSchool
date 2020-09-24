/*
    In this file we are going to declare all the env-variables and global config variables.

    To run the JS using node we give the command: [ENV VARIABLE ARGS] node fileName.js [CMD LINE ARGS]

    Args on the left side of the node cmd: Environment Variable Arguments
    Args on the right side of the node cmd: Command Line Arguments
    
    (wont commit this file, just committing for practice)
*/

const environments = {}

//Declaring and defining two environement servers's arguments

//Env variables for Staging server
environments.staging = {
    'httpPort'  : 3000,
    'httpsPort' : 3001,
    'envName'   : 'staging',
    'hashingSecret' : 'theHackingSchool'
}

//Env variables for Production server
environments.production = {
    'httpPort'  : 5000,
    'httpsPort' : 5001,
    'envName'   : 'production',
    'hashingSecret' : 'theHackingSchool'
}

//Check if the user has provided any env name in the node command
const currentEnv = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : '';

//Check that the provided env is one of the above 2, if not then default it to staging
const envToExport = typeof(environments[currentEnv]) === 'object' ? environments[currentEnv] : environments.staging;

module.exports = envToExport;