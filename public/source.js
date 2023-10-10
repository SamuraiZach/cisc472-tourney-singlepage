var pages = ['page1', 'page2', 'page3'];
var currentPageIndex = -1;
var showNextPage = function() {
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
}

//document.addEventListener('click', showNextPage);
$("#btn").on("click", () => { showNextPage(); });