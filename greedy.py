states_needed = set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az'])
stations = {}
stations['kone'] = set(["id", "nv", "ut"])
stations['ktwo'] = set(["wa", "id", "mt"])
stations['kthree'] = set(["or", "nv", "ca"])
stations['kfour'] = set(["nv", "ut"])
stations['kfive'] = set(["ca", "az"])

final_stations = set()

while states_needed:
    best_station = None
    states_covered_by_best_station = set()
    for station, station_states in stations.items():
        covered = states_needed & station_states
        if len(covered) > len(states_covered_by_best_station):
            best_station = station
            states_covered_by_best_station = covered
    states_needed -= states_covered_by_best_station
    final_stations.add(best_station)
    del stations[best_station]
    
print(final_stations)