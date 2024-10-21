import sys

def binary_search(target, data: list):
    # O(logn)
    low  = 0
    high = len(data) - 1
    tries = 0
    while low <= high:
        mid = (low + high) // 2
        guess = data[mid]
        tries += 1
        if guess == target:
            print('Found')
            print(f'Tries: {tries}')
            return
        if guess < target:
            low = mid + 1
        else: #guess > target
            high = mid - 1
    print('Not Found')
    print(f'Tries: {tries}')

try:
    target = int(sys.argv[1])
except (IndexError, ValueError):
    print("Please provide an integer as a command line argument.")
    sys.exit(1)
    

test = [i for i in range(1000)]
binary_search(int(sys.argv[1]), sorted(test))            