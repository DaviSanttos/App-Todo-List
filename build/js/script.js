
const icon = document.getElementById("menu-hamburger");
const iconClose = document.getElementById("close");
let menu = document.getElementById("mobile-menu");

// function openMenu(){

//     if(icon) {
//         menu.classList.remove("hidden")
//         menu.classList.add("block");
//         // menu.classList.toggle("my");
//     } 
//     if(iconClose){
//         menu.classList.remove("block")
//         menu.classList.add("hidden")
//     }
//     // if(iconClose) {
//     //     menu.classList.toggle("my");
//     // }
// }

// function closeMenu(){
//     let menu = document.getElementById("mobile-menu");
//     if(iconClose) {
//         menu.classList.toggle("my")
//         // menu.classList.add("hidden")
//     }
// }

icon.addEventListener("click", () => {

    menu.classList.remove("anim-r");
    menu.classList.add("anim");
    menu.classList.remove("hidden");

});

iconClose.addEventListener("click", () => {

    menu.classList.remove("anim");
    menu.classList.add("anim-r");

    setTimeout(() => {
        menu.classList.add("hidden");
    }, 300);
    
});


//receber os dados do formulario e para o envio por padrao
window.location.href='https://todo-list-7kdn.onrender.com/index.html';
// import './menu';
const Form = document.querySelector('form');
const Table = document.querySelector('#table');


// // Adicione um ouvinte de evento para o carregamento da página
window.addEventListener('load', function() {
  // Verifique se a URL é a página desejada
  if (window.location.href.includes('https://todo-list-7kdn.onrender.com/index.html')) {
    
    list();
  }

  if (window.location.href.includes('https://todo-list-7kdn.onrender.com/tarefas_pendendes.html')) {
    listPending();
    completeQuest();
  }

  if (window.location.href.includes('https://todo-list-7kdn.onrender.com/concluidas.html')) {
    console.log('concluidas');
    listComplete()
  }
});

// //validar os campos para o formato desejado e salvar em algum local de armazenamento

function validator(priorit, text){
    const dados = {
      text,
      priorit,
    }
    const newDados = JSON.stringify(dados);
    saveInStorage(newDados);
}

function saveInStorage(dados){

  const listaExistenteString = localStorage.getItem('tarefas');
  const listaExistente = listaExistenteString ? JSON.parse(listaExistenteString) : [];

  listaExistente.push(dados);

  localStorage.setItem('tarefas', JSON.stringify(listaExistente));
}

//resgatar esses dados e exibi-los em forma de tabela
function getItems(storage = 'tarefas') {
  const items = localStorage.getItem(`${storage}`);
  const newList = items ? JSON.parse(items) : [];
    // Converter cada string JSON em objeto JavaScript
  const parsedItems = newList.map(item => JSON.parse(item));

  return parsedItems;
}


function list() {

   const btnSubmit = document.querySelector('#sub');

    console.log('Usuário entrou na página específica!');
    btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    const allRadios = Form.querySelectorAll('.prioridade');
    const inputData = Form.querySelector('#txt');

    const tr = document.createElement('tr');
    const tdQuest = document.createElement('td');
    const tdPriorit = document.createElement('td');

    tdPriorit.classList.add(...['border','border-slate-300']);
    tdQuest.classList.add(...["border", "border-slate-300"]);

    tdQuest.append(inputData.value);
    allRadios.forEach((e) => {
      if(e.checked){
        if(e.value === 'baixa')tdPriorit.classList.add('text-green-600');
        if(e.value === 'media'){
          tdPriorit.append('Média');
          tdPriorit.classList.add('text-yellow-500');
        }
        if(e.value === 'urgente') tdPriorit.classList.add('text-red-700');
        validator(e.value, inputData.value);
        if(e.value !== 'media') tdPriorit.append(capitalize(e.value));
      }
    });

    tr.appendChild(tdQuest);
    tr.appendChild(tdPriorit);
    Table.appendChild(tr);
  });

}

