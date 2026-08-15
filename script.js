const API_KEY = "rc_live_43bac6e020f746ddb2f8b83cf61e3c8c";

async function buscarPais() {

    let nome = document.getElementById("pais").value;

    let url;

    if (nome.length == 3) {
        url = `https://api.restcountries.com/countries/v5/codes.alpha_3/${nome.toUpperCase()}`;
    } else {
        url = `https://api.restcountries.com/countries/v5/names.common/${nome}`;
    }

    let resp = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });

    let dados = await resp.json();

    mostrarPais(dados);
}


function mostrarPais(dados) {

    let pais = dados.data.objects[0];

    let moedas = Object.values(pais.currencies)
        .map(moeda => moeda.name)
        .join(", ");

    let idiomas = pais.languages
        .map(idioma => idioma.name)
        .join(", ");

    let fronteiras = "";

    if (pais.borders) {
        fronteiras = pais.borders
            .map(codigo => `<button onclick="buscarPorCodigo('${codigo}')">${codigo}</button>`)
            .join("");
    } else {
        fronteiras = "Nenhuma";
    }

    document.getElementById("resultado").innerHTML = `
        <h2>${pais.names.common}</h2>

        <img src="${pais.flag.url_png}" width="250">

        <p>Continente: ${pais.continents}</p>
        <p>Capital: ${pais.capitals[0].name}</p>
        <p>Área: ${pais.area.kilometers} km²</p>
        <p>População: ${pais.population}</p>
        <p>Moeda(s): ${moedas}</p>
        <p>Idioma(s): ${idiomas}</p>

        <p>Países que fazem fronteira:</p>
        ${fronteiras}
    `;
}


async function buscarPorCodigo(codigo) {

    let resp = await fetch(
        `https://api.restcountries.com/countries/v5/code?q=${codigo}`,
        {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        }
    );

    let dados = await resp.json();

    mostrarPais(dados);
}