import{j as e}from"./index-Bt_c7nVv.js";const r="_card_1jvph_1",c="_image_1jvph_25",n="_details_1jvph_39",o="_favoriteButton_1jvph_69",d="_favorited_1jvph_101",s={card:r,image:c,details:n,favoriteButton:o,favorited:d};function v({dog:a,isFavorited:t,onToggleFavorite:i}){return e.jsxs("div",{className:s.card,children:[e.jsx("img",{src:a.img,alt:a.name,className:s.image}),e.jsxs("div",{className:s.details,children:[e.jsx("h3",{children:a.name}),e.jsxs("p",{children:["Breed: ",a.breed]}),e.jsxs("p",{children:["Age: ",a.age," years"]}),e.jsxs("p",{children:["Location: ",a.zip_code]}),e.jsx("button",{className:`${s.favoriteButton} ${t?s.favorited:""}`,onClick:i,children:t?"❤️ Favorited":"🤍 Favorite"})]})]})}export{v as D};
