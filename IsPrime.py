def isPrime(n):
    if n <= 0:
        return False
    if not isinstance(n, int):
        return False
    if n <= 2:
        return True
    
    for i in range(2, n//2):
        if n % i == 0:
            return False
    return True

print(isPrime(17))