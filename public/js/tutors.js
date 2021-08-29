const tutorsHTML = document.getElementById('tutors');
const content = document.getElementById('content');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

async function getTutor(id) {
    const res = await fetch('/api', {
        method: 'POST'
    });
    const tutors = await res.json();

    let tutor = tutors.filter(tutor => {
        return tutor.id == id;
    })[0];

    content.innerHTML = `
        <h1>${tutor.name}</h1>
        <h2>${tutor.role}</h2>
        <div class="smallspacer"></div>

        <div class="constrict">
            <h3>Subjects Teaching</h3>
            <p>${tutor.subjects}</p>
            <div class="smallspacer"></div>

            <h3>Qualifications</h3>
            <p>${tutor.qualifications}</p>
            <div class="smallspacer"></div>

            <h3>Price</h3>
            <p>${tutor.price}</p>
            <div class="smallspacer"></div>

            <h3>Email</h3>
            <p><a href="mailto:${tutor.email}">${tutor.email}</a></p>
            <div class="smallspacer"></div>

            <h3>Phone Number</h3>
            <p>${tutor.phoneNo}</p>
            <div class="bigspacer"></div>
        </div>
    `;
}

async function getTutors() {
    const res = await fetch('/api', {
        method: 'POST'
    });
    const tutors = await res.json();
    outputHTML(tutors);
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
        `)
        .join('');

        tutorsHTML.innerHTML = html;
    }

    tutors.forEach(tutor => {
        document.getElementById(tutor.id).addEventListener("click", () => goToTutor(tutor.id));
    });
};

function goToTutor(id) {
    window.location.href = "../Tutors/?id=" + id;
}

if (urlParams.get("id")) {
    document.getElementById("back").hidden = false;
    document.getElementById("back").addEventListener("click", () => window.history.back());
    getTutor(urlParams.get("id"));
} else {
    document.getElementById("title").hidden = false;
    document.getElementById("menu").hidden = false;
    getTutors();
}
