export function mergeSort(arr) {
    if (arr.length <= 1) return [arr[0]];

    const mid = Math.floor(arr.length / 2);
    const arr1 = mergeSort(arr.slice(0, mid));
    const arr2 = mergeSort(arr.slice(mid));
    const merged = merge(arr1, arr2);
  
    return merged;
}

function merge(arr1, arr2) {
    let i = 0,
        j = 0;

    let merged = [];

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] <= arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }
  
    while(i < arr1.length) merged.push(arr1[i++]);
    while(j < arr2.length) merged.push(arr2[j++]);

    return merged;
}

