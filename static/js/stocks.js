init();

function init() {
        attachEventListeners(toggle);
        
        async function toggle(e) {
            const currentParentEl = e.target.parentElement.parentElement;
            const currentLaptop = e.target.parentElement;
            
            e.target.textContent = 'Loading...'
            disableBtns();
            await toggleLaptopById(e.target.id);
            await throttling(1000);

            currentParentEl.removeChild(currentLaptop);

            if(currentParentEl.id == 'available_container') {
                document.getElementById('unavailable_container').appendChild(currentLaptop);
            } else {
                document.getElementById('available_container').appendChild(currentLaptop);
            }
            
            e.target.textContent = 'toggle'
            enableBtns();
        }
}

async function toggleLaptopById(id) {
    try {
        const res = await fetch('http://localhost:6161/api/toggle/'+id, { method: 'post' });
        const data = await res.json();
        return data;
    } catch (err) {
        return { ok: false };
    }
}

function enableBtns() {
    document.querySelectorAll('.toggle_btn').forEach(x => x.disabled = false);
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
// attach event listeners
function attachEventListeners(callback) {
    document.querySelectorAll('.toggle_btn').forEach(x => x.addEventListener('click', callback));
}

