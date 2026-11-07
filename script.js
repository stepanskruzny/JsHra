let radky = 16;
let sloupce = 16;
let prohra = 0;
let odhalenapole = 0;
let odhalenepolex;
let odhalenepoley;
let vlajecka = 0;
let HraDvouHracu = 1;
let Hrac = 1;
let Skore1;
let Skore2;
let Prohravlajkou = 0;
let PolozeneVlajecky;

let policko = [];
let vlajecky = [];
let odhalene = [];
let vypsane = [];
for (let i = 0; i <= radky; i++) {
    policko[i] = [];
    vlajecky[i] = [];
    odhalene[i] = [];
    vypsane[i] = [];
    for (let j = 0; j <= sloupce; j++) {
        policko[i][j] = "0";
        vlajecky[i][j] = "0";
        odhalene[i][j] = "0";
        vypsane[i][j] = "0";
    }
}

function StvoreniSachovnice (radky, sloupce, miny) {
    PolozeneVlajecky = 0;
    vlajecka = 0;
    Skore1 = 0;
    Skore2 = 0;
    for (let i = 0; i <= radky; i++) {
        for (let j = 0; j <= sloupce; j++) {
            policko[i][j] = "0";
            vlajecky[i][j] = "0";
            odhalene[i][j] = "0";
            vypsane[i][j] = "0";

        }
    }

    for (let i = 0; i < miny; i++){
        let j = Math.floor(Math.random()*radky) + 1;
        let k = Math.floor(Math.random()*sloupce) + 1;
        if (j > 0) {
            if (policko[j][k] !== "x"){
                policko[j][k] = "x";
            } else {
                i = i-1;
            }
        } else {
            i = i-1;
        }

    }

    for (let i = 1; i <= radky; i++){
        for (let j = 1; j <= sloupce; j++){
            let velikost = 0;
            if (policko[i][j] !== "x") {
                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {
                        //console.log("i" + i + " j" + j + " k" + k + " l" + l);
                        let m = i+k;
                        let n = j+l;
                        if (m > 0 && n > 0 && m < radky + 1 && n < sloupce + 1) {
                            if (policko[m][n] == "x") {
                                velikost = velikost + 1;
                            }
                        }
                    }
                }
                policko[i][j] = velikost;
            } else {
                //console.log("x")
            }
        }
    }
}

function odhaleni(i, j) {
    if (odhalenapole == 0) {
        prvoodhaleni(i, j);
    } else {
        //console.log("JAK??")
        odhalenepolex = 0;
        odhalenepoley = 0;
        if (odhalene[i][j] == "0" && vlajecky[i][j] == "0"){
            odhalenapole ++;
            console.log("odhaleni:" + i + j)
        }
        odhalene[i][j] = "1";
        //console.log("i: " + i + " j: " + j + " = " + odhalene[i][j]);
        if (policko[i][j] == 0){
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    //console.log("i" + i + " j" + j + " k" + k + " l" + l);
                    let m = i+k;
                    let n = j+l;
                    if (m > 0 && n > 0 && m < radky + 1 && n < sloupce + 1 && odhalene[m][n] == 0) {
                        odhaleni(m, n)
                    }
                }
            }
        }
        document.body.innerHTML = "";
        VypisSachovnice(radky, sloupce);
    }
}

function prvoodhaleni(i, j){
    if (policko[i][j] != 0){
        StvoreniSachovnice (radky, sloupce, 40)
        odhaleni(i, j);
    } else {
        if (odhalene[i][j] == "0" && vlajecky[i][j] == "0"){
            odhalenapole ++;
            console.log("odhaleni:" + i + j)
        }
        //console.log("JAK??")
        odhalenepolex = 0;
        odhalenepoley = 0;
        odhalene[i][j] = "1";
        //console.log("i: " + i + " j: " + j + " = " + odhalene[i][j]);
        if (policko[i][j] == 0){
            for (let k = -1; k <= 1; k++) {
                for (let l = -1; l <= 1; l++) {
                    //console.log("i" + i + " j" + j + " k" + k + " l" + l);
                    let m = i+k;
                    let n = j+l;
                    if (m > 0 && n > 0 && m < radky + 1 && n < sloupce + 1 && odhalene[m][n] == 0) {
                        odhaleni(m, n)
                    }
                }
            }
        }
        document.body.innerHTML = "";
        VypisSachovnice(radky, sloupce);
    }
}

function okoloodhaleni(i, j) {
    let okolovlajka = 0;
    for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
            let m = i+k;
            let n = j+l;
            if (m > 0 && n > 0 && m < radky + 1 && n < sloupce + 1 && vlajecky[m][n] == 1) {
                okolovlajka = okolovlajka + 1;
            }
        }
    }
    if (okolovlajka == policko[i][j]) {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                let m = i+k;
                let n = j+l;
                if (m > 0 && n > 0 && m < radky + 1 && n < sloupce + 1) {
                    odhaleni(m, n)
                }
            }
        }
    }
}

