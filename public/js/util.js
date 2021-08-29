function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

function partition(matches, left, right) {
    var pivot   = matches[Math.floor((right + left) / 2)].price, //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (matches[i].price > pivot) {
            i++;
        }
        while (matches[j].price < pivot) {
            j--;
        }
        if (i <= j) {
            swap(matches, i, j); //swap two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(matches, left, right) {
    var index;
    if (matches.length > 1) {
        index = partition(matches, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(matches, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(matches, index, right);
        }
    }
    return matches;
}