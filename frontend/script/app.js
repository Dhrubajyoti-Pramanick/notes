function notes() {
  //taking input
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  if (title === "" || content === "") {
    alert("Fill both the inputs");
  } else {
    // writing log of notes
    document.getElementById("message").innerHTML = "*Successfully Added";
    document.getElementById(
      "log"
    ).innerHTML += `<div id="logs" class="card card-body d-flex flex-column bg-primary text-white rounded-3 p-3 my-1">
        <div id="subTitle" class="card-title">${title}</div>
        <div id="subContent" class="card-text">${content}</div>
        <button class="btn btn-info" onclick="del()"><img src="./images/bin.svg" alt="bin"></button>
    </div>`;
    fetch("http://localhost:4000/notes/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title : document.getElementById('title').value,
        content : document.getElementById('content').value,
      }),
    })
    .then((response) => response.json())
    .then(() => {
      // clearing the input box
      document.getElementById("title").value = null;
      document.getElementById("content").value = null;
      setTimeout(() => {
        document.getElementById("message").innerHTML = null;
      }, 2000);
    });
  }
}
function del() {
  let eachLog = document.getElementById("logs");
  fetch("http://localhost:4000/notes/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title : document.getElementById('subTitle').innerHTML,
        content : document.getElementById('subContent').innerHTML,
      }),
    })
    eachLog.parentNode.removeChild(eachLog);
}
