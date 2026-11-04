let radky = 5;
let sloupce = 8;

let policko = [];
for (let i = 0; i <= radky; i++) {
    policko[i] = [];
    for (let j = 0; j <= sloupce; j++) {
        policko[i][j] = "0";
    }
}

let odhalene = [];
for (let i = 0; i <= radky; i++) {
    odhalene[i] = [];
    for (let j = 0; j <= sloupce; j++) {
        odhalene[i][j] = "0";
    }
}

let vypsane = [];
for (let i = 0; i <= radky; i++) {
    vypsane[i] = [];
    for (let j = 0; j <= sloupce; j++) {
        vypsane[i][j] = "0";
    }
    vypsane[i] = [];
}

function StvoreniSachovnice (radky, sloupce, miny) {

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
                console.log("x")
            }
        }
    }
}

/*
function VypisSachovnice(radky, sloupce) {
    document.write("<table>")
    for (let i = 1; i <= radky; i++){
        document.write("<tr>");
        for (let j = 1; j <= sloupce; j++){
            //let idecko = "tlac" + i + "-" + j;
            if (odhalene[i][j] == "1") {
                if (policko[i][j] == "x") {
                    document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: bold; color: red'>" + policko[i][j] + "</button></td>")
                } else {
                    if (policko[i][j] == "0") {
                        document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: lighter; color: gray'>" + policko[i][j] + "</button></td>")
                    } else {
                        document.write("<td id='pole'><button class='tlacitko' id = idecko>" + policko[i][j] + "</button></td>")
                    }
                }
            } else {
                document.write("<td id='pole'><button onclick='odhaleni(" + i + ", " + j + ")' class='tlacitko' id = idecko style='color: lightgrey;'>" + "_" + "</button></td>")
            }
        }
        document.write("</tr>")
    }
    document.write("</table>")
}
 */


function odhaleni(i, j) {
    odhalene[i][j] = "1";
    console.log("i: " + i + " j: " + j + " = " + odhalene[i][j]);
    document.body.innerHTML = "";
    document.write("<table>")
    VypisSachovnice(radky, sloupce);
    document.write("</table>")
    //window.location.reload();
}
//const Element = document.getElementById("idecko");
//Element.addEventListener("onclick", odhaleni);

//policko.addEventListener("click", odhaleni);
//document.getElementById()


function VypisPolicka(i, j) {
    if (odhalene[i][j] == "1") {
        if (policko[i][j] == "x") {
            document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: bold; color: red'>" + policko[i][j] + "</button></td>")
        } else {
            if (policko[i][j] == "0") {
                document.write("<td id='pole'><button class='tlacitko' id = idecko style='font-weight: lighter; color: gray'>" + policko[i][j] + "</button></td>")
            } else {
                document.write("<td id='pole'><button class='tlacitko' id = idecko>" + policko[i][j] + "</button></td>")
            }
        }
    } else {
        document.write("<td id='pole'><button onclick='odhaleni(" + i + ", " + j + ")' class='tlacitko' id = idecko style='color: lightgrey;'>" + "_" + "</button></td>")
    }
}

function VypisSachovnice(radky, sloupce) {
    for (let i = 1; i <= radky; i++){
        document.write("<tr>");
        for (let j = 1; j <= sloupce; j++){
            VypisPolicka(i, j);
        }
        document.write("</tr>")
    }
}