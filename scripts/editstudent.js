const form = document.getElementById("student_form");
const student_code = getQueryParam(window.location.href, "code");

document.getElementById("back_button").onclick = goBack;
document.getElementById("cancel_button").onclick = goBack;

document.getElementById("save_button").onclick = async (e) => {
    if(!form.checkValidity()){
        return;
    }
    e.preventDefault();

    const student = {
        code: student_code,
        name: form.name.value,
        email: form.email.value,
        photo: form.photo.value,
        github_link: form.github.value,
        description: form.description.value
    };

    try {
        // console.log(student);
        let response = await api.updateStudent(student_code, student);
        // console.log(response);
        goBack();
    } catch (error) {
        console.log(error);
        alert("Hubo un error");
    }
};

async function updateFormData(){
    const student = await api.getStudentByCode(student_code);
    form.code.placeholder = student_code;
    form.name.value = student.name;
    form.email.value = student.email;
    form.photo.value = student.photo;
    form.github.value = student.github_link;
    form.description.value = student.description;
}

function getQueryParam(url, param){
    const urlObj = new URL(url);
    return urlObj.searchParams.get(param);
}

function goBack(){
    window.location.href = "../index.html";
}

updateFormData();