function VypisPolicka(i, j) {
    if (vlajecky[i][j] == "0") {
        if (odhalene[i][j] == "1") {
            if (policko[i][j] == "x") {
                document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: bold; color: red'>" + policko[i][j] + "</button></td>")
                if (prohra == 0) {
                    prohra = 1;
                }
            } else {
                if (policko[i][j] == "0") {
                    document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: lighter; color: gray'>" + policko[i][j] + "</button></td>")
                } else {
                    document.write("<td id='pole'><button onclick='okoloodhaleni(" + i + ", " + j + "); if (Hrac == 1) {Hrac = 2} else {Hrac = 1}' class='tlacitko' id = idecko>" + policko[i][j] + "</button></td>")
                }
            }
        } else {
            if (policko[i][j] == "x" && prohra != 0){
                document.write("<td id='pole'><button class='tlacitko' id = idecko style='color: red'>" + policko[i][j] + "</button></td>")
            } else {
                document.write("<td id='pole'><button onclick='if(prohra == 0){ if (vlajecka == 0){odhaleni(" + i + ", " + j + ") } else { if (Hrac == 2) { Skore1 += 10 } else { Skore2 += 10 } PolozeniVlajecky(" + i + ", " + j + ") } } if (Hrac == 1) {Hrac = 2} else {Hrac = 1}' class='tlacitko' id = idecko style='color: lightgrey;'>" + "_" + "</button></td>");
            }
        }
    } else {
        if (HraDvouHracu == 1) {
            document.write("<td id='pole'><button onclick='PolozeniVlajecky(" + i + ", " + j + ")' class='tlacitko' id = idecko style='font-weight: lighter; font-size: smaller; padding-left: 2px; padding-right: 2px; color: lightskyblue'>" + "m" + "</button></td>");
        } else {
            if (policko[i][j] == "x") {
                document.write("<td id='pole'><button onclick='PolozeniVlajecky(" + i + ", " + j + ")' class='tlacitko' id = idecko style='font-weight: lighter; font-size: smaller; padding-left: 2px; padding-right: 2px; color: lightskyblue'>" + "m" + "</button></td>");
            } else {
                document.write("<td id='pole'><button onclick='SpatnePolozeniVlajecky(" + i + ", " + j + "); Prohravlajkou = 1' class='tlacitko' id = idecko style='font-weight: lighter; font-size: smaller; padding-left: 2px; padding-right: 2px; color: lightskyblue'>" + "m" + "</button></td>");
                if (prohra == 0) {
                    prohra = 1;
                }
            }
        }
    }
}

function SpatnePolozeniVlajecky (i, j) {
    if (vlajecky[i][j] == "1"){
        vlajecky[i][j] = "0";
    } else {
        vlajecky[i][j] = "1";
    }
}

function PolozeniVlajecky (i, j) {
    if (vlajecky[i][j] == "1"){
        vlajecky[i][j] = "0";
        PolozeneVlajecky --;
    } else {
        vlajecky[i][j] = "1";
        PolozeneVlajecky ++;
    }
    document.body.innerHTML = "";
    VypisSachovnice(radky, sloupce);
}

function TlacitkoMina() {
    if(vlajecka == 0){
        document.write("<button onclick='vlajecka = 1; document.body.innerHTML = \"\"; VypisSachovnice(radky, sloupce)'> číslo </button>");
    }
    if(vlajecka == 1){
        document.write("<button onclick='vlajecka = 0; document.body.innerHTML = \"\"; VypisSachovnice(radky, sloupce)'> miny </button>");
    }
}

function TlacitkoHraci() {
    if (HraDvouHracu == 1){
        document.write("<button onclick='HraDvouHracu = 2; Restart()'> Hra jednoho hráče </button>");
    }
    if (HraDvouHracu == 2){
        document.write("<button onclick='HraDvouHracu = 1; Restart()'> Hra dvou hráčů </button>");
    }
}

function Restart() {
    odhalenapole = 0;
    document.body.innerHTML = "";
    StvoreniSachovnice(radky, sloupce, 40);
    VypisSachovnice(radky, sloupce);
}

function VypisSachovnice(radky, sloupce) {
    console.log("vlajky: " + PolozeneVlajecky + "odhalena pole: " + odhalenapole);
    if (prohra == 0) {
        if (odhalenapole > 0) {
            TlacitkoMina();
        }
        TlacitkoHraci();
    }
    /*
    if (HraDvouHracu !== 1 || HraDvouHracu !== 2) {
        HraDvouHracu = 1;
    }
     */
    //console.log(HraDvouHracu);
    //console.log(odhalenapole);
    if (HraDvouHracu == 2 && odhalenapole > 0) {
        document.write("<button> Hraje " + Hrac + ". hráč </button> <br> Skóre prvního hráče: " + Skore1 + "; Skóre druhého hráče: " + Skore2);
    }
    if (odhalenepolex > 0 && odhalenepoley > 0) {
        odhaleni(odhalenepolex, odhalenepoley);
    }
    document.write("<table>");
    for (let i = 1; i <= radky; i++) {
        document.write("<tr>");
        for (let j = 1; j <= sloupce; j++) {
            VypisPolicka(i, j);
        }
        document.write("</tr>");
    }
    document.write("</table>");
    document.write("\n" +
        "<button style=\"color: saddlebrown\" onclick=\"location.reload()\"> Znovu </button>"
    )
    if (Prohravlajkou == 1) {
        prohra = 1;
        document.body.innerHTML = "";
        VypisSachovnice(radky, sloupce);
    }
    if (prohra == 1) {
        document.body.innerHTML = "";
        prohra = 2;
        VypisSachovnice(radky, sloupce);
        if (HraDvouHracu == 1){
            alert("To's zVojtil!");
        } else {
            alert("Hráč " + Hrac-- + " špatně určil minu a tím prohrál tuto partii.");
        }
    }
    if (radky*sloupce == odhalenapole+PolozeneVlajecky) {
        if (HraDvouHracu == 1) {
            alert("Vyhrál's!");
        } else {
            if (Skore1 > Skore2) {
                alert("Hráč 1 s " + Skore1 + " body porazil hráče 2 s " + Skore2 + "body.");
            }
            if (Skore1 < Skore2) {
                alert("Hráč 2 s " + Skore2 + " body porazil hráče 1 s " + Skore1 + "body.");
            }
            if (Skore1 == Skore2) {
                alert("Hra dopadla remízou při " + Skore1 + "bodech.");
            }

        }
    }
}