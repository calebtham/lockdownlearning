const tutorsHTML = document.getElementById('tutors');

const getTutors = async () => {
    const res = await fetch('../tutors.json');
    const tutors = await res.json();
    outputHTML(tutors);
}

const outputHTML = tutors => {
    if (tutors.length > 0) {
        quickSort(tutors,0,tutors.length-1);
        const html = tutors.map(tutor => `
            <div class=card>
                <h3>${tutor.name}</h3> <br>
                <h4>Subjects Teaching: ${tutor.subjects}</h4> <br>
                <h4>A-Levels Achieved: ${tutor.qualifications}</h4> <br>
                <h4>${tutor.price}</h4> <br>
                <h4>${tutor.phoneNo}</h4>
                <a href="mailto: ${tutor.email}">${tutor.email}</a>
            </div>
        `)
        .join('');

        tutorsHTML.innerHTML = html;
    }
};

getTutors();


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

