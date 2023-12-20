document.addEventListener("DOMContentLoaded", function () {
  const noteInput = document.getElementById("note-input");
  const addNoteBtn = document.getElementById("add-note-btn");
  const clearAllBtn = document.getElementById("clear-all-btn");
  const notesList = document.getElementById("notes-list");

  // Load notes from local storage on page load
  loadNotesFromStorage();

  addNoteBtn.addEventListener("click", function () {
    const noteText = noteInput.value.trim();
    if (noteText !== "") {
      addNoteToList(noteText);
      saveNotesToStorage(); // Save notes to local storage
      noteInput.value = "";
    }
  });

  clearAllBtn.addEventListener("click", function () {
    clearAllNotes();
  });

  function addNoteToList(noteText) {
    const li = document.createElement("li");
    li.className = "note-item";
    li.innerHTML = `
      <span>${noteText}</span>
      <button class="delete-btn">Delete</button>
    `;
    notesList.appendChild(li);

    // Attach event listener to delete button
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      notesList.removeChild(li);
      saveNotesToStorage(); // Save notes to local storage after deletion
    });
  }

  function saveNotesToStorage() {
    const notes = [];
    const noteItems = document.querySelectorAll(".note-item span");
    noteItems.forEach((item) => notes.push(item.textContent));
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function loadNotesFromStorage() {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const notes = JSON.parse(storedNotes);
      notes.forEach((noteText) => addNoteToList(noteText));
    }
  }

  function clearAllNotes() {
    notesList.innerHTML = ""; // Clear the notes list
    localStorage.removeItem("notes"); // Remove notes from local storage
  }
});
