//Part 1: Stack Overflow
let counter = 0;
/**Call itself recursively */ 
function recursiveFunction() {
    counter++;
    recursiveFunction(); 
}

try {
    recursiveFunction();
} catch (e) {
    console.error('Error:', e.message);
    console.log('Maximum call stack size exceeded after', counter, 'calls.');
}

//Part 2: Trampoline

const flatten = (arr) => {
    if (arr.length === 0) return []; 
    const [first, ...rest] = arr; 
    if (Array.isArray(first)) {
        return () => flatten(first.concat(rest)); 
    } else {
        return () => [first].concat(trampoline(flatten(rest))); 
    }
};

const trampolinedFlatten = (arr) => {
    return () => flatten(arr); 
};

const trampoline = (f) => {
    let result = f();
    while (typeof result === "function") {
        result = result(); 
    }
    return result; 
};

// Test the trampolined flatten function
const nestedArray = [1, [2, [3, [4]], 5], [6, [7, [8, 9]]]];
const flattenedArray = trampoline(trampolinedFlatten(nestedArray));
console.log(flattenedArray); 


//Part 3: Deferred Execution
const outputElement = document.getElementById('output');

function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

function displayPrimes(n, current = 1) {
    if (current > n) {
        alert('Calculation finished!');
        return;
    }
    if (isPrime(current)) {
        outputElement.innerHTML += current + '<br>';
    }
    setTimeout(() => displayPrimes(n, current + 1), 0);
}

displayPrimes(10000);