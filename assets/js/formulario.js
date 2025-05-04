// Seleciona o formulário e o botão
const form = document.getElementById("contato-form");
const submitButton = document.querySelector(".btn.btn-primary");

// Adiciona um evento de envio ao formulário
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Captura os valores dos campos
  const nome = document.getElementById("formulario-nome").value.trim();
  const email = document.getElementById("formulario-email").value.trim();
  const assunto = document.getElementById("formulario-assunto").value.trim();
  const mensagem = document.getElementById("formulario-mensagem").value.trim();

  // Validação básica dos campos
  if (!nome || !email || !assunto || !mensagem) {
    updateButtonState("Preencha todos os campos", "red");
    return;
  }

  // Atualiza o botão para o estado de "enviando"
  updateButtonState("...", "yellow", true);

  // Cria um objeto com os dados do formulário
  const formData = {
    nome: nome,
    email: email,
    assunto: assunto,
    mensagem: mensagem,
  };

  // Envia os dados para o FormSubmit
  fetch("https://formsubmit.co/ajax/campelo.cfc@gmail.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        updateButtonState("E-mail enviado com sucesso!", "green");
        form.reset(); // Limpa o formulário
      } else {
        updateButtonState("Erro ao enviar o e-mail", "red");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      updateButtonState("Erro ao enviar o e-mail", "red");
    })
    .finally(() => {
      // Após 7 segundos, o botão volta ao estado original
      setTimeout(() => {
        updateButtonState("Enviar", "", false);
      }, 7000);
    });
});

// Função para atualizar o estado do botão
function updateButtonState(text, color, disable = false) {
  submitButton.textContent = text; 
  submitButton.style.backgroundColor = color; 
  submitButton.disabled = disable;
}
