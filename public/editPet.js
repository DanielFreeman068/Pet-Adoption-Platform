const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showPet = async () => {
try {
    const {
    data: { pet },
    } = await axios.get(`/api/v1/pets/${id}`)
    const { _id: petID, completed, name } = pet

    taskIDDOM.textContent = petID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
    taskCompletedDOM.checked = true
    }
} catch (error) {
    console.log(error)
}
}

showPet()

editFormDOM.addEventListener('submit', async (e) => {
editBtnDOM.textContent = 'Loading...'
e.preventDefault()
try {
    const taskName = taskNameDOM.value

    const {
    data: { pet },
    } = await axios.patch(`/api/v1/pets/${id}`, {
    name: taskName,
    })

    const { _id: petID, name } = pet

    taskIDDOM.textContent = petID
    taskNameDOM.value = name
    tempName = name
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited pet`
    formAlertDOM.classList.add('text-success')
} catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
}
editBtnDOM.textContent = 'Edit'
setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
}, 3000)
})
