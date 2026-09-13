// CyberGuard — comportamento compartilhado

document.addEventListener('DOMContentLoaded', function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Checklist de segurança (apenas presente em checklist.html)
  var checklist = document.querySelector('[data-checklist]');
  if (checklist) {
    var boxes = checklist.querySelectorAll('input[type="checkbox"]');
    var scoreNumber = document.querySelector('[data-score-number]');
    var scoreTitle = document.querySelector('[data-score-title]');
    var scoreText = document.querySelector('[data-score-text]');

    var messages = [
      {
        min: 0,
        title: 'Ponto de partida',
        text: 'Sua conta ainda está exposta a golpes comuns. Comece pelos itens não marcados acima — cada um reduz um risco real.'
      },
      {
        min: 4,
        title: 'No caminho certo',
        text: 'Você já cobre o básico, mas ainda há brechas. Revise os itens pendentes, principalmente os de senha e autenticação.'
      },
      {
        min: 7,
        title: 'Boa postura de segurança',
        text: 'A maior parte das ameaças do dia a dia já está coberta. Vale revisar esta lista a cada poucos meses.'
      },
      {
        min: 9,
        title: 'Postura sólida',
        text: 'Você segue praticamente todas as boas práticas listadas aqui. Continue atento — golpes novos aparecem o tempo todo.'
      }
    ];

    function update() {
      var checked = 0;
      boxes.forEach(function (b) { if (b.checked) checked++; });
      var total = boxes.length;
      scoreNumber.textContent = checked + '/' + total;

      var current = messages[0];
      messages.forEach(function (m) { if (checked >= m.min) current = m; });
      scoreTitle.textContent = current.title;
      scoreText.textContent = current.text;

      try {
        var state = {};
        boxes.forEach(function (b) { state[b.id] = b.checked; });
        localStorage.setItem('cyberguard-checklist', JSON.stringify(state));
      } catch (e) { /* localStorage indisponível — segue sem persistência */ }
    }

    try {
      var saved = JSON.parse(localStorage.getItem('cyberguard-checklist') || '{}');
      boxes.forEach(function (b) { if (saved[b.id]) b.checked = true; });
    } catch (e) { /* ignora */ }

    boxes.forEach(function (b) { b.addEventListener('change', update); });
    update();
  }
});
