/* ============================================================
   AMJAD_OS — fixed auto-player engine
   UI runs standalone; three.js loads dynamically and degrades
   gracefully (body.no3d) if WebGL/CDN is unavailable.
   ============================================================ */
const DATA = window.PORTFOLIO_DATA;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
if (isTouch) document.body.classList.add('touch');
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const catOf = id => DATA.categories.find(c => c.id === id);
const itemsOf = cat => DATA.items.filter(i => i.cat === cat);

/* Round-robin queue: Experience -> Project -> Service -> Experience ... */
function buildQueue() {
    const cols = DATA.categories.map(c => itemsOf(c.id));
    const q = [];
    for (let i = 0; cols.some(col => i < col.length); i++)
        for (const col of cols) if (i < col.length) q.push(col[i]);
    return q;
}
const QUEUE = buildQueue();
const ADV_MS = 6500;

/* ============================================================
   PLAYER STATE
   ============================================================ */
const player = { index: 0, playing: !reduced, acc: 0 };

const slide = $('#slide');
const counterRingC = 2 * Math.PI * 19;

function applyColor(color) {
    document.documentElement.style.setProperty('--c', color);
}

function paintSlide(item) {
    const cat = catOf(item.cat);
    $('#catLabel').innerHTML = `<i class="cat-glyph">${cat.glyph}</i> ${cat.label}`;
    $('#itemPeriod').textContent = item.period;
    $('#itemTitle').textContent = item.title;
    $('#itemOrg').textContent = item.org;
    $('#itemShort').textContent = item.short || item.blurb;
    $('#itemTags').innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
    const link = $('#slideLink');
    if (item.link) {
        link.hidden = false;
        link.href = item.link.href;
        link.innerHTML = `<i class="fas fa-arrow-up-right-from-square"></i> ${item.link.label}`;
    } else link.hidden = true;
    $('#protoTag').textContent = `PROTOTYPE // ${item.shape.toUpperCase()}_SKELETON`;
    $('#protoGlyph').textContent = cat.glyph;
}

