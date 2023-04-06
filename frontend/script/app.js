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
    document.getElementById(
      "log"
    ).innerHTML += `<div id="logs" class="card card-body text-white rounded-3 p-3 my-1">
    <div class="d-flex justify-content-between">
      <div id="subTitle" class="card-title fs-3">${response.data[i].title}</div>
      <div>
        <button id="del" class="buttonSvg btn p-0"><i class="fa-solid fa-trash"></i></button>
      <button id="edit" class="buttonSvg btn p-0"><i class="fa-solid fa-pen"></i></button>
      <button id="update" class="buttonSvg btn p-0" onclick="visibility2()"><i class="fa-solid fa-repeat"></i></button>
      </div>
      </div>
    <div id="subContent" class="card-text">${response.data[i].content}</div>
    <div id="ID" class="d-none">${response.data[i]._id}</div>
</div>
</section>`;
    del();
    edit();
    update();
  }
}
getAllNotes();

//creating notes
function create() {
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
    ).innerHTML += `<div id="logs" class="card card-body text-white rounded-3 p-3 my-1">
          <div class="d-flex justify-content-between">
            <div id="subTitle" class="card-title fs-3">${title}</div>
            <div>
              <button id="del" class="buttonSvg btn btn-info p-0"><i class="fa-solid fa-trash"></i></button>
              <button id="edit" class="buttonSvg btn btn-info p-0"><i class="fa-solid fa-pen"></i></button>
              <button id="update" class="buttonSvg btn btn-info p-0" onclick="visibility2()"><i class="fa-solid fa-repeat"></i></button>
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
  del();
  edit();
  update();
}
//deleting notes
function del() {
  arr = document.querySelectorAll("#del");
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      let parent = this.parentNode.parentNode.parentNode;
      let id = parent.lastElementChild.innerHTML;
      console.log(id);
      parent.remove();
      document.getElementById("message").innerHTML = "*Successfully Deleted";
      setTimeout(() => {
        document.getElementById("message").innerHTML = null;
      }, 2000);
      fetch("http://localhost:4000/notes/delete", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
    };
  }
}
// updating notes
function update() {
  // arr = document.querySelector("#update");
  // console.log(arr);
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = () => {
      console.log("hello", i, arr[i]);
    };
  }
}
function edit() {
  arr = document.querySelectorAll("#edit");
  // console.log(arr.length);
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      subTitle = this.parentNode.parentNode.firstElementChild;
      console.log(subTitle.innerHTML);
      subContent = this.parentNode.parentNode.parentNode.children[1];
      console.log(subContent.innerHTML);
      id = this.parentNode.parentNode.parentNode.lastElementChild.innerHTML;
      console.log(
        this.parentNode.parentNode.parentNode.lastElementChild.innerHTML
      );
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      if (title === "" || content === "") {
        alert("Fill both the inputs");
      } else {
        subTitle.innerHTML = title;
        subContent.innerHTML = content;
        document.getElementById("message").innerHTML = "*Successfully Edited";
        setTimeout(() => {
          document.getElementById("message").innerHTML = null;
        }, 2000);
        fetch("http://localhost:4000/notes/update", {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            title: document.getElementById("title").value,
            content: document.getElementById("content").value,
            id: id,
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
    };
  }
}
function edit2() {
  arr = document.querySelectorAll("#edit");
  console.log(arr.length);
  for (let i = 0; i < arr.length; i++) {
    // arr[i].onclick() = function () {
    //   console.log(arr[i]);
    // }
  }
}
// for(i=0;i<arr.length;i++){
//   arr[i].onclick() = function () {
//     console.log(this.parentNode);
//   }
// }
let flag = true;
function visibility() {
  if (flag) {
    document.getElementById("form").innerHTML = `
    <div id="section2" class="col-10 col-md-3 d-flex flex-column p-3 gap-3">
      <input type="text" id="title" placeholder="Enter Title">
      <textarea id="content" placeholder="Enter Content"></textarea>
      <button id="add" class="btn text-white" onclick="create()">Add</button>
    </div>`;
    document.getElementById(
      "cross"
    ).innerHTML = `<i class="fa-solid fa-xmark" style="color: #ffffff;" onclick="visibility()"></i>`;
    flag = false;
  } else {
    document.getElementById("form").innerHTML = ``;
    document.getElementById(
      "cross"
    ).innerHTML = `<i class="fa-solid fa-plus" style="color:white" onclick="visibility()"></i>`;
    flag = true;
  }
}
function visibility2() {
  if (flag) {
    arr = document.querySelectorAll("#edit");
  console.log(arr.length);
  console.log(arr[3].parentNode.parentNode.parentNode.firstElementChild.firstElementChild.innerHTML);
  for (let i = 0; i < arr.length; i++) {
  }
    document.getElementById("form").innerHTML = `
    <div id="section2" class="col-10 col-md-3 d-flex flex-column p-3 gap-3">
      <input type="text" id="title" placeholder="Enter Title">
      <textarea id="content" placeholder="Enter Content"></textarea>
      <button id="add" class="btn text-white" onclick="edit2()">Edit</button>
    </div>`;
    console.log();
    flag = false;
  } else {
    document.getElementById("form").innerHTML = ``;
    flag = true;
  }
}
