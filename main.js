// Mobile menu
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = open ? 'Close' : 'Menu';
  });
})();

// Close the drop-down menu when clicking elsewhere or pressing Escape
(function () {
  var groups = document.querySelectorAll('.nav-group');
  document.addEventListener('click', function (e) {
    groups.forEach(function (g) { if (!g.contains(e.target)) g.removeAttribute('open'); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') groups.forEach(function (g) { g.removeAttribute('open'); });
  });
})();

// Blog category filter
(function () {
  var bar = document.querySelector('.filters');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button');
  var items = document.querySelectorAll('.post-item');
  var empty = document.querySelector('.filter-empty');
  function apply(cat) {
    var shown = 0;
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cat === cat ? 'true' : 'false'); });
    items.forEach(function (it) {
      var match = cat === 'all' || it.dataset.cat === cat;
      it.hidden = !match;
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }
  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.dataset.cat);
      history.replaceState(null, '', b.dataset.cat === 'all' ? location.pathname : '#' + b.dataset.cat);
    });
  });
  var start = location.hash.replace('#', '');
  var valid = Array.prototype.some.call(buttons, function (b) { return b.dataset.cat === start; });
  apply(valid ? start : 'all');
})();

// Publications from ORCID (public API, no login needed)
(function () {
  var box = document.getElementById('orcid-works');
  if (!box) return;
  var id = box.dataset.orcid;
  var status = document.getElementById('orcid-status');
  fetch('https://pub.orcid.org/v3.0/' + id + '/works', { headers: { 'Accept': 'application/json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) {
      var works = (data.group || []).map(function (g) {
        var w = g['work-summary'][0];
        var doi = '';
        var ids = (w['external-ids'] && w['external-ids']['external-id']) || [];
        ids.forEach(function (x) { if (x['external-id-type'] === 'doi' && !doi) doi = x['external-id-value']; });
        var d = w['publication-date'] || {};
        return {
          title: w.title && w.title.title ? w.title.title.value : 'Untitled',
          journal: w['journal-title'] ? w['journal-title'].value : '',
          year: d && d.year ? d.year.value : '',
          type: (w.type || '').replace(/-/g, ' '),
          doi: doi,
          url: w.url ? w.url.value : ''
        };
      });
      works.sort(function (a, b) { return (b.year || 0) - (a.year || 0); });
      if (!works.length) { status.textContent = 'No public works found on ORCID yet.'; return; }
      status.textContent = works.length + ' works listed on ORCID, newest first.';
      works.forEach(function (w) {
        var li = document.createElement('li');
        var t = document.createElement('span'); t.className = 'pub-title'; t.textContent = w.title;
        var m = document.createElement('span'); m.className = 'pub-meta';
        m.textContent = [w.journal, w.year, w.type].filter(Boolean).join(', ');
        li.appendChild(t); li.appendChild(m);
        var link = w.doi ? 'https://doi.org/' + w.doi : w.url;
        if (link) {
          var p = document.createElement('div'); p.className = 'pub-links';
          var a = document.createElement('a'); a.href = link; a.textContent = w.doi ? 'DOI: ' + w.doi : 'View';
          p.appendChild(a); li.appendChild(p);
        }
        box.appendChild(li);
      });
    })
    .catch(function () {
      status.innerHTML = 'The list could not be loaded right now. <a href="https://orcid.org/' + id + '">View all publications on ORCID</a>.';
    });
})();

// Contact form: opens the visitor's email app with the message filled in
(function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements;
    var subject = '[' + f.topic.value + '] ' + f.subject.value;
    var body = f.message.value + '\n\n— ' + f.name.value + (f.affiliation.value ? ', ' + f.affiliation.value : '');
    location.href = 'mailto:' + form.dataset.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();

// Gallery lightbox
(function () {
  var dlg = document.querySelector('.lightbox');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var img = dlg.querySelector('img');
  var cap = dlg.querySelector('.lightbox-caption');
  document.querySelectorAll('.photo-open').forEach(function (b) {
    b.addEventListener('click', function () {
      img.src = b.dataset.src; img.alt = b.dataset.caption; cap.textContent = b.dataset.caption;
      dlg.showModal();
    });
  });
  dlg.querySelector('.lightbox-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();
