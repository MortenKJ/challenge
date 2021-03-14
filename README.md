# Prerequisites
To get started, the prerequisites from Angular needs to be installed. Either do it manually following the steps here: https://angular.io/guide/setup-local#prerequisites

Or tun the setupEnv.ps1 script which will install Node.js (which includes npm) and the latest Angular CLI.

# Design thoughts
The idea was to have one component/service pair do one job. So one pair for displaying/calculating the result, one for adding players etc.
The observables are used to communicate state changes between the components. This could also have been done with the use of NgRx.