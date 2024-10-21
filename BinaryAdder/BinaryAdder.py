def AddTwoBinaries(x,y):
    """
    Adds two binary numbers without converting them to decimals.
    """
    length = max(len(x), len(y))
    # zfill pads the shorter string with zeroes
    x = x.zfill(length) 
    y = y.zfill(length)
    carry = 0
    output = ''
    for i in range(length - 1, -1, -1):
        total = int(x[i]) + int(y[i]) + carry
        output = str(total % 2) + output
        carry = total // 2    
    if carry == 1:
        output = '1' + output
    return output

def AddMultipleBinaries(binaries):
    """
    Uses divide and conquer to recursively find the sum of multiple binary numbers.
    """
    if len(binaries) == 1:
        return binaries[0]
        
    mid = len(binaries) // 2
    left = AddMultipleBinaries(binaries[:mid]) # Exclusive; excludes mid
    right = AddMultipleBinaries(binaries[mid:]) # Inclusive; includes mid
    
    return AddTwoBinaries(left, right)
    
arr = ['101', '100', '110', '111', '11']

print(AddMultipleBinaries(arr)) 