function updateCounter() {
    const item = QUEUE[player.index];
    const cat = catOf(item.cat);
    $('#counterIdx').textContent = String(player.index + 1).padStart(2, '0');
    $('#counterTot').textContent = '/' + String(QUEUE.length).padStart(2, '0');
    $('#counterCat').textContent = cat.label;
    $('#ringFg').style.strokeDasharray = counterRingC;
    // dock sequence
    $$('.seq-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === item.cat));
    // timeline
    $$('.tl-seg').forEach((s, i) => {
        s.classList.toggle('current', i === player.index);
        s.classList.toggle('done', i < player.index);
    });
}

let animating = false;
function showItem(i, { animate = true } = {}) {
    player.index = (i + QUEUE.length) % QUEUE.length;
    player.acc = 0;
    const item = QUEUE[player.index];
    const cat = catOf(item.cat);
    applyColor(cat.color);
    updateCounter();
    three?.morph(item.shape, cat.color);

    if (!animate || reduced) {
        paintSlide(item);
        return;
    }
    animating = true;
    slide.classList.add('leaving');
    setTimeout(() => {
        paintSlide(item);
        slide.classList.remove('leaving');
        slide.classList.add('entering');
        requestAnimationFrame(() => requestAnimationFrame(() => {
            slide.classList.remove('entering');
            animating = false;
        }));
    }, 190);
}

function next() { showItem(player.index + 1); }
function prev() { showItem(player.index - 1); }

function setPlaying(on) {
    player.playing = on;
    const btn = $('#playBtn');
    btn.innerHTML = on ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    btn.setAttribute('aria-label', on ? 'Pause' : 'Play');
}

/* jump to the first item of a category */
function jumpToCategory(catId) {
    const i = QUEUE.findIndex(it => it.cat === catId);
    if (i >= 0) showItem(i);
}

$('#nextBtn').addEventListener('click', () => { next(); });
$('#prevBtn').addEventListener('click', () => { prev(); });
$('#playBtn').addEventListener('click', () => setPlaying(!player.playing));
$$('.seq-tab').forEach(t => t.addEventListener('click', () => jumpToCategory(t.dataset.cat)));

/* timeline segments */
const tl = $('#dockTimeline');
tl.innerHTML = QUEUE.map((_, i) => `<button class="tl-seg" data-i="${i}" aria-label="Go to ${i + 1}"></button>`).join('');
tl.addEventListener('click', e => {
    const seg = e.target.closest('.tl-seg');
    if (seg) showItem(+seg.dataset.i);
});

/* ============================================================
   EXPLORE detail panel (slide-over + ticker + auto-scroll)
   ============================================================ */
const panel = $('#panel'), scrim = $('#scrim'), panelBody = $('#panelBody');
let panelOpenId = null, lastFocus = null;
const auto = { on: false, holdUntil: 0, pos: 0 };

function modalOpen() { return !!panelOpenId || $('#aboutSheet').classList.contains('open'); }

function setAutoBtn() {
    const btn = $('#autoBtn');
    btn.classList.toggle('off', !auto.on);
    btn.innerHTML = auto.on ? '<i class="fas fa-pause"></i> AUTO' : '<i class="fas fa-play"></i> AUTO';
}

function openPanel(id) {
    const item = DATA.items.find(i => i.id === id);
    if (!item) return;
    const cat = catOf(item.cat);
    panelOpenId = id;
    lastFocus = document.activeElement;

    panel.style.setProperty('--c', cat.color);
    $('#panelCat').textContent = cat.label;
    $('#panelCat').style.cssText = `--c:${cat.color}`;
    $('#panelPeriod').textContent = item.period;
    $('#panelTitle').textContent = item.title;
    $('#panelOrg').textContent = item.org;
    $('#panelGlyph').textContent = cat.glyph;
    $('#panelShapeTag').textContent = `PROTOTYPE // ${item.shape.toUpperCase()}_SKELETON · AUTO-FEED`;
    $('#panelTags').innerHTML = item.tags.map(t => `<span>${t}</span>`).join('');
    $('#panelBriefing').innerHTML = item.briefing.map(p => `<p>${p}</p>`).join('');
    $('#panelLog').innerHTML = item.log.map(l => `<li>${l}</li>`).join('');
    $('#panelStack').innerHTML = item.stack.map(s => `<span>${s}</span>`).join('');

    const head = `${cat.glyph} ${item.headline}   ✦   `;
    $('#tickerTrack').innerHTML = `<span>${head.repeat(3)}</span><span>${head.repeat(3)}</span>`;

    const mediaWrap = $('#panelMediaWrap'), media = $('#panelMedia');
    if (item.media) {
        mediaWrap.hidden = false;
        media.innerHTML = item.media.type === 'video'
            ? `<figure><video src="${item.media.src}" controls muted playsinline preload="metadata"></video><figcaption>${item.media.caption}</figcaption></figure>`
            : `<figure><img src="${item.media.src}" alt="${item.media.caption}" loading="lazy"><figcaption>${item.media.caption}</figcaption></figure>`;
    } else { mediaWrap.hidden = true; media.innerHTML = ''; }

    const link = $('#panelLink');
    if (item.link) {
        link.hidden = false;
        link.href = item.link.href;
        link.innerHTML = `<i class="fas fa-arrow-up-right-from-square"></i> ${item.link.label}`;
    } else link.hidden = true;

    panelBody.scrollTop = 0;
    auto.on = !reduced; auto.pos = 0; auto.holdUntil = performance.now() + 1600;
    setAutoBtn();

    scrim.classList.add('open');
    panel.classList.add('open');
    three?.panelShow(item.shape, cat.color);
    setTimeout(() => $('#panelClose').focus(), 80);
}

function closePanel() {
    if (!panelOpenId) return;
    panelOpenId = null;
    scrim.classList.remove('open');
    panel.classList.remove('open');
    $('#panelMedia').querySelector('video')?.pause();
    lastFocus?.focus?.();
}

function stepPanel(dir) {
    const item = DATA.items.find(i => i.id === panelOpenId);
    if (!item) return;
    const list = itemsOf(item.cat);
    const nextItem = list[(list.indexOf(item) + dir + list.length) % list.length];
    openPanel(nextItem.id);
}

$('#exploreBtn').addEventListener('click', () => openPanel(QUEUE[player.index].id));
$('#panelClose').addEventListener('click', closePanel);
scrim.addEventListener('click', closePanel);
$('#prevItem').addEventListener('click', () => stepPanel(-1));
$('#nextItem').addEventListener('click', () => stepPanel(1));
$('#autoBtn').addEventListener('click', () => { auto.on = !auto.on; auto.holdUntil = 0; setAutoBtn(); });
['wheel', 'touchstart', 'pointerdown'].forEach(ev =>
    panelBody.addEventListener(ev, () => { auto.holdUntil = performance.now() + 2600; }, { passive: true }));

/* ============================================================
   ABOUT / CONTACT sheet
   ============================================================ */
const aboutSheet = $('#aboutSheet'), aboutScrim = $('#aboutScrim');
function openAbout() {
    aboutScrim.classList.add('open');
    aboutSheet.classList.add('open');
    setTimeout(() => $('#aboutClose').focus(), 60);
}
function closeAbout() {
    aboutScrim.classList.remove('open');
    aboutSheet.classList.remove('open');
}
$('#aboutBtn').addEventListener('click', openAbout);
$('#aboutClose').addEventListener('click', closeAbout);
aboutScrim.addEventListener('click', closeAbout);

/* mobile "more" menu */
const moreBtn = $('#moreBtn'), topActions = $('.topbar-actions');
moreBtn.addEventListener('click', () => topActions.classList.toggle('open'));
topActions.addEventListener('click', e => { if (e.target.closest('a, #aboutBtn')) topActions.classList.remove('open'); });

/* ============================================================
   KEYBOARD
   ============================================================ */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePanel(); closeAbout(); topActions.classList.remove('open'); return; }
    if (modalOpen()) {
        if (panelOpenId && e.key === 'ArrowLeft') stepPanel(-1);
        if (panelOpenId && e.key === 'ArrowRight') stepPanel(1);
        return;
    }
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === ' ') { e.preventDefault(); setPlaying(!player.playing); }
});

