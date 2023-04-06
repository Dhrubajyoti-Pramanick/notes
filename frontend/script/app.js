function color() {
  let colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
  let random_color = colors[(Math.floor(Math.random() * colors.length))];
  return random_color;
}
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
    let bg = color();
    document.getElementById(
      "log"
    ).innerHTML += `<div id="logs" class="col-4 card card-body bg-${bg} text-white rounded-3 p-3 my-1">
    <div class="d-flex justify-content-between">
      <div id="subTitle" class="card-title fs-3">${response.data[i].title}</div>
      <div>
        <button id="del" class="buttonSvg btn btn-info p-0"><img class="w-50" src="./images/bin.svg" alt="bin"></button>
      <button id="edit" class="buttonSvg btn btn-info p-0"><img class="w-50 " src="./images/edit.svg" alt="edit"></button>
      </div>
      </div>
    <div id="subContent" class="card-text">${response.data[i].content}</div>
    <div id="ID" class="d-none">${response.data[i]._id}</div>
</div>
</section>`;
    del();
    edit();
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
    let bg = color();
    document.getElementById("message").innerHTML = "*Successfully Added";
    document.getElementById(
      "log"
    ).innerHTML += `<div id="logs" class="card card-body bg-${bg} text-white rounded-3 p-3 my-1">
          <div class="d-flex justify-content-between">
            <div id="subTitle" class="card-title fs-3">${title}</div>
            <div>
              <button id="del" class="buttonSvg btn btn-info p-0"><img class="w-50" src="./images/bin.svg" alt="bin"></button>
              <button id="edit" class="buttonSvg btn btn-info p-0"><img class="w-50" src="./images/edit.svg" alt="edit"></button>
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
function edit() {
  arr = document.querySelectorAll("#edit");
  for (i = 0; i < arr.length; i++) {
    arr[i].onclick = function () {
      subTitle = this.parentNode.parentNode.firstElementChild;
      console.log(subTitle.innerHTML);
      subContent = this.parentNode.parentNode.parentNode.children[1];
      console.log(subContent.innerHTML);
      id = this.parentNode.parentNode.parentNode.lastElementChild.innerHTML
      console.log(this.parentNode.parentNode.parentNode.lastElementChild.innerHTML)
      let title = document.getElementById("title").value;
      let content = document.getElementById("content").value;
      if (title === "" || content === "") {
        alert("Fill both the inputs");
      } else {
        subTitle.innerHTML = title;
        subContent.innerHTML = content;
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
