let domanda = document.getElementById("domanda");
let risposta = document.getElementById("options");
let soluzione = document.getElementById("soluzione");
let rispondi = document.getElementById("rispondi");
let body = document.getElementsByClassName("modal-body")[0];
let modal_content = document.getElementsByClassName("modal-content")[0];
let SCALA = null;
let NR_VARIAZIONI = null;

let risposteTemplate1 = `
<label class="options">0<input type="radio" name="0"><span class="checkmark"></span></label>
<label class="options">1<input type="radio" name="1"><span class="checkmark"></span></label>
<label class="options">2<input type="radio" name="2"><span class="checkmark"></span></label>
<label class="options">3<input type="radio" name="3"><span class="checkmark"></span></label>
<label class="options">4<input type="radio" name="4"><span class="checkmark"></span></label>
<label class="options">5<input type="radio" name="5"><span class="checkmark"></span></label>
<label class="options">6<input type="radio" name="6"><span class="checkmark"></span></label>
<label class="options">7<input type="radio" name="7"><span class="checkmark"></span></label>
`;

let risposteTemplate2 = `
<label class="options">DO♭<input type="radio" name="DO♭"><span class="checkmark"></span></label>
<label class="options">DO<input type="radio" name="DO"><span class="checkmark"></span></label>
<label class="options">DO#<input type="radio" name="DO#"><span class="checkmark"></span></label>
<label class="options">RE♭<input type="radio" name="RE♭"><span class="checkmark"></span></label>
<label class="options">RE<input type="radio" name="RE"><span class="checkmark"></span></label>
<label class="options">MI♭<input type="radio" name="MI♭"><span class="checkmark"></span></label>
<label class="options">MI<input type="radio" name="MI"><span class="checkmark"></span></label>
<label class="options">FA<input type="radio" name="FA"><span class="checkmark"></span></label>
<label class="options">FA#<input type="radio" name="FA#"><span class="checkmark"></span></label>
<label class="options">SOL♭<input type="radio" name="SOL♭"><span class="checkmark"></span></label>
<label class="options">SOL<input type="radio" name="SOL"><span class="checkmark"></span></label>
<label class="options">LA♭<input type="radio" name="LA♭"><span class="checkmark"></span></label>
<label class="options">LA<input type="radio" name="LA"><span class="checkmark"></span></label>
<label class="options">SI<input type="radio" name="SI"><span class="checkmark"></span></label>
<label class="options">SI♭<input type="radio" name="SI♭"><span class="checkmark"></span></label>

`;

const DATABASE = {
	scale: [
		{
			DO: 0,
		},
		{
			SOL: 1,
		},
		{
			FA: 1,
		},
		{
			RE: 2,
		},
		{
			"SI♭": 2,
		},
		{
			LA: 3,
		},
		{
			"MI♭": 3,
		},
		{
			MI: 4,
		},
		{
			"LA♭": 4,
		},
		{
			SI: 5,
		},
		{
			"RE♭": 5,
		},
		{
			"FA#": 6,
		},
		{
			"SOL♭": 6,
		},
		{
			"DO#": 7,
		},
		{
			"DO♭": 7,
		},
	],
};

getRandom = (range) => {
	return Math.floor(Math.random() * range);
};

getDomanda = () => {
	let rand = getRandom(DATABASE.scale.length);
	SCALA = Object.entries(DATABASE.scale[rand]);

	if (getRandom(2) === 0) {
		domanda.innerHTML = `Quante variazioni ha la scala di ${SCALA[0][0]} ?`;
		risposta.innerHTML = risposteTemplate1;
		rispondi.setAttribute("data-caso", "0");
	} else {
		domanda.innerHTML = `Quali scale hanno ${SCALA[0][1]} variazioni ?`;
		risposta.innerHTML = risposteTemplate2;
		rispondi.setAttribute("data-caso", "1");
	}
	
	let labels = document.getElementsByTagName("label");
	[].forEach.call(labels, (label) => {
		label.addEventListener("click", (e) => {
			e.preventDefault()
			let radio = label.getElementsByTagName("input")[0]
			if(radio.checked){
				e.stopImmediatePropagation()
				radio.classList.remove("active")
				radio.checked = false
			} else {
				radio.checked = true
			}
			console.log(radio)
		}) 
		
	});

};

