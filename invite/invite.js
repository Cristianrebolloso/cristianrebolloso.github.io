'use strict';
(() => {
  const code = (new URLSearchParams(location.search).get('code') || '').toLowerCase();
  const status = document.getElementById('status');
  if (!/^[0-9a-f]{32}$/.test(code)) {
    document.getElementById('intro').textContent = 'Ask your friend to share a new invite link from People in Out Again.';
    document.getElementById('instructions').hidden = true;
    status.textContent = 'This link is missing a valid invite code.';
    return;
  }
  const link = new URL('/invite/', location.origin);
  link.searchParams.set('code', code);
  const open = document.getElementById('open');
  open.href = 'outagain://invite?code=' + code;
  open.hidden = false;
  const codeText = document.getElementById('code');
  codeText.textContent = code;
  codeText.hidden = false;
  const copy = document.getElementById('copy');
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(link.href);
      status.textContent = 'Copied. In Out Again, open People → Use code and paste the link.';
      copy.textContent = 'Invite link copied';
    } catch {
      status.textContent = 'Select and copy the code above, then paste it in Out Again under People → Use code.';
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeText);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
})();
