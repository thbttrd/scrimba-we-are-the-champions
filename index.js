
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-7d7e0-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsListInDB = ref(database, "endorsementsList")

const endorsementInputEl = document.getElementById("endorsement-input")
const endorsementPublishBtn = document.getElementById("endorsement-publish-btn")
const endorsementListEl = document.getElementById("endorsement-container")

endorsementPublishBtn.addEventListener("click", function() {
    let endorsementInput = endorsementInputEl.value

    if (endorsementInput != "Write your endorsement here") {
        push(endorsementsListInDB, endorsementInput)
        clearEndorsementInputEl()
    }
   
})

endorsementInputEl.addEventListener("focus", function() {
    endorsementInputEl.value = ""
})

endorsementInputEl.addEventListener("focusout", function() {
    let currentValue = endorsementInputEl.value
    if (currentValue == "") {
        clearEndorsementInputEl()
    }
    
})

function clearEndorsementInputEl() {
    endorsementInputEl.value = "Write your endorsement here"
}

onValue(endorsementsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementsListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            
            appendItemToEndorsementListEl(currentItem)
        }    
    } else {
        clearEndorsementsListEl()
    }
})

function clearEndorsementsListEl(){
    endorsementListEl.innerHTML = ""
}

function appendItemToEndorsementListEl(item){
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    endorsementListEl.append(newEl)

}