const wheel = new Winwheel({
  canvasId: 'wheelCanvas',
  numSegments: 8,
  outerRadius: 230,
  textFontSize: 18,
  textOrientation: 'horizontal',
  textAlignment: 'outer',
  segments: [
    { fillStyle: '#FF6384', text: 'Carregador Turbo' },
    { fillStyle: '#36A2EB', text: 'Película' },
    { fillStyle: '#FFCE56', text: '10% Desconto' },
    { fillStyle: '#4BC0C0', text: 'Capinha' },
    { fillStyle: '#CCCCCC', text: 'Passou a vez' },
    { fillStyle: '#CCCCCC', text: 'Passou a vez' },
    { fillStyle: '#CCCCCC', text: 'Passou a vez' },
    { fillStyle: '#CCCCCC', text: 'Passou a vez' }
  ],
  animation: {
    type: 'spinToStop',
    duration: 5,
    spins: 7,
    callbackFinished: function (segment) {
      document.getElementById('result').textContent = 'Resultado: ' + segment.text;
      document.getElementById('spinBtn').disabled = false;
    }
  }
});

document.getElementById('spinBtn').addEventListener('click', () => {
  document.getElementById('spinBtn').disabled = true;

  const rand = Math.random();
  let prize;

  if (rand < 0.05) prize = 'Carregador Turbo';
  else if (rand < 0.10) prize = 'Película';
  else if (rand < 0.15) prize = '10% Desconto';
  else if (rand < 0.20) prize = 'Capinha';
  else prize = 'Passou a vez';

  const index = wheel.segments.findIndex(s => s.text === prize) + 1;

  wheel.stopAnimation(false);
  wheel.rotationAngle = 0;
  wheel.draw();

  const stopAt = wheel.getRandomForSegment(index);
  wheel.animation.stopAngle = stopAt;

  wheel.startAnimation();
});
