$( function() {
    $('.dlh_unfixed_container').sortable({
        items:".sImg",
        forceHelperSize: true,
        placeholder:'ui-state-highlight',
        sort: function( event, ui ) {
            var item = ui.item;
            $(item).addClass('border');
        },
        stop: function( event, ui ) {
            var item = ui.item,
                itemParData = $(item).attr('data-class'),
                next = $(item).siblings('.sImg'),
                nextPar = next.parents('.imgContainer'),
                nextParData = next.attr('data-class');console.log(nextParData);

            $(item).removeClass('border');
            $('.imgContainer[data-class='+itemParData+']').append(next)
                .attr('data-class',nextParData);
            nextPar.attr('data-class',itemParData);
        }
    });
    $( ".dlh_unfixed_container" ).disableSelection();
} );