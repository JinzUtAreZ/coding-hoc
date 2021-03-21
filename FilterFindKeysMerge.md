# get credentials by:

    const dataset = response.data.users;
    const usercred = dataset.filter(
        (users) => users.credentials.username === "shopper"
    );

# data

//IMPORTANT: check credentials if array or not  
"users": [
{
"id": 1,
"age": 25,
"team": "Titan",
"name": "John Doe",

    "credentials": {
        "username": "fe-applicant",
        "password": "will-pass"
      },
      "jobTitle": "Software Engineer",
      "role": "shopper"
    },
    {
      "id": 2,
      "age": 22,
      "team": "Titanus",
      "name": "Juan Tamad",

      "credentials": {
        "username": "shopper",
        "password": "will-fail"
      },
      "jobTitle": "PAL attendant",
      "role": "admin"
    }

]

# get culture by:

    const newArr = arr.filter(obj =>
    obj.culture.find(o => o.value === selectedValue));

    //IMPORTANT: check culture if array or not

const arr = [
{
name: "name",
description: "100 jours ferme",
image: "path_image",

    culture: [{
      name: "name",
      value: "309"
    }]

},
{
name: "name",
description: "100 jours ferme",
image: "path_image",

    culture: [{
      name: "name",
      value: "308"
    }]
    }

];

# get particular object keys only

# TODO: check obj[0] based on dataset

let obj = idSelector;
var editobj = filterkeys(obj[0], ["name", "price", "slug"]);

function filterkeys(obj, arr) {
for (const key of Object.keys(obj)) {
if (!arr.includes(key)) {
delete obj[key];
}
}
return obj;
}

or

let obj = idSelector;
const filterkeys = (obj, arr) =>
Object.fromEntries(arr.map((key) => [key, obj[key]]));

var editobj = filterkeys(obj[0], ["name", "price", "slug"]);

# include add object to existing

let merged = Object.assign({}, prodForm, editDatas);
