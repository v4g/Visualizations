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

