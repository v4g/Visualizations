
function setup() {
    createCanvas(500, 500);
    console.log(glMatrix);
    const ellipse = new Ellipse(50, 50, 80, 80);
    console.log(ellipse);
    const obj = findPointWithVelocity(ellipse, [1, 0]);
    console.log(obj);
}

function draw() {
    background(220);
    ellipse(50, 50, 80, 80);
    createCurve({ x: 50, y: 50 }, { x: 10, y: 10 }, { x: 90, y: 50 }, { x: 10, y: 10 });
}

function myscene() {

}

function createCurve(p1, v1, p2, v2) {
    let p3 = { x: p1.x + v1.x, y: p1.y + v1.y };
    let p4 = { x: p2.x + v2.x, y: p2.y + v2.y };
    stroke(0);
    curve(p1.x, p1.y, p3.x, p3.y, p2.x, p2.y, p4.x, p4.y);
}
function Object2D() {

    this.matrix = glMatrix.mat2d.create();
    this._rotate = 0;
    this._scale = glMatrix.vec2.create();
    glMatrix.vec2.set(this._scale, 1, 1);
    this._translate = glMatrix.vec2.create();
    console.log(this.matrix);
    Object.defineProperty(this, "rotate", {
        get() {
            return this._rotate;
        },
        set(r) {
            this._rotate = r;
            this.updateMatrix();
        }
    });
    this.updateMatrix = function () {
        this.matrix = glMatrix.mat2d.fromRotation(this.matrix, this._rotate);
        const mat = glMatrix.mat2d.fromTranslation(glMatrix.mat2d.create(), this._translate);
        const mat2 = glMatrix.mat2d.fromScaling(glMatrix.mat2d.create(), this._scale);
        // Scale, rotate, then translate
        glMatrix.mat2d.mul(this.matrix, mat, this.matrix);
        glMatrix.mat2d.mul(this.matrix, this.matrix, mat2);
        // glMatrix.mat2d.invert(this.matrix, this.matrix);
    };
    Object.defineProperty(this, "translate", {
        get() {
            return this._translate;
        },
        set(x) {
            if (x[0]) {
                this._translate[0] = x[0];
            }
            if (x[1]) {
                this._translate[1] = x[1];
            }
            this.updateMatrix();
        }
    });
    Object.defineProperty(this, "scale", {

        get() {
            return this._scale;
        },
        set(sc) {
            if (sc[0]) {
                this._scale[0] = sc[0];
            }
            if (sc[1]) {
                this._scale[1] = sc[1];
            }
            this.updateMatrix();
        }
    });
}

function Ellipse(a, b, x, y, ccw) {
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
    this.obj = new Object2D();
    this.obj.translate = [x, y];
    this.ccw = ccw ? ccw : false;
}

// // select a random point on the ellipse and draw another circle
// // of random radius some distance away
// function drawing1() {
//     var ellipse1 = two.makeEllipse(0, 0, 50);
//     var ellipse2 = two.makeEllipse(250, 50, 50);
//     ellipse1.ccw = true;
//     ellipse2.ccw = false;
//     ellipse1.translation.set(50, 50);
//     console.log(ellipse1);
//     const angle = Math.PI / 2;
//     const p1 = pointOnEllipse(ellipse1, angle);
//     const v1 = findVelocityAtAngle(ellipse1, angle);
//     const p2 = findPointWithVelocity(ellipse2, v1);
//     console.log(v1);
//     v1.multiplyScalar(25);
//     const v2 = v1.clone();
//     v2.multiplyScalar(-1);
//     createCurve(p1, v1, p2, v2);

// }

// find a point on the ellipse with a certain velocity direction
// tan theta = a / b * (vel.y/vel.x)
function findPointWithVelocity(ellipse, velocity) {
    // let theta = 0;
    let matrix = glMatrix.mat2d.create();
    glMatrix.mat2d.invert(matrix, ellipse.obj.matrix);
    let vel = glMatrix.vec2.transformMat2(glMatrix.vec2.create(), velocity, matrix);
    if (ellipse.ccw) {
        vel.negate();
    }
    const a = ellipse.a;
    const b = ellipse.b;
    const sintheta = -vel[0] / a;
    const costheta = vel[1] / b;
    let vec = [costheta, sintheta];
    glMatrix.vec2.normalize(vec, vec);
    vec[0] = a * vec[0];
    vec[1] = b * vec[1];
    vec = glMatrix.vec2.transformMat2d(vec, vec, ellipse.obj.matrix);
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

// function findVelocityAtAngle(ellipse, angle) {
//     let a = ellipse.width / 2;
//     let b = ellipse.height / 2;

//     let x = a * Math.cos(angle);
//     let y = b * Math.sin(angle);

//     let dx = -a * Math.sin(angle);
//     let dy = b * Math.cos(angle);
//     let vel = new Two.Vector(dx, dy);
//     vel.normalize();
//     if (ellipse.ccw) {
//         vel.negate();
//     }
//     vel = matrixMultiplyVector(matrixForEllipse(ellipse), vel);
//     return vel;
//     // let tantheta = Infinity;

//     // if (y == 0) {
//     //     tantheta = Number.POSITIVE_INFINITY;
//     // } else {
//     //     tantheta = x / y * b * b / (a * a);

//     // }
//     // if (ellipse.ccw) {
//     //     tantheta = -tantheta;
//     // }
//     // vel = new Two.Vector(1, tantheta);

//     // //have to do this because this thing can't handle infinities
//     // if (tantheta == Number.POSITIVE_INFINITY) {
//     //     vel = new Two.Vector(0, 1);
//     // } else if (tantheta == Number.NEGATIVE_INFINITY) {
//     //     vel = new Two.Vector(0, -1);
//     // }
//     // vel.normalize();
//     // vel = matrixMultiplyVector(matrixForEllipse(ellipse), vel);
//     // return vel;
// }

// function pointOnEllipse(ellipse, angle) {
//     let x = Math.cos(angle) * ellipse.width / 2;
//     let y = Math.sin(angle) * ellipse.height / 2;
//     let point = new Two.Vector(x, y);
//     let matrix = new Two.Matrix();
//     matrix.rotate(ellipse.rotation);
//     matrix.translate(ellipse.translation.x, ellipse.translation.y);
//     point = matrixMultiplyPoint(matrix, point);
//     console.log(point);
//     return point;
// }

// function matrixForEllipse(ellipse) {
//     let matrix = new Two.Matrix();
//     matrix.rotate(ellipse.rotation);
//     matrix.translate(ellipse.translation.x, ellipse.translation.y);
//     return matrix;
// }

// // Matrix multiply cuz two doesn't have it?????
// function matrixMultiplyPoint(matrix, point) {
//     const m = matrix.elements;
//     let x = point.x * m[0] + point.y * m[1] + m[2];
//     let y = point.x * m[3] + point.y * m[4] + m[5];
//     let result = new Two.Vector(x, y);
//     return result;
// }
// function matrixMultiplyVector(matrix, vec) {
//     const m = matrix.elements;
//     let x = vec.x * m[0] + vec.y * m[1];
//     let y = vec.x * m[3] + vec.y * m[4];
//     let point = new Two.Vector(x, y);
//     return point;
// }

