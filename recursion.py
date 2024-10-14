def factorial_iterative(num):
    dummy = num
    while True:
        num *= (dummy - 1)
        dummy -= 1
        if dummy == 1:
            return num
        
def factorial_recursive(num):
    if num == 1:
        return 1
    return num * factorial_recursive(num - 1)       

def sum(arr):
    """
    recursive sum
    """
    if len(arr) == 1:
        return arr[0]
    return (arr[0] + sum(arr[1:]))

num = 5
arr = [1,2,4,5]
print("Using iteration: ", factorial_iterative(num))    
print("Using recursion: ", factorial_recursive(num))    
print('Array: ', arr)
print('Sum: ', sum(arr))