function listPending() {
  console.log('Usuário entrou na página!');
  const list = getItems();

  list.forEach((e, index) => {
    const tr = document.createElement('tr');
    tr.id = index.toString();
    const tdQuest = document.createElement('td');
    const tdPriorit = document.createElement('td');
    const tdCheck = document.createElement('td');
    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';

    tdPriorit.classList.add(...['border','border-slate-300']);
    tdQuest.classList.add(...["border", "border-slate-300"]);
    tdCheck.classList.add(...["border", "border-slate-300"]);

    tdQuest.append(e.text);
    tdCheck.appendChild(checkboxInput);

    if(e.priorit === 'baixa')tdPriorit.classList.add('text-green-600');
    if(e.priorit === 'media') {
      tdPriorit.append('Média');
      tdPriorit.classList.add('text-yellow-500');
    }
    if(e.priorit === 'urgente') tdPriorit.classList.add('text-red-700');
    if(e.priorit !== 'media') tdPriorit.append(capitalize(e.priorit));

    tr.appendChild(tdQuest);
    tr.appendChild(tdPriorit);
    tr.appendChild(tdCheck);

    Table.appendChild(tr);

  });

}


function completeQuest(){

  const date = new Date().getDate();

  Table.addEventListener('click', function(){

  const check = document.querySelectorAll('input');

  check.forEach(e => {
    if(e.checked){
      const item = e.parentElement.parentElement.id;
      console.log(item);
      let oldList = localStorage.getItem('tarefas');
      let newList = oldList ? JSON.parse(oldList) : [];

      let newArray = [...newList];
      let delet = newArray.splice(Number(item), 1);
      const objetoJS = JSON.parse(delet[0]);
      objetoJS.date = date;
      newStorageComplete(objetoJS);

      let dadosJSon = JSON.stringify(newArray);
      localStorage.setItem('tarefas', dadosJSon);

      window.location.href = 'https://todo-list-7kdn.onrender.com/tarefas_pendendes.html';
    }
  });
  })
}

function listComplete(){
  const newDate = new Date().getDate();
  //const allItems= getItems('oldtarefas');
    let oldList = localStorage.getItem('oldtarefas');
    let newList = oldList ? JSON.parse(oldList) : [];
    newList.forEach((e, index) => {

    if(e.date !== newDate) {
      deleteObsolet(index);
    }else {
      const tr = document.createElement('tr');
      const tdQuest = document.createElement('td');
      const tdPriorit = document.createElement('td');

      tdPriorit.classList.add(...['border','border-slate-300']);
      tdQuest.classList.add(...["border", "border-slate-300"]);
      tdQuest.append(e.text);
      if(e.priorit === 'baixa')tdPriorit.classList.add('text-green-600');
      if(e.priorit === 'media') {
        tdPriorit.append('Média');
        tdPriorit.classList.add('text-yellow-500');
      }
      if(e.priorit === 'urgente') tdPriorit.classList.add('text-red-700');
      if(e.priorit !== 'media') tdPriorit.append(capitalize(e.priorit));

      tr.appendChild(tdQuest);
      tr.appendChild(tdPriorit);

      Table.appendChild(tr);
    }
  });

}

function newStorageComplete(arg){

  let oldList = localStorage.getItem('oldtarefas');
  let newList = oldList ? JSON.parse(oldList) : [];
  let newArray = [...newList];

  newArray.push(arg);

  let dadosJSon = JSON.stringify(newArray);
  localStorage.setItem('oldtarefas', dadosJSon);
}


function deleteObsolet(index){
      let oldList = localStorage.getItem('oldtarefas');
      let newList = oldList ? JSON.parse(oldList) : [];

      let newArray = [...newList];
      newArray.splice(Number(index), 1);

      let dadosJSon = JSON.stringify(newArray);
      localStorage.setItem('oldtarefas', dadosJSon);
}

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

