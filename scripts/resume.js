const student_code = getQueryParam(window.location.href, "code");
const resume = document.getElementById("resume-container");

document.getElementById("back_button").onclick = () => {window.location.href = "../index.html";};

async function fillStudentInfo(){
    const student = await api.getStudentByCode(student_code);
    // const student_technologies = api.getStudentTechnologies(student_code);
    console.log(student);

    resume.querySelector('.student-photo').src = student.photo;
    resume.querySelector('.student-header-name').textContent = student.name;
    resume.querySelector('.student-header-code').textContent = "Student ID: " + student_code;
    resume.querySelector('.student-header-github').href = student.github_link;
    resume.querySelector('.student-header-email').textContent = student.email;
    resume.querySelector('.resume-about').textContent = student.description;
    resume.querySelector('.student-footer-name').textContent = student.name;
    resume.querySelector('.student-footer-name').textContent = student.name;
    resume.querySelector('.student-footer-code').textContent = "Student ID: " + student_code;
    resume.querySelector('.student-footer-github').href = student.github_link;
    resume.querySelector('.student-footer-email').textContent = student.email;
}

fillStudentInfo();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}