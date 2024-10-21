from random import randint

def quicksort_genexp(arr):
    """
    Quicksort implementation picking a random number as the pivot
    for an average complexity of O(nlogn) instead of the O(n^2)
    obtained when always picking the first number as the pivot.
    """
    if len(arr) < 2:
        return arr
    i = randint(0, len(arr)-1)     
    pivot = arr[i]
    smaller = [j for index, j in enumerate(arr) if i != index and j < pivot]
    bigger = [j for index, j in enumerate(arr) if i != index and j > pivot]
    return quicksort_genexp(smaller) + [pivot] + quicksort_genexp(bigger)
    

def quicksort(arr):
    """
    No generative expressions
    """
    if len(arr) < 2:
        return arr
    i = randint(0, len(arr)-1)
    pivot = arr[i]
    smaller = []
    bigger = []
    for j in range(len(arr)):
        if j == i:
            continue
        if arr[j] < pivot:
            smaller.append(arr[j])
        if arr[j] > pivot:
            bigger.append(arr[j])
    return quicksort(smaller) + [pivot] + quicksort(bigger)
    
arr = [1,4,6,2,3]
sorted = quicksort_genexp(arr)
print(f'Unsorted: {arr}')
print(f'Sorted: {sorted}')