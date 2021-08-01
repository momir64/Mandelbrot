/*jshint esversion: 8 */

function setPixel(imageData, x, y, r, g, b, a) {
    var index = 4 * (x + y * imageData.width);
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}

function isMandelbrot(cx, cy) {
    var x = cx;
    var y = cy;

    for (i = 0; i < 80 && x < 100 && y < 100; i++) {
        var x0 = x * x - y * y + cx;
        y = 2 * x * y + cy;
        x = x0;
    }

    return Math.sqrt(x * x + y * y) < 100;
}

function init() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, 800, 800);
    var id = ctx.getImageData(0, 0, 1400, 800);

    for (y = -400; y < 400; y++) {
        for (x = -1100; x < 300; x++) {
            var c = isMandelbrot(x / 400, y / 400) ? 0 : 255;
            setPixel(id, x + 1100, y + 400, c, c, c, 255);
        }
    }

    ctx.putImageData(id, 0, 0);
}