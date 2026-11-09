'use strict';
(() => {
  const code = (new URLSearchParams(location.search).get('code') || '').toLowerCase();
  const status = document.getElementById('status');
  if (!/^[0-9a-f]{32}$/.test(code)) {
    document.getElementById('intro').textContent = 'Ask your friend to share a new invite link from People in Out Again.';
    document.getElementById('instructions').hidden = true;
    status.textContent = 'This invite link is invalid.';
    return;
  }
  const link = new URL('/invite/', location.origin);
  link.searchParams.set('code', code);
  const open = document.getElementById('open');
  open.href = 'outagain://invite?code=' + code;
  open.hidden = false;
  const copy = document.getElementById('copy');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.href);
      status.textContent = 'Link copied. Reopen it after installing Out Again.';
      copy.textContent = 'Invite link copied';
    } catch {
      status.textContent = 'Copy this page’s address from your browser, then reopen it after installing Out Again.';
    }
  });
})();