/* ============================================================
   POINTER FX — spotlight, particle trail, click/touch ripples
   ============================================================ */
const mouse = { x: 0, y: 0, px: 0.5, py: 0.5 };
const fxCanvas = $('#fxcursor');
const fxCtx = fxCanvas.getContext('2d');
let fxW = 0, fxH = 0, fxDPR = Math.min(devicePixelRatio || 1, 2);
const particles = [], ripples = [];

function sizeFx() {
    fxW = innerWidth; fxH = innerHeight;
    fxCanvas.width = fxW * fxDPR; fxCanvas.height = fxH * fxDPR;
    fxCtx.setTransform(fxDPR, 0, 0, fxDPR, 0, 0);
}
sizeFx();

const spotlight = $('#spotlight');
let lastSpawn = 0;
function onMove(x, y) {
    mouse.px = x / innerWidth; mouse.py = y / innerHeight;
    mouse.x = mouse.px * 2 - 1; mouse.y = mouse.py * 2 - 1;
    if (!isTouch && !reduced) spotlight.style.transform = `translate(${x}px, ${y}px)`;
    const now = performance.now();
    if (!reduced && now - lastSpawn > 16 && particles.length < 140) {
        lastSpawn = now;
        particles.push({ x, y, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 - 0.2,
            life: 1, r: Math.random() * 2 + 0.6, hue: Math.random() < 0.5 ? '0,229,255' : '255,43,214' });
    }
}
window.addEventListener('pointermove', e => onMove(e.clientX, e.clientY), { passive: true });

function ripple(x, y) {
    if (reduced) return;
    ripples.push({ x, y, r: 4, life: 1, hue: getComputedStyle(document.documentElement).getPropertyValue('--c').trim() || '#00e5ff' });
    for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2, sp = Math.random() * 2.4 + 0.6;
        particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1,
            r: Math.random() * 2.2 + 0.8, hue: Math.random() < 0.5 ? '0,229,255' : '255,43,214' });
    }
}
window.addEventListener('pointerdown', e => ripple(e.clientX, e.clientY), { passive: true });

function drawFx(dt) {
    fxCtx.clearRect(0, 0, fxW, fxH);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt * 1.6; if (p.life <= 0) { particles.splice(i, 1); continue; }
        p.x += p.vx; p.y += p.vy; p.vy += 0.012;
        fxCtx.beginPath();
        fxCtx.fillStyle = `rgba(${p.hue},${p.life * 0.7})`;
        fxCtx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
        fxCtx.fill();
    }
    for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.life -= dt * 1.5; if (r.life <= 0) { ripples.splice(i, 1); continue; }
        r.r += dt * 220;
        fxCtx.beginPath();
        fxCtx.strokeStyle = r.hue.startsWith('#')
            ? hexA(r.hue, r.life * 0.6) : `rgba(${r.hue},${r.life * 0.6})`;
        fxCtx.lineWidth = 2 * r.life;
        fxCtx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        fxCtx.stroke();
    }
}
function hexA(hex, a) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const n = parseInt(hex, 16);
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* proto stage hover accelerates the 3D */
const protoStage = $('#protoStage');
protoStage.addEventListener('pointerenter', () => { if (three) three.hover = true; });
protoStage.addEventListener('pointerleave', () => { if (three) three.hover = false; });

/* ============================================================
   BOOT LOADER
   ============================================================ */
(function boot() {
    const loader = $('#loader');
    const finish = () => { loader.classList.add('done'); setTimeout(() => loader.remove(), 500); };
    if (reduced) return finish();
    const lines = [
        '> init kernel ................ <span class="ok">OK</span>',
        '> load profile AMJAD_AS ...... <span class="ok">OK</span>',
        '> build play queue ........... <span class="ok">OK</span>',
        '> compile 3d skeletons ....... <span class="ok">OK</span>',
        '> start auto-player ▮▮▮▮▮▮▮▮'
    ];
    const box = $('#bootLines'), bar = $('#bootBar');
    lines.forEach((l, i) => setTimeout(() => {
        box.innerHTML += l + '<br>';
        bar.style.width = `${((i + 1) / lines.length) * 100}%`;
    }, 90 + i * 150));
    setTimeout(finish, 90 + lines.length * 150 + 320);
    loader.addEventListener('click', finish);
})();

console.log('%cAMJAD_OS v4 — auto-player online',
    'color:#00e5ff;font-family:monospace;font-size:16px;text-shadow:0 0 8px #00e5ff');

/* ============================================================
   THREE.JS — background + single morphing prototype
   ============================================================ */
let three = null;
(async () => {
    let THREE = null;
    for (const src of [
        './vendor/three.module.min.js',
        'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
        'https://unpkg.com/three@0.160.0/build/three.module.js'
    ]) { try { THREE = await import(src); break; } catch { /* next */ } }
    if (!THREE) { document.body.classList.add('no3d'); return; }
    try { three = initThree(THREE); }
    catch (err) { console.warn('3D disabled:', err); document.body.classList.add('no3d'); }
    // first paint
    showItem(0, { animate: false });
})();

