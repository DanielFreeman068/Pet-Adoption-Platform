const petsDOM = document.querySelector('.pets')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.pet-form')
const petInputDOM = document.getElementById('pet-input')
const breedInputDOM = document.getElementById('breed-input')
const genderInputDOM = document.getElementById('gender-input')
const ageInputDOM = document.getElementById('age-input')
const formAlertDOM = document.querySelector('form-alert')
// Load pets from /api/pets
const showPets = async () => {
    loadingDOM.style.visibility = 'visible'
    try {
        const {data: { pets }} = await axios.get('/api/v1/pets')
        if (pets.length < 1) {
        petsDOM.innerHTML = '<h5 class="empty-list">No Pets Available</h5>'
        loadingDOM.style.visibility = 'hidden'
        return
        }
        const allPets = pets.map((pet) => {
            const { _id: petID, name, breed, gender, age } = pet
            return `<div class="single-pet">
            <h5>${name}</h5>
            <h5>${breed}</h5>
            <h5>${gender}</h5>
            <h5>${age}</h5>
            </div>`
        }).join('')
        petsDOM.innerHTML = allPets
        } catch (error) {
            petsDOM.innerHTML ='<h5 class="empty-list">There was an error</h5>'
        }
        loadingDOM.style.visibility = 'hidden'
    }

showPets()

// form

formDOM.addEventListener('submit', async (e) => {
e.preventDefault()
const name = petInputDOM.value
const breed = breedInputDOM.value
const gender = genderInputDOM.value
const age = ageInputDOM.value

try {
    await axios.post('/api/v1/pets', { name , breed, gender, age})
    showPets()
    petInputDOM.value = ''
    breedInputDOM.value = ''
    genderInputDOM.value = ''
    ageInputDOM.value = ''
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `successfully added pet`
    formAlertDOM.classList.add('text-success')
} catch (error) {
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error adding pet`
}
setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
}, 3000)
})