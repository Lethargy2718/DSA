def sqrt(x, tolerance = 0.0001):
    left = 0
    right = x
    i = 0
    while True:
        i += 1
        middle = (left + right) / 2
        squared = middle * middle
        if abs(squared - x) < tolerance:
            print('Iterations: ', i)
            return middle
        if squared > x:
            right = middle
        else:
            left = middle
        
print(sqrt(123102, 0.000001))