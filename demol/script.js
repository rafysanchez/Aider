// Configurações globais
let failedAttempts = 0;
const MAX_ATTEMPTS = 3;
let temp2FACode = null;

// Controle de abas
function switchTab(tabName) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`${tabName}Form`).classList.add('active');
    document.querySelector(`.tab[onclick="switchTab('${tabName}')"]`).classList.add('active');
}

// Controle de modais
function showRecovery() {
    document.getElementById('recoveryModal').style.display = 'flex';
}

function show2faSetup() {
    // Simular envio de código 2FA para o e-mail
    temp2FACode = Math.floor(100000 + Math.random() * 900000);
    document.getElementById('2faModal').style.display = 'flex';
}

function closeModal(modalType) {
    document.getElementById(`${modalType}Modal`).style.display = 'none';
}

// Login Social Simulado
function socialLogin(provider) {
    const feedback = createFeedback();
    feedback.textContent = `Conectando com ${provider}...`;
    
    setTimeout(() => {
        // Simular callback de sucesso
        if(Math.random() < 0.9) { // 10% de chance de erro
            feedback.textContent = `Autenticado via ${provider} com sucesso!`;
            window.location.href = '/dashboard'; // Simulação
        } else {
            feedback.textContent = `Falha ao conectar com ${provider}`;
        }
    }, 2000);
}

// Recuperação de Senha
document.getElementById('recoveryForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('recoveryEmail').value;
    // Simular envio de e-mail
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`Link de recuperação enviado para ${email} (simulado)`);
    closeModal('recovery');
});

// Verificação 2FA
function verify2fa() {
    const code = document.getElementById('2faCode').value;
    if(code === temp2FACode.toString()) {
        alert('Verificação 2FA bem-sucedida!');
        closeModal('2fa');
    } else {
        alert('Código inválido!');
    }
}

// Bloqueio por tentativas
function checkAttempts() {
    if(failedAttempts >= MAX_ATTEMPTS) {
        const btn = document.querySelector('.submit-btn');
        btn.disabled = true;
        setTimeout(() => {
            btn.disabled = false;
            failedAttempts = 0;
        }, 30000); // Bloqueio por 30 segundos
        alert('Muitas tentativas falhas. Tente novamente em 30 segundos.');
    }
}

// Validação de CAPTCHA
function validateCaptcha(formType) {
    const question = formType === 'login' ? 12 : 12; // Resposta correta
    const answer = parseInt(document.getElementById(`${formType}Captcha`).value);
    return !isNaN(answer) && answer === question;
}

// Atualização do submit de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if(!validateCaptcha('login')) {
        alert('Resposta anti-bot incorreta!');
        return;
    }

    // Simular verificação de credenciais
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if(Math.random() < 0.2) { // 20% de chance de erro
        failedAttempts++;
        checkAttempts();
        alert('Credenciais inválidas!');
    } else {
        failedAttempts = 0;
        show2faSetup(); // Forçar 2FA após login bem-sucedido
    }
});

// Validação de cadastro
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if(!validateCaptcha('signup')) {
        alert('Resposta anti-bot incorreta!');
        return;
    }

    // Simular cadastro e envio de e-mail de verificação
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    alert(`Código de verificação enviado por e-mail: ${verificationCode} (simulado)`);
    switchTab('login');
});

// ... existing validation functions ...

// Inicialização
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.textContent = input.type === 'password' ? '👁️' : '👁️';
    });
}); 