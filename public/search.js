const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search tutors.json and filter it
const searchTutors = async searchText => {
    const res = await fetch('tutors.json');
    const tutors = await res.json();

    // Get matches to current text input
    let matches = tutors.filter(tutor => {
        const regex = new RegExp(`${searchText}`, 'gi');
        return tutor.subjects.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
    }
    if (matches.length === 0) {
        matchList.innerHTML = '';
    }

    outputHTML(matches);
}

const outputHTML = matches => {
    if (matches.length > 0) {
        quickSort(matches,0,matches.length-1);
        const html = matches.map(match => `
                <div class=card>
                    <img src="images/${match.image}" alt="${match.name}">
                    <h3>${match.name}</h3> <br>
                    <h4>Subjects Teaching: ${match.subjects}</h4> <br>
                    <h4>A-Levels Achieved: ${match.qualifications}</h4> <br>
                    <h4>${match.price}</h4> <br>
                    <h4>${match.phoneNo}</h4>
                    <a href="mailto: ${match.email}">${match.email}</a>
                </div>
        `)
        .join('');

        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchTutors(search.value));







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

