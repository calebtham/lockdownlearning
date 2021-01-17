const teammatesHTML = document.getElementById('teammates');

const getTeammates = async () => {
    const res = await fetch('../tutors.json');
    const teammates = await res.json();

    let teammatesFiltered = teammates.filter(teammate => {
        const regex = new RegExp(`co-founder`, 'gi');
        return teammate.role.match(regex);
    });

    outputHTML(teammatesFiltered);
}

const outputHTML = teammates => {
    if (teammates.length > 0) {

        const html = teammates.map(teammate => `
            <div class=card>
                <h3>${teammate.name}</h3> <br>
                <div class=center>
                    <h4>${teammate.role}</h4> <br>
                    <h4>${teammate.phoneNo}</h4>
                    <a href="mailto: ${teammate.email}">${teammate.email}</a>
                </div>
            </div>
        `)
        .join('');

        teammatesHTML.innerHTML = html;
    }
};

getTeammates();