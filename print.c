/*#include<stdio.h>

void printNumbers(int n) {
    // Base case: if n is less than 0, do nothing
    if (n < 0) {
        return;
    }
    
    // Recursive case: call the function with n - 1 first
    if (n > 0) {
        printNumbers(n - 1);
    }

    // Print the current number after the recursive call
    printf("%d\n", n);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    
    printf("Numbers from 0 to %d:\n", n);
    printNumbers(n);
    
    return 0;
}*/

/*#include <stdio.h>

void printNumbers(int n) {
    // Base case: if n is less than 0, stop the recursion
    if (n < 0) {
        return;
    }
    
    // Print the current number
    printf("%d\n", n);
    
    // Recursive call with n - 1
    printNumbers(n - 1);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    
    printf("Numbers from %d to 0:\n", n);
    printNumbers(n);
    
    return 0;
}*/

#include<stdio.h>

int isPrimeHelper(int n, int divisor) {
    // Base case: if divisor reaches 1, n is prime
    if (divisor == 1) {
        return "true";
    }
    if(n<2){
        return "false";
    }
       return isPrimeHelper(n, n-1);
    // If n is divisible by divisor, then n is not prime
     if(n % divisor == 0) {
        return "true";
    }

    // Recursive case: check for next lower divisor
    return isPrimeHelper(n, divisor - 1);
}


int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);

    if (isPrime(n)) {
        printf("%d is a prime number.\n", n);
    } else {
        printf("%d is not a prime number.\n", n);
    }

    return 0;
} 