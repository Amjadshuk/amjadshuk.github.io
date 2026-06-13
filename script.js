/* ============================================================
   AMJAD_OS — portfolio engine
   UI runs standalone; three.js loads dynamically and degrades
   gracefully (body.no3d) if WebGL/CDN is unavailable.
   ============================================================ */
const DATA = window.PORTFOLIO_DATA;
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const catOf = id => DATA.categories.find(c => c.id === id);
const itemsOf = cat => DATA.items.filter(i => i.cat === cat);

/* ============================================================
   SHOWCASE DOM — tabs + horizontal rails of cards
   ============================================================ */
const tabsEl = $('#tabs');
const railsEl = $('#rails');
let activeCat = DATA.categories[0].id;

function cardHTML(item, idx) {
    const cat = catOf(item.cat);
    return `
    <article class="card" data-item="${item.id}" tabindex="0" style="--c:${cat.color}"
             aria-label="${item.title} — open details">
        <div class="holo" data-shape="${item.shape}" data-color="${cat.color}" data-item="${item.id}">
            <span class="holo-glyph">${cat.glyph}</span>
            <span class="holo-idx">${String(idx + 1).padStart(2, '0')} / ${String(itemsOf(item.cat).length).padStart(2, '0')}</span>
            <span class="holo-caption">PROTOTYPE // ${item.shape.toUpperCase()}_SKELETON</span>
        </div>
        <div class="card-body">
            <div class="card-meta">
                <span class="cat-chip">${cat.label}</span>
                <span class="period">${item.period}</span>
            </div>
            <h3>${item.title}</h3>
            <p class="card-org">${item.org}</p>
            <p class="card-blurb">${item.blurb}</p>
            <div class="tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
        </div>
        <div class="card-foot">
            <span class="card-sub">${item.sub}</span>
            <span class="explore">EXPLORE <i class="fas fa-angles-right"></i></span>
        </div>
    </article>`;
}

function buildShowcase() {
    tabsEl.innerHTML = DATA.categories.map(cat => `
        <button class="tab${cat.id === activeCat ? ' active' : ''}" role="tab"
                aria-selected="${cat.id === activeCat}" data-cat="${cat.id}" style="--tc:${cat.color}">
            <span class="tab-glyph">${cat.glyph}</span>${cat.label}
            <span class="tab-count">${itemsOf(cat.id).length}</span>
        </button>`).join('');

    railsEl.innerHTML = DATA.categories.map(cat => `
        <div class="rail${cat.id === activeCat ? ' active' : ''}" data-cat="${cat.id}" role="tabpanel">
            ${itemsOf(cat.id).map((item, i) => cardHTML(item, i)).join('')}
        </div>`).join('');

    $$('.rail .card').forEach((c, i) => c.style.setProperty('--d', `${(i % 9) * 0.06}s`));
}
buildShowcase();

const activeRail = () => $(`.rail[data-cat="${activeCat}"]`);

function updateRailMeta() {
    const cat = catOf(activeCat);
    $('#railCount').textContent = `${itemsOf(activeCat).length} UNITS IN ${cat.label}`;
    updateRailProgress();
    updateRailButtons();
}

function switchTab(catId) {
    if (catId === activeCat) return;
    activeCat = catId;
    $$('.tab').forEach(t => {
        const on = t.dataset.cat === catId;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on);
    });
    $$('.rail').forEach(r => r.classList.toggle('active', r.dataset.cat === catId));
    const rail = activeRail();
    rail.scrollLeft = 0;
    // restart entrance animation = skeleton "restructure" on the DOM side
    $$('.card', rail).forEach((c, i) => {
        c.style.setProperty('--d', `${i * 0.06}s`);
        c.style.animation = 'none';
        void c.offsetWidth;
        c.style.animation = '';
    });
    three?.scatterRail(rail);
    updateRailMeta();
}
tabsEl.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (tab) switchTab(tab.dataset.cat);
});

/* Rail: progress bar + arrows */
function updateRailProgress() {
    const rail = activeRail();
    const max = rail.scrollWidth - rail.clientWidth;
    $('#railProgress').style.width = max > 4 ? `${(rail.scrollLeft / max) * 100}%` : '100%';
}
function updateRailButtons() {
    const rail = activeRail();
    const max = rail.scrollWidth - rail.clientWidth;
    $('#railPrev').disabled = rail.scrollLeft < 8;
    $('#railNext').disabled = rail.scrollLeft > max - 8;
}
$$('.rail').forEach(rail => {
    rail.addEventListener('scroll', () => {
        if (rail !== activeRail()) return;
        updateRailProgress();
        updateRailButtons();
    }, { passive: true });

    // vertical wheel -> horizontal slide (release at the ends)
    rail.addEventListener('wheel', e => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        const before = rail.scrollLeft;
        rail.scrollLeft += e.deltaY;
        if (rail.scrollLeft !== before) e.preventDefault();
    }, { passive: false });

    // drag to scroll (mouse)
    let down = false, startX = 0, startL = 0, moved = 0;
    rail.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = 0;
        startX = e.clientX; startL = rail.scrollLeft;
    });
    window.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 6) rail.classList.add('dragging');
        moved = Math.max(moved, Math.abs(dx));
        rail.scrollLeft = startL - dx;
    });
    window.addEventListener('pointerup', () => {
        down = false;
        requestAnimationFrame(() => rail.classList.remove('dragging'));
    });
    rail.addEventListener('click', e => {
        if (moved > 8) { e.stopPropagation(); e.preventDefault(); moved = 0; }
    }, true);
});
const railStep = () => Math.min(activeRail().clientWidth * 0.85, 380);
$('#railPrev').addEventListener('click', () => activeRail().scrollBy({ left: -railStep(), behavior: 'smooth' }));
$('#railNext').addEventListener('click', () => activeRail().scrollBy({ left: railStep(), behavior: 'smooth' }));

