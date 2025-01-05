fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    const sidebar = document.querySelector('.side-bar');
    data.forEach(post => {
      
      //Creating a side-bar-item
      const sidebarItem = document.createElement('div');
      sidebarItem.classList.add('side-bar-item');

      const id = post.id;

      //Setting info
      sidebarItem.textContent = post.description;
      sidebarItem.id = id;
      
      //Appending to side-bar
      sidebar.appendChild(sidebarItem);

      //Click event
      sidebarItem.addEventListener('click', () => {

        //Selection in side-bar
        document.querySelectorAll('.side-bar-item-selected')
          .forEach(Item => {
            Item.classList.remove('side-bar-item-selected');
        });
        sidebarItem.classList.add('side-bar-item-selected');

        //Set up videoplayer
        loadPosts(id);
      });
    });

    //Initial selection and videoplayer set up
    firstSidebarItem = document.querySelector('.side-bar-item').click();
  })
  .catch(error => console.error('Nepodařilo se načíst epizody:', error));

  document.querySelector('.search input').addEventListener('input', function () {
    const filter = this.value.toLowerCase(); // Get the input value and convert to lowercase
    const items = document.querySelectorAll('.side-bar-item'); // Get all elements with class 'side-bar-item'

    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(filter)) {
            item.style.display = 'block'; // Show the item if it matches
        } else {
            item.style.display = 'none'; // Hide the item if it doesn't match
        }
    });
});
