# Página de las Manos

[Cueva de las Manos](https://en.wikipedia.org/wiki/Cueva_de_las_Manos) is a cave in Argentina that is decorated with hundreds of prehistoric hand imprints.

![a section of the cave showing outlines of hands](cueva.png)

The image of the cave left a deep impression on me. I found it to be an eerie and moving monument to the human impulse to assert one's presence, and I wondered what a digital representation for this would be like.

Página de las Manos is a web page that lets visitors make their mark. Clicking on the page will place a hand print in a random color on the canvas. If multiple people are placing prints at the same time everyone will see hand prints appear in real time.

## Development

The work is a node app that leverages nedb and websockets to create a realtime exchange of presence between concurrent visitors. the p5js framework is used to render the images.

The work is currently hosted on Glitch.

![a section of the digital version showing outlines of hands in many colors](pagina.png)

## Going Forward

I can see this project developing in a few directions.

1. **Machine Learning**: I would like user's to hold their hand up to their computer's camera and have the app capture the imprint of an actual hand. Google provides a library called "[handpose](https://blog.tensorflow.org/2020/03/face-and-hand-tracking-in-browser-with-mediapipe-and-tensorflowjs.html)" that looks like it could get me started on this. I need to look into image processing in node to create and color the outlines.

2. **Infinite Canvas**: I would like the canvas to extend infinitely in all directions to allow visitors to explore the canvas kind of like one would browse a google map. I am not sure how this would work though, I haven't seen an example of an infinite canvas in p5 yet.

3. **SVG**: Right now the project uses .png files but SVG's would allow for zooming up and down the z-axis, so one could create imprints at different scales and create a sort of recursive feeling.

There are other considerations such as when to clear the canvas and start fresh again. The work could also be given different "rooms" that would allow for site/screen specific instances.

## Visit

To experience Página de las Manos visit this link: [https://jaymollica-pagina.glitch.me/](https://jaymollica-pagina.glitch.me/)


