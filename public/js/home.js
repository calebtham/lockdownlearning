const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search tutors.json and filter it
async function searchTutors(searchText) {
    const res = await fetch('/api', {
        method: 'POST'
    });
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

function outputHTML(tutors) {
    if (tutors.length > 0) {
        quickSort(tutors,0,tutors.length-1);
        const html = tutors.map(tutor => `
            <div class=card id=${tutor.id}>
                <h3>${tutor.name}</h3> <br>
                <h4>Subjects Teaching</h4>
                <p>${tutor.subjects}</p> <br>
                <h4>Qualifications</h4>
                <p>${tutor.qualifications}</p> <br><br>
                <h4 class="center bottom">${tutor.price}</h4>
            </div>
        `).join('');

        matchList.innerHTML = html;
    }
    tutors.forEach(tutor => {
        document.getElementById(tutor.id).addEventListener("click", () => goToTutor(tutor.id));
    });
};

function goToTutor(id) {
    window.location.href = "../Tutors/?id=" + id;
}

search.addEventListener('input', () => searchTutors(search.value));