//return an array of keys that match on a certain value
function getRes(obj, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == "object") {
			objects = objects.concat(getRes(obj[i], val));
		} else if (obj[i] == val) {
			objects.push(i);
		}
	}
	return objects;
}

$("#modale").on("show.bs.modal", function (event) {
	let caso = rispondi.getAttribute("data-caso");
	let inputs = document.getElementsByTagName("input");
	if (caso == 0) { // Domanda 0
		let arr_res = new Array();
		[].forEach.call(inputs, (el) => {
			if (el.checked) {
				arr_res.push(el.name);
			}
		});
      if(arr_res.length > 0){
         if (arr_res[0] == SCALA[0][1]) {
            modal_content.style.backgroundColor = "#4E9F3D";
            modal_content.style.color = "white";
            body.innerHTML = `<h2 class="w-100 text-center"><strong>Esatto Diocane!</strong></h2>`;
         } else {
            modal_content.style.backgroundColor = "#E94560";
            modal_content.style.color = "white";
            body.innerHTML = `<h2 class="w-100 text-center"><strong>Sbagliato dioporco!</strong></h2><hr><h3 class="text-center">La scala di ${SCALA[0][0]} ha ${SCALA[0][1]} variazioni</h3>`;
         }
      } else {
         modal_content.style.backgroundColor = "#E94560";
         modal_content.style.color = "white";
         body.innerHTML = `<h2 class="w-100 text-center"><strong>Sbagliato dioporco!</strong></h2><hr><h3 class="text-center">La scala di ${SCALA[0][0]} ha ${SCALA[0][1]} variazioni</h3>`;
      }
      
	} else { // Domanda 1
		let x = getRes(DATABASE, SCALA[0][1]);
		let arr_res = new Array();
		[].forEach.call(inputs, (el) => {
			if (el.checked) {
				arr_res.push(el.name);
			}
		});
		if (arr_res.length == 2) {
			console.log(x);
			if ((arr_res[0] === x[0] || arr_res[0] === x[1]) && (arr_res[1] === x[0] || arr_res[1] === x[1])) {
				modal_content.style.backgroundColor = "#4E9F3D";
				modal_content.style.color = "white";
				body.innerHTML = `<h2 class="w-100 text-center"><strong>Esatto Diocane!</strong></h2>`;
			} else {
				modal_content.style.backgroundColor = "#E94560";
				modal_content.style.color = "white";
				body.innerHTML = `<h2 class="w-100 text-center"><strong>Sbagliato dioporco!</strong></h2><hr><h3 class="text-center">Le scale che hanno ${SCALA[0][1]} variazioni sono ${x[0]} , ${x[1]}</h3>`;
			}
		} else {
			modal_content.style.backgroundColor = "#E94560";
			modal_content.style.color = "white";
			if (SCALA[0][1] != 0) {
				body.innerHTML = `<h2 class="w-100 text-center"><strong>Sbagliato dioporco!</strong></h2><hr><h3 class="text-center">Le scale che hanno ${SCALA[0][1]} variazioni sono ${x[0]} , ${x[1]}</h3>`;
			} else {
				body.innerHTML = `<h2 class="w-100 text-center"><strong>Ma dai diocane ohhhhh!</strong></h2><hr><h3 class="text-center">Le scala che ha ${SCALA[0][1]} variazione è ${x[0]} , lo so pur'io</h3>`;
			}
		}
	}
});

$("#modale").on("hide.bs.modal", function (event) {
	rispondi.removeAttribute("data-caso");
	rispondi.removeAttribute("data-domanda");
	body.innerHTML = "\n";
	getDomanda();
});

init = () => {
	getDomanda();
};

init();
