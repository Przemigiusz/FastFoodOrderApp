export function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("menu-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("menu-tab");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

export function initializeTabs() {
    let tabs = Array.from(document.getElementsByClassName("menu-tab"));
    tabs.forEach(tab => {
        tab.addEventListener("click", function (event) {
            if (tab.innerText === 'Burgers') {
                openTab(event, 'burgers');
            } else if (tab.innerText === 'Pizzas') {
                openTab(event, 'pizzas');
            } else if (tab.innerText === 'Hotdogs') {
                openTab(event, 'hotdogs');
            } else if (tab.innerText === 'Wraps') {
                openTab(event, 'wraps');
            } else if (tab.innerText === 'French Fries') {
                openTab(event, 'french-fries');
            }
        })
    })
};