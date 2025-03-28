const student_code = getQueryParam(window.location.href, "code");
const details_container = document.getElementById("details-container");

document.getElementById("back_button").onclick = () => {window.location.href = "../index.html";};

async function loadStudentInfo(){
    const student = await api.getStudentByCode(student_code);

    details_container.querySelector('.student-photo').src = student.photo;
    details_container.querySelector('.student-name').textContent = student.name;
    details_container.querySelector('.student-code').textContent = "ID: " + student.code;
    details_container.querySelector('.student-email').textContent = student.email;
    details_container.querySelector('.student-description').textContent = student.description;
    details_container.querySelector('.student-github-link').href = student.github_link;
    details_container.querySelector('.edit-button').onclick = () => {
        window.location.href = "html/editstudent.html?code=" + student.code;
    };
}

const tech_template = document.getElementById("tech_item_template");

async function loadStudentTechnologies(){

}

loadStudentInfo();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}