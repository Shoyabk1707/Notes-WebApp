const add = document.querySelector("#add");
const main = document.querySelector(".main");


// Add Button
add.addEventListener(
    "click",
    function(){
        addNote();
    }
)


// Save Note in local storage
const saveNotes = ()=>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);        
        }
    )
    if(data == 0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data));
    }
    
}



// Add Note
const addNote = (text = "") =>{
    const note = document.createElement("div");
     note.classList.add("note");
     note.innerHTML = `
        <div class="tool">
            <i class="save fas fa-save">   save</i>
            <i class="trash fas fa-trash">   Delete</i>
        </div>
        <textarea>${text}</textarea>
     `;

    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove();
            saveNotes();
        }
    );

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes();
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes();
        }
    )

     main.appendChild(note);
     saveNotes();
}



// a self calling function for displaying saved notes
(
    function(){
        const lsNotes = JSON.parse(localStorage.getItem("notes"));

        if(lsNotes === null){
            addNote(); 
        }
        else{
            lsNotes.forEach(
                (lsNote) =>{
                    addNote(lsNote);
                }
            )
        }
    }
)()

