$(document).on('click', '.single-pok', function () {
    var pokId = $(this).attr('id');
    $('#info-img').hide();
    $('#info-wait-img').show();
    pokeDrawCommander(pokId);
    $('#pock-info').show('fast');
});

function pokeDrawCommander(id) {
    $.when(getSinglePokeInfoAjax(id))
        .then(function (response) {
            parseSinglePoke(response);
        })
        .fail(function () {
            alert("Pokemon was not found")
        });
}

function getSinglePokeInfoAjax(id) {
    return $.ajax({
        url: "http://pokeapi.co/api/v1/pokemon/" + id + "/",
        method: 'GET'
    });
}

var pokemon = {};

function parseSinglePoke(pokeJson) {

    pokemon.id = pokeJson.pkdx_id;
    pokemon.name = pokeJson.name;
    pokemon.type = pokeJson.types;
    pokemon.attack = pokeJson.attack;
    pokemon.defense = pokeJson.defense;
    pokemon.hp = pokeJson.hp;
    pokemon.spAttack = pokeJson.sp_atk;
    pokemon.spDefence = pokeJson.sp_def;
    pokemon.speed = pokeJson.speed;
    pokemon.weight = pokeJson.weight;
    pokemon.totalMoves = pokeJson.moves.length;

    drawSinglePokemonFullInfo(pokemon);
}

function drawSinglePokemonFullInfo(pokemon) {

    var typeArr = [];
    for (var i in pokemon.type) {
        typeArr.push(pokemon.type[i].name);
    }

    var typeResult = typeArr.join(', ');
    $('#info-type').text(typeResult);
    $('#info-wait-img').hide();
    $('#info-img').attr('src', 'http://pokeapi.co/media/img/' + pokemon.id + '.png').show();
    $('#info-name').text(pokemon.name);

    if (pokemon.id < 10) {
        $('#info-index').text('00' + pokemon.id);
    } else {
        if (pokemon.id < 100) {
            $('#info-index').text('0' + pokemon.id);
        } else {
            $('#info-index').text(pokemon.id);
        }
    }

    $('#info-attack').text(pokemon.attack);
    $('#info-defense').text(pokemon.defense);
    $('#info-hp').text(pokemon.hp);
    $('#info-sp-attack').text(pokemon.spAttack);
    $('#info-sp-defence').text(pokemon.spDefence);
    $('#info-speed').text(pokemon.speed);
    $('#info-weight').text(pokemon.weight);
    $('#info-total-moves').text(pokemon.totalMoves);
}