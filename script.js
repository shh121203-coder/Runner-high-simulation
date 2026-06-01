let chart = null;

const durationInput = document.getElementById("duration");
const durationValue = document.getElementById("durationValue");

durationInput.addEventListener("input", () => {
  durationValue.textContent = durationInput.value;
});

function gaussian(x, center, width, height) {
  return height * Math.exp(-Math.pow(x - center, 2) / (2 * Math.pow(width, 2)));
}

function runSimulation() {
  const duration = Number(document.getElementById("duration").value);
  const intensity = Number(document.getElementById("intensity").value);

  const time = [];
  const endorphin = [];
  const endocannabinoid = [];
  const dopamine = [];
  const serotonin = [];
  const cortisol = [];
  const runnerHighScore = [];

  for (let t = 0; t <= duration; t++) {
    time.push(t);

    const e1 = 50 + intensity * 35 * (1 - Math.exp(-t / 10));
    const e2 = 50 + intensity * gaussian(t, duration * 0.6, 6, 45);
    const d = 50 + intensity * gaussian(t, duration * 0.5, 8, 25);
    const s = 50 + intensity * 15 * (1 - Math.exp(-t / 20));
    const c = 50 + intensity * gaussian(t, duration * 0.35, 5, 20)
              - gaussian(t, duration * 0.8, 6, 10);

    const rhs =
      e1 * 0.25 +
      e2 * 0.35 +
      d * 0.2 +
      s * 0.15 -
      c * 0.1;

    endorphin.push(e1);
    endocannabinoid.push(e2);
    dopamine.push(d);
    serotonin.push(s);
    cortisol.push(c);
    runnerHighScore.push(rhs);
  }

  const maxScore = Math.max(...runnerHighScore);
  const bestIndex = runnerHighScore.indexOf(maxScore);
  const bestTime = time[bestIndex];

  document.getElementById("bestTime").textContent =
    `Runner's High Score가 가장 높은 시점은 운동 시작 후 약 ${bestTime}분입니다.`;

  document.getElementById("interpretation").textContent =
    "이 결과는 실제 호르몬 측정값이 아니라, 운동 시간과 강도에 따른 러너스 하이 관련 호르몬 변화 가설을 시각화한 시뮬레이션입니다. 따라서 러너스 하이를 증명하는 자료가 아니라, 정서 및 인지 변화와 비교하기 위한 예측 모델로 해석해야 합니다.";

  drawChart(time, endorphin, endocannabinoid, dopamine, serotonin, cortisol, runnerHighScore);
}

function drawChart(time, endorphin, endocannabinoid, dopamine, serotonin, cortisol, runnerHighScore) {
  const ctx = document.getElementById("hormoneChart");

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: time,
      datasets: [
        {
          label: "Endorphin",
          data: endorphin,
          borderWidth: 2
        },
        {
          label: "Endocannabinoid",
          data: endocannabinoid,
          borderWidth: 2
        },
        {
          label: "Dopamine",
          data: dopamine,
          borderWidth: 2
        },
        {
          label: "Serotonin",
          data: serotonin,
          borderWidth: 2
        },
        {
          label: "Cortisol",
          data: cortisol,
          borderWidth: 2
        },
        {
          label: "Runner's High Score",
          data: runnerHighScore,
          borderWidth: 4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Simulated Hormonal Changes Related to Runner's High"
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "운동 시작 후 시간(분)"
          }
        },
        y: {
          title: {
            display: true,
            text: "시뮬레이션 수치"
          }
        }
      }
    }
  });
}

runSimulation();
