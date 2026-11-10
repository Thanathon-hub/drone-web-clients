const API_BASE_URL = 'http://localhost:4000'; 
const DRONE_ID = 3001;

let cachedConfig = null;

function switchPage(pageName) {
    document.querySelectorAll('.page-content').forEach(el => el.classList.add('hidden'));

    const tabs = ['config', 'form', 'logs'];
    tabs.forEach(name => {
        const btn = document.getElementById(`tab-${name}`);
        if (btn) {
            if (name === pageName) {
                btn.className = "text-white border-b border-white pb-1 transition font-medium";
            } else {
                btn.className = "text-zinc-400 hover:text-white pb-1 transition";
            }
        }
    });

    if (pageName === 'config') {
        document.getElementById('page-config').classList.remove('hidden');
        fetchConfig();
    } else if (pageName === 'form') {
        document.getElementById('page-form').classList.remove('hidden');
        if (!cachedConfig) fetchConfig();
    } else if (pageName === 'logs') {
        document.getElementById('page-logs').classList.remove('hidden');
        fetchLogs();
    }
}

// Page #1: Retrieve config data from API Server
async function fetchConfig() {
    try {
        const response = await fetch(`${API_BASE_URL}/configs/${DRONE_ID}`);
        if (!response.ok) throw new Error('Failed to fetch config');
        
        cachedConfig = await response.json();

        document.getElementById('cfg-id').textContent = cachedConfig.drone_id;
        document.getElementById('cfg-name').textContent = cachedConfig.drone_name;
        document.getElementById('cfg-light').textContent = cachedConfig.light;
        document.getElementById('cfg-country').textContent = cachedConfig.country;

        document.getElementById('config-loading').classList.add('hidden');
        document.getElementById('config-data').classList.remove('hidden');
    } catch (error) {
        document.getElementById('config-loading').textContent = 'Error loading config: ' + error.message;
    }
}

// Page #2: Submit log form
document.getElementById('log-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!cachedConfig) {
        alert('Config data is not loaded yet. Please wait or check connection.');
        return;
    }

    const celsiusVal = parseFloat(document.getElementById('celsius-input').value);
    const msgDiv = document.getElementById('form-message');

    const payload = {
        drone_id: cachedConfig.drone_id,
        drone_name: cachedConfig.drone_name,
        country: cachedConfig.country,
        celsius: celsiusVal
    };

    try {
        const response = await fetch(`${API_BASE_URL}/logs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Failed to submit log');

        msgDiv.textContent = 'Log submitted successfully!';
        msgDiv.className = 'mt-4 text-center font-medium text-emerald-400';
        document.getElementById('log-form').reset();
    } catch (error) {
        msgDiv.textContent = 'Error: ' + error.message;
        msgDiv.className = 'mt-4 text-center font-medium text-rose-400';
    }
});

// Page #3: Retrieve log data
async function fetchLogs() {
    const tbody = document.getElementById('logs-table-body');
    tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-zinc-500 italic">Loading logs...</td></tr>`;
    
    try {
        const response = await fetch(`${API_BASE_URL}/logs/${DRONE_ID}`);
        if (!response.ok) throw new Error('Failed to fetch logs');

        const logs = await response.json();
        
        if (logs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-zinc-500 italic">No logs found.</td></tr>`;
            return;
        }

        tbody.innerHTML = logs.map(log => `
            <tr class="hover:bg-white/5 transition">
                <td class="py-3 px-3 border-b border-white/5 font-mono text-xs">${log.created}</td>
                <td class="py-3 px-3 border-b border-white/5">${log.country}</td>
                <td class="py-3 px-3 border-b border-white/5 font-mono">${log.drone_id}</td>
                <td class="py-3 px-3 border-b border-white/5">${log.drone_name}</td>
                <td class="py-3 px-3 border-b border-white/5 font-semibold text-amber-200 font-mono">${log.celsius} °C</td>
            </tr>
        `).join('');

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-rose-400 italic">Error loading logs: ${error.message}</td></tr>`;
    }
}

fetchConfig();