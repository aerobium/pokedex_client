var singlePok = $('.single-pok').clone();
$('.single-pok').remove();
var offset = 0;
var filtersArr = [];
var checkedFilterArr = [];

beginDrawProcedure(offset);

$('#get-more-pokemons').on('click', function () {
    offset += 12;
    $('#filters').empty();
    $('#pock-block').empty();
    $('#chunk-wait-img').show();
    beginDrawProcedure(offset);
});

function beginDrawProcedure(offset) {
    filtersArr = [];
    $.when(getPokeChunksAjax(offset))
        .then(function (response) {
            $('#chunk-wait-img').hide();
            drawPage(response);
        })
        .fail(function () {
            alert("Pokemon's chunks were not found, or connection timed out")
        });
}

function getPokeChunksAjax(offset) {
    return $.ajax({
        type: "GET",
        url: "http://pokeapi.co/api/v1/pokemon/?limit=12&offset=" + offset
    });
}

function drawPage(chunks) {
    for (var i in chunks.objects) {
        addNewDefaultClonedBlock();
        var types = chunks.objects[i].types;
        var name = chunks.objects[i].name;
        var id = chunks.objects[i].pkdx_id;
        drawSinglePokemonChunk(name, id, types);
        prepareFilters(types);
    }
    drawFilters();
}

function addNewDefaultClonedBlock() {
    $('#pock-block').append(singlePok.clone());
    return $('.single-pok').last();
}


function prepareFilters(types) {
    for (var i in types) {
        if (filtersArr.indexOf(types[i].name) < 0) {
            filtersArr.push(types[i].name)
        }
    }
}

function drawFilters() {
    for (var i in filtersArr) {
        $('#filters').append('<button class="btn filter-button ' + filtersArr[i] + '" data-filter-value="' + filtersArr[i] + '">' + filtersArr[i] + '</button>');
    }

    $('.filter-button').on('click', function () {
        var thisButton = $(this);
        var thisButtonFilterName = $(this).attr('data-filter-value');

        if (!thisButton.hasClass('btn-checked')) {
            thisButton.addClass('btn-checked');

            if (checkedFilterArr.indexOf(thisButtonFilterName) < 0) {
                checkedFilterArr.push(thisButtonFilterName)
            }
            arrayBasedFilterCreator(checkedFilterArr);
        } else {
            checkedFilterArr.splice($.inArray(thisButtonFilterName, checkedFilterArr), 1);
            arrayBasedFilterCreator(checkedFilterArr);
            thisButton.removeClass('btn-checked');
        }
    })
}

function arrayBasedFilterCreator(filterArray) {
    if (filterArray.length == 0) {
        $('.single-pok').show('fast');
    } else {
        $('.single-pok').hide('fast');
        for (var i in filterArray) {
            $('.single-pok').each(function () {
                if ($(this).hasClass(filterArray[i])) {
                    $(this).show('fast')
                }
            })
        }
    }
}

function drawSinglePokemonChunk(name, id, types) {
    for (var i in types) {
        $('.chunk-border').last().append('<button class="btn-info btn-responsive ' + types[i].name + '">' + types[i].name + '</button>');
        $('.single-pok').last().addClass(types[i].name);
    }

    $('.pok-name').last().text(name);
    $('.pok-img').last().attr('src', 'http://pokeapi.co/media/img/' + id + '.png');
    $('.single-pok').last().attr('id', id);
}