# Etch-A-Sketch

This was chaotic to say the least to build and I submitted a lot of broken commits because of rushing through things but I'm happy with what I got.

I don't wanna oversaturate the web with colors and designs because I wanted the user to just focus at drawing. It gives that old school feeling.

You can save the image if you're in Firefox with the "Take Screenshot" feature. Just hover over the border of the sketch/canvas and you're ready to go.

* To make the opacity actually works, I implemented z-indexing with stylized divs inside each grid of the canvas. Your strokes will always override what's on top of the div.
* Deleting your stroke works via recording the number of strokes you've done so far
* I didn't use flex wrapping to the utmost because I hate too much for-loops in my JavaScript. I like something that's more functional programming-wise. And I think that's good
* ..you can see your stroke. Only the latest stroke, though.
