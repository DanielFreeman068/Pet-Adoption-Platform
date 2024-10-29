const petsDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const petInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load tasks from /api/pets
const showPets = async () => {
loadingDOM.style.visibility = 'visible'
try {
    const {
    data: { pets },
    } = await axios.get('/api/v1/pets')
    if (pets.length < 1) {
    petsDOM.innerHTML = '<h5 class="empty-list">No Pets Available</h5>'
    loadingDOM.style.visibility = 'hidden'
    return
    }
    const allPets = pets
    .map((pet) => {
        const { _id: petID, name } = pet
        return `<div class="single-task">
        <h5>${name}</h5>
        </div>`
    })
    .join('')
    petsDOM.innerHTML = allPets
} catch (error) {
    petsDOM.innerHTML =
    '<h5 class="empty-list">There was an error, please try later...</h5>'
}
loadingDOM.style.visibility = 'hidden'
}

showPets()

// form

formDOM.addEventListener('submit', async (e) => {
e.preventDefault()
const name = petInputDOM.value

try {
    await axios.post('/api/v1/pets', { name })
    showPets()
    petInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
} catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
}
setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
}, 3000)
})
//put all this into ejs code