const studentsContainer = document.getElementById("students_container");
const template = document.getElementById("student_card_template");

async function renderStudents(){
    const students = await api.getStudents();
    studentsContainer.innerHTML = "";
    students.forEach(student => {
        console.log(student);
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.student-name').textContent = student.name;
        clone.querySelector('.student-id').textContent = `ID: ${student.code}`;
        clone.querySelector('.student-email').textContent = student.email;
        clone.querySelector('.student-image').src = student.photo;
        clone.querySelector('.github-link').href = student.github;
        
        studentsContainer.appendChild(clone);
        
    });
}

//initial render
renderStudents()