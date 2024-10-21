graph = {}

graph["start"] = {}
graph["start"]["a"] = 5
graph["start"]["b"] = 2

graph["a"] = {}
graph["a"]["c"] = 4
graph["a"]["d"] = 2

graph["b"] = {}
graph["b"]["a"] = 8
graph["b"]["d"] = 7

graph["c"] = {}
graph["c"]["d"] = 6
graph["c"]["fin"] = 3

graph["d"] = {}
graph["d"]["fin"] = 1

graph["fin"] = {}

infinity = float("inf")

costs = {}
costs["a"] = 5
costs["b"] = 2
costs["c"] = infinity
costs["d"] = infinity
costs["fin"] = infinity

parents = {}
parents["a"] = "start"
parents["b"] = "start"
parents["c"] = None
parents["d"] = None
parents["fin"] = None


def pick_closest_node(costs, processed):
    lowest_cost = infinity
    closest = None
    for node in costs.keys():
        if costs[node] < lowest_cost and node not in processed:
            lowest_cost = costs[node]
            closest = node      
    return closest


def dijkstra(graph, costs, parents):
    processed = []
    node = pick_closest_node(costs, [])
    while node:
        cost = costs[node]
        for neighbor in graph[node].keys():
            # new_cost = cost to reach the node i am currently at + cost for NEXT node.
            #processed nodes are those whose neighbors have been checked
            new_cost = cost + graph[node][neighbor]
            if costs[neighbor] > new_cost:
                costs[neighbor] = new_cost
                parents[neighbor] = node
        processed.append(node)
        node = pick_closest_node(costs, processed)    
    return

dijkstra(graph, costs, parents)
print(parents)