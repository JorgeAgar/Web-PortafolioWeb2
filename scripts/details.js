const student_code = getQueryParam(window.location.href, "code");
const details_container = document.getElementById("details-container");

const add_tech_button = document.getElementById("add_tech_button");
add_tech_button.onclick = addTechnology();
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

async function loadStudentTechnologies(){
    const student_technologies = await api.getStudentTechnologies(student_code);
    // console.log(student_technologies);

    if(student_technologies.length == 0) return;

    if(student_technologies.length == 5){
        add_tech_button.classList.add("disabled");
        add_tech_button.disabled = true;
    }

    const tech_list = document.querySelector(".student-tech-list");
    tech_list.innerHTML = "";
    student_technologies.forEach(tech_item => {
        tech_list.appendChild(buildTechCard(tech_item));
    });
}

const tech_template = document.getElementById("tech_item_template");

function buildTechCard(tech_item){
    const clone = tech_template.content.cloneNode(true);
    clone.querySelector('.tech-item-logo').src = tech_item.technology.image;
    clone.querySelector('.tech-item-name').textContent = tech_item.technology.name;
    for(let i = 0; i < tech_item.level; i++){
        clone.querySelector('.tech-item-rating').children[i].classList.add("ticked-star");
    }
    clone.querySelector('.tech-item-edit-button').onclick = editTechnology(tech_item);
    clone.querySelector('.tech-item-delete-button').onclick = deleteTechnology(tech_item);
    return clone;
}

async function editTechnology(tech){

}

async function deleteTechnology(tech){

}

async function addTechnology() {
    
}

loadStudentInfo();
loadStudentTechnologies();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}