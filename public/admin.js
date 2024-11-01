const petsDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
// Load tasks from /api/pets
const showPets = async () => {
loadingDOM.style.visibility = 'visible'
try {
    const {
    data: { pets },
    } = await axios.get('/pets')
    if (pets.length < 1) {
    petsDOM.innerHTML = '<h5 class="empty-list">No Pets Available</h5>'
    loadingDOM.style.visibility = 'hidden'
    return
    }
    const allPets = pets.map((pet) => {
        const { _id: petID, name, breed, gender, age, description, behavior, history } = pet
        return `<div class="single-pet">
        <h5>${name}</h5>
        <h5>${breed}</h5>
        <h5>${gender}</h5>
        <h5>${age}</h5>
        <h5>${description}</h5>
        <h5>${behavior}</h5>
        <h5>${history}</h5>
        <div class="pet-links">
            <button type="button" class="delete-btn" data-id="${petID}">
            <i class="fas fa-trash"></i>
            </button>
        </div>
    </div>`
    }).join('')
    petsDOM.innerHTML = allPets
    } catch (error) {
        petsDOM.innerHTML =
        '<h5 class="empty-list">There was an error</h5>'
    }
loadingDOM.style.visibility = 'hidden'
}

showPets()

// delete task /api/pets/:id

petsDOM.addEventListener('click', async (e) => {
const el = e.target
if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
    await axios.delete(`/api/v1/pets/${id}`)
    showPets()
    } catch (error) {
    console.log(error)
    }
}
loadingDOM.style.visibility = 'hidden'
})