function displayData(result) {
	const html = result
		.map(elem => {
			return `
        <div class="card">
            <h1>${elem.fullName}</h1>
            <h5>${elem.email}</h5>
            <div class="avatar" style='background-image: url("${elem.avatar}")'></div>
        </div>
        `
		})
		.join("")
	const cards = document.querySelector(".cardContainer")
	cards.innerHTML = html
	return result
}

function createPages(result) {
	let i = 0
	const page = document.querySelector(".pageContainer")
	const html = result
		.map(elem => {
			//could also do (elem,i) so you don't have to instantiate/increment your own counter
			i++
			return `
            <a class="pageItem" href='#${i}'>
                ${i}
            </a>
        `
		})
		.join("")
	page.innerHTML = html
	return result
}

//a slightly more efficient strategy would be to manipulate class names and hide elements via CSS
//rather than re-rendering everything on every hashchange
window.addEventListener("hashchange", () => {
	const page = window.location.hash
	if (page === "") {
		p.then(data => {
			displayData(data)
		})
	} else {
		p.then(data => {
			const singleUser = []
			singleUser.push(data[page.slice(1) - 1])
			displayData(singleUser)
		})
	}
})

//small things:
//--you could save the URL to a variable rather than writing it out three times
//--you could also do the JSONing within the promise.all instead of having to write it out three times
const userOne = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(result => result.json())
const userTwo = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(result => result.json())
const userThree = fetch(
	"https://acme-users-api-rev.herokuapp.com/api/users/random"
).then(result => result.json())

const p = Promise.all([userOne, userTwo, userThree])
	.then(response => displayData(response))
	.then(response => createPages(response))

//really well done overall! your code is well-organized and clean!
//also schnazzy css!
