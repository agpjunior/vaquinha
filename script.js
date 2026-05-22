document.addEventListener("DOMContentLoaded", () => {
  // Dados dos exames
  const exams = [
    {
      title: "Teste ergométrico com laudo",
      clinic: "Clínica Cardiovasc – Teófilo Otoni",
      price: 200.0,
      extra: { label: "Taxista", value: 240.0 },
    },
    {
      title: "Radiografia do tórax",
      clinic: "Clínica MEDCENTER – Araçuaí",
      price: 125.0,
    },
    {
      title: "Radiografia panorâmica da coluna vertebral",
      clinic: "Clínica São Lucas",
      price: 400.0,
    },
    {
      title: "Exames laboratoriais",
      clinic: "Clínica Label – Araçuaí",
      price: 430.0,
    },
    {
      title: "Audiometria tonal e vocal",
      clinic: "Clínica Clarissa Jardim – Araçuaí",
      price: 250.0,
    },
    {
      title: "Exames neurológicos e eletroencefalograma",
      clinic: "Clínica MEDMaria – Araçuaí",
      price: 800.0,
    },
    {
      title: "Exames oftalmológicos e campo visual",
      clinic: "Clínica Dr. Kleber – Araçuaí",
      price: 650.0,
    },
    {
      title: "Ecografia de abdome total",
      clinic: "Clínica Unita – Araçuaí",
      price: 250.0,
    },
    {
      title: "Consulta psiquiátrica",
      clinic: "Clínica Vitória – Araçuaí",
      price: 400.0,
    },
  ];

  // Simulação de valor já arrecadado (pode ser ajustado)
  let amountRaised = 2256.25;

  const examsListContainer = document.getElementById("exams-list");
  const amountRaisedEl = document.getElementById("amount-raised");
  const totalGoalEl = document.getElementById("total-goal");
  const progressBarEl = document.getElementById("progress-bar");
  const progressPercentageEl = document.getElementById("progress-percentage");
  const remainingAmountEl = document.getElementById("remaining-amount");
  const copyPixBtn = document.getElementById("copy-pix");
  const copyMessage = document.getElementById("copy-message");
  const pixKeyValue = document.getElementById("pix-key-value");

  // Função para formatar moeda
  const formatCurrency = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // Calcular meta total
  let totalGoal = 0;
  exams.forEach((exam) => {
    totalGoal += exam.price;
    if (exam.extra) {
      totalGoal += exam.extra.value;
    }
  });

  // Renderizar cards de exames
  exams.forEach((exam, index) => {
    const card = document.createElement("div");
    card.className = "exam-card";
    card.style.animationDelay = `${index * 0.1}s`;

    let extraHtml = "";
    let itemTotal = exam.price;

    if (exam.extra) {
      extraHtml = `
                <div class="price-row">
                    <span>${exam.extra.label}:</span>
                    <span>${formatCurrency(exam.extra.value)}</span>
                </div>
            `;
      itemTotal += exam.extra.value;
    }

    card.innerHTML = `
            <h3>${exam.title}</h3>
            <div class="exam-clinic">
                <i class="fas fa-hospital"></i> ${exam.clinic}
            </div>
            <div class="exam-price-info">
                <div class="price-row">
                    <span>Valor:</span>
                    <span>${formatCurrency(exam.price)}</span>
                </div>
                ${extraHtml}
                <div class="price-row total">
                    <span>Total:</span>
                    <span>${formatCurrency(itemTotal)}</span>
                </div>
            </div>
        `;
    examsListContainer.appendChild(card);
  });

  // Atualizar barra de progresso e valores
  const updateProgress = () => {
    const percentage = Math.min((amountRaised / totalGoal) * 100, 100);
    const remaining = Math.max(totalGoal - amountRaised, 0);

    amountRaisedEl.textContent = formatCurrency(amountRaised);
    totalGoalEl.textContent = formatCurrency(totalGoal);
    progressBarEl.style.width = `${percentage}%`;
    progressPercentageEl.textContent = `${percentage.toFixed(1)}% atingido`;
    remainingAmountEl.textContent =
      remaining > 0
        ? `Faltam ${formatCurrency(remaining)} para atingirmos a meta`
        : "Meta atingida! Muito obrigado!";
  };

  updateProgress();

  // Funcionalidade de copiar chave PIX
  copyPixBtn.addEventListener("click", () => {
    const key = pixKeyValue.textContent;
    navigator.clipboard
      .writeText(key)
      .then(() => {
        copyMessage.style.display = "block";
        setTimeout(() => {
          copyMessage.style.display = "none";
        }, 3000);
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err);
      });
  });

  // Botão de contribuir (scroll suave para a seção de doação)
  document
    .getElementById("btn-contribute-main")
    .addEventListener("click", () => {
      document
        .querySelector(".donation-section")
        .scrollIntoView({ behavior: "smooth" });
    });
});