/* If three failed to load, still render the UI */
setTimeout(() => { if (!three && !QUEUE._started) { QUEUE._started = true; showItem(0, { animate: false }); } }, 1200);

function initThree(THREE) {
    const DPR = Math.min(devicePixelRatio || 1, innerWidth < 760 ? 1.7 : 2);
    const lineMat = (color, opacity = 0.9) => new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const edges = (geo, color, opacity) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat(color, opacity));
    const wires = (geo, color, opacity) => new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat(color, opacity));
    const dots = (geo, color, size = 0.05, opacity = 0.9) => new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity }));
    const linePts = (pts, color, opacity = 0.6) => new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), lineMat(color, opacity));
    const MAG = '#ff2bd6', WHITE = '#cfeeff', AMBER = '#ffb300';

    const BUILDERS = {
        core(c){ const g=new THREE.Group(); g.add(wires(new THREE.IcosahedronGeometry(1.02,1),c,0.75)); g.add(edges(new THREE.IcosahedronGeometry(0.44,0),MAG,0.95));
            const r1=wires(new THREE.TorusGeometry(1.5,0.012,4,72),c,0.45); r1.rotation.x=1.25; g.add(r1);
            const r2=wires(new THREE.TorusGeometry(1.74,0.012,4,80),MAG,0.3); r2.rotation.x=1.0; r2.rotation.y=0.6; g.add(r2);
            g.add(dots(new THREE.IcosahedronGeometry(1.02,1),WHITE,0.05));
            for(let i=0;i<3;i++){const sat=edges(new THREE.OctahedronGeometry(0.09,0),c,0.95);const a=i*Math.PI*2/3;sat.position.set(Math.cos(a)*1.5,Math.sin(a)*0.32,Math.sin(a)*1.5);g.add(sat);} return g; },
        signal(c){ const g=new THREE.Group(); const mast=edges(new THREE.ConeGeometry(0.46,1.15,6),c,0.95); mast.position.y=-0.72; g.add(mast);
            const tip=edges(new THREE.OctahedronGeometry(0.1,0),MAG,1); tip.position.y=-0.05; g.add(tip);
            [[0.45,0.28,0.95],[0.82,0.62,0.6],[1.2,0.98,0.35]].forEach(([r,y,o])=>{const ring=wires(new THREE.TorusGeometry(r,0.013,4,56),c,o);ring.rotation.x=Math.PI/2;ring.position.y=y;g.add(ring);});
            g.add(dots(new THREE.IcosahedronGeometry(1.45,1),WHITE,0.035,0.5)); return g; },
        network(c){ const g=new THREE.Group(); const ico=new THREE.IcosahedronGeometry(1.12,1); g.add(wires(ico,c,0.7)); g.add(dots(ico,WHITE,0.06)); g.add(edges(new THREE.IcosahedronGeometry(0.45,0),MAG,0.95));
            const pos=ico.getAttribute('position'); const sp=[]; for(let i=0;i<pos.count;i+=7){sp.push(new THREE.Vector3(0,0,0),new THREE.Vector3(pos.getX(i),pos.getY(i),pos.getZ(i)));} g.add(linePts(sp,c,0.35)); return g; },
        pipeline(c){ const g=new THREE.Group(); for(let i=0;i<4;i++){const b=edges(new THREE.BoxGeometry(0.52,0.52,0.52),c,0.95);b.position.x=-1.45+i*0.95;b.rotation.y=i*0.3;g.add(b);
            if(i<3){const link=edges(new THREE.CylinderGeometry(0.05,0.05,0.42,6),MAG,0.8);link.rotation.z=Math.PI/2;link.position.x=-0.97+i*0.95;g.add(link);}}
            const arrow=edges(new THREE.ConeGeometry(0.17,0.36,6),MAG,1);arrow.rotation.z=-Math.PI/2;arrow.position.x=1.95;g.add(arrow); return g; },
        shield(c){ const g=new THREE.Group(); g.add(edges(new THREE.OctahedronGeometry(1.12,0),c,0.95));
            const r1=wires(new THREE.TorusGeometry(0.8,0.012,4,48),MAG,0.7);r1.rotation.x=Math.PI/2;g.add(r1);
            g.add(wires(new THREE.TorusGeometry(0.8,0.012,4,48),c,0.45)); g.add(edges(new THREE.OctahedronGeometry(0.3,0),WHITE,0.9)); return g; },
        truck(c){ const g=new THREE.Group(); const body=edges(new THREE.BoxGeometry(1.45,0.55,0.62),c,0.95);body.position.set(-0.18,0.1,0);g.add(body);
            const cab=edges(new THREE.BoxGeometry(0.5,0.44,0.6),c,0.95);cab.position.set(0.92,0.04,0);g.add(cab);
            [[-0.65],[0.35],[0.95]].forEach(([x])=>{[-0.34,0.34].forEach(z=>{const w=edges(new THREE.CylinderGeometry(0.17,0.17,0.1,10),MAG,0.85);w.rotation.x=Math.PI/2;w.position.set(x,-0.28,z);g.add(w);});});
            const grid=new THREE.GridHelper(2.6,6,0x1a4a5a,0x123642);grid.material.transparent=true;grid.material.opacity=0.35;grid.position.y=-0.5;g.add(grid); return g; },
        globe(c){ const g=new THREE.Group(); g.add(wires(new THREE.SphereGeometry(1.05,14,10),c,0.3));
            const eq=wires(new THREE.TorusGeometry(1.05,0.012,4,64),c,0.85);eq.rotation.x=Math.PI/2;g.add(eq); g.add(wires(new THREE.TorusGeometry(1.05,0.012,4,64),MAG,0.5));
            const n=110,arr=new Float32Array(n*3);for(let i=0;i<n;i++){const v=new THREE.Vector3().randomDirection().multiplyScalar(1.06);arr.set([v.x,v.y,v.z],i*3);} const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(arr,3));g.add(dots(pg,WHITE,0.045,0.95)); return g; },
        grid(c){ const g=new THREE.Group(); [-0.7,0,0.7].forEach((y,i)=>{const p=wires(new THREE.PlaneGeometry(2.0,1.3,4,3),c,0.8-i*0.18);p.rotation.x=-Math.PI/2;p.position.y=y;g.add(p);});
            const pts=[]; [[-1,-0.65],[1,-0.65],[-1,0.65],[1,0.65]].forEach(([x,z])=>{pts.push(new THREE.Vector3(x,-0.7,z),new THREE.Vector3(x,0.7,z));}); g.add(linePts(pts,MAG,0.6));
            g.add(dots(new THREE.PlaneGeometry(2.0,1.3,4,3).rotateX(-Math.PI/2).translate(0,0.7,0),WHITE,0.05)); return g; },
        lattice(c){ const g=new THREE.Group(); const pts=[],joins=[];const co=[-0.7,0,0.7];
            co.forEach(x=>co.forEach(y=>co.forEach(z=>pts.push(new THREE.Vector3(x,y,z)))));
            co.forEach(a=>co.forEach(b=>{joins.push(new THREE.Vector3(-0.7,a,b),new THREE.Vector3(0.7,a,b));joins.push(new THREE.Vector3(a,-0.7,b),new THREE.Vector3(a,0.7,b));joins.push(new THREE.Vector3(a,b,-0.7),new THREE.Vector3(a,b,0.7));}));
            g.add(dots(new THREE.BufferGeometry().setFromPoints(pts),c,0.08)); g.add(linePts(joins,c,0.28)); g.add(edges(new THREE.BoxGeometry(1.9,1.9,1.9),MAG,0.5)); return g; },
        bars(c){ const g=new THREE.Group(); const grid=new THREE.GridHelper(2.4,8,0x1a4a5a,0x123642);grid.material.transparent=true;grid.material.opacity=0.35;grid.position.y=-0.85;g.add(grid);
            const hs=[0.5,0.9,0.7,1.25,1.6],tops=[]; hs.forEach((h,i)=>{const bar=edges(new THREE.BoxGeometry(0.34,h,0.34),c,0.95);const x=-1+i*0.5;bar.position.set(x,h/2-0.85,0);g.add(bar);tops.push(new THREE.Vector3(x,h-0.8,0));});
            for(let i=0;i<tops.length-1;i++)g.add(linePts([tops[i],tops[i+1]],MAG,0.85));
            const tip=edges(new THREE.OctahedronGeometry(0.09,0),MAG,1);tip.position.copy(tops[4]);g.add(tip); return g; },
        terrain(c){ const g=new THREE.Group(); const geo=new THREE.PlaneGeometry(2.7,2.7,16,16);const p=geo.getAttribute('position');
            for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i);p.setZ(i,Math.sin(x*2.1)*Math.cos(y*1.7)*0.3+Math.sin(y*2.6)*0.12);} geo.computeVertexNormals();
            const land=wires(geo,c,0.55);land.rotation.x=-Math.PI/2.25;land.position.y=-0.45;g.add(land);
            const sun=edges(new THREE.IcosahedronGeometry(0.18,0),AMBER,1);sun.position.set(0.85,0.85,-0.3);g.add(sun);
            const ring=wires(new THREE.TorusGeometry(0.3,0.01,4,32),AMBER,0.6);ring.position.copy(sun.position);g.add(ring); return g; },
        road(c){ const g=new THREE.Group(); const geo=new THREE.PlaneGeometry(0.95,3.3,3,24);const p=geo.getAttribute('position');
            for(let i=0;i<p.count;i++)p.setX(i,p.getX(i)+Math.sin(p.getY(i)*1.6)*0.35); const road=wires(geo,c,0.7);road.rotation.x=-Math.PI/2.18;road.position.y=-0.35;g.add(road);
            const car=edges(new THREE.BoxGeometry(0.24,0.15,0.4),MAG,1);car.position.set(Math.sin(0.8)*0.28,-0.18,0.35);g.add(car);
            const halo=wires(new THREE.TorusGeometry(0.32,0.01,4,28),MAG,0.6);halo.rotation.x=Math.PI/2;halo.position.copy(car.position);g.add(halo);
            g.add(dots(new THREE.IcosahedronGeometry(1.5,1),WHITE,0.03,0.4)); return g; },
        app(c){ const g=new THREE.Group(); g.add(edges(new THREE.BoxGeometry(0.95,1.85,0.1),c,0.95));
            const screen=wires(new THREE.PlaneGeometry(0.72,1.4,3,6),c,0.45);screen.position.z=0.06;g.add(screen);
            const btn=wires(new THREE.TorusGeometry(0.07,0.013,4,18),MAG,0.9);btn.position.set(0,-0.78,0.06);g.add(btn);
            const notif=edges(new THREE.OctahedronGeometry(0.07,0),MAG,1);notif.position.set(0.42,0.86,0.08);g.add(notif);
            const orbit=wires(new THREE.TorusGeometry(1.3,0.01,4,56),c,0.3);orbit.rotation.x=1.25;g.add(orbit); return g; },
        db(c){ const g=new THREE.Group(); [-0.62,0,0.62].forEach(y=>{const disk=edges(new THREE.CylinderGeometry(0.82,0.82,0.34,18),c,0.8);disk.position.y=y;g.add(disk);});
            const orbit=wires(new THREE.TorusGeometry(1.25,0.012,4,56),MAG,0.5);orbit.rotation.x=1.1;g.add(orbit); g.add(dots(new THREE.IcosahedronGeometry(1.4,1),WHITE,0.035,0.45)); return g; },
        code(c){ const g=new THREE.Group(); const mk=(x,flip)=>{const a=edges(new THREE.BoxGeometry(0.1,0.66,0.1),c,0.95);a.rotation.z=flip*0.75;a.position.set(x,0.23,0);const b=edges(new THREE.BoxGeometry(0.1,0.66,0.1),c,0.95);b.rotation.z=-flip*0.75;b.position.set(x,-0.23,0);g.add(a,b);};
            mk(-0.78,1);mk(0.78,-1); const slash=edges(new THREE.BoxGeometry(0.1,1.15,0.1),MAG,0.95);slash.rotation.z=-0.42;g.add(slash);
            const orbit=wires(new THREE.TorusGeometry(1.35,0.01,4,56),c,0.3);orbit.rotation.x=1.35;g.add(orbit); return g; },
        pyramid(c){ const g=new THREE.Group(); const base=edges(new THREE.ConeGeometry(1.05,1.25,4),c,0.95);base.position.y=-0.3;base.rotation.y=Math.PI/4;g.add(base);
            const tip=edges(new THREE.ConeGeometry(0.34,0.42,4),MAG,1);tip.position.y=0.78;tip.rotation.y=Math.PI/4;g.add(tip);
            const frame=wires(new THREE.PlaneGeometry(2.1,2.1,1,1),c,0.4);frame.rotation.x=-Math.PI/2;frame.position.y=-0.95;g.add(frame);
            g.add(dots(new THREE.IcosahedronGeometry(1.4,1),WHITE,0.03,0.4)); return g; },
        beacon(c){ const g=new THREE.Group(); const horn=edges(new THREE.ConeGeometry(0.55,1.15,8),c,0.95);horn.rotation.z=-0.95;horn.position.set(-0.35,-0.15,0);g.add(horn);
            [[0.65,0.9],[0.95,0.55],[1.25,0.3]].forEach(([r,o])=>{const arc=wires(new THREE.TorusGeometry(r,0.013,4,40,Math.PI*0.7),MAG,o);arc.position.set(0.18,0.32,0);arc.rotation.z=-0.6;g.add(arc);});
            const spark=edges(new THREE.OctahedronGeometry(0.09,0),AMBER,1);spark.position.set(1.05,1.0,0);g.add(spark); return g; },
        stack(c){ const g=new THREE.Group(); [-0.55,0,0.55].forEach((y,i)=>{const card=edges(new THREE.BoxGeometry(1.5-i*0.1,0.32,1.0-i*0.08),c,0.9-i*0.12);card.position.y=y;card.rotation.y=i*0.18;g.add(card);});
            const tip=edges(new THREE.OctahedronGeometry(0.12,0),MAG,1);tip.position.y=0.95;g.add(tip);
            g.add(wires(new THREE.TorusGeometry(1.3,0.01,4,48),c,0.3)); return g; }
    };

    const easeOutBack = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
    const disposeGroup = g => g?.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); });

    /* ---------- background ---------- */
    const bgRenderer = new THREE.WebGLRenderer({ canvas: $('#bg3d'), alpha: true, antialias: true, powerPreference: 'high-performance' });
    bgRenderer.setPixelRatio(DPR); bgRenderer.setSize(innerWidth, innerHeight);
    const bgScene = new THREE.Scene(); bgScene.fog = new THREE.Fog(0x04060d, 16, 90);
    const bgCam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 200); bgCam.position.set(0, 2.2, 15);
    const starGeo = new THREE.BufferGeometry(); const starArr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(28 + Math.random() * 55); starArr.set([v.x, Math.abs(v.y) * 0.7 - 4, v.z], i * 3); }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starArr, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x6fd4e8, size: 0.16, transparent: true, opacity: 0.7 })); bgScene.add(stars);
    const floor = new THREE.GridHelper(300, 64, 0x0e5160, 0x07242e); floor.position.y = -6; bgScene.add(floor);
    const floorCell = 300 / 64;
    const drifters = [];
    [[-15, 4, -26, '#00e5ff'], [17, 7, -32, '#ff2bd6'], [2, 12, -48, '#00e5ff']].forEach(([x, y, z, col]) => { const d = wires(new THREE.IcosahedronGeometry(4.4, 0), col, 0.07); d.position.set(x, y, z); bgScene.add(d); drifters.push(d); });

    /* ---------- prototype renderer (scissor to #protoStage) ---------- */
    const fxRenderer = new THREE.WebGLRenderer({ canvas: $('#fx3d'), alpha: true, antialias: true, powerPreference: 'high-performance' });
    fxRenderer.setPixelRatio(DPR); fxRenderer.setSize(innerWidth, innerHeight);
    const fxCam = new THREE.PerspectiveCamera(40, 1, 0.1, 50); fxCam.position.set(0, 0.3, 5.6); fxCam.lookAt(0, 0, 0);
    const stageScene = new THREE.Scene();

    const stage = { group: null, outGroup: null, hover: false, spd: 1, scl: 1, phase: Math.random() * 6 };

    function scatterIn(group, baseDelay = 0) {
        const now = performance.now();
        group.children.forEach((ch, i) => {
            ch.userData.tp = ch.position.clone(); ch.userData.tr = ch.rotation.clone(); ch.userData.ts = ch.scale.clone();
            ch.userData.fp = ch.userData.tp.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(1.7 + Math.random() * 1.6));
            ch.userData.t0 = now + baseDelay + i * 28; ch.userData.mode = 'in';
            ch.position.copy(ch.userData.fp); ch.scale.setScalar(0.001);
        });
    }
    function scatterOut(group) {
        const now = performance.now();
        group.children.forEach((ch, i) => {
            ch.userData.fp = ch.position.clone();
            ch.userData.op = ch.position.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(1.8 + Math.random() * 1.4));
            ch.userData.t0 = now + i * 12; ch.userData.mode = 'out';
        });
    }

    function morph(shape, color) {
        if (stage.outGroup) { stageScene.remove(stage.outGroup); disposeGroup(stage.outGroup); stage.outGroup = null; }
        if (stage.group) { stage.outGroup = stage.group; scatterOut(stage.outGroup); }
        stage.group = (BUILDERS[shape] || BUILDERS.network)(color);
        stageScene.add(stage.group);
        scatterIn(stage.group, reduced ? 0 : 120);
    }

    function animateGroup(group, dt, now) {
        for (let i = group.children.length - 1; i >= 0; i--) {
            const ch = group.children[i], u = ch.userData;
            if (u.mode === 'in') {
                const k = clamp((now - u.t0) / (reduced ? 1 : 600), 0, 1), e = easeOutBack(k);
                ch.position.lerpVectors(u.fp, u.tp, e); ch.scale.copy(u.ts).multiplyScalar(Math.max(0.001, e));
                if (k >= 1) { ch.position.copy(u.tp); ch.scale.copy(u.ts); u.mode = 'idle'; }
            } else if (u.mode === 'out') {
                const k = clamp((now - u.t0) / (reduced ? 1 : 320), 0, 1);
                ch.position.lerpVectors(u.fp, u.op, k); ch.scale.multiplyScalar(0.86);
                if (k >= 1) { group.remove(ch); ch.geometry?.dispose?.(); ch.material?.dispose?.(); }
            }
        }
    }

    /* ---------- panel viewer ---------- */
    const panelCanvas = $('#panelCanvas');
    const pRenderer = new THREE.WebGLRenderer({ canvas: panelCanvas, alpha: true, antialias: true });
    pRenderer.setPixelRatio(DPR);
    const pScene = new THREE.Scene();
    const pCam = new THREE.PerspectiveCamera(40, 1, 0.1, 50); pCam.position.set(0, 0.3, 5.4); pCam.lookAt(0, 0, 0);
    let pGroup = null, pPhase = 0;
    function panelShow(shape, color) {
        if (pGroup) { pScene.remove(pGroup); disposeGroup(pGroup); }
        pGroup = (BUILDERS[shape] || BUILDERS.network)(color); pScene.add(pGroup); pPhase = Math.random() * 6;
        pGroup.children.forEach((ch, i) => { ch.userData.tp = ch.position.clone(); ch.userData.tr = ch.rotation.clone(); ch.userData.ts = ch.scale.clone();
            ch.userData.fp = ch.userData.tp.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(1.6)); ch.userData.t0 = performance.now() + 60 + i * 26; ch.userData.mode = 'in';
            ch.position.copy(ch.userData.fp); ch.scale.setScalar(0.001); });
        const w = panelCanvas.parentElement.clientWidth || 560, h = panelCanvas.parentElement.clientHeight || 200;
        pRenderer.setSize(w, h); pCam.aspect = w / h; pCam.updateProjectionMatrix();
    }

    const visRect = el => { const r = el.getBoundingClientRect(); return (r.width > 12 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) ? r : null; };

    function tick(dt, now) {
        // background
        stars.rotation.y += dt * 0.012;
        floor.position.z = (now * 0.0024) % floorCell;
        drifters.forEach((d, i) => { d.rotation.y += dt * 0.08 * (i + 1) * 0.4; d.rotation.x += dt * 0.05; });
        bgCam.position.x += (mouse.x * 1.6 - bgCam.position.x) * Math.min(1, dt * 2);
        bgCam.position.y += (2.2 - mouse.y * 1.1 - bgCam.position.y) * Math.min(1, dt * 2);
        bgCam.lookAt(0, 0, -10);
        bgRenderer.render(bgScene, bgCam);

        fxRenderer.setScissorTest(false); fxRenderer.clear();
        if (!modalOpen()) {
            const r = visRect(protoStage);
            if (r) {
                if (stage.outGroup) animateGroup(stage.outGroup, dt, now);
                if (stage.group) {
                    animateGroup(stage.group, dt, now);
                    stage.spd += ((three.hover ? 3.4 : 1) - stage.spd) * Math.min(1, dt * 6);
                    stage.scl += ((three.hover ? 1.08 : 1) - stage.scl) * Math.min(1, dt * 8);
                    stage.group.scale.setScalar(stage.scl);
                    stage.group.rotation.y += dt * (reduced ? 0.05 : 0.5) * stage.spd;
                    stage.group.rotation.x += ((mouse.y * 0.35) - stage.group.rotation.x) * Math.min(1, dt * 3);
                    stage.group.position.y = Math.sin(now * 0.0011 + stage.phase) * 0.06;
                }
                fxRenderer.setScissorTest(true);
                const y = innerHeight - r.bottom;
                fxRenderer.setViewport(r.left, y, r.width, r.height);
                fxRenderer.setScissor(r.left, y, r.width, r.height);
                fxCam.aspect = r.width / r.height; fxCam.updateProjectionMatrix();
                fxRenderer.render(stageScene, fxCam);
                fxRenderer.setScissorTest(false);
            }
        }
        // panel viewer
        if (panelOpenId && pGroup) {
            animateGroup(pGroup, dt, now);
            pGroup.rotation.y += dt * 0.6; pGroup.position.y = Math.sin(now * 0.0012 + pPhase) * 0.06;
            pRenderer.render(pScene, pCam);
        }
    }

    window.addEventListener('resize', () => {
        bgRenderer.setSize(innerWidth, innerHeight); bgCam.aspect = innerWidth / innerHeight; bgCam.updateProjectionMatrix();
        fxRenderer.setSize(innerWidth, innerHeight);
        if (panelOpenId) { const w = panelCanvas.parentElement.clientWidth, h = panelCanvas.parentElement.clientHeight; pRenderer.setSize(w, h); pCam.aspect = w / h; pCam.updateProjectionMatrix(); }
    });

    return { tick, morph, panelShow, hover: false };
}

