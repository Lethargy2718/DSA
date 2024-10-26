import sys
def CanConstruct(target, bank):
    """
    Checking whether it's possible to form a target string
    using provided substrings through memoization.
    """
    if target == '': return True
    if target == None: return False
    
    for word in bank:
        if target.startswith(word): 
            return CanConstruct(target[len(word):], bank)
    
    return False

target = 'annoying'
arr = ['ann', 'no', 'ying', 'oying', 'oy', 'ing']
print(CanConstruct(target, arr))