

function Sachovnice(radky, sloupce) {
    document.write("<table>")
    for (let i = 1; i <= radky; i++){
        document.write("<tr>")
        for (let j = 1; j <= sloupce; j++){
            document.write("<td>" + i + j + "</td>")
        }
        document.write("</tr>")
    }
    document.write("</table>")
}