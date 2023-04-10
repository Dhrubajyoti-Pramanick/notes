let flag = true;
// modal
let modal = document.getElementById('myModal');
// When the user clicks anywhere outside of the modal, close it
document.getElementById("cancel").onclick = function (event) {
  modal.style.display = "none";
  document.getElementById("cross").innerHTML = `<i class="plus fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
}

// fetch all notes
async function getAllNotes() {
  const response = await fetch("http://localhost:4000/notes/get", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((res) => res.json());
  console.log(response);
  console.log(response.data.length);
  for (let i = 0; i < response.data.length; i++) {
    document.getElementById("log").innerHTML +=
      `<div id="logs" class="card card-body text-white rounded-3 p-3 my-1">
        <div class="d-flex justify-content-between">
          <div id="subTitle" class="card-title fs-3">${response.data[i].title}</div>
          <div>
            <button id="del" class="buttonSvg btn p-0"><i class="fa-solid fa-trash"></i></button>
            <button id="edit" class="buttonSvg btn p-0"><i class="fa-solid fa-pen"></i></button>
          </div>
        </div>
        <div id="subContent" class="card-text">${response.data[i].content}</div>
        <div id="ID" class="d-none">${response.data[i]._id}</div>
    </div>`;
    checkEdit();
    delNote();
  }
}
getAllNotes();

// visibility
function visibility() {
  if (flag) {
    document.getElementById("form").innerHTML = `
    <div id="section2" class="col-10 col-md-3 d-flex flex-column p-3 gap-3 mt-5">
      <textarea type="text" id="title" placeholder="Enter Title"></textarea>
      <textarea id="content" placeholder="Enter Content"></textarea>
      <div>
        <button id="create" class="btn text-white" onclick="create()">CREATE</button>
        <div id="message" class="text-white py-5 fs-4"></div>
      </div>
    </div>`;
    document.getElementById("cross").innerHTML = `<i class="plus fa-solid fa-xmark" style="color: #ffffff;" onclick="visibility()"></i>`;
    flag = false;
  } else {
    document.getElementById("form").innerHTML = ``;
    document.getElementById("cross").innerHTML = `<i class="plus fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
    flag = true;
  }
}

//creating notes
function create() {
  //taking input
  let title = document.getElementById("title").value;
  let content = document.getElementById("content").value;
  if (title === "" || content === "") {
    alert("Fill both the inputs");
  } else {
    // writing log of notes
    document.getElementById("log").innerHTML += 
    `<div id="logs" class="card card-body text-white rounded-3 p-3 my-1">
      <div class="d-flex justify-content-between">
        <div id="subTitle" class="card-title fs-3">${title}</div>
        <div>
          <button id="del" class="buttonSvg btn p-0"><i class="fa-solid fa-trash"></i></button>
          <button id="edit" class="buttonSvg btn p-0"><i class="fa-solid fa-pen"></i></button>
        </div>
      </div>
      <div id="subContent" class="card-text">${content}</div>
      <div id="ID" class="d-none">1</div>
    </div>`;
    fetch("http://localhost:4000/notes/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
      }),
    }).then((response) => response.json());
    document.getElementById("message").innerHTML = "*Successfully Created";
    setTimeout(() => {
      if (flag === false) {
        document.getElementById("form").innerHTML = ``;
        flag = true;
        document.getElementById(
          "cross"
        ).innerHTML = `<i class="plus fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
      }
    }, 1000);
  }
  checkEdit();
  delNote();
}

// for edit button
function checkEdit() {
  arr = document.querySelectorAll("#edit");
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      let parent = this.parentNode.parentNode
      visibility2(parent);
    }
  }
}

function visibility2(parent) {
  if (flag) {
    subTitle = parent.firstElementChild;
    subContent = parent.parentNode.children[1];
    subId = parent.parentNode.children[2]
    document.getElementById("form").innerHTML = `
    <div id="section2" class="col-10 col-md-3 d-flex flex-column p-3 gap-3 mt-5">
      <textarea type="text" id="title" placeholder="Enter Title">${subTitle.innerHTML}</textarea>
      <textarea id="content" placeholder="Enter Content">${subContent.innerHTML}</textarea>
      <button id="edit2" class="btn text-white" onclick="edit(subTitle,subContent,subId)">UPDATE</button>
      <div id="message" class="text-white py-5 fs-4"></div>
    </div>`;
    document.getElementById(
      "cross"
    ).innerHTML = `<i class="plus fa-solid fa-xmark" style="color: #ffffff;" onclick="visibility()"></i>`;
    flag = false;
  } else {
    document.getElementById("form").innerHTML = ``;
    flag = true;
  }
}
function edit(subTitle, subContent, subId) {
  let title = document.getElementById("title");
  let content = document.getElementById("content");
  if (title.value === "" || content.value === "") {
    alert("Fill both the inputs");
  } else {
    subTitle.innerHTML = title.value;
    subContent.innerHTML = content.value;
    fetch("http://localhost:4000/notes/update", {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        content: document.getElementById("content").value,
        id: subId.innerHTML,
      }),
    })
      .then((response) => response.json())
    if (flag === false) {
      setTimeout(() => {
        document.getElementById("form").innerHTML = ``;
        flag = true;
        document.getElementById(
          "cross"
        ).innerHTML = `<i class="plus fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
      }, 1000);
    }
    document.getElementById("message").innerHTML = "*Successfully Updated";
  }
}

//deleting notes
function delNote() {
  arr = document.querySelectorAll("#del");
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      document.getElementById("cross").innerHTML = ``;
      let parent = this.parentNode.parentNode.parentNode;
      console.log(parent);
      modal.style.display = "block";
      document.getElementById('close').onclick = () => {
        check(parent);
        document.getElementById("deleteMsg").innerHTML = `*Successfully Deleted`;
        setTimeout(() => {
          modal.style.display = "none";
          document.getElementById("deleteMsg").innerHTML = ``;
          document.getElementById(
            "cross"
          ).innerHTML = `<i class="plus fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
        }, 1000);
      }
    }
  }
}
function check(parent) {
  let id = parent.lastElementChild.innerHTML;
  parent.remove();
  fetch("http://localhost:4000/notes/delete", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
}
//dark mode toggle
let togbtn = true;
document.getElementById("dark").addEventListener('click',()=>{
  if(togbtn){
    document.querySelector('.back').style.backgroundColor = "#1f2421";
    document.querySelectorAll('.card').forEach((item)=>{
      item.style.backgroundColor = "#49a078";
    });
    document.querySelectorAll('#del').forEach((item)=>{
      item.style.backgroundColor = "#9cc5a1";
    });
    document.querySelectorAll('#edit').forEach((item)=>{
      item.style.backgroundColor = "#dce1de";
    });
    document.querySelector("#dark").innerHTML = `<i class="dark fa-solid fa-sun" style="color:white"></i>`;
    togbtn = false;
  } else {
    document.querySelector('.back').style.backgroundColor = "#006d77";
    document.querySelectorAll('.card').forEach((item)=>{
      item.style.backgroundColor = "#e29578";
    }); 
    document.querySelectorAll('#del').forEach((item)=>{
      item.style.backgroundColor = "#ffddd2";
    });
    document.querySelectorAll('#edit').forEach((item)=>{
      item.style.backgroundColor = "#edf6f9";
    });
    document.querySelector("#dark").innerHTML = `<i class="dark fa-solid fa-moon" style="color:white"></i>`;
    togbtn = true;
  }
  
})