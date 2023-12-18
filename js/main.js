const form = document.querySelector('#form-activity')
    let lines = ' ';
    const activities = [];
    const grades = [];
    const spamApproved = '<td><span class="status approved">Approved</span></td>';
    const spamReproved = '<td><span class="status reproved">Reproved</span></td>';
    const minimumGrade = parseFloat(prompt("Type here the minimum passing grade:"));


form.addEventListener('submit', function(e){
    e.preventDefault();
    addLine();
    tableRefresher();
    averageCalculator();
    averageGradeRefresher()

});

function addLine(){
    const activityName = document.getElementById('activity-name');
    const activityGrade = document.getElementById('activity-grade');

    const approved = '<img src="images/aprovado.png" alt="Party Emoji">';
    const reproved = '<img src="images/reprovado.png" alt="Sad Emoji">';

    if(activities.includes(activityName.value)) {
        alert(`The activity "${activityName.value}" already exists.`)
    } else{
        activities.push(activityName.value);
        grades.push(parseFloat(activityGrade.value));

        let columns = '<tr>';
        columns += `<td>${activityName.value}</td>`;
        columns += `<td>${activityGrade.value}</td>`;
        columns += `<td>${activityGrade.value >= minimumGrade ? approved : reproved}</td>`;
        columns += '</tr>';

        lines += columns;

        activityName.value = '';
        activityGrade.value = '';
    }
}

function tableRefresher(){
    const tableBody = document.querySelector('tbody')
    tableBody.innerHTML = lines;
}

function averageCalculator() {
    let gradeSum = 0

    for(let i = 0; i < grades.length; i++) {
        gradeSum += grades[i];
    }

    return gradeSum / grades.length;
}

function averageGradeRefresher() {
    const finalAverage = averageCalculator();

    document.getElementById('final-average').innerHTML = finalAverage.toFixed(2);
    document.getElementById('final-average-result').innerHTML = finalAverage >= minimumGrade ? spamApproved : spamReproved;
}