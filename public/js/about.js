const teammatesHTML = document.getElementById('teammates');

async function getTeammates() {
    const res = await fetch('/api', {
        method: 'POST'
    });
    const tutors = await res.json();

    let teammatesFiltered = teammates.filter(teammate => {
        const regex = new RegExp(`co-founder`, 'gi');
        return teammate.role.match(regex);
    });

    outputHTML(teammatesFiltered);
}

function outputHTML(teammates) {
    if (teammates.length > 0) {

        const html = teammates.map(teammate => `
            <div class=card id=${teammate.id}>
                <h3>${teammate.name}</h3> <br>
                <div class=center>
                    <h4>${teammate.role}</h4> <br>
                    <h4>${teammate.phoneNo}</h4>
                    <a href="mailto:${teammate.email}">${teammate.email}</a>
                </div>
            </div>
        `)
        .join('');

        teammatesHTML.innerHTML = html;
    }
    
    teammates.forEach(teammate => {
        document.getElementById(teammate.id).addEventListener("click", () => goToTutor(teammate.id));
    });
};

function goToTutor(id) {
    window.location.href = "../Tutors/?id=" + id;
}

getTeammates();