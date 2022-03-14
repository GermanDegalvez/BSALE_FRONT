//Funcion que renderiza las opciones del select de manera dinamica dependiendo de las cateogrias

function dropMenu ( categories ) {
    categories.forEach( categorie => {
        $("#select").append(
        `
        <option value="${categorie.name}">${categorie.name}</option>
        `
        );
    });
}



export { dropMenu };