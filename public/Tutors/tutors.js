const tutorsHTML = document.getElementById('tutors');

const getTutors = async () => {
    const res = await fetch('../tutors.json');
    const tutors = await res.json();
    outputHTML(tutors);
}

const outputHTML = tutors => {
    if (tutors.length > 0) {

        const html = tutors.map(tutor => `
            <div class=card>
                <img src="../images/${tutor.image}" alt="${tutor.name}">
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