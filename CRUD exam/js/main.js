const username = document.getElementById("userName")
const userphone = document.getElementById("userPhone")
const groupName = document.getElementById("Group")
const Day = document.getElementById("day/time")
const addBtn = document.getElementById("addBtn")
const editInfo = document.getElementById("editInfo")
const UserCount = document.getElementById("Countusers")
const tableBody = document.getElementById("tbody")
let users = JSON.parse(localStorage.getItem('users')) || [];

function saveUsers(){
    localStorage.setItem( "users", JSON.stringify(users))
}
editInfo.style.display= "none"
addBtn.style.display= "block"

// const users =[
//     {
//         id: 1,
//         username: "Ali Husanov",
//         phone: "+998 (90) 123 45 67",
//         group: "Frontend",
//         day: "odd/8-10",
//     },
//     {
//         id: 1,
//         username: "Ali Husanov",
//         phone: "+998 (90) 123 45 67",
//         group: "Frontend",
//         day: "odd/8-10",
//     }
// ]

function renderUser(){
    console.log(users)
    let html=""
    users.forEach((item,index) => {
        html += `<tr>
                        <td>${item.id}</td>
                        <td><b>${item.username}</b></td>
                        <td>${item.phone}</td>
                        <td>${item.group}</td>
                        <td>${item.day}</td>
                        <td class="action_btns">
                            <button class="edit_btn"onclick="getId(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button class="del_btn" onclick="deleteUser(${index})"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`
    })
    tableBody.innerHTML = html
    UserCount.innerHTML = users.length

}

renderUser()

function Adduser(){
    if(username.value!==""&& userphone.value!==""){
        let user = {
            id:users.length+1,
            username:username.value,
            phone:userphone.value,
            group:groupName.value,
            day: Day.value,
        }
        users.push(user)
        renderUser()
    }
    else{
        alert("First, Fill the form")
    }
}
addBtn.addEventListener("click", Adduser)

function removeForm(){
    username.value=""
    userphone.value=""
    groupName.value=""
    Day.value=""
    renderUser()
}       
function deleteUser(id){
    console.log(id)
    users.splice(id,1)
    console.log(users)
    renderUser()
}
let idx = null

function getId(id){
    idx = id
    editInfo.style.display= "block"
    addBtn.style.display= "none" 
    console.log(users)  
    let user = users.find(item => item.id == +1)
    if (user){
        username.value = user.username || ""
        userphone.value = user.phone || ""
        groupName.value = user.group || ""
        Day.value = user.day || ""
    }
}
function saveEdit() {
    let user = users[idx]
    user.username = username.value
    user.phone = userphone.value
    user.group = groupName.value
    user.day = Day.value
    console.log(user)
    console.log(users)
    editInfo.style.display = "none"
    addBtn.style.display = "block"
    renderUser()
    removeForm()
    saveUsers()
    
}
editInfo.addEventListener("click", saveEdit)