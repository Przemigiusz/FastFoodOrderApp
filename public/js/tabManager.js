export function openTab(evt, tabName) {
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("menu-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    let menuTabs = document.getElementsByClassName("menu-tab");
    let mobileMenuTabs = document.getElementsByClassName("mobile-menu-tab");

    let tabs = [...menuTabs, ...mobileMenuTabs];

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    document.getElementById(tabName).style.display = "block";

    let clickedTabText = evt.currentTarget.innerText;
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].innerText === clickedTabText) {
            tabs[i].classList.add("active");
        }
    }
}

function addTabListener(tabs, mobileMenuTabsContainer) {
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
            if (mobileMenuTabsContainer) {
                mobileMenuTabsContainer.classList.remove('visible-flex');
                document.body.classList.toggle('no-scroll');
            }
        })
    });
}

export default function initializeTabs() {
    let menuTabs = Array.from(document.getElementsByClassName("menu-tab"));
    let mobileMenuTabs = Array.from(document.getElementsByClassName("mobile-menu-tab"));
    let mobileMenuTabsContainer = document.getElementsByClassName("mobile-menu-tabs")[0];

    addTabListener(menuTabs);
    addTabListener(mobileMenuTabs, mobileMenuTabsContainer);

    let menuTabsHamburger = document.querySelector(".menu-tabs .hamburger-btn");
    let menuTabsCloser = document.querySelector(".mobile-menu-tabs svg");

    menuTabsHamburger.addEventListener('click', function () {
        mobileMenuTabsContainer.classList.add('visible-flex');
        document.body.classList.toggle('no-scroll');
    });

    menuTabsCloser.addEventListener('click', function () {
        mobileMenuTabsContainer.classList.remove('visible-flex');
        document.body.classList.toggle('no-scroll');
    });
}