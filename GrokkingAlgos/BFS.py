from collections import deque
graph = {
    'you': ['a', 'b', 'c'],
    'b': ['d', 'e'],
    'a': ['e'],
    'c': ['t','j'],
    'd': [],
    'e': [],
    't': [],
    'j': []
}

def BFS(target, graph):
    """
    A breadth-first search implementation to check the existance of a node in a graph.
    """
    start='you'
    steps_taken = 0
    search_queue = deque()
    search_queue += graph[start]
    while search_queue:
        steps_taken += 1
        current = search_queue.popleft()
        if current == target:
            print('found')
            print(steps_taken)
            return True
        else:
            search_queue += graph[current]
    return False        

print(BFS('j', graph))

