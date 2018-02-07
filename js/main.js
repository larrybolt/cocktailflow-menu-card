$(function() {
    var cocktails = [
        // classics
        'old-fashioned',
        'margarita',
        'collins',
        'new-yorker',
        'cosmopolitan',
        'pina-colada',

        // mojito
        'mojito',
        'nojito',

        'amaretto-sour',
        'the-sour',
        'daiquiri',
        'cuba-libre',
        'mai-tai-light',
        'mexicano',

        'summer-sunset',
        'snow-cap',

        // non alcohol
        'virgin-colada',
        'hot-lemonade',
        'honey-lemonade',
        'mock-pink-champagne',
        'heras-crown',
        'baby-belle',
        'sophisticated-lady',
        'mickey-mouse',
        'morning-star',
        'flamingo',
        'rose-de-mai',
        'pomola',
        'jungle-juice',
        'alice-cocktail',
        'crows-nest',
        'tomato-cooler',
        'cranberry-citrus-mint',
        'banana-pineapple-cream',

        // maries
        'bloody-mary',
        'bloody-driver',

        // martinis
        'dirty-martini',
        'between-the-sheets',
        'tiger-juice',
        'long-island',

        'screwdriver',
        'ambassador',
        'bacardi',
        'b54',
        'bay-breeze',
        'white-russian',
        'border-crossing',
        'white-lady',

        'brass-monkey',
        'bronx-dry',
        'burnt-orange',
        'cape-codder',
        'cranberry-kick',
        'doralto',
        'el-dorado',
        'florida-sunshine',
        'flying-dutchman',
        'kamikaze',

        'pink-gin',
        'pink-rum',

        'gin-daisy',
        'gin-fizz',
        'gin-rickey',
        'gin-swizzle',

        'god-father',
        'god-mother',

        'lime-gin-fizz',
        'orange-blossom',

        'virgin-sex-on-the-beach-slushy',
        'blow-job',
        'orgasm',
        'screaming-orgasm',

        'rum-fizz',
        'silver-fizz',
        'tequila-sunrise',
        'viva-villa',
    ];
    var cocktailsList = [];

    var q = async.queue(function(t, callback) {
        $.get('https://cors-anywhere.herokuapp.com/http://www.cocktailflow.com/ajax/cocktail/'+t.name).then(function(result){
            callback(result.cocktail)
        });
    }, 2);

    q.drain = function() {
        console.log('all items have been processed', cocktailsList);
        var source   = document.getElementById("page-template").innerHTML;
        var template = Handlebars.compile(source);
        var html     = template({ cocktails: cocktailsList });
        document.getElementById("content").innerHTML = html
    };

    // add some items to the queue

    cocktails.forEach(function(cocktail){
        q.push({name: cocktail}, function(result) {
            console.log('finished processing', cocktail);
            cocktailsList.push(result);
        });
    });
});
