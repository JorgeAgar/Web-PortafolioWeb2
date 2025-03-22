const student_code = getQueryParam(window.location.href, "code");
const resume = document.getElementById("resume-container");

document.getElementById("back_button").onclick = () => {window.location.href = "../index.html";};

async function fillStudentInfo(){
    const student = await api.getStudentByCode(student_code);
    // console.log(student);

    resume.querySelector('.student-photo').src = student.photo;
    resume.querySelector('.student-header-name').textContent = student.name;
    resume.querySelector('.student-header-code').textContent = "Student ID: " + student_code;
    resume.querySelector('.student-header-github').href = student.github_link;
    resume.querySelector('.student-header-email').textContent = student.email;
    resume.querySelector('.resume-about').textContent = student.description;
    resume.querySelector('.student-footer-name').textContent = student.name;
    resume.querySelector('.student-footer-code').textContent = "Student ID: " + student_code;
    resume.querySelector('.student-footer-github').href = student.github_link;
    resume.querySelector('.student-footer-email').href = "mailto:" + student.email;
}

const tech_template = document.getElementById("tech_item_template");

async function fillStudentTechnologies() {
    const student_technologies = await api.getStudentTechnologies(student_code);
    // console.log(student_technologies);
    const techlist_container = resume.querySelector('.resume-tech-list');
    if(student_technologies.length > 0){
        techlist_container.innerHTML = "";
    }

    student_technologies.forEach(technology => {
        // console.log(technology);
        const clone = tech_template.content.cloneNode(true);
        clone.querySelector('.tech-item-logo').src = technology.technology.image;
        clone.querySelector('.tech-item-name').textContent = technology.technology.name;
        for(let i = 0; i < technology.level; i++){
            clone.querySelector('.tech-item-rating').children[i].classList.add("ticked-star");
        }

        techlist_container.appendChild(clone);
    });
}

fillStudentInfo();
fillStudentTechnologies();

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}