import { getProject, types as t } from '@theatre/core';
// import studio from '@theatre/studio';
import state from './state.json';

// studio.initialize();
const project = getProject('Jumping Balls', { state });
function makeBouncingBox(i) {
  const boxContainer = document.createElement('div');
  boxContainer.className = 'boxContainer';
  document.getElementById('space').appendChild(boxContainer);

  const sheet = project.sheet('Table', 'Instance ' + i);
  const boxObj = sheet.object('Box', {
    y: 0,
    stretch: t.number(1, { nudgeMultiplier: 0.01 }),
  });

  const boxDiv = document.createElement('div');
  boxDiv.className = `box `;
  boxContainer.appendChild(boxDiv);
  boxDiv.addEventListener('click', () => {
    sheet.sequence.play({ iterationCount: Infinity });
  });

  boxObj.onValuesChange(({ y, stretch }) => {
    boxDiv.style.transform = `translateY(${-y}px) scale(${1 / stretch}, ${stretch})`;
  });

  const dustDiv = document.createElement('div');
  dustDiv.className = `dust`;
  boxContainer.appendChild(dustDiv);

  const dustObj = sheet.object('Dust', {
    opacity: t.number(1, { nudgeMultiplier: 0.01 }),
    scaleX: t.number(1, { nudgeMultiplier: 0.01 }),
  });
  dustObj.onValuesChange(({ opacity, scaleX }) => {
    dustDiv.style.opacity = String(opacity);
    dustDiv.style.transform = `scaleX(${scaleX})`;
  });
}

makeBouncingBox(1);
makeBouncingBox(2);
makeBouncingBox(3);
