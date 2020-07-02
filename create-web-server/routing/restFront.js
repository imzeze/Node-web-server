function getUser() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 200) {
            let users = JSON.parse(xhr.responseText);
            let list = document.getElementById("list");
            list.innerHTML='';
            Object.keys(users).map(function(key) {
                let userDiv = document.createElement('div');
                let span = document.createElement('span');
                span.textContent = users[key];
                let edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function() {
                    let name = prompt('이름 입력')
                    if(!name) {
                        return alert("이름 입력");
                    }

                    let xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if(xhr.status === 200) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT','/users/' + key);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({name : name}));
                });
                let remove = document.createElement("button");
                remove.textContent = "삭제";
                remove.addEventListener("click", function() {
                    let xhr = new XMLHttpRequest();
                    xhr.onload = function() {
                        if(xhr.status === 200) {
                            getUser();
                        } 
                    }
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', '/users');
    xhr.send();
}

window.onload = getUser;

document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = e.target.username.value;
    if(!name) {
        return alert("이름 입력");
    }
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status === 201) {
            getUser();
        } else {
            console.error(xhr.responseText)
        }
    }
    xhr.open('POST', '/users');
    xhr.setRequestHeader({'Content-Type':'application/json'});
    xhr.send(JSON.stringify({name : name}));
    e.target.username.value = '';
});