const searchInput = document.getElementById('search-input');
const searchList = document.getElementById('search-list');

let count = 0;

searchInput.addEventListener('keydown', function(event) {
  console.log(count)
  if (event.key === 'ArrowUp') {
    if (count <= 0) {
      count = 0;
    } else if (count == 1) {
      searchList.children[0].classList.remove('active');
      count = 0;
    } else if (count > searchList.children.length) {
      count -= 1;
      searchList.children[count - 1].classList.remove('active');
      searchList.children[count - 2].classList.add('active');
      count -= 1;
    } else {
      searchList.children[count - 1].classList.remove('active');
      searchList.children[count - 2].classList.add('active');
      
      searchInput.value = searchList.children[count - 2].innerText;
      count -= 1;
    }
  } else if (event.key === 'ArrowDown') {
    if (count === 0) {
      searchList.children[count].classList.add('active');
      
      count += 1;
      searchInput.value = searchList.children[count].innerText;
    } else if (count < searchList.children.length) {
      searchList.children[count - 1].classList.remove('active');
      searchList.children[count].classList.add('active');
      
      searchInput.value = searchList.children[count].innerText;
      count += 1;
    } else if (count >= searchList.children.length) {
      searchList.children[searchList.children.length - 1].classList.remove('active');
      searchList.children[0].classList.add('active');
      
      searchInput.value = searchList.children[0].innerText;
      count = 1;
    }
  }

  if (event.key === 'Enter' && searchInput.value.trim() !== '') {
    const button = document.createElement('button'); 
    button.classList.add('btn-close'); 
    button.setAttribute('aria-label', 'Close'); 
    
    const newItem = document.createElement('li');
    

    newItem.classList.add('list-group-item');
    newItem.innerText = searchInput.value;
    newItem.appendChild(button);
    searchList.appendChild(newItem);
    searchInput.value = '';
    activeMode();
  }
});

function btnClose() {
  document.querySelectorAll(".btn-close").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest('li').remove();
    });
  });
}

btnClose();

function activeMode() {
  document.querySelectorAll(".list-group-item").forEach((item, index) => {
    item.addEventListener('mouseover', function() {
      searchList.querySelectorAll(".list-group-item").forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      count = index + 1;
    });

    item.addEventListener('mouseout', function() {
      if (count !== index + 1) {
        item.classList.remove('active');
      }
    });
  });
}

activeMode();

