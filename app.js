const state={step:0,answers:{budget:null,fuel:null,body:null,transmission:null,features:[],usage:null}};
const steps=[
 {key:"budget",title:"What is your budget?",hint:"We'll match the price range to your shortlist.",options:[["Under ₹8 lakh","0-800000"],["₹8–12 lakh","800000-1200000"],["₹12–18 lakh","1200000-1800000"],["₹18 lakh+","1800000-99999999"]]},
 {key:"fuel",title:"Which fuel type do you prefer?",hint:"Select what fits your running and charging needs.",options:[["Petrol","Petrol"],["Diesel","Diesel"],["CNG","CNG"],["Electric","Electric"],["Any","Any"]]},
 {key:"body",title:"What kind of car do you want?",hint:"Pick the body style that feels right.",options:[["SUV","SUV"],["Hatchback","Hatchback"],["Sedan","Sedan"],["EV","EV"],["Any","Any"]]},
 {key:"transmission",title:"Which transmission?",hint:"Automatic includes AMT, AT, DCT and IVT.",options:[["Manual","Manual"],["Automatic","Automatic"],["Any","Any"]]},
 {key:"features",title:"Which features matter most?",hint:"Choose one or more.",options:[["Safety","safety"],["Sunroof","sunroof"],["Connected tech","tech"],["Good mileage","mileage"],["Large boot","boot"],["Comfort","comfort"]],multi:true},
 {key:"usage",title:"How will you use the car?",hint:"This helps rank the best matches.",options:[["Mostly city","city"],["Highway / travel","highway"],["Family use","family"],["Mixed use","mixed"]]}
];
function money(n){return "₹"+n.toLocaleString("en-IN")}
function startWizard(){document.getElementById("discover").scrollIntoView({behavior:"smooth"});renderStep()}
function renderStep(){
 const s=steps[state.step], body=document.getElementById("wizardBody");
 document.getElementById("stepLabel").textContent=`Step ${state.step+1} of 6`;
 document.getElementById("stepHint").textContent=s.hint;
 document.getElementById("progressBar").style.width=`${((state.step+1)/6)*100}%`;
 document.getElementById("backBtn").style.visibility=state.step?"visible":"hidden";
 document.getElementById("nextBtn").textContent=state.step===5?"Show my cars →":"Continue →";
 body.innerHTML=`<div class="wizard-question">${s.title}</div><div class="option-grid">${s.options.map(o=>`<button class="option" data-value="${o[1]}" onclick="selectOption(this,'${o[1]}',${!!s.multi})"><b>${o[0]}</b><small>${s.multi?"Add to your priorities":"Select this option"}</small></button>`).join("")}</div>`;
 if(state.answers[s.key]) {
   const vals=Array.isArray(state.answers[s.key])?state.answers[s.key]:[state.answers[s.key]];
   body.querySelectorAll(".option").forEach(el=>{if(vals.includes(el.dataset.value))el.classList.add("selected")});
 }
}
function selectOption(el,value,multi){
 const key=steps[state.step].key;
 if(multi){
   if(!Array.isArray(state.answers[key]))state.answers[key]=[];
   state.answers[key]=state.answers[key].includes(value)?state.answers[key].filter(v=>v!==value):[...state.answers[key],value];
   el.classList.toggle("selected");
 }else{state.answers[key]=value;el.parentElement.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));el.classList.add("selected")}
}
function nextStep(){
 const key=steps[state.step].key;
 if((Array.isArray(state.answers[key])&&state.answers[key].length===0)||(!Array.isArray(state.answers[key])&&!state.answers[key])){toast("Choose an option to continue.");return}
 if(state.step<5){state.step++;renderStep()}else showResults();
}
function prevStep(){if(state.step>0){state.step--;renderStep()}}
function scoreCar(car){
 let score=0, reasons=[];
 const a=state.answers;
 if(a.body==="Any"||a.body===car.body){score+=25;reasons.push("body type")}
 if(a.fuel==="Any"||car.fuels.includes(a.fuel)){score+=20;reasons.push("fuel")}
 if(a.transmission==="Any"||(a.transmission==="Automatic"&&car.transmissions.some(x=>["AMT","AT","DCT","IVT","Automatic"].includes(x)))||car.transmissions.includes(a.transmission)){score+=15;reasons.push("transmission")}
 if(a.usage&&car.scoreTags.includes(a.usage)){score+=15;reasons.push("usage")}
 if(a.features?.includes("tech")&&car.scoreTags.includes("tech")){score+=8;reasons.push("technology")}
 if(a.features?.includes("safety")){score+=7;reasons.push("safety")}
 if(a.features?.includes("mileage")&&(car.fuels.includes("CNG")||car.fuels.includes("Electric"))){score+=5;reasons.push("efficiency")}
 const [lo,hi]=a.budget.split("-").map(Number); if(car.priceMin<=hi&&car.priceMax>=lo){score+=10;reasons.push("budget")}
 return {score:Math.min(99,score),reasons};
}
function showResults(){
 const scored=CARS.map(c=>({...c,match:scoreCar(c)})).sort((a,b)=>b.match.score-a.match.score);
 const [lo,hi]=state.answers.budget.split("-").map(Number);
 document.getElementById("resultSummary").innerHTML=`Showing matches for <b>${money(lo)}${hi>50000000?"+":(" – "+money(hi))}</b> · ${state.answers.fuel} · ${state.answers.body} · ${state.answers.transmission}`;
 document.getElementById("resultsGrid").innerHTML=scored.map(carCard).join("");
 document.getElementById("results").classList.remove("hidden");
 document.getElementById("results").scrollIntoView({behavior:"smooth"});
}
function carCard(c){
 return `<article class="car-card"><div class="car-image"><span>${c.brand} ${c.model}</span><b class="match">${c.match?.score||"Top"}% MATCH</b></div><div class="card-body"><div class="card-brand">${c.brand}</div><div class="card-title">${c.model}</div><div class="price">${money(c.priceMin)} onwards</div><div class="specs">${c.fuels.map(x=>`<span class="spec">${x}</span>`).join("")}<span class="spec">${c.seats} seats</span><span class="spec">${c.body}</span></div><p class="muted">${c.summary}</p><div class="card-actions"><button class="btn btn-primary" onclick="viewCar('${c.id}')">View car</button><button class="btn btn-ghost" onclick="addCompare('${c.id}')">Compare</button></div></div></article>`
}
function renderFeatured(){document.getElementById("featuredGrid").innerHTML=CARS.map(c=>carCard(c)).join("")}
function viewCar(id){
 const c=CARS.find(x=>x.id===id); if(!c)return;
 const features=c.variants.map(v=>`<li><b>${v.name}</b> · ${v.fuel} · ${v.transmission} · ${money(v.price)} — ${v.features.join(", ")}</li>`).join("");
 const win=window.open("","_blank");
 win.document.write(`<!doctype html><title>${c.brand} ${c.model} | CarDhundo</title><style>body{font-family:Arial;margin:0;background:#f6f7f8;color:#111}.wrap{max-width:1000px;margin:40px auto;padding:30px;background:#fff;border-radius:22px}h1{font-size:42px}li{padding:14px 0;border-bottom:1px solid #eee}.tag{display:inline-block;background:#eff5d4;padding:7px 10px;border-radius:8px;margin:3px}</style><div class="wrap"><small>${c.brand}</small><h1>${c.model}</h1><p>${c.summary}</p><div>${c.fuels.map(x=>`<span class="tag">${x}</span>`).join("")}${c.transmissions.map(x=>`<span class="tag">${x}</span>`).join("")}</div><h2>Variants</h2><ul>${features}</ul><h2>Why this car?</h2><ul>${c.why.map(x=>`<li>${x}</li>`).join("")}</ul><p><b>Official source:</b> <a href="${c.official}" target="_blank">${c.official}</a></p><p style="color:#68717a">CarDhundo note: prices/features can change. Verify the latest variant and price on the manufacturer's official page before purchase.</p></div>`);
}
function addCompare(id){const list=JSON.parse(localStorage.getItem("cdCompare")||"[]");if(!list.includes(id))list.push(id);localStorage.setItem("cdCompare",JSON.stringify(list.slice(-3)));toast("Added to comparison.");}
function filterBody(body){const matches=CARS.filter(c=>c.body===body||body==="EV"&&c.fuels.includes("Electric"));document.getElementById("featuredGrid").innerHTML=matches.map(c=>carCard(c)).join("");document.querySelector(".section").scrollIntoView({behavior:"smooth"})}
function resetFinder(){state.step=0;state.answers={budget:null,fuel:null,body:null,transmission:null,features:[],usage:null};document.getElementById("results").classList.add("hidden");renderStep();scrollToSection("discover")}
function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function showAdInfo(){toast("Ad module ready — connect your preferred ad/affiliate provider or CMS.");}
document.addEventListener("DOMContentLoaded",()=>{renderStep();renderFeatured()});
