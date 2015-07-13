# arithmetic-generator

This coding exercise contains a generator service that randomly creates simple addition problems.  
These problems are sent to a evaluator service that parses the problem, solves it and returns the result.

## Installation
After you clone the repo, run the following commands:
  
`npm install`

`node src/consumer/main.js`

`node src/producer/main.js 3001`

`node src/producer/main.js 3002`


The consumer will automatically start on port 3000.  The producers can be run on any free port.  Here I've run them on
3001 and 3002.


## Operation
As soon as they start, the producers will start firing POSTs to the consumer and the consumer will begin responding.

Each producer will output it's request to the terminal.  The log will look something like:

`Equation: 9+7= Solution: 16 Elapsed Time: 2.578095000000758ms`

The `Equation` is the random equation that was generated.  The `Solution` is the response from the consumer.  The
`Elapsed Time` is the total time for the request as calculated with Performance.now().  The `Elapsed Time` includes the
time needed to generate the equation, send the request and receive the response from the server.

The consumer will output each request that it receives to the terminal.  The log will look something like:

`Incoming from port: 3003 At: 2015-07-13T05:22:52.813Z POST /api/equation 0.088 ms`

The `Incoming from port` is the port number that the producer that sent the request is running on.  This port number
is included in the request body to enable this logging.  The `At` time is the time that the consumer received the 
request.  `POST /api/equation` is the method and endpoint of the request (in case someone manually 
tries a `GET` to the consumer). The `0.088 ms` is the response time as calculated by the Morgan logging service.


## Notes
The consumer is capable of handling addition, subtraction, multiplication and division but currently, the producers
only generate addition problems.

Any request made to the consumer besides `POST /api/equation` will result in a response that contains the instructions
for the correct request.

Running `gulp` from the command line will run the Mocha unit tests.