document.addEventListener('DOMContentLoaded', function() {

  var ptsBox = document.getElementById('inputPts');
  var totBox = document.getElementById('inputTot');
  var comBox = document.getElementById('inputCom');
  var advBox = document.getElementById('inputAdv');
  var butRes = document.getElementById('butReset');
  var butLang = document.getElementById('butLang');
  var locale = localStorage.getItem('locale');
  ptsBox.addEventListener('input', Calculate, false);
  totBox.addEventListener('input', Calculate, false);
  comBox.addEventListener('input', Calculate, false);
  advBox.addEventListener('input', Calculate, false);
  butRes.addEventListener('click', Reset, false);
  butLang.addEventListener('click', ToggleLocale, false);
  
  loadValues();
  Calculate();
  DeployLocale(locale);
}, false);

function Calculate(){
	var input = Number(document.getElementById('inputPts').value);
	var reward = Math.ceil(input*1.9)
    document.getElementById('lblResult').innerHTML = reward;
	document.getElementById('lblResult2').innerHTML = reward*2;
	
	var ptsTotal = Number(document.getElementById('inputTot').value);
	var ptsComm = Number(document.getElementById('inputCom').value);
	var ptsAdv = Number(document.getElementById('inputAdv').value);

	var ptsRequired = Math.ceil((ptsTotal - ptsComm + ptsAdv) / 2);
	document.getElementById('lblResult3').innerHTML = ptsRequired;
	var profit = reward - ptsRequired;
	var profitLabel = document.getElementById('lblResult4');
	profitLabel.innerHTML = profit;
	
	//style profit label
	if (profit > 0) {
		profitLabel.style.color = "green";
	} else if (profit == 0) {
		profitLabel.style.color = "black";
	} else {
		profitLabel.style.color = "red";
	}
	
	var security = Math.ceil(ptsTotal - 2*reward)
	document.getElementById('lblSecurity').innerHTML = Math.max(security,0);
	
	saveValues(input,ptsTotal,ptsComm,ptsAdv);

}
function saveValues(reward, total, committed, adversary){
	localStorage.setItem('reward', reward);
	localStorage.setItem('total', total);
	localStorage.setItem('committed', committed);
	localStorage.setItem('adversary', adversary);	
}

function loadValues(){
	document.getElementById('inputPts').value = localStorage.getItem('reward');
	document.getElementById('inputTot').value = localStorage.getItem('total');
	document.getElementById('inputCom').value = localStorage.getItem('committed');
	document.getElementById('inputAdv').value = localStorage.getItem('adversary');
}

function Reset(){
	document.getElementById('inputPts').value = 0;
	document.getElementById('inputTot').value = 0;
	document.getElementById('inputCom').value = 0;
	document.getElementById('inputAdv').value = 0;
	Calculate();
}

function DeployLocale(lang){
	if (lang==0){
	
		document.getElementById('LBL_REWARD').innerHTML = "Reward of target position";
		document.getElementById('inputPts').title = "Reward of position you want to get";
		document.getElementById('LBL_TOTAL').innerHTML = "Total required for level";
		document.getElementById('inputTot').title = "Total points required for the GB in this level";
		document.getElementById('LBL_SEC').innerHTML = "Security for 1-2:";
		document.getElementById('LBL_CONTR').innerHTML = "Total contributed";
		document.getElementById('inputCom').title = "Total points currently contributed to the GB so far";
		document.getElementById('LBL_ADV').innerHTML = "Current points in position";
		document.getElementById('inputAdv').title = "Points currently contributed by the player holding the position you want";
		document.getElementById('LBL_REQ').innerHTML = "Required points:";
		document.getElementById('LBL_PROF').innerHTML = "Profit:";
		document.getElementById('butReset').innerHTML = "Reset";
		document.getElementById('butLang').style.backgroundImage = "url('gr.png')";
		
	} else {
		
		document.getElementById('LBL_REWARD').innerHTML = "Ανταμοιβή θέσης";
		document.getElementById('inputPts').title = "Ανταμοιβή για την θέση που στοχεύετε";
		document.getElementById('LBL_TOTAL').innerHTML = "Σύνολο πόντων επιπέδου";
		document.getElementById('inputTot').title = "Συνολικοί πόντοι που απαιτούνται για το ΜΚ σε αυτό το επίπεδο";
		document.getElementById('LBL_SEC').innerHTML = "Ασφάλεια για 1-2:";
		document.getElementById('LBL_CONTR').innerHTML = "Σύνολο συνεισφορών";
		document.getElementById('inputCom').title = "Συνολικοί πόντοι συνεισφοράς στο ΜΚ έως τώρα";
		document.getElementById('LBL_ADV').innerHTML = "Συνεισφορά στην θέση";
		document.getElementById('inputAdv').title = "Πόντοι συνεισφοράς του παίκτη που κατέχει την θέση που επιθυμείτε";
		document.getElementById('LBL_REQ').innerHTML = "Απαιτούμενοι πόντοι:";
		document.getElementById('LBL_PROF').innerHTML = "Κέρδος:";
		document.getElementById('butLang').style.backgroundImage = "url('en.png')";
		
	}
}

function ToggleLocale(){
	var locale = localStorage.getItem('locale');
	if (locale == 0){
		localStorage.setItem('locale', 1);
	} else {
		localStorage.setItem('locale', 0);
	}
	DeployLocale(localStorage.getItem('locale'));
}