/* ============================================================
   GLOBAL LOOP
   ============================================================ */
let lastT = performance.now(), rafId = null;
function loop(now) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - lastT) / 1000); lastT = now;

    three?.tick(dt, now);
    if (!reduced) drawFx(dt);

    // autoplay
    if (player.playing && !modalOpen() && !animating) {
        player.acc += dt * 1000;
        const prog = clamp(player.acc / ADV_MS, 0, 1);
        $('#ringFg').style.strokeDashoffset = counterRingC * (1 - prog);
        if (player.acc >= ADV_MS) next();
    } else {
        const prog = clamp(player.acc / ADV_MS, 0, 1);
        $('#ringFg').style.strokeDashoffset = counterRingC * (1 - prog);
    }

    // panel news-feed auto-scroll
    if (panelOpenId) {
        const max = panelBody.scrollHeight - panelBody.clientHeight;
        if (auto.on && !reduced && now > auto.holdUntil && max > 4) {
            if (Math.abs(panelBody.scrollTop - auto.pos) > 2) auto.pos = panelBody.scrollTop;
            auto.pos = Math.min(auto.pos + 36 * dt, max);
            panelBody.scrollTop = auto.pos;
            if (auto.pos >= max - 1) { auto.on = false; setAutoBtn(); }
        }
        $('#panelProgress').style.width = max > 4 ? `${(panelBody.scrollTop / max) * 100}%` : '100%';
    }
}
rafId = requestAnimationFrame(loop);

window.addEventListener('resize', sizeFx);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else { lastT = performance.now(); rafId = requestAnimationFrame(loop); }
});

/* initial paint if three is slow/absent is handled above */
setPlaying(player.playing);
