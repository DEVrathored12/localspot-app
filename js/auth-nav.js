/* auth-nav.js — shared auth-aware navbar for all public pages */
(function () {
  const token = localStorage.getItem('token');
  const user  = JSON.parse(localStorage.getItem('user') || 'null');
  const navActions = document.getElementById('navActions');
  if (!navActions) return;

  if (token && user) {
    const initials  = (user.name || 'U').slice(0, 2).toUpperCase();
    const avatarSrc = user.avatar || '';
    const avatarHTML = avatarSrc
      ? `<img src="${avatarSrc}" style="width:34px;height:34px;border-radius:50%;object-fit:cover;flex-shrink:0" />`
      : `<div style="width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#1a3c6e,#2d5fa6);color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0">${initials}</div>`;
    const panelAvatarHTML = avatarSrc
      ? `<img id="panelAvatarImg" src="${avatarSrc}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.6);cursor:pointer" title="Click to change photo" onclick="document.getElementById('avatarFileInput').click()" />`
      : `<div id="panelAvatarImg" style="width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.2);border:3px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#fff;cursor:pointer" title="Click to upload photo" onclick="document.getElementById('avatarFileInput').click()">${initials}</div>`;

    navActions.innerHTML = `
      <input type="file" id="avatarFileInput" accept="image/*" style="display:none" />
      <div style="position:relative;display:flex;align-items:center">
        <button id="navSearchBtn" style="width:36px;height:36px;border-radius:50%;border:1px solid var(--grey-200);background:var(--grey-50);color:var(--grey-600);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;margin-right:8px;transition:all 0.2s" onmouseover="this.style.background='var(--red-light)';this.style.color='var(--red)'" onmouseout="this.style.background='var(--grey-50)';this.style.color='var(--grey-600)'">
          <i class="fas fa-search"></i>
        </button>
        <div id="navSearchBox" style="display:none;position:absolute;right:48px;top:50%;transform:translateY(-50%);background:#fff;border:1.5px solid var(--red);border-radius:100px;padding:6px 16px;box-shadow:0 4px 20px rgba(0,0,0,0.1);align-items:center;gap:8px;width:240px">
          <i class="fas fa-search" style="color:var(--grey-400);font-size:13px;flex-shrink:0"></i>
          <input id="navSearchInput" type="text" placeholder="Search shops..." style="border:none;outline:none;font-size:13px;width:100%;background:transparent;color:var(--black)" onkeydown="if(event.key==='Enter'){window.location.href='shops.html?q='+encodeURIComponent(this.value)}">
        </div>
      </div>
      <div style="position:relative">
        <button id="navProfileBtn" style="display:flex;align-items:center;gap:8px;padding:4px 12px 4px 4px;border-radius:100px;background:var(--grey-50);border:1px solid var(--grey-200);cursor:pointer;transition:box-shadow 0.2s" onmouseover="this.style.boxShadow='var(--shadow-md)'" onmouseout="this.style.boxShadow='none'">
          ${avatarHTML}
          <span style="font-size:13px;font-weight:600;color:var(--black)">${(user.name||'').split(' ')[0]}</span>
          <i class="fas fa-chevron-down" style="font-size:9px;color:var(--grey-400)"></i>
        </button>

        <div id="navProfilePanel" style="display:none;position:absolute;right:0;top:calc(100% + 10px);width:280px;background:#fff;border:1px solid var(--grey-200);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,0.14);z-index:2000;overflow:hidden">
          <div style="background:linear-gradient(135deg,#1a3c6e,#2d5fa6);padding:20px;text-align:center;position:relative">
            ${panelAvatarHTML}
            <div style="position:absolute;bottom:22px;left:50%;margin-left:22px;width:22px;height:22px;background:#c9a84c;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px solid #fff" onclick="document.getElementById('avatarFileInput').click()" title="Change photo">
              <i class="fas fa-camera" style="font-size:9px;color:#fff"></i>
            </div>
            <div style="font-size:15px;font-weight:700;color:#fff;margin-top:10px">${user.name || 'User'}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.65);text-transform:capitalize;margin-top:2px">${user.role || 'customer'}</div>
          </div>
          <div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--grey-50);border-radius:10px">
              <i class="fas fa-envelope" style="color:var(--red);font-size:13px;width:16px"></i>
              <div><div style="font-size:10px;font-weight:700;color:var(--grey-400);text-transform:uppercase;letter-spacing:0.5px">Email</div>
              <div style="font-size:13px;color:var(--black);font-weight:500">${user.email || '—'}</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--grey-50);border-radius:10px">
              <i class="fas fa-phone" style="color:var(--red);font-size:13px;width:16px"></i>
              <div><div style="font-size:10px;font-weight:700;color:var(--grey-400);text-transform:uppercase;letter-spacing:0.5px">Phone</div>
              <div style="font-size:13px;color:var(--black);font-weight:500">${user.phone || '—'}</div></div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--grey-50);border-radius:10px">
              <i class="fas fa-map-marker-alt" style="color:var(--red);font-size:13px;width:16px"></i>
              <div><div style="font-size:10px;font-weight:700;color:var(--grey-400);text-transform:uppercase;letter-spacing:0.5px">Address</div>
              <div style="font-size:13px;color:var(--black);font-weight:500">${user.address || '—'}</div></div>
            </div>
          </div>
          <div id="avatarUploadStatus" style="display:none;padding:0 16px 8px;font-size:12px;text-align:center;color:var(--grey-400)"></div>
          <div style="padding:0 16px 16px">
            <button onclick="localStorage.clear();window.location.href='login.html'" style="width:100%;padding:11px;border-radius:10px;border:1.5px solid #e63946;background:#fff;color:#e63946;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:background 0.2s" onmouseover="this.style.background='#fff5f5'" onmouseout="this.style.background='#fff'">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>`;

    // Avatar upload
    document.getElementById('avatarFileInput').addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) {
        document.getElementById('avatarUploadStatus').style.display = 'block';
        document.getElementById('avatarUploadStatus').textContent = 'Image too large (max 2MB)';
        return;
      }
      const reader = new FileReader();
      reader.onload = async function (e) {
        const base64 = e.target.result;
        const status = document.getElementById('avatarUploadStatus');
        status.style.display = 'block';
        status.textContent = 'Uploading...';
        try {
          const API = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000/api' : 'https://localspot-ngn1.onrender.com/api';
          const res  = await fetch(`${API}/auth/avatar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ avatar: base64 })
          });
          const data = await res.json();
          if (data.success) {
            // Update localStorage
            const u = JSON.parse(localStorage.getItem('user') || '{}');
            u.avatar = data.avatar;
            localStorage.setItem('user', JSON.stringify(u));
            // Update all avatar images on screen without reload
            const img = `<img src="${data.avatar}" style="width:34px;height:34px;border-radius:50%;object-fit:cover;flex-shrink:0" />`;
            document.getElementById('navProfileBtn').querySelector('div,img').outerHTML = img;
            const panel = document.getElementById('panelAvatarImg');
            panel.outerHTML = `<img id="panelAvatarImg" src="${data.avatar}" style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.6);cursor:pointer" onclick="document.getElementById('avatarFileInput').click()" />`;
            status.style.color = '#27ae60';
            status.textContent = 'Photo updated!';
            setTimeout(() => { status.style.display = 'none'; status.style.color = 'var(--grey-400)'; }, 2000);
          } else {
            status.textContent = data.message || 'Upload failed';
          }
        } catch { status.textContent = 'Upload failed. Try again.'; }
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('navProfileBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      const p = document.getElementById('navProfilePanel');
      p.style.display = p.style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('navSearchBtn').addEventListener('click', function (e) {
      e.stopPropagation();
      const box = document.getElementById('navSearchBox');
      const open = box.style.display === 'flex';
      box.style.display = open ? 'none' : 'flex';
      if (!open) setTimeout(() => document.getElementById('navSearchInput').focus(), 50);
      document.getElementById('navProfilePanel').style.display = 'none';
    });
    document.addEventListener('click', function () {
      const p   = document.getElementById('navProfilePanel');
      const box = document.getElementById('navSearchBox');
      if (p)   p.style.display   = 'none';
      if (box) box.style.display = 'none';
    });
    document.getElementById('navSearchBox').addEventListener('click', e => e.stopPropagation());

    const ml = document.getElementById('mobileLoginLink') || document.getElementById('mobileLoginItem');
    const mr = document.getElementById('mobileRegisterLink') || document.getElementById('mobileRegisterItem');
    if (ml) ml.style.display = 'none';
    if (mr) mr.style.display = 'none';
  }
})();
