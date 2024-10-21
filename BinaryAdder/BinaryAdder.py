# Binary numbers in this program will be binary strings.
# ex: '101'

def AddTwoBinaries(x,y):
    length = max(len(x), len(y))
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
    if len(binaries) == 1:
        return binaries[0]
        
    mid = len(binaries) // 2
    left = AddMultipleBinaries(binaries[:mid])
    right = AddMultipleBinaries(binaries[mid:])
    
    return AddTwoBinaries(left, right)
    
arr = ['101', '100', '110', '111', '11']

print(AddMultipleBinaries(arr)) 