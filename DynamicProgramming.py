import sys

def fib(n):
    if n <= 2:
        return 1
    
    dp = {}
    dp[0] = 1
    dp[1] = 1
    
    for i in range(2, n):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n-1]

while True:    
    try:
        term = int(input("Please input a positive integer: "))
        if term <= 0:
            continue
    except ValueError:
        continue
    result = fib(term)
    print(result)
    sys.exit(0)
    