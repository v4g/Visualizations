(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "tjUo":
/***/ (function(module, exports) {

var elem = document.createElement("div");
elem.id = "draw-shapes";
document.body.appendChild(elem);
var params = { width: window.innerWidth, height: window.innerHeight };
var two = new Two(params).appendTo(elem);

// two has convenience methods to create shapes.
// var circle = two.makeEllipse(72, 100, 50, 100);
// var rect = two.makeRectangle(213, 100, 100, 100);

// The object returned has many stylable properties:
// circle.fill = '#FF8000';
// circle.stroke = 'orangered'; // Accepts all valid css color
// circle.linewidth = 5;

// rect.fill = 'rgb(0, 200, 255)';
// rect.opacity = 0.75;
// rect.noStroke();
// two.add(path);
// Don't forget to tell two to render everything
// to the screen
// mydrawing();
drawing1();
two.update();

function createCurve(p1, v1, p2, v2) {
    var anchors = new Array(4);
    anchors[0] = new Two.Anchor(p1.x, p1.y);
    anchors[1] = new Two.Anchor(p1.x + v1.x, p1.y + v1.y);
    anchors[3] = new Two.Anchor(p2.x, p2.y);
    anchors[2] = new Two.Anchor(p2.x + v2.x, p2.y + v2.y);
    var path = two.makeCurve(anchors, true);
    return path;
}

function mydrawing() {
    var ellipse1 = two.makeEllipse(50, 50, 50);
    var ellipse2 = two.makeEllipse(250, 50, 50);
    console.log(ellipse1);
}

// select a random point on the ellipse and draw another circle
// of random radius some distance away
function drawing1() {
    var ellipse1 = two.makeEllipse(0, 0, 50);
    var ellipse2 = two.makeEllipse(250, 50, 50);
    ellipse1.ccw = true;
    ellipse2.ccw = false;
    ellipse1.translation.set(50, 50);
    console.log(ellipse1);
    const angle = Math.PI / 2;
    const p1 = pointOnEllipse(ellipse1, angle);
    const v1 = findVelocityAtAngle(ellipse1, angle);
    const p2 = findPointWithVelocity(ellipse2, v1);
    console.log(v1);
    v1.multiplyScalar(25);
    const v2 = v1.clone();
    v2.multiplyScalar(-1);
    createCurve(p1, v1, p2, v2);

}

// find a point on the ellipse with a certain velocity direction
// tan theta = a / b * (vel.y/vel.x)
function findPointWithVelocity(ellipse, velocity) {
    // let theta = 0;
    let matrix = matrixForEllipse(ellipse).inverse();
    let vel = matrixMultiplyVector(matrix, velocity);
    if (ellipse.ccw)
    {
        vel.negate();
    }
    const a = ellipse.width / 2;
    const b = ellipse.height / 2;
    const sintheta = -vel.x/a;
    const costheta = vel.y/b;
    let vec = new Two.Vector(costheta, sintheta);
    vec.normalize();
    vec.x = a * vec.x;
    vec.y = b * vec.y;
    vec = matrixMultiplyPoint(matrixForEllipse(ellipse), vec);
    return vec;
    // if (vel.y === 0) {
    //     theta = vel.x > 0 ? -Math.PI / 2 : Math.PI / 2;
    // } else {
    //     theta = vel.x / vel.y * b / a;
    //     theta = Math.atan2(theta, 1);
    // }
    // let point = new Two.Vector();
    // point.set(a * Math.cos(theta), b * Math.sin(theta));
    // point = matrixMultiplyPoint(matrixForEllipse(ellipse), point);
    // return point;
}

function findVelocityAtAngle(ellipse, angle) {
    let a = ellipse.width / 2;
    let b = ellipse.height / 2;

    let x = a * Math.cos(angle);
    let y = b * Math.sin(angle);

    let dx = -a * Math.sin(angle);
    let dy = b * Math.cos(angle);
    let vel = new Two.Vector(dx, dy);
    vel.normalize();
    if (ellipse.ccw) {
        vel.negate();
    }
    vel = matrixMultiplyVector(matrixForEllipse(ellipse), vel);
    return vel;
    // let tantheta = Infinity;

    // if (y == 0) {
    //     tantheta = Number.POSITIVE_INFINITY;
    // } else {
    //     tantheta = x / y * b * b / (a * a);

    // }
    // if (ellipse.ccw) {
    //     tantheta = -tantheta;
    // }
    // vel = new Two.Vector(1, tantheta);

    // //have to do this because this thing can't handle infinities
    // if (tantheta == Number.POSITIVE_INFINITY) {
    //     vel = new Two.Vector(0, 1);
    // } else if (tantheta == Number.NEGATIVE_INFINITY) {
    //     vel = new Two.Vector(0, -1);
    // }
    // vel.normalize();
    // vel = matrixMultiplyVector(matrixForEllipse(ellipse), vel);
    // return vel;
}

function pointOnEllipse(ellipse, angle) {
    let x = Math.cos(angle) * ellipse.width / 2;
    let y = Math.sin(angle) * ellipse.height / 2;
    let point = new Two.Vector(x, y);
    let matrix = new Two.Matrix();
    matrix.rotate(ellipse.rotation);
    matrix.translate(ellipse.translation.x, ellipse.translation.y);
    point = matrixMultiplyPoint(matrix, point);
    console.log(point);
    return point;
}

function matrixForEllipse(ellipse) {
    let matrix = new Two.Matrix();
    matrix.rotate(ellipse.rotation);
    matrix.translate(ellipse.translation.x, ellipse.translation.y);
    return matrix;
}

// Matrix multiply cuz two doesn't have it?????
function matrixMultiplyPoint(matrix, point) {
    const m = matrix.elements;
    let x = point.x * m[0] + point.y * m[1] + m[2];
    let y = point.x * m[3] + point.y * m[4] + m[5];
    let result = new Two.Vector(x, y);
    return result;
}
function matrixMultiplyVector(matrix, vec) {
    const m = matrix.elements;
    let x = vec.x * m[0] + vec.y * m[1];
    let y = vec.x * m[3] + vec.y * m[4];
    let point = new Two.Vector(x, y);
    return point;
}



/***/ })

},[["tjUo",1]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5lbGVtLmlkID0gXCJkcmF3LXNoYXBlc1wiO1xyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW0pO1xyXG52YXIgcGFyYW1zID0geyB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH07XHJcbnZhciB0d28gPSBuZXcgVHdvKHBhcmFtcykuYXBwZW5kVG8oZWxlbSk7XHJcblxyXG4vLyB0d28gaGFzIGNvbnZlbmllbmNlIG1ldGhvZHMgdG8gY3JlYXRlIHNoYXBlcy5cclxuLy8gdmFyIGNpcmNsZSA9IHR3by5tYWtlRWxsaXBzZSg3MiwgMTAwLCA1MCwgMTAwKTtcclxuLy8gdmFyIHJlY3QgPSB0d28ubWFrZVJlY3RhbmdsZSgyMTMsIDEwMCwgMTAwLCAxMDApO1xyXG5cclxuLy8gVGhlIG9iamVjdCByZXR1cm5lZCBoYXMgbWFueSBzdHlsYWJsZSBwcm9wZXJ0aWVzOlxyXG4vLyBjaXJjbGUuZmlsbCA9ICcjRkY4MDAwJztcclxuLy8gY2lyY2xlLnN0cm9rZSA9ICdvcmFuZ2VyZWQnOyAvLyBBY2NlcHRzIGFsbCB2YWxpZCBjc3MgY29sb3JcclxuLy8gY2lyY2xlLmxpbmV3aWR0aCA9IDU7XHJcblxyXG4vLyByZWN0LmZpbGwgPSAncmdiKDAsIDIwMCwgMjU1KSc7XHJcbi8vIHJlY3Qub3BhY2l0eSA9IDAuNzU7XHJcbi8vIHJlY3Qubm9TdHJva2UoKTtcclxuLy8gdHdvLmFkZChwYXRoKTtcclxuLy8gRG9uJ3QgZm9yZ2V0IHRvIHRlbGwgdHdvIHRvIHJlbmRlciBldmVyeXRoaW5nXHJcbi8vIHRvIHRoZSBzY3JlZW5cclxuLy8gbXlkcmF3aW5nKCk7XHJcbmRyYXdpbmcxKCk7XHJcbnR3by51cGRhdGUoKTtcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUN1cnZlKHAxLCB2MSwgcDIsIHYyKSB7XHJcbiAgICB2YXIgYW5jaG9ycyA9IG5ldyBBcnJheSg0KTtcclxuICAgIGFuY2hvcnNbMF0gPSBuZXcgVHdvLkFuY2hvcihwMS54LCBwMS55KTtcclxuICAgIGFuY2hvcnNbMV0gPSBuZXcgVHdvLkFuY2hvcihwMS54ICsgdjEueCwgcDEueSArIHYxLnkpO1xyXG4gICAgYW5jaG9yc1szXSA9IG5ldyBUd28uQW5jaG9yKHAyLngsIHAyLnkpO1xyXG4gICAgYW5jaG9yc1syXSA9IG5ldyBUd28uQW5jaG9yKHAyLnggKyB2Mi54LCBwMi55ICsgdjIueSk7XHJcbiAgICB2YXIgcGF0aCA9IHR3by5tYWtlQ3VydmUoYW5jaG9ycywgdHJ1ZSk7XHJcbiAgICByZXR1cm4gcGF0aDtcclxufVxyXG5cclxuZnVuY3Rpb24gbXlkcmF3aW5nKCkge1xyXG4gICAgdmFyIGVsbGlwc2UxID0gdHdvLm1ha2VFbGxpcHNlKDUwLCA1MCwgNTApO1xyXG4gICAgdmFyIGVsbGlwc2UyID0gdHdvLm1ha2VFbGxpcHNlKDI1MCwgNTAsIDUwKTtcclxuICAgIGNvbnNvbGUubG9nKGVsbGlwc2UxKTtcclxufVxyXG5cclxuLy8gc2VsZWN0IGEgcmFuZG9tIHBvaW50IG9uIHRoZSBlbGxpcHNlIGFuZCBkcmF3IGFub3RoZXIgY2lyY2xlXHJcbi8vIG9mIHJhbmRvbSByYWRpdXMgc29tZSBkaXN0YW5jZSBhd2F5XHJcbmZ1bmN0aW9uIGRyYXdpbmcxKCkge1xyXG4gICAgdmFyIGVsbGlwc2UxID0gdHdvLm1ha2VFbGxpcHNlKDAsIDAsIDUwKTtcclxuICAgIHZhciBlbGxpcHNlMiA9IHR3by5tYWtlRWxsaXBzZSgyNTAsIDUwLCA1MCk7XHJcbiAgICBlbGxpcHNlMS5jY3cgPSB0cnVlO1xyXG4gICAgZWxsaXBzZTIuY2N3ID0gZmFsc2U7XHJcbiAgICBlbGxpcHNlMS50cmFuc2xhdGlvbi5zZXQoNTAsIDUwKTtcclxuICAgIGNvbnNvbGUubG9nKGVsbGlwc2UxKTtcclxuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5QSSAvIDI7XHJcbiAgICBjb25zdCBwMSA9IHBvaW50T25FbGxpcHNlKGVsbGlwc2UxLCBhbmdsZSk7XHJcbiAgICBjb25zdCB2MSA9IGZpbmRWZWxvY2l0eUF0QW5nbGUoZWxsaXBzZTEsIGFuZ2xlKTtcclxuICAgIGNvbnN0IHAyID0gZmluZFBvaW50V2l0aFZlbG9jaXR5KGVsbGlwc2UyLCB2MSk7XHJcbiAgICBjb25zb2xlLmxvZyh2MSk7XHJcbiAgICB2MS5tdWx0aXBseVNjYWxhcigyNSk7XHJcbiAgICBjb25zdCB2MiA9IHYxLmNsb25lKCk7XHJcbiAgICB2Mi5tdWx0aXBseVNjYWxhcigtMSk7XHJcbiAgICBjcmVhdGVDdXJ2ZShwMSwgdjEsIHAyLCB2Mik7XHJcblxyXG59XHJcblxyXG4vLyBmaW5kIGEgcG9pbnQgb24gdGhlIGVsbGlwc2Ugd2l0aCBhIGNlcnRhaW4gdmVsb2NpdHkgZGlyZWN0aW9uXHJcbi8vIHRhbiB0aGV0YSA9IGEgLyBiICogKHZlbC55L3ZlbC54KVxyXG5mdW5jdGlvbiBmaW5kUG9pbnRXaXRoVmVsb2NpdHkoZWxsaXBzZSwgdmVsb2NpdHkpIHtcclxuICAgIC8vIGxldCB0aGV0YSA9IDA7XHJcbiAgICBsZXQgbWF0cml4ID0gbWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKS5pbnZlcnNlKCk7XHJcbiAgICBsZXQgdmVsID0gbWF0cml4TXVsdGlwbHlWZWN0b3IobWF0cml4LCB2ZWxvY2l0eSk7XHJcbiAgICBpZiAoZWxsaXBzZS5jY3cpXHJcbiAgICB7XHJcbiAgICAgICAgdmVsLm5lZ2F0ZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgYSA9IGVsbGlwc2Uud2lkdGggLyAyO1xyXG4gICAgY29uc3QgYiA9IGVsbGlwc2UuaGVpZ2h0IC8gMjtcclxuICAgIGNvbnN0IHNpbnRoZXRhID0gLXZlbC54L2E7XHJcbiAgICBjb25zdCBjb3N0aGV0YSA9IHZlbC55L2I7XHJcbiAgICBsZXQgdmVjID0gbmV3IFR3by5WZWN0b3IoY29zdGhldGEsIHNpbnRoZXRhKTtcclxuICAgIHZlYy5ub3JtYWxpemUoKTtcclxuICAgIHZlYy54ID0gYSAqIHZlYy54O1xyXG4gICAgdmVjLnkgPSBiICogdmVjLnk7XHJcbiAgICB2ZWMgPSBtYXRyaXhNdWx0aXBseVBvaW50KG1hdHJpeEZvckVsbGlwc2UoZWxsaXBzZSksIHZlYyk7XHJcbiAgICByZXR1cm4gdmVjO1xyXG4gICAgLy8gaWYgKHZlbC55ID09PSAwKSB7XHJcbiAgICAvLyAgICAgdGhldGEgPSB2ZWwueCA+IDAgPyAtTWF0aC5QSSAvIDIgOiBNYXRoLlBJIC8gMjtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgdGhldGEgPSB2ZWwueCAvIHZlbC55ICogYiAvIGE7XHJcbiAgICAvLyAgICAgdGhldGEgPSBNYXRoLmF0YW4yKHRoZXRhLCAxKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGxldCBwb2ludCA9IG5ldyBUd28uVmVjdG9yKCk7XHJcbiAgICAvLyBwb2ludC5zZXQoYSAqIE1hdGguY29zKHRoZXRhKSwgYiAqIE1hdGguc2luKHRoZXRhKSk7XHJcbiAgICAvLyBwb2ludCA9IG1hdHJpeE11bHRpcGx5UG9pbnQobWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSwgcG9pbnQpO1xyXG4gICAgLy8gcmV0dXJuIHBvaW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kVmVsb2NpdHlBdEFuZ2xlKGVsbGlwc2UsIGFuZ2xlKSB7XHJcbiAgICBsZXQgYSA9IGVsbGlwc2Uud2lkdGggLyAyO1xyXG4gICAgbGV0IGIgPSBlbGxpcHNlLmhlaWdodCAvIDI7XHJcblxyXG4gICAgbGV0IHggPSBhICogTWF0aC5jb3MoYW5nbGUpO1xyXG4gICAgbGV0IHkgPSBiICogTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuICAgIGxldCBkeCA9IC1hICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgbGV0IGR5ID0gYiAqIE1hdGguY29zKGFuZ2xlKTtcclxuICAgIGxldCB2ZWwgPSBuZXcgVHdvLlZlY3RvcihkeCwgZHkpO1xyXG4gICAgdmVsLm5vcm1hbGl6ZSgpO1xyXG4gICAgaWYgKGVsbGlwc2UuY2N3KSB7XHJcbiAgICAgICAgdmVsLm5lZ2F0ZSgpO1xyXG4gICAgfVxyXG4gICAgdmVsID0gbWF0cml4TXVsdGlwbHlWZWN0b3IobWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSwgdmVsKTtcclxuICAgIHJldHVybiB2ZWw7XHJcbiAgICAvLyBsZXQgdGFudGhldGEgPSBJbmZpbml0eTtcclxuXHJcbiAgICAvLyBpZiAoeSA9PSAwKSB7XHJcbiAgICAvLyAgICAgdGFudGhldGEgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIHRhbnRoZXRhID0geCAvIHkgKiBiICogYiAvIChhICogYSk7XHJcblxyXG4gICAgLy8gfVxyXG4gICAgLy8gaWYgKGVsbGlwc2UuY2N3KSB7XHJcbiAgICAvLyAgICAgdGFudGhldGEgPSAtdGFudGhldGE7XHJcbiAgICAvLyB9XHJcbiAgICAvLyB2ZWwgPSBuZXcgVHdvLlZlY3RvcigxLCB0YW50aGV0YSk7XHJcblxyXG4gICAgLy8gLy9oYXZlIHRvIGRvIHRoaXMgYmVjYXVzZSB0aGlzIHRoaW5nIGNhbid0IGhhbmRsZSBpbmZpbml0aWVzXHJcbiAgICAvLyBpZiAodGFudGhldGEgPT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XHJcbiAgICAvLyAgICAgdmVsID0gbmV3IFR3by5WZWN0b3IoMCwgMSk7XHJcbiAgICAvLyB9IGVsc2UgaWYgKHRhbnRoZXRhID09IE51bWJlci5ORUdBVElWRV9JTkZJTklUWSkge1xyXG4gICAgLy8gICAgIHZlbCA9IG5ldyBUd28uVmVjdG9yKDAsIC0xKTtcclxuICAgIC8vIH1cclxuICAgIC8vIHZlbC5ub3JtYWxpemUoKTtcclxuICAgIC8vIHZlbCA9IG1hdHJpeE11bHRpcGx5VmVjdG9yKG1hdHJpeEZvckVsbGlwc2UoZWxsaXBzZSksIHZlbCk7XHJcbiAgICAvLyByZXR1cm4gdmVsO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb2ludE9uRWxsaXBzZShlbGxpcHNlLCBhbmdsZSkge1xyXG4gICAgbGV0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiBlbGxpcHNlLndpZHRoIC8gMjtcclxuICAgIGxldCB5ID0gTWF0aC5zaW4oYW5nbGUpICogZWxsaXBzZS5oZWlnaHQgLyAyO1xyXG4gICAgbGV0IHBvaW50ID0gbmV3IFR3by5WZWN0b3IoeCwgeSk7XHJcbiAgICBsZXQgbWF0cml4ID0gbmV3IFR3by5NYXRyaXgoKTtcclxuICAgIG1hdHJpeC5yb3RhdGUoZWxsaXBzZS5yb3RhdGlvbik7XHJcbiAgICBtYXRyaXgudHJhbnNsYXRlKGVsbGlwc2UudHJhbnNsYXRpb24ueCwgZWxsaXBzZS50cmFuc2xhdGlvbi55KTtcclxuICAgIHBvaW50ID0gbWF0cml4TXVsdGlwbHlQb2ludChtYXRyaXgsIHBvaW50KTtcclxuICAgIGNvbnNvbGUubG9nKHBvaW50KTtcclxuICAgIHJldHVybiBwb2ludDtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSB7XHJcbiAgICBsZXQgbWF0cml4ID0gbmV3IFR3by5NYXRyaXgoKTtcclxuICAgIG1hdHJpeC5yb3RhdGUoZWxsaXBzZS5yb3RhdGlvbik7XHJcbiAgICBtYXRyaXgudHJhbnNsYXRlKGVsbGlwc2UudHJhbnNsYXRpb24ueCwgZWxsaXBzZS50cmFuc2xhdGlvbi55KTtcclxuICAgIHJldHVybiBtYXRyaXg7XHJcbn1cclxuXHJcbi8vIE1hdHJpeCBtdWx0aXBseSBjdXogdHdvIGRvZXNuJ3QgaGF2ZSBpdD8/Pz8/XHJcbmZ1bmN0aW9uIG1hdHJpeE11bHRpcGx5UG9pbnQobWF0cml4LCBwb2ludCkge1xyXG4gICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cztcclxuICAgIGxldCB4ID0gcG9pbnQueCAqIG1bMF0gKyBwb2ludC55ICogbVsxXSArIG1bMl07XHJcbiAgICBsZXQgeSA9IHBvaW50LnggKiBtWzNdICsgcG9pbnQueSAqIG1bNF0gKyBtWzVdO1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBUd28uVmVjdG9yKHgsIHkpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5mdW5jdGlvbiBtYXRyaXhNdWx0aXBseVZlY3RvcihtYXRyaXgsIHZlYykge1xyXG4gICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cztcclxuICAgIGxldCB4ID0gdmVjLnggKiBtWzBdICsgdmVjLnkgKiBtWzFdO1xyXG4gICAgbGV0IHkgPSB2ZWMueCAqIG1bM10gKyB2ZWMueSAqIG1bNF07XHJcbiAgICBsZXQgcG9pbnQgPSBuZXcgVHdvLlZlY3Rvcih4LCB5KTtcclxuICAgIHJldHVybiBwb2ludDtcclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==