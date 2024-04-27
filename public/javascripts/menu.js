// menu.js
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab links
    const tabLinks = document.querySelectorAll('.nav-link');

    // Get all menu items
    const menuItems = document.querySelectorAll('.single_menu');

    // Function to hide all menu items
    function hideMenuItems() {
        menuItems.forEach(function(item) {
            item.style.display = 'none';
        });
    }

    // Add event listeners for all tab links
    tabLinks.forEach(function(tab) {
        tab.addEventListener('click', function() {
            hideMenuItems();
            const targetId = this.getAttribute('href').substring(1);
            const targetMenuItems = document.querySelectorAll('#' + targetId + ' .single_menu');
            targetMenuItems.forEach(function(item) {
                item.style.display = 'block';
            });
        });
    });
});
