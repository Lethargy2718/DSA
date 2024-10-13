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

num = 5
print("Using iteration: ", factorial_iterative(num))    
print("Using recursion: ", factorial_recursive(num))    