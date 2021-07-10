export function infoFetch(){
//es el archivo donde se encuentran todas las interacciones con la api
fetch('https://randomuser.me/api/?results=20')
.then(response=> response.json())

} 
