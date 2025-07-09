// 判斷是否為質數的函數
function isPrime(num: number): boolean {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// 找出指定範圍內的所有質數
function find_primes(start: number, end: number): number[] {
    let primes: number[] = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

// 示例使用
const start = 1;
const end = 100;
const primeNumbers = find_primes(start, end);
console.log(`Found ${primeNumbers.length} prime numbers between ${start} and ${end}`);
console.log(primeNumbers.join(' '));