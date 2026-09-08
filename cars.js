const CARS = [
  {
    id:"tata-punch", brand:"Tata", model:"Punch", body:"SUV", fuels:["Petrol","CNG"], transmissions:["Manual","AMT"],
    priceMin:599900, priceMax:999900, seats:5, scoreTags:["city","family","compact"],
    official:"https://cars.tatamotors.com/punch/ice.html",
    image:"assets/cars/tata-punch.jpg",
    summary:"Compact SUV-style package aimed at city and family use.",
    why:["Compact footprint","5-seat layout","Multiple powertrain choices"],
    variants:[
      {name:"Pure",fuel:"Petrol",transmission:"Manual",price:599900,features:["Dual airbags","ABS with EBD","Rear parking sensors"]},
      {name:"Adventure",fuel:"Petrol",transmission:"Manual",price:699900,features:["Infotainment","Steering controls","Higher equipment level"]},
      {name:"Accomplished",fuel:"Petrol",transmission:"AMT",price:799900,features:["Automatic transmission","Additional convenience features"]},
      {name:"Creative",fuel:"Petrol",transmission:"AMT",price:899900,features:["Premium feature set","Connected technology"]}
    ]
  },
  {
    id:"hyundai-exter", brand:"Hyundai", model:"EXTER", body:"SUV", fuels:["Petrol","CNG"], transmissions:["Manual","AMT"],
    priceMin:579900, priceMax:999900, seats:5, scoreTags:["city","family","compact","cng"],
    official:"https://www.hyundai.com/in/en/find-a-car/exter",
    image:"assets/cars/hyundai-exter.jpg",
    summary:"Compact SUV with petrol/CNG choices and broad variant coverage.",
    why:["Petrol and CNG options","AMT available on petrol","Strong safety equipment"],
    variants:[
      {name:"HX 2",fuel:"Petrol",transmission:"Manual",price:579900,features:["6 airbags","ESC","HAC","Digital cluster"]},
      {name:"HX 3",fuel:"Petrol",transmission:"AMT",price:679900,features:["AMT","Front & rear speakers","Digital cluster"]},
      {name:"HX 6",fuel:"CNG",transmission:"Manual",price:819900,features:["CNG powertrain","6 airbags","TPMS"]},
      {name:"HX 10",fuel:"Petrol",transmission:"AMT",price:949900,features:["Bluelink","OTA updates","Wireless smartphone connectivity"]}
    ]
  },
  {
    id:"hyundai-venue", brand:"Hyundai", model:"VENUE", body:"SUV", fuels:["Petrol","Diesel"], transmissions:["Manual","DCT","AT"],
    priceMin:799900, priceMax:1599900, seats:5, scoreTags:["city","highway","family","tech"],
    official:"https://www.hyundai.com/in/en/find-a-car/venue",
    image:"assets/cars/hyundai-venue.jpg",
    summary:"Sub-compact SUV with petrol and diesel powertrains and multiple transmissions.",
    why:["Multiple engines","Manual, DCT and automatic options","Broad feature ladder"],
    variants:[
      {name:"HX2",fuel:"Petrol",transmission:"Manual",price:799900,features:["6 airbags","ESC","Digital cluster"]},
      {name:"HX5",fuel:"Petrol",transmission:"DCT",price:999900,features:["Turbo petrol","DCT","Connected features"]},
      {name:"HX7",fuel:"Diesel",transmission:"Manual",price:1199900,features:["Diesel engine","Premium convenience features"]},
      {name:"HX10",fuel:"Petrol",transmission:"DCT",price:1499900,features:["Level 2 ADAS","Dual 12.3-inch displays","Premium features"]}
    ]
  },
  {
    id:"hyundai-creta", brand:"Hyundai", model:"CRETA", body:"SUV", fuels:["Petrol","Diesel"], transmissions:["Manual","IVT","AT","DCT"],
    priceMin:1099000, priceMax:1999900, seats:5, scoreTags:["family","highway","tech"],
    official:"https://www.hyundai.com/in/en/find-a-car/creta",
    image:"assets/cars/hyundai-creta.jpg",
    summary:"Mid-size SUV with multiple engines, transmissions and trim levels.",
    why:["Wide powertrain choice","Strong safety package","Premium technology on higher trims"],
    variants:[
      {name:"E",fuel:"Petrol",transmission:"Manual",price:1099000,features:["6 airbags","ESC","HAC"]},
      {name:"EX(O)",fuel:"Petrol",transmission:"IVT",price:1399900,features:["Automatic climate control","Infotainment","Connected features"]},
      {name:"SX",fuel:"Diesel",transmission:"Manual",price:1699900,features:["10.25-inch displays","Connected technology"]},
      {name:"King",fuel:"Petrol",transmission:"DCT",price:1899900,features:["Premium audio","Connected features","Advanced convenience"]}
    ]
  }
];
