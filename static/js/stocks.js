const init = async () => {
    try {
        const { availableInitState, unavailableInitState } = await getInitState();
        let avState = availableInitState;
        let unavState = unavailableInitState;

        renderLists(avState, unavState);

        attachEventListeners(toggle);

        async function toggle(e) {
            let currentItem = null;
            let isAv = false;
            for (let i = 0; i < avState.length; i++) {
                if (avState[i].id == e.target.id) {
                    currentItem = avState[i];
                    isAv = true;
                    break;
                }
            }
            for (let i = 0; i < unavState.length; i++) {
                if (unavState[i].id == e.target.id) {
                    currentItem = unavState[i];
                    break;
                }
            }

            if (isAv) {
                e.target.textContent = 'Loading...'
                disableBtns();
                const res = await toggleLaptopById(e.target.id);
                await throttling(1000);
                dettachEventListeners(toggle);
                avState = avState.filter(x => x.id != e.target.id);
                unavState = [...unavState, { ...currentItem }];
                renderLists(avState, unavState);
                attachEventListeners(toggle);
            } else {
                e.target.textContent = 'Loading...'
                disableBtns();
                const res = await toggleLaptopById(e.target.id);
                await throttling(1000);
                dettachEventListeners(toggle);
                unavState = unavState.filter(x => x.id != e.target.id);
                avState = [...avState, { ...currentItem }];
                renderLists(avState, unavState);
                attachEventListeners(toggle);
            }
        }

    } catch (err) {
        window.location.replace("http://localhost:6161/error")
    }
}

init();

async function toggleLaptopById(id) {
    try {
        const res = await fetch('http://localhost:6161/api/toggle/'+id, { method: 'post' });
        const data = await res.json();
        return data;
    } catch (err) {
        return { ok: false };
    }
}

function disableBtns() {
    document.querySelectorAll('.toggle_btn').forEach(x => x.disabled = true);
}
// throttling
async function throttling(time) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res('done');
        }, time)
    })
}
// dettach event listeners
function dettachEventListeners(callback) {
    document.querySelectorAll('.toggle_btn').forEach(x => x.removeEventListener('click', callback));
}
// attach event listeners
function attachEventListeners(callback) {
    document.querySelectorAll('.toggle_btn').forEach(x => x.addEventListener('click', callback));
}
// render lists
function renderLists(available, unavailable) {
    renderAvailable(available);
    renderUnavailable(unavailable);
}
// render available
function renderAvailable(available) {
    const container = document.querySelector('#available_container');
    if (!available || available.length == []) {
        const p = document.createElement('p');
        p.textContent = 'No available laptops';
        container.replaceChildren(p);
        return;
    }
    const div = document.createElement('div');
    available.forEach(el => {
        div.appendChild(createLiElement(el));
    });
    container.replaceChildren(div);
}
// render unavailable
function renderUnavailable(unavailable) {
    const container = document.querySelector('#unavailable_container');
    if (!unavailable || unavailable.length == 0) {
        const p = document.createElement('p');
        p.textContent = 'No unavailable laptops';
        container.replaceChildren(p);
        return;
    }
    const div = document.createElement('div');
    unavailable.forEach(el => {
        div.appendChild(createLiElement(el));
    })
    container.replaceChildren(div);
}
// createLiElement
function createLiElement(laptop) {
    const el = document.createElement('div');
    const elClasses = ['d-flex', 'gap-2', 'mt-1'];
    elClasses.forEach(x => el.classList.add(x));
    const btn = document.createElement('button');
    btn.classList.add('toggle_btn')
    btn.textContent = 'toggle';
    btn.id = laptop.id;
    el.textContent = laptop.title;
    el.appendChild(btn);
    return el;
}
// get init state
async function getInitState() {
    const res = await fetch('http://localhost:6161/api/stocksdata');
    const data = await res.json();
    const availableInitState = data.available;
    const unavailableInitState = data.unavailable;
    return { availableInitState, unavailableInitState }
}