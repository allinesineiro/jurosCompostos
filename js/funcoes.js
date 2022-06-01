function formatarValor(valor) {
	return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function precisaJuntar() {
	let receberMensalmente = (document.getElementById("receberMensalmente").value);
	let temGuardado = (document.getElementById("temGuardado").value);

	let receberMensalmenteFormatado = receberMensalmente.replace(".", "");
	let temGuardadoFormatado = temGuardado.replace(".", "");

	let protegeInflacao = document.getElementById("protegerInflacao");
	let resultado;

		if (protegeInflacao.checked) {
			resultado = ((parseInt(receberMensalmenteFormatado) * 6) / 0.02512855) - parseInt(temGuardadoFormatado);
		} else {
			resultado = ((parseInt(receberMensalmenteFormatado) * 6) / 41.487565) * 1000 - parseInt(temGuardadoFormatado);
		}

	//taxa de juros ntn-f TESOURO PREFIXADO com juros semestrais 2031
	var inflacaoEsperada = document.getElementById('inflacaoEsperada').value;
	var taxaJuros = Math.pow((1 + 0.1083) / (1 + parseInt(inflacaoEsperada) / 100), 1 / 12) - 1;
	var tempoIndependencia = (document.getElementById('tempoIndependencia').value * 12);
	var valorPresente = parseInt(temGuardadoFormatado);
	var valorFuturo = -resultado;
	var tipo = 1;
		
	var pmt = devePoupar(taxaJuros, tempoIndependencia, valorPresente, valorFuturo, tipo);
	document.getElementById("mostraResultado").value = formatarValor(pmt)

	resultado = formatarValor(resultado);
	document.getElementById("juntarTotal").value = resultado

		function devePoupar(taxaJuros, tempoIndependencia, valorPresente, valorFuturo, tipo) {
			var pmt, pvif;

			tipo || (tipo = 0);

				if (taxaJuros === 0)
					return -(valorPresente + valorFuturo) / tempoIndependencia;

				pvif = Math.pow(1 + taxaJuros, tempoIndependencia);
				pmt = (taxaJuros * -1) * (valorPresente * pvif + valorFuturo) / (pvif - 1);

					return Math.abs(pmt);
			};
};

function maskIt(w,e,m,r,a){
	// Cancela se o evento for Backspace
	if (!e) var e = window.event
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	// Variáveis da função
	var txt  = (!r) ? w.value.replace(/[^\d]+/gi,'') : w.value.replace(/[^\d]+/gi,'').reverse();
	var mask = (!r) ? m : m.reverse();
	var pre  = (a ) ? a.pre : "";
	var pos  = (a ) ? a.pos : "";
	var ret  = "";
		if(code == 9 || code == 8 || txt.length == mask.replace(/[^#]+/g,'').length) return false;
	// Loop na máscara para aplicar os caracteres
		for(var x=0,y=0, z=mask.length;x<z && y<txt.length;){
		if(mask.charAt(x)!='#'){
		ret += mask.charAt(x); x++; } 
		else {
		ret += txt.charAt(y); y++; x++; } }
		// Retorno da função
		ret = (!r) ? ret : ret.reverse()	
		w.value = pre+ret+pos; }
		// Novo método para o objeto 'String'
		String.prototype.reverse = function(){
		return this.split('').reverse().join(''); };

		// <script language="javascript">
		function number_format( number, decimals, dec_point, thousands_sep ) {
		var n = number, c = isNaN(decimals = Math.abs(decimals)) ? 2 : decimals;
		var d = dec_point == undefined ? "," : dec_point;
		var t = thousands_sep == undefined ? "." : thousands_sep, s = n < 0 ? "-" : "";
		var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
		return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function consultarTaxa() {
	
}