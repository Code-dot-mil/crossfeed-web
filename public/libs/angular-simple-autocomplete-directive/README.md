# angular-simple-autocomplete-directive [![Build Status](https://travis-ci.org/alexneamtu/angular-simple-autocomplete-directive.png)](https://travis-ci.org/alexneamtu/angular-simple-autocomplete-directive)

NPM package for a simple AngularJS autocomplete directive.


## Usage
To install the package, run:
`npm install angular-simple-autocomplete-directive`
or
`bower install angular-simple-autocomplete-directive`

Include the script and the css into your project:
```html
<script src="node_modules/angular-simple-autocomplete-directive/dist/main.js"></script> (after having the angular.js included)
<link rel="stylesheet" href="node_modules/angular-simple-autocomplete-directive/dist/main.css">
```

Insert the `autocomplete` directive into your template:

As an element
```html
<autocomplete options="['apple', 'samsung', 'nokia']" model="test" />
```

or as an attribute
```html
<input autocomplete options="['apple', 'samsung', 'nokia']" model="test" />
```



## License
MIT