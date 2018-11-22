// On génère les container pour la mise en page
const app = document.getElementById('root');
const container = document.createElement('div');
container.setAttribute('class', 'row');
app.appendChild(container);

// Connexion API
const request = new XMLHttpRequest();
request.open('GET', `https://api.openbrewerydb.org/breweries`, true);

request.onload = function () {

  const data = JSON.parse(this.response);

  // On génère la liste de nos brasseries
  const brewList = document.createElement('div');
  brewList.setAttribute('class', 'brewery-list');
  container.appendChild(brewList);

  // Pour chaque élément
  data.forEach(data => {

    // Fonction sortResults
    function sortResults() {
      // On intègre une liste
      const infos = document.createElement('ul');
      infos.setAttribute('class', 'infos-list');
      elements.appendChild(infos);
      // On met des données dans la liste
      const state = document.createElement('li');
      state.setAttribute('class', 'element-list');
      state.textContent = `State : ${data.state}` ;
      infos.appendChild(state);
      const city = document.createElement('li');
      city.setAttribute('class', 'element-list');
      city.textContent = `City : ${data.city}` ;
      infos.appendChild(city);
      const website = document.createElement('li');
      website.setAttribute('class', 'element-list');
      website.textContent = `Website URL : ${data.website_url}` ;
      infos.appendChild(website);
      const street = document.createElement('li');
      street.setAttribute('class', 'element-list');
      street.textContent = `Street : ${data.street}` ;
      infos.appendChild(street);
      const type = document.createElement('li');
      type.setAttribute('class', 'element-list');
      type.textContent = `Brewery Type : ${data.brewery_type}` ;
      infos.appendChild(type);
    }

    // On génère un élément de liste
    const brewery = document.createElement('div');
    brewery.setAttribute('class', 'brewery');
    brewList.appendChild(brewery);

    // Dans le quel on vient intégrer le nom de chaque brasserie
    const link = document.createElement('a');
    link.setAttribute('class', 'link');
    link.textContent = `${data.name}`;
    link.setAttribute('id', `${data.id}`);
    brewery.appendChild(link);

    // On créé une div d'éléments contenant des données
    const elements = document.createElement('div');
    elements.setAttribute('class', 'container');
    brewery.appendChild(elements);



    // Au clic sur une brasserie
    document.getElementById(`${data.id}`).onclick = function(e) {
      // LOCAL STORAGE : on stocke le nom des brasseries sur lesquelle l'utilisateur a cliqué
      // Enregistrement multiple : pas fait
      function store() {
        const storage = [];
        storage.push(`${data.name}`);
        localStorage.setItem("item", JSON.stringify(storage));
      }
      store();

      // On éxécute la fonction sortResults
      sortResults();
    }

    //////// TO DO ////////
    // SEARCH : Au choix d'une brasserie dans l'autocomplete, on stocke l'id pour renvoyer les résultat
    // document.getElementById("button").onclick = function() {
    // test = document.getElementById("search").value;
    //   sortResults($test);
    // };

  })

}
request.send();


// Autocomplete pour la searchbar
$(function() {
  const requestAuto = new XMLHttpRequest();
  requestAuto.open('GET', 'https://api.openbrewerydb.org/breweries', true);

  requestAuto.onload = function () {
    const title = [];
    // On push tous les noms dans la constante
    const data = JSON.parse(this.response);
    data.forEach(data => {
     title.push(data.name);
    });
    $("#search").autocomplete({
      source: title
    });
  }
  requestAuto.send()
});
