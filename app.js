function displayData(result){
    const html = result.map((elem)=>{
        return `
        <div class="card">
            <h1>${elem.fullName}</h1>
            <h5>${elem.email}</h5>
            <div class="avatar" style='background-image: url("${elem.avatar}")'></div>
        </div>
        `
    }).join('')
    const cards = document.querySelector(".cardContainer")
    cards.innerHTML = html;
    return result
}

function createPages(result){
    let i=0
    const page = document.querySelector(".pageContainer");
    const html = result.map((elem)=>{
        i++
        return `
            <a class="pageItem" href='#${i}'>
                ${i}
            </a>
        `
    }).join('')
    page.innerHTML = html;
    return result
}

window.addEventListener('hashchange',()=>{
    const page = window.location.hash;
    if(page===""){
        p.then(data=>{
            displayData(data);
        })
    }else{
        p.then(data=>{
            const singleUser=[];
            singleUser.push(data[page.slice(1)-1]);
            displayData(singleUser);
        })
    }
})

const userOne = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
    .then(result=>result.json());
const userTwo = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
    .then(result=>result.json());
const userThree = fetch("https://acme-users-api-rev.herokuapp.com/api/users/random")
    .then(result=>result.json());

const p= Promise.all([userOne,userTwo,userThree])
            .then(response=>displayData(response))
            .then(response=>createPages(response));