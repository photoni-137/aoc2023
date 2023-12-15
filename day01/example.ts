const digits = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

// this function does the prime factorization on the given number
function primeFactorization(num) {
  let factors = [];
  let divisor = 2;
  while (num > 1) {
    if (num % divisor === 0) {
      factors.push(divisor);
      num /= divisor;
    } else {
      divisor++;
      if (divisor > num) {
        factors.push(num);
        num = 1;
      }
    }
  }
  return factors;
}

// test the primeFactorization function for a few simple test cases and one complex one
console.log(primeFactorization(12)); // [2, 2, 3]
console.log(primeFactorization(24)); // [2, 2, 2, 3]
console.log(primeFactorization(13195)); // [5, 7, 13, 29]
console.log(primeFactorization(1000000)); // [2, 2, 2, 5, 5, 7, 1

const fibonacciNumber = (n: number) => {
  if (n <= 1) {
    return n;
  }
  return fibonacciNumber(n - 1) + fibonacciNumber(n - 2);
};

const testFibonacciNumber = () => {
  console.log(fibonacciNumber(0)); // 0
  console.log(fibonacciNumber(1)); // 1
  console.log(fibonacciNumber(2)); // 1
  console.log(fibonacciNumber(3)); // 2
};

testFibonacciNumber();
