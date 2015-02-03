GIFsmos
=======

This is a little weekend project of mine to help all those folks who like sharing animated GIFs captured from
their [Desmos](https://www.desmos.com/) graphs, but don't like going through the hassle of taking a bunch
of screenshots and then running them through a separate generator.  GIFsmos lets you do all the graphing
(or graph importing) and manipulating and capturing and GIFifying in one place, with a simple UI.

Get Hacking
-----------

1. Make sure you have [node.js](http://nodejs.org/) installed.
2. Clone this repo and navigate to the root directory.
3. Install the dependencies with `npm install` (or maybe `sudo npm install` if you get complaints about permissions).
4. Run the app with `npm start`.
5. Head over to `http://localhost:3000` in your favorite browser.

Get Deploying
-------------

1. Get yourself set up with a place to host node apps, such as [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).
2. This app uses a Desmos demonstration API key that's only suitable for development. For any public-facing app, you'll need to [request your own key](https://www.desmos.com/api/v0.4/docs/#document-api-keys) from the fine folks over at Desmos.
3. Edit the `views/layout.jade` file to include your newly acquired API key:
```jade
script(src='//www.desmos.com/api/v0.4/calculator.js?apiKey=YOUR_KEY_GOES_HERE')
```

That's it!

If you want to get in touch, I'm an enthusiastic [#MTBoS](https://twitter.com/search?q=%23mtbos&src=typd) participant [on Twitter](https://twitter.com/lustomatical).
