function handleSubmit(e) {
    e.preventDefault();
    const service = document.getElementById('serviceSelect').value;
    const msg = document.getElementById('msgText').value;
    let text = 'مرحباً، أريد التواصل بخصوص خدمة ' + service;
    if (msg.trim()) text += '. ' + msg;
    const url = 'https://wa.me/972599763676?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
  }