/* Card -> open detail panel */
railsEl.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (card) openPanel(card.dataset.item);
});
railsEl.addEventListener('keydown', e => {
    const card = e.target.closest('.card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openPanel(card.dataset.item);
    }
});

/* Card hover -> accelerate its 3D prototype */
railsEl.addEventListener('pointerover', e => {
    const holo = e.target.closest('.card')?.querySelector('.holo');
    if (holo) three?.setHover(holo, true);
});
railsEl.addEventListener('pointerout', e => {
    const holo = e.target.closest('.card')?.querySelector('.holo');
    if (holo) three?.setHover(holo, false);
});

updateRailMeta();

/* ============================================================
   DETAIL PANEL — slide-over with news ticker + auto-scroll
   ============================================================ */
const panel = $('#panel'), scrim = $('#scrim'), panelBody = $('#panelBody');
let panelOpenId = null, lastFocus = null;
const auto = { on: false, holdUntil: 0, pos: 0 };

function setAutoBtn() {
    const btn = $('#autoBtn');
    btn.classList.toggle('off', !auto.on);
    btn.innerHTML = auto.on ? '<i class="fas fa-pause"></i> AUTO' : '<i class="fas fa-play"></i> AUTO';
    btn.setAttribute('aria-label', auto.on ? 'Pause auto-scroll' : 'Resume auto-scroll');
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

    const head = `${cat.glyph} ${item.headline}   ✦   `;
    $('#tickerTrack').innerHTML = `<span>${head.repeat(3)}</span><span>${head.repeat(3)}</span>`;

    const mediaWrap = $('#panelMediaWrap'), media = $('#panelMedia');
    if (item.media) {
        mediaWrap.hidden = false;
        media.innerHTML = item.media.type === 'video'
            ? `<figure><video src="${item.media.src}" controls muted playsinline preload="metadata"></video><figcaption>${item.media.caption}</figcaption></figure>`
            : `<figure><img src="${item.media.src}" alt="${item.media.caption}" loading="lazy"><figcaption>${item.media.caption}</figcaption></figure>`;
    } else {
        mediaWrap.hidden = true;
        media.innerHTML = '';
    }

    const link = $('#panelLink');
    if (item.link) {
        link.hidden = false;
        link.href = item.link.href;
        link.innerHTML = `<i class="fas fa-arrow-up-right-from-square"></i> ${item.link.label}`;
    } else {
        link.hidden = true;
    }

    panelBody.scrollTop = 0;
    auto.on = !reduced;
    auto.pos = 0;
    auto.holdUntil = performance.now() + 1600; // let the reader land first
    setAutoBtn();

    scrim.classList.add('open');
    panel.classList.add('open');
    document.body.classList.add('locked');
    three?.panelShow(item.shape, cat.color);
    setTimeout(() => $('#panelClose').focus(), 80);
}

function closePanel() {
    if (!panelOpenId) return;
    panelOpenId = null;
    scrim.classList.remove('open');
    panel.classList.remove('open');
    document.body.classList.remove('locked');
    $('#panelMedia').querySelector('video')?.pause();
    three?.panelHide();
    lastFocus?.focus?.();
}

function stepItem(dir) {
    const item = DATA.items.find(i => i.id === panelOpenId);
    if (!item) return;
    const list = itemsOf(item.cat);
    const next = list[(list.indexOf(item) + dir + list.length) % list.length];
    openPanel(next.id);
}

$('#panelClose').addEventListener('click', closePanel);
scrim.addEventListener('click', closePanel);
$('#prevItem').addEventListener('click', () => stepItem(-1));
$('#nextItem').addEventListener('click', () => stepItem(1));
$('#autoBtn').addEventListener('click', () => { auto.on = !auto.on; auto.holdUntil = 0; setAutoBtn(); });
['wheel', 'touchstart', 'pointerdown'].forEach(ev =>
    panelBody.addEventListener(ev, () => { auto.holdUntil = performance.now() + 2600; }, { passive: true })
);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closePanel(); closeMenu(); }
});

/* ============================================================
   NAV — scrolled state, mobile menu, active section
   ============================================================ */
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const hamburger = $('#hamburger'), mobileMenu = $('#mobileMenu');
function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
}
hamburger.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('locked', open);
});
$$('.mobile-links a').forEach(a => a.addEventListener('click', closeMenu));

