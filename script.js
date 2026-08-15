const API_KEY = "rc_live_43bac6e020f746ddb2f8b83cf61e3c8c";

async function buscarPais() {

    const valor = document.getElementById("pais").value;

    let url;

    if (valor.length == 3) {
        url = `https://api.restcountries.com/countries/v5/codes.alpha_3/${valor.toUpperCase()}`;
    } else {
        url = `https://api.restcountries.com/countries/v5/names.common/${valor}`;
    }

    const resposta = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${API_KEY}`
        }
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
        document.getElementById("resultado").innerHTML = "<p>País não encontrado.</p>";
        return;
    }

    const pais = dados.data.objects[0];

    mostrarPais(pais);
}


function mostrarPais(pais) {

    const moedas = Object.values(pais.currencies)
        .map(moeda => `${moeda.name} (${moeda.code})`)
        .join(", ");

    const idiomas = pais.languages
        .map(idioma => idioma.name)
        .join(", ");

    let fronteiras = "Nenhuma";

    if (pais.borders) {
        fronteiras = pais.borders
            .map(codigo => `<button onclick="buscarPorCodigo('${codigo}')">${codigo}</button>`)
            .join("");
    }

    document.getElementById("resultado").innerHTML = `
        <h2>${pais.names.common}</h2>

        <img src="${pais.flag.url_png}" width="250">

        <p>Continente: ${pais.continents.join(", ")}</p>

        <p>Capital: ${pais.capitals[0].name}</p>

        <p>Área: ${pais.area.kilometers.toLocaleString()} km²</p>

        <p>População: ${pais.population.toLocaleString()}</p>

        <p>Moeda(s): ${moedas}</p>

        <p>Idioma(s): ${idiomas}</p>

        <p>Países que fazem fronteira:</p>

        <div>${fronteiras}</div>
    `;
}


async function buscarPorCodigo(codigo) {

    const url = `https://api.restcountries.com/countries/v5/code?q=${codigo}`;

    const resposta = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${API_KEY}`
        }
    });

    const dados = await resposta.json();

    const pais = dados.data.objects[0];

    mostrarPais(pais);
}