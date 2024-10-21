def factorial_recursive(num):
    if num <= 1: # In case somebody inputs 0.
        return 1
    return num * factorial_recursive(num - 1)   

def factorial_iterative(num):
    result = 1
    for i in range(1, num+1):
        result = result * i
    return result    
    
def sum(arr):
    """
    recursive sum
    """
    if len(arr) == 1:
        return arr[0]
    return (arr[0] + sum(arr[1:]))

num = 6
arr = [1,2,4,5]
print("Using iteration: ", factorial_iterative(num))
print("Using recursion: ", factorial_recursive(num))    
print('Array: ', arr)
print('Sum: ', sum(arr))