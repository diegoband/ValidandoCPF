const recebeCpf = document.querySelector('.numero-cpf');
const botaoCpf = document.querySelector('.botao-input')

botaoCpf.addEventListener('click', pegouCpf);
function pegouCpf() {
   const n1 = recebeCpf.value;
   return n1;
}


function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function() {
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;
    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
}
ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    const cpfArray = Array.from(cpfParcial);
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((acumulador, valor) => {
        acumulador += (regressivo * Number(valor));
        regressivo--;
        return acumulador;
    }, 0);
    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.lenght);
    return sequencia === this.cpfLimpo;
}

const cpfPego = pegouCpf();
const cpf = new ValidaCPF(cpfPego);


// if(cpf.valida()) {
//     console.log('Cpf valido');
// } else {
//     console.log('Cpf invalido');
// }





