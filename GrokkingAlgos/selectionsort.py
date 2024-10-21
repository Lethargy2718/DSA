def SelectionSort(data):
    sorted = []
    for i in range(len(data)):
        smallest = data[0]
        smallest_index = 0
        for j in range(1, len(data)):
            if data[j] < smallest:
                smallest = data[j]
                smallest_index = j
        sorted.append(data.pop(smallest_index))
    return sorted
    
    
unsorted = [1,6,3,33,7,3,3,1,9,2,5,47,8]
sorted = SelectionSort(unsorted)
print(sorted)    
        
             
        