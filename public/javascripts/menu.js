document.addEventListener('DOMContentLoaded', function() {
    // Get the tab links
    const breakfastTab = document.querySelector('#breakfast-tab');
    const lunchTab = document.querySelector('#lunch-tab');
    const dinnerTab = document.querySelector('#dinner-tab');

    // Get all menu items
    const menuItems = document.querySelectorAll('.single_menu');

    // Function to hide all menu items
    function hideMenuItems() {
        menuItems.forEach(function(item) {
            item.style.display = 'none';
        });
    }

    // Add event listener for the breakfast tab
    breakfastTab.addEventListener('click', function() {
        hideMenuItems();
        const breakfastMenuItems = document.querySelectorAll('#breakfast .single_menu');
        breakfastMenuItems.forEach(function(item) {
            item.style.display = 'block';
        });
    });

    // Add event listener for the lunch tab
    lunchTab.addEventListener('click', function() {
        hideMenuItems();
        const lunchMenuItems = document.querySelectorAll('#lunch .single_menu');
        lunchMenuItems.forEach(function(item) {
            item.style.display = 'block';
        });
    });

    // Add event listener for the dinner tab
    dinnerTab.addEventListener('click', function() {
        hideMenuItems();
        const dinnerMenuItems = document.querySelectorAll('#dinner .single_menu');
        dinnerMenuItems.forEach(function(item) {
            item.style.display = 'block';
        });
    });
});
