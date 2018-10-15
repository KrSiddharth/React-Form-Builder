# React-Form-Builder

## To Run
```
yarn
npm run start
```

## Preview
![Preview](https://github.com/disissid/React-Form-Builder/blob/master/dev/img/preview.png)

###### JSON Sample
```
[
   {
      "type":"text",
      "label":"Welcome to React Form Builder",
      "isRequired":false
   },
   {
      "type":"shortAnswer",
      "label":"Tell us about yourself",
      "isRequired":true
   },
   {
      "type":"radioButton",
      "label":"What's your gender?",
      "isRequired":false,
      "options":[
         "Male",
         "Female"
      ]
   },
   {
      "type":"dropDown",
      "label":"How much experience do you have(in years)?",
      "isRequired":true,
      "options":[
         "<1",
         "1-5",
         ">5"
      ]
   }
]
```
Download form as JSON or parse JSON to create a new form.

## Boilerplate
[React-Redux-Boilerplate](https://github.com/buckyroberts/React-Redux-Boilerplate)
