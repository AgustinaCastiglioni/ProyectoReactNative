export function infoFetch(){

fetch('https://randomuser.me/api/?results=20')
.then(response=> response.json())

} 
