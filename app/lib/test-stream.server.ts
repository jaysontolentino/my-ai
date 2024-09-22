let count = 0;

// The arguments passed after the
// delay (in milliseconds) will
// be received in our function
// inside the setInterval() method
const intervalId = setInterval(
  (a, b) => {
    console.log(`The sum of ${a} and ${b} is ${a + b}`);
    count++;

    if (count === 5) {
      console.log("Clearing the interval id after 5 executions");
      clearInterval(intervalId);
    }
  },
  1000,
  5,
  10
);
