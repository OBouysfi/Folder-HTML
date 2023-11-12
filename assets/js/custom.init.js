
const competences = document.getElementsByClassName("competence");

for (let i = 0; i < competences.length; i++) {

    competences[i].firstElementChild && (starRatinghover = raterJs({
        starSize: 16,
        element: competences[i].firstElementChild,
        rateCallback: function(e, t) {
            this.setRating(e), t();

        },
        onHover: function(e, t) {
            competences[i].querySelector(".ratingnum").textContent = e;

        },
        onLeave: function(e, t) {
            competences[i].querySelector(".ratingnum").textContent = t;
        }
    }));
}
const langues = document.getElementsByClassName("langue");

for (let i = 0; i < langues.length; i++) {

    langues[i].firstElementChild && (starRatinghover = raterJs({
        starSize: 16,
        element: langues[i].firstElementChild,
        rateCallback: function(e, t) {
            this.setRating(e), t();
        },
        onHover: function(e, t) {
            langues[i].querySelector(".ratingnum").textContent = e;

        },
        onLeave: function(e, t) {
            langues[i].querySelector(".ratingnum").textContent = t;
        }
    }));
}
const readonly = document.getElementsByClassName("level-readonly");

for (let i = 0; i < readonly.length; i++) {

    readonly[i].firstElementChild && (starRatinghover = raterJs({
        starSize: 16,
        element: readonly[i].firstElementChild,
        readOnly: true,
    }));
}

const coefficients = document.getElementsByClassName("coefficient");

for (let i = 0; i < langues.length; i++) {

    coefficients[i].firstElementChild && (starRatinghover = raterJs({
        starSize: 16,
        element: coefficients[i].firstElementChild,
        rateCallback: function(e, t) {
            this.setRating(e), t();
        },
        onHover: function(e, t) {
            coefficients[i].querySelector(".ratingnum").textContent = e;

        },
        onLeave: function(e, t) {
            coefficients[i].querySelector(".ratingnum").textContent = t;
        }
    }));
}



var options = {
    valueNames: [ 'title', 'description' ],
    page: 8,
    pagination: true
};

var hackerList = new List('pagination-list', options);


