// Initialize the clear filters button
document.addEventListener('DOMContentLoaded', function() {
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Clear all select elements
            const selects = document.querySelectorAll('#petFilter select');
            selects.forEach(select => {
                select.value = '';
            });
            
            // Submit the form to clear the query parameters
            document.getElementById('petFilter').submit();
        });
    }
});