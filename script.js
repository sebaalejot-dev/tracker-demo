async function CargaDatos(nombreid, tag) {
    const nombreURL = nombreid.replace(" ", "%20")
    const apires = await fetch("https://api.henrikdev.xyz/valorant/v1/account/" + nombreid + "/" + tag, {
        headers: {
            "Authorization": "HDEV-26a6467c-e1f6-4fdf-aebb-7725ef8f5789"
        }
    });
    const apires2 = await fetch("https://api.henrikdev.xyz/valorant/v3/matches/na/" + nombreid + "/" + tag + "?mode=competitive&size=50", {
        headers: {
            "Authorization": "HDEV-26a6467c-e1f6-4fdf-aebb-7725ef8f5789" 
        }
    });

    const datos = await apires.json();
    const matches = await apires2.json();
    const competitivos = matches.data.filter(match => match.metadata.mode === "Competitive");
    const seasonActual = competitivos[0].metadata.season_id;
    const estaTemporada = competitivos.filter(match =>match.metadata.season_id == seasonActual);
    const jugadores = competitivos.map(match => 
    match.players.all_players.find(p => p.puuid === datos.data.puuid)
    );
    const totalkills = jugadores.reduce((suma, j) => suma + j.stats.kills, 0);
    const totaldeaths = jugadores.reduce((suma, j) => suma + j.stats.deaths, 0);
    const totalheadshots = jugadores.reduce((suma, j) => suma + j.stats.headshots, 0);
    const totalbodyshots = jugadores.reduce((suma, j) => suma + j.stats.bodyshots, 0);
    const totallegshots = jugadores.reduce((suma, j) => suma + j.stats.legshots, 0);
    const kd = totalkills / totaldeaths;
    const hs = totalheadshots / (totalheadshots + totalbodyshots + totallegshots)*100
    const kdfix = kd.toFixed(2);
    const hsfix = hs.toFixed(1);
    console.log(kdfix);
    console.log(hsfix);
    console.log(jugadores);
    console.log(datos);
    console.log(matches);
    console.log(datos.data.name);
    console.log(datos.data.account_level);
    document.getElementById("nombre-jugador").textContent = datos.data.name;
    document.getElementById("lvl").textContent = `Nivel de la cuenta: ${datos.data.account_level}`;
    document.getElementById("kd").textContent = `KD : ${kdfix}`;
    document.getElementById("hs").textContent = `HS% : ${hsfix}%`;
    document.getElementById("resultados").style.display = "block";
};
    document.getElementById("BtnBuscar").addEventListener("click", function(){
        console.log("Se apreto el potito");
        const nombre = document.getElementById("busqueda").value;
        console.log(nombre);
        const partes = nombre.split("#");
        const nombreid = partes[0]
        const tag = partes[1]
        console.log(nombreid)
        console.log(tag)

        CargaDatos(nombreid, tag)
    });