const sectionLinks = $$('.nav-link');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (!en.isIntersecting) return;
        sectionLinks.forEach(l =>
            l.classList.toggle('active', l.getAttribute('href') === `#${en.target.id}`));
    });
}, { rootMargin: '-40% 0px -55% 0px' });
$$('main section[id]').forEach(s => sectionObserver.observe(s));

/* ============================================================
   HERO — typed roles + counters
   ============================================================ */
(function typedRoles() {
    const el = $('#typed');
    const roles = DATA.profile.roles;
    if (reduced) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, del = false;
    (function tick() {
        const word = roles[r];
        el.textContent = word.slice(0, i);
        if (!del && i < word.length) { i++; setTimeout(tick, 55); }
        else if (!del) { del = true; setTimeout(tick, 1500); }
        else if (i > 0) { i--; setTimeout(tick, 26); }
        else { del = false; r = (r + 1) % roles.length; setTimeout(tick, 250); }
    })();
})();

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (!en.isIntersecting || en.target.dataset.done) return;
        en.target.dataset.done = 1;
        const target = +en.target.dataset.count;
        const suffix = en.target.dataset.suffix || '';
        const t0 = performance.now(), dur = reduced ? 1 : 900;
        (function step(now) {
            const k = clamp((now - t0) / dur, 0, 1);
            en.target.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
            if (k < 1) requestAnimationFrame(step);
        })(t0);
    });
}, { threshold: 0.6 });
$$('.stat-n').forEach(s => counterObserver.observe(s));

/* ============================================================
   Reveal-on-scroll + skill meters
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        revealObserver.unobserve(en.target);
    });
}, { threshold: 0.12 });
$$('.reveal').forEach(el => revealObserver.observe(el));

const meterObserver = new IntersectionObserver(entries => {
    entries.forEach(en => {
        if (!en.isIntersecting) return;
        $$('.meter', en.target).forEach((m, i) => {
            setTimeout(() => { $('.meter-bar i', m).style.width = `${m.dataset.v}%`; }, i * 110);
        });
        meterObserver.unobserve(en.target);
    });
}, { threshold: 0.3 });
const metersBox = $('.meters');
if (metersBox) meterObserver.observe(metersBox);

/* Periodic glitch on headings */
if (!reduced) {
    setInterval(() => {
        if (document.hidden) return;
        const heads = $$('.glitch');
        const el = heads[Math.floor(Math.random() * heads.length)];
        el.classList.add('glitching');
        setTimeout(() => el.classList.remove('glitching'), 380);
    }, 5200);
}

/* ============================================================
   BOOT LOADER
   ============================================================ */
(function boot() {
    const loader = $('#loader');
    const finish = () => {
        loader.classList.add('done');
        setTimeout(() => loader.remove(), 500);
    };
    if (reduced) return finish();
    const lines = [
        '> init kernel ................ <span class="ok">OK</span>',
        '> load profile AMJAD_AS ...... <span class="ok">OK</span>',
        '> mount showcase rails ....... <span class="ok">OK</span>',
        '> compile 3d skeletons ....... <span class="ok">OK</span>',
        '> all systems nominal ▮▮▮▮▮▮▮▮'
    ];
    const box = $('#bootLines'), bar = $('#bootBar');
    lines.forEach((l, i) => setTimeout(() => {
        box.innerHTML += l + '<br>';
        bar.style.width = `${((i + 1) / lines.length) * 100}%`;
    }, 90 + i * 150));
    setTimeout(finish, 90 + lines.length * 150 + 320);
    loader.addEventListener('click', finish);
})();

console.log('%cAMJAD_OS v3 — all systems nominal',
    'color:#00e5ff;font-family:monospace;font-size:16px;text-shadow:0 0 8px #00e5ff');

/* ============================================================
   THREE.JS — background + skeleton prototypes
   ============================================================ */
let three = null;
const mouse = { x: 0, y: 0 };
window.addEventListener('pointermove', e => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
}, { passive: true });

(async () => {
    let THREE = null;
    for (const src of [
        './vendor/three.module.min.js',
        'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js',
        'https://unpkg.com/three@0.160.0/build/three.module.js'
    ]) {
        try { THREE = await import(src); break; } catch { /* try next source */ }
    }
    if (!THREE) {
        document.body.classList.add('no3d');
        return;
    }
    try {
        three = initThree(THREE);
    } catch (err) {
        console.warn('3D disabled:', err);
        document.body.classList.add('no3d');
    }
})();

function initThree(THREE) {
    const DPR = Math.min(devicePixelRatio || 1, innerWidth < 760 ? 1.7 : 2);

    /* ---------- helpers ---------- */
    const lineMat = (color, opacity = 0.9) =>
        new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    const edges = (geo, color, opacity) =>
        new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat(color, opacity));
    const wires = (geo, color, opacity) =>
        new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat(color, opacity));
    const dots = (geo, color, size = 0.05, opacity = 0.9) =>
        new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity }));
    const lineFromPoints = (pts, color, opacity = 0.6) => {
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        return new THREE.LineSegments(g, lineMat(color, opacity));
    };
    const MAG = '#ff2bd6', WHITE = '#cfeeff';

    /* ---------- shape builders (skeleton prototypes) ---------- */
    const BUILDERS = {
        core(c) {
            const g = new THREE.Group();
            g.add(wires(new THREE.IcosahedronGeometry(1.02, 1), c, 0.75));
            g.add(edges(new THREE.IcosahedronGeometry(0.44, 0), MAG, 0.95));
            const r1 = wires(new THREE.TorusGeometry(1.5, 0.012, 4, 72), c, 0.45);
            r1.rotation.x = 1.25; g.add(r1);
            const r2 = wires(new THREE.TorusGeometry(1.74, 0.012, 4, 80), MAG, 0.3);
            r2.rotation.x = 1.0; r2.rotation.y = 0.6; g.add(r2);
            g.add(dots(new THREE.IcosahedronGeometry(1.02, 1), WHITE, 0.05));
            for (let i = 0; i < 3; i++) {
                const sat = edges(new THREE.OctahedronGeometry(0.09, 0), c, 0.95);
                const a = i * Math.PI * 2 / 3;
                sat.position.set(Math.cos(a) * 1.5, Math.sin(a) * 0.32, Math.sin(a) * 1.5);
                g.add(sat);
            }
            return g;
        },
        signal(c) {
            const g = new THREE.Group();
            const mast = edges(new THREE.ConeGeometry(0.46, 1.15, 6), c, 0.95);
            mast.position.y = -0.72; g.add(mast);
            const tip = edges(new THREE.OctahedronGeometry(0.1, 0), MAG, 1);
            tip.position.y = -0.05; g.add(tip);
            [[0.45, 0.28, 0.95], [0.82, 0.62, 0.6], [1.2, 0.98, 0.35]].forEach(([r, y, o]) => {
                const ring = wires(new THREE.TorusGeometry(r, 0.013, 4, 56), c, o);
                ring.rotation.x = Math.PI / 2; ring.position.y = y; g.add(ring);
            });
            g.add(dots(new THREE.IcosahedronGeometry(1.45, 1), WHITE, 0.035, 0.5));
            return g;
        },
        network(c) {
            const g = new THREE.Group();
            const ico = new THREE.IcosahedronGeometry(1.12, 1);
            g.add(wires(ico, c, 0.7));
            g.add(dots(ico, WHITE, 0.06));
            g.add(edges(new THREE.IcosahedronGeometry(0.45, 0), MAG, 0.95));
            const pos = ico.getAttribute('position');
            const spokes = [];
            for (let i = 0; i < pos.count; i += 7) {
                spokes.push(new THREE.Vector3(0, 0, 0),
                    new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)));
            }
            g.add(lineFromPoints(spokes, c, 0.35));
            return g;
        },
        pipeline(c) {
            const g = new THREE.Group();
            for (let i = 0; i < 4; i++) {
                const box = edges(new THREE.BoxGeometry(0.52, 0.52, 0.52), c, 0.95);
                box.position.x = -1.45 + i * 0.95;
                box.rotation.y = i * 0.3;
                g.add(box);
                if (i < 3) {
                    const link = edges(new THREE.CylinderGeometry(0.05, 0.05, 0.42, 6), MAG, 0.8);
                    link.rotation.z = Math.PI / 2;
                    link.position.x = -0.97 + i * 0.95;
                    g.add(link);
                }
            }
            const arrow = edges(new THREE.ConeGeometry(0.17, 0.36, 6), MAG, 1);
            arrow.rotation.z = -Math.PI / 2; arrow.position.x = 1.95; g.add(arrow);
            return g;
        },
        shield(c) {
            const g = new THREE.Group();
            g.add(edges(new THREE.OctahedronGeometry(1.12, 0), c, 0.95));
            const r1 = wires(new THREE.TorusGeometry(0.8, 0.012, 4, 48), MAG, 0.7);
            r1.rotation.x = Math.PI / 2; g.add(r1);
            g.add(wires(new THREE.TorusGeometry(0.8, 0.012, 4, 48), c, 0.45));
            g.add(edges(new THREE.OctahedronGeometry(0.3, 0), WHITE, 0.9));
            return g;
        },
        truck(c) {
            const g = new THREE.Group();
            const body = edges(new THREE.BoxGeometry(1.45, 0.55, 0.62), c, 0.95);
            body.position.set(-0.18, 0.1, 0); g.add(body);
            const cab = edges(new THREE.BoxGeometry(0.5, 0.44, 0.6), c, 0.95);
            cab.position.set(0.92, 0.04, 0); g.add(cab);
            [[-0.65, 0.3], [0.35, 0.3], [0.95, 0.3]].forEach(([x]) => {
                [-0.34, 0.34].forEach(z => {
                    const w = edges(new THREE.CylinderGeometry(0.17, 0.17, 0.1, 10), MAG, 0.85);
                    w.rotation.x = Math.PI / 2;
                    w.position.set(x, -0.28, z);
                    g.add(w);
                });
            });
            const grid = new THREE.GridHelper(2.6, 6, 0x1a4a5a, 0x123642);
            grid.material.transparent = true; grid.material.opacity = 0.35;
            grid.position.y = -0.5; g.add(grid);
            return g;
        },
        globe(c) {
            const g = new THREE.Group();
            g.add(wires(new THREE.SphereGeometry(1.05, 14, 10), c, 0.3));
            const eq = wires(new THREE.TorusGeometry(1.05, 0.012, 4, 64), c, 0.85);
            eq.rotation.x = Math.PI / 2; g.add(eq);
            g.add(wires(new THREE.TorusGeometry(1.05, 0.012, 4, 64), MAG, 0.5));
            const n = 110, arr = new Float32Array(n * 3);
            for (let i = 0; i < n; i++) {
                const v = new THREE.Vector3().randomDirection().multiplyScalar(1.06);
                arr.set([v.x, v.y, v.z], i * 3);
            }
            const pg = new THREE.BufferGeometry();
            pg.setAttribute('position', new THREE.BufferAttribute(arr, 3));
            g.add(dots(pg, WHITE, 0.045, 0.95));
            return g;
        },
        grid(c) {
            const g = new THREE.Group();
            [-0.7, 0, 0.7].forEach((y, i) => {
                const p = wires(new THREE.PlaneGeometry(2.0, 1.3, 4, 3), c, 0.8 - i * 0.18);
                p.rotation.x = -Math.PI / 2; p.position.y = y; g.add(p);
            });
            const pts = [];
            [[-1, -0.65], [1, -0.65], [-1, 0.65], [1, 0.65]].forEach(([x, z]) => {
                pts.push(new THREE.Vector3(x, -0.7, z), new THREE.Vector3(x, 0.7, z));
            });
            g.add(lineFromPoints(pts, MAG, 0.6));
            g.add(dots(new THREE.PlaneGeometry(2.0, 1.3, 4, 3).rotateX(-Math.PI / 2).translate(0, 0.7, 0), WHITE, 0.05));
            return g;
        },
        lattice(c) {
            const g = new THREE.Group();
            const pts = [], joins = [];
            const coords = [-0.7, 0, 0.7];
            coords.forEach(x => coords.forEach(y => coords.forEach(z =>
                pts.push(new THREE.Vector3(x, y, z)))));
            coords.forEach(a => coords.forEach(b => {
                joins.push(new THREE.Vector3(-0.7, a, b), new THREE.Vector3(0.7, a, b));
                joins.push(new THREE.Vector3(a, -0.7, b), new THREE.Vector3(a, 0.7, b));
                joins.push(new THREE.Vector3(a, b, -0.7), new THREE.Vector3(a, b, 0.7));
            }));
            const pg = new THREE.BufferGeometry().setFromPoints(pts);
            g.add(dots(pg, c, 0.08));
            g.add(lineFromPoints(joins, c, 0.28));
            g.add(edges(new THREE.BoxGeometry(1.9, 1.9, 1.9), MAG, 0.5));
            return g;
        },
        bars(c) {
            const g = new THREE.Group();
            const grid = new THREE.GridHelper(2.4, 8, 0x1a4a5a, 0x123642);
            grid.material.transparent = true; grid.material.opacity = 0.35;
            grid.position.y = -0.85; g.add(grid);
            const hs = [0.5, 0.9, 0.7, 1.25, 1.6];
            const tops = [];
            hs.forEach((h, i) => {
                const bar = edges(new THREE.BoxGeometry(0.34, h, 0.34), c, 0.95);
                const x = -1 + i * 0.5;
                bar.position.set(x, h / 2 - 0.85, 0);
                g.add(bar);
                tops.push(new THREE.Vector3(x, h - 0.8, 0));
            });
            for (let i = 0; i < tops.length - 1; i++) {
                g.add(lineFromPoints([tops[i], tops[i + 1]], MAG, 0.85));
            }
            const tip = edges(new THREE.OctahedronGeometry(0.09, 0), MAG, 1);
            tip.position.copy(tops[4]); g.add(tip);
            return g;
        },
        terrain(c) {
            const g = new THREE.Group();
            const geo = new THREE.PlaneGeometry(2.7, 2.7, 16, 16);
            const p = geo.getAttribute('position');
            for (let i = 0; i < p.count; i++) {
                const x = p.getX(i), y = p.getY(i);
                p.setZ(i, Math.sin(x * 2.1) * Math.cos(y * 1.7) * 0.3 + Math.sin(y * 2.6) * 0.12);
            }
            geo.computeVertexNormals();
            const land = wires(geo, c, 0.55);
            land.rotation.x = -Math.PI / 2.25;
            land.position.y = -0.45;
            g.add(land);
            const sun = edges(new THREE.IcosahedronGeometry(0.18, 0), '#ffb300', 1);
            sun.position.set(0.85, 0.85, -0.3); g.add(sun);
            const ring = wires(new THREE.TorusGeometry(0.3, 0.01, 4, 32), '#ffb300', 0.6);
            ring.position.copy(sun.position); g.add(ring);
            return g;
        },
        road(c) {
            const g = new THREE.Group();
            const geo = new THREE.PlaneGeometry(0.95, 3.3, 3, 24);
            const p = geo.getAttribute('position');
            for (let i = 0; i < p.count; i++) p.setX(i, p.getX(i) + Math.sin(p.getY(i) * 1.6) * 0.35);
            const road = wires(geo, c, 0.7);
            road.rotation.x = -Math.PI / 2.18;
            road.position.y = -0.35;
            g.add(road);
            const car = edges(new THREE.BoxGeometry(0.24, 0.15, 0.4), MAG, 1);
            car.position.set(Math.sin(0.8) * 0.35 * 0.8, -0.18, 0.35);
            g.add(car);
            const halo = wires(new THREE.TorusGeometry(0.32, 0.01, 4, 28), MAG, 0.6);
            halo.rotation.x = Math.PI / 2; halo.position.copy(car.position); g.add(halo);
            g.add(dots(new THREE.IcosahedronGeometry(1.5, 1), WHITE, 0.03, 0.4));
            return g;
        },
        app(c) {
            const g = new THREE.Group();
            g.add(edges(new THREE.BoxGeometry(0.95, 1.85, 0.1), c, 0.95));
            const screen = wires(new THREE.PlaneGeometry(0.72, 1.4, 3, 6), c, 0.45);
            screen.position.z = 0.06; g.add(screen);
            const btn = wires(new THREE.TorusGeometry(0.07, 0.013, 4, 18), MAG, 0.9);
            btn.position.set(0, -0.78, 0.06); g.add(btn);
            const notif = edges(new THREE.OctahedronGeometry(0.07, 0), MAG, 1);
            notif.position.set(0.42, 0.86, 0.08); g.add(notif);
            const orbit = wires(new THREE.TorusGeometry(1.3, 0.01, 4, 56), c, 0.3);
            orbit.rotation.x = 1.25; g.add(orbit);
            return g;
        },
        db(c) {
            const g = new THREE.Group();
            [-0.62, 0, 0.62].forEach(y => {
                const disk = edges(new THREE.CylinderGeometry(0.82, 0.82, 0.34, 18), c, 0.8);
                disk.position.y = y; g.add(disk);
            });
            const orbit = wires(new THREE.TorusGeometry(1.25, 0.012, 4, 56), MAG, 0.5);
            orbit.rotation.x = 1.1; g.add(orbit);
            g.add(dots(new THREE.IcosahedronGeometry(1.4, 1), WHITE, 0.035, 0.45));
            return g;
        },
        code(c) {
            const g = new THREE.Group();
            const mk = (x, flip) => {
                const a = edges(new THREE.BoxGeometry(0.1, 0.66, 0.1), c, 0.95);
                a.rotation.z = flip * 0.75; a.position.set(x, 0.23, 0);
                const b = edges(new THREE.BoxGeometry(0.1, 0.66, 0.1), c, 0.95);
                b.rotation.z = -flip * 0.75; b.position.set(x, -0.23, 0);
                g.add(a, b);
            };
            mk(-0.78, 1); mk(0.78, -1);
            const slash = edges(new THREE.BoxGeometry(0.1, 1.15, 0.1), MAG, 0.95);
            slash.rotation.z = -0.42; g.add(slash);
            const orbit = wires(new THREE.TorusGeometry(1.35, 0.01, 4, 56), c, 0.3);
            orbit.rotation.x = 1.35; g.add(orbit);
            return g;
        },
        pyramid(c) {
            const g = new THREE.Group();
            const base = edges(new THREE.ConeGeometry(1.05, 1.25, 4), c, 0.95);
            base.position.y = -0.3; base.rotation.y = Math.PI / 4; g.add(base);
            const tip = edges(new THREE.ConeGeometry(0.34, 0.42, 4), MAG, 1);
            tip.position.y = 0.78; tip.rotation.y = Math.PI / 4; g.add(tip);
            const frame = wires(new THREE.PlaneGeometry(2.1, 2.1, 1, 1), c, 0.4);
            frame.rotation.x = -Math.PI / 2; frame.position.y = -0.95; g.add(frame);
            g.add(dots(new THREE.IcosahedronGeometry(1.4, 1), WHITE, 0.03, 0.4));
            return g;
        },
        beacon(c) {
            const g = new THREE.Group();
            const horn = edges(new THREE.ConeGeometry(0.55, 1.15, 8), c, 0.95);
            horn.rotation.z = -0.95;
            horn.position.set(-0.35, -0.15, 0);
            g.add(horn);
            [[0.65, 0.9], [0.95, 0.55], [1.25, 0.3]].forEach(([r, o]) => {
                const arc = wires(new THREE.TorusGeometry(r, 0.013, 4, 40, Math.PI * 0.7), MAG, o);
                arc.position.set(0.18, 0.32, 0);
                arc.rotation.z = -0.6;
                g.add(arc);
            });
            const spark = edges(new THREE.OctahedronGeometry(0.09, 0), '#ffb300', 1);
            spark.position.set(1.05, 1.0, 0); g.add(spark);
            return g;
        }
    };

    const easeOutBack = k => {
        const c1 = 1.70158, c3 = c1 + 1;
        return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
    };

    /* ---------- background scene ---------- */
    const bgRenderer = new THREE.WebGLRenderer({
        canvas: $('#bg3d'), alpha: true, antialias: true, powerPreference: 'high-performance'
    });
    bgRenderer.setPixelRatio(DPR);
    bgRenderer.setSize(innerWidth, innerHeight);

    const bgScene = new THREE.Scene();
    bgScene.fog = new THREE.Fog(0x04060d, 16, 90);
    const bgCam = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 200);
    bgCam.position.set(0, 2.2, 15);

    const starGeo = new THREE.BufferGeometry();
    const starArr = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) {
        const v = new THREE.Vector3().randomDirection().multiplyScalar(28 + Math.random() * 55);
        starArr.set([v.x, Math.abs(v.y) * 0.7 - 4, v.z], i * 3);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starArr, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
        color: 0x6fd4e8, size: 0.16, transparent: true, opacity: 0.75
    }));
    bgScene.add(stars);

    const floor = new THREE.GridHelper(300, 64, 0x0e5160, 0x07242e);
    floor.position.y = -6;
    bgScene.add(floor);
    const floorCell = 300 / 64;

    const drifters = [];
    [[-15, 4, -26, '#00e5ff'], [17, 7, -32, '#ff2bd6'], [2, 12, -48, '#00e5ff']].forEach(([x, y, z, col]) => {
        const d = wires(new THREE.IcosahedronGeometry(4.4, 0), col, 0.07);
        d.position.set(x, y, z);
        bgScene.add(d);
        drifters.push(d);
    });

    /* ---------- fx renderer (hero core + card prototypes) ---------- */
    const fxRenderer = new THREE.WebGLRenderer({
        canvas: $('#fx3d'), alpha: true, antialias: true, powerPreference: 'high-performance'
    });
    fxRenderer.setPixelRatio(DPR);
    fxRenderer.setSize(innerWidth, innerHeight);
    const fxCam = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    fxCam.position.set(0, 0.35, 5.7);
    fxCam.lookAt(0, 0, 0);

    const entries = [];
    $$('.holo[data-shape]').forEach(el => {
        entries.push({
            el,
            shape: el.dataset.shape,
            color: el.dataset.color || '#00e5ff',
            scene: null, group: null,
            hover: false, spd: 1, scl: 1,
            phase: Math.random() * Math.PI * 2,
            isCore: el.dataset.shape === 'core'
        });
    });

    function buildEntry(en) {
        en.scene = new THREE.Scene();
        en.group = (BUILDERS[en.shape] || BUILDERS.network)(en.color);
        en.group.children.forEach(ch => {
            ch.userData.tp = ch.position.clone();
            ch.userData.tr = ch.rotation.clone();
            ch.userData.ts = ch.scale.clone();
        });
        en.scene.add(en.group);
    }

    function scatterEntry(en, baseDelay = 0) {
        if (!en.group) return;
        const now = performance.now();
        en.group.children.forEach((ch, i) => {
            const u = ch.userData;
            if (!u.tp) return;
            u.fp = u.tp.clone().add(new THREE.Vector3().randomDirection().multiplyScalar(1.6 + Math.random() * 1.6));
            u.fr = new THREE.Euler(
                u.tr.x + (Math.random() - 0.5) * 3.4,
                u.tr.y + (Math.random() - 0.5) * 3.4,
                u.tr.z + (Math.random() - 0.5) * 3.4);
            u.t0 = now + baseDelay + i * 55;
            ch.position.copy(u.fp);
            ch.rotation.copy(u.fr);
            ch.scale.setScalar(0.001);
        });
    }

    function updateEntry(en, dt, now) {
        const g = en.group;
        g.children.forEach(ch => {
            const u = ch.userData;
            if (u.t0 === undefined || !u.tp) return;
            const k = clamp((now - u.t0) / (reduced ? 1 : 640), 0, 1);
            const e = easeOutBack(k);
            ch.position.lerpVectors(u.fp, u.tp, e);
            ch.rotation.set(
                u.fr.x + (u.tr.x - u.fr.x) * e,
                u.fr.y + (u.tr.y - u.fr.y) * e,
                u.fr.z + (u.tr.z - u.fr.z) * e);
            ch.scale.copy(u.ts).multiplyScalar(Math.max(0.001, e));
            if (k >= 1) {
                ch.position.copy(u.tp); ch.rotation.copy(u.tr); ch.scale.copy(u.ts);
                delete u.t0;
            }
        });
        // hover => accelerate (the "innovation boost")
        en.spd += ((en.hover ? 3.6 : 1) - en.spd) * Math.min(1, dt * 6);
        en.scl += ((en.hover ? 1.1 : 1) - en.scl) * Math.min(1, dt * 8);
        g.scale.setScalar(en.scl);
        g.rotation.y += dt * (reduced ? 0.05 : 0.55) * en.spd;
        g.position.y = Math.sin(now * 0.0011 + en.phase) * 0.07;
        if (en.isCore) {
            g.rotation.x += ((mouse.y * 0.4) - g.rotation.x) * Math.min(1, dt * 3);
            g.rotation.z += ((mouse.x * 0.12) - g.rotation.z) * Math.min(1, dt * 3);
        } else {
            g.rotation.x = 0.16 + Math.sin(now * 0.0006 + en.phase) * 0.1;
        }
    }

    /* ---------- panel viewer (own canvas, sits above the panel bg) ---------- */
    const panelCanvas = $('#panelCanvas');
    const pRenderer = new THREE.WebGLRenderer({ canvas: panelCanvas, alpha: true, antialias: true });
    pRenderer.setPixelRatio(DPR);
    const pScene = new THREE.Scene();
    const pCam = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    pCam.position.set(0, 0.3, 5.4);
    pCam.lookAt(0, 0, 0);
    let pEntry = null;

    function panelShow(shape, color) {
        if (pEntry) {
            pScene.remove(pEntry.group);
            pEntry.group.traverse(o => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
        }
        pEntry = {
            group: (BUILDERS[shape] || BUILDERS.network)(color),
            hover: false, spd: 1.4, scl: 1,
            phase: Math.random() * 6, isCore: false
        };
        pEntry.group.children.forEach(ch => {
            ch.userData.tp = ch.position.clone();
            ch.userData.tr = ch.rotation.clone();
            ch.userData.ts = ch.scale.clone();
        });
        pScene.add(pEntry.group);
        scatterEntry(pEntry, 60);
        const w = panelCanvas.parentElement.clientWidth || 560;
        const h = panelCanvas.parentElement.clientHeight || 220;
        pRenderer.setSize(w, h);
        pCam.aspect = w / h;
        pCam.updateProjectionMatrix();
    }
    function panelHide() { /* rendering stops automatically while closed */ }

    /* ---------- render loop ---------- */
    const vis = el => {
        const r = el.getBoundingClientRect();
        return (r.width > 12 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth) ? r : null;
    };

    function tick(dt, now) {
        // background
        stars.rotation.y += dt * 0.012;
        floor.position.z = (now * 0.0024) % floorCell;
        drifters.forEach((d, i) => {
            d.rotation.y += dt * 0.08 * (i + 1) * 0.4;
            d.rotation.x += dt * 0.05;
        });
        bgCam.position.x += (mouse.x * 1.6 - bgCam.position.x) * Math.min(1, dt * 2);
        bgCam.position.y += (2.2 - mouse.y * 1.1 - bgCam.position.y) * Math.min(1, dt * 2);
        bgCam.lookAt(0, 0, -10);
        bgRenderer.render(bgScene, bgCam);

        // prototypes
        fxRenderer.setScissorTest(false);
        fxRenderer.clear();
        if (!panelOpenId) {
            fxRenderer.setScissorTest(true);
            for (const en of entries) {
                const r = vis(en.el);
                if (!r) continue;
                if (!en.group) { buildEntry(en); scatterEntry(en, 80); }
                updateEntry(en, dt, now);
                const y = innerHeight - r.bottom;
                fxRenderer.setViewport(r.left, y, r.width, r.height);
                fxRenderer.setScissor(r.left, y, r.width, r.height);
                fxCam.aspect = r.width / r.height;
                fxCam.updateProjectionMatrix();
                fxRenderer.render(en.scene, fxCam);
            }
            fxRenderer.setScissorTest(false);
        } else if (pEntry) {
            updateEntry(pEntry, dt, now);
            pRenderer.render(pScene, pCam);
        }
    }

    window.addEventListener('resize', () => {
        bgRenderer.setSize(innerWidth, innerHeight);
        bgCam.aspect = innerWidth / innerHeight;
        bgCam.updateProjectionMatrix();
        fxRenderer.setSize(innerWidth, innerHeight);
        if (panelOpenId) {
            const w = panelCanvas.parentElement.clientWidth, h = panelCanvas.parentElement.clientHeight;
            pRenderer.setSize(w, h);
            pCam.aspect = w / h;
            pCam.updateProjectionMatrix();
        }
    });

    return {
        tick,
        panelShow,
        panelHide,
        setHover(holoEl, on) {
            const en = entries.find(e => e.el === holoEl);
            if (en) en.hover = on;
        },
        scatterRail(rail) {
            $$('.holo', rail).forEach((el, i) => {
                const en = entries.find(e => e.el === el);
                if (en?.group) scatterEntry(en, i * 70);
            });
        }
    };
}

/* ============================================================
   GLOBAL LOOP — drives 3D, auto-scroll & panel progress
   ============================================================ */
let lastT = performance.now();
let rafId = null;

function loop(now) {
    rafId = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;

    three?.tick(dt, now);

    if (panelOpenId) {
        const max = panelBody.scrollHeight - panelBody.clientHeight;
        if (auto.on && !reduced && now > auto.holdUntil && max > 4) {
            // track position locally — integer-only scrollTop browsers would
            // otherwise swallow sub-pixel increments and never move
            if (Math.abs(panelBody.scrollTop - auto.pos) > 2) auto.pos = panelBody.scrollTop;
            auto.pos = Math.min(auto.pos + 36 * dt, max); // news-feed crawl
            panelBody.scrollTop = auto.pos;
            if (auto.pos >= max - 1) { auto.on = false; setAutoBtn(); }
        }
        $('#panelProgress').style.width = max > 4 ? `${(panelBody.scrollTop / max) * 100}%` : '100%';
    }
}
rafId = requestAnimationFrame(loop);

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelAnimationFrame(rafId);
    } else {
        lastT = performance.now();
        rafId = requestAnimationFrame(loop);
    }
});
