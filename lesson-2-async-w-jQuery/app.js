/* eslint-env jquery */
(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('submit-btn').innerHTML = "Aguarde...";

        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

      $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers:{
          Authorization: 'Client-ID 62a66d916869262ce2efe09dfe50fea1963aed5a85d0ac0c1c708a90d0d64982'
        }
      }).done(addImage);

      $.ajax({
        url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=980b1f6416fc4b2dbe1e9c317750d041`
      }).done(addArticles);

      function addImage(images) {
        const firstImage = images.results[0];
        responseContainer.insertAdjacentHTML('afterbegin', `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`
            );
        }

        function addArticles (articles) {
          let htmlContent = '';
          const artigos = articles.response.docs;
          if (artigos.length > 1) {
            htmlContent = '<ul>' + artigos.map(article => '<li class="article"><h2><a href=" '+article.web_url+' "> '+article.headline.main+' </a></h2><p> '+article.snippet+' </p></li>').join('') + '</ul>';
          }else{
            htmlContent = '<div class="error-no-article">No articles available</div>';
          }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        document.getElementById('submit-btn').disabled = false;
        document.getElementById('submit-btn').innerHTML = "Buscar";
        }
    });
})();
