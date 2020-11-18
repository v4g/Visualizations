
function setup() {
    createCanvas(500, 500);
    noLoop();    
}

function draw() {
    background(220);
    myscene()
}

function myscene() {
    const ellipse1 = new Ellipse(60, 50, 80, 80);
    const ellipse2 = new Ellipse(50, 40, 210, 80, true);
    const ellipse3 = new Ellipse(100, 60, 290, 300);
    ellipse3.obj.rotate = Math.PI/3;
    ellipse1.draw();
    ellipse2.draw();
    ellipse3.draw();
    createCurveBetweenTwoEllipses(ellipse1, ellipse2, Math.PI / 2);
    createCurveBetweenTwoEllipses(ellipse2, ellipse3, 0);
    }

function createCurveBetweenTwoEllipses(ellipse1, ellipse2, angle) {
    const vel = findVelocityAtAngle(ellipse1, angle);
    const normalized_vel = glMatrix.vec2.create();
    glMatrix.vec2.normalize(normalized_vel, vel);
    const obj1 = findPointWithVelocity(ellipse2, normalized_vel);
    const point = pointOnEllipse(ellipse1, angle);
    preprocess(ellipse1, vel, point);
    preprocess(ellipse2, obj1.velocity, obj1.point);
    createCurve(point, vel, obj1.point, obj1.velocity);
}

function preprocess(ellipse, vel, point) {
    // I have no idea why this works.. Why 3??
    // It just does
    let dist = glMatrix.vec2.fromValues(point[0]-ellipse.x, point[1]-ellipse.y);
    dist = glMatrix.vec2.len(dist);
    // the shorter the axis this is on, the more scaling needed
    const eccentricity =  Math.max(ellipse.a, ellipse.b) / Math.min(ellipse.a, ellipse.b);
    const ext = 3 *  Math.max(ellipse.a, ellipse.b) / dist;
    console.log(ext);
    vel[0] *= ext;
    vel[1] *= ext;
}

function createCurve(p1, v1, p2, v2) {
    
    curve_points = hermite(p1, v1, p2, v2, 200);
    stroke(0);
    noFill();
    beginShape();
    for (let i = 0 ; i < curve_points.length; i++) {
        vertex(curve_points[i][0], curve_points[i][1]);
    }
    endShape();
    // curve(p1[0], p1[1], p3[0], p3[1], p2[0], p2[1], p4[0], p4[1]);
}
function Object2D() {

    this.matrix = glMatrix.mat2d.create();
    this._rotate = 0;
    this._scale = glMatrix.vec2.create();
    glMatrix.vec2.set(this._scale, 1, 1);
    this._translate = glMatrix.vec2.create();
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

    this.draw = function() {
        const m = this.obj.matrix;
        applyMatrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        ellipse(0, 0, 2 * this.a, 2 * this.b);
        resetMatrix();        
    }
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
    if (!ellipse.ccw) {
        glMatrix.vec2.negate(vel, vel);
    }
    const a = ellipse.a;
    const b = ellipse.b;
    const sintheta = -vel[0] / a;
    const costheta = vel[1] / b;
    let vec = [costheta, sintheta];
    // normalize so that it actually becomes valid sin and cos thetas
    glMatrix.vec2.normalize(vec, vec);
    vec[0] = a * vec[0];
    vec[1] = b * vec[1];
    vel[0] = -a * vec[1] / b;
    vel[1] = b * vec[0] / a;
    if (!ellipse.ccw) {
        glMatrix.vec2.negate(vel, vel);
    }
    vec = glMatrix.vec2.transformMat2d(vec, vec, ellipse.obj.matrix);
    vel = glMatrix.vec2.transformMat2(vel, vel, ellipse.obj.matrix);
    return {point: vec, velocity: vel};
}

function findVelocityAtAngle(ellipse, angle) {
    let a = ellipse.a;
    let b = ellipse.b;

    let x = a * Math.cos(angle);
    let y = b * Math.sin(angle);

    let dx = -a * Math.sin(angle);
    let dy = b * Math.cos(angle);
    let vel = [dx, dy];
    // glMatrix.vec2.normalize(vel, vel);
    if (!ellipse.ccw) {
        glMatrix.vec2.negate(vel, vel);
    }
    glMatrix.vec2.transformMat2(vel, vel, ellipse.obj.matrix);
    return vel;
}

function pointOnEllipse(ellipse, angle) {
    let x = Math.cos(angle) * ellipse.a;
    let y = Math.sin(angle) * ellipse.b;
    let point = [x, y];
    let matrix = ellipse.obj.matrix;
    glMatrix.vec2.transformMat2d(point, point, ellipse.obj.matrix);
    return point;
}

// returns the points of hermite curve from p1 to p2
// with velocity v1 and v2 in an array

function hermite(p1, v1, p2, v2, n, mat) {
    if (!n) {
        n = 10;
    }
    if (!mat) {
        mat = hermite_matrix(p1, v1, p2, v2);
    }
    let points = new Array(n+1);
    for (let i=0; i <= n; i++) {
        points[i] = hermite_at(p1, v1, p2, v2, i/n, mat);
    }    
    return points;
}
// gets the point on a hermite curve from p1 to p2
// with velocity v1 and v2 at u
function hermite_at(p1, v1, p2, v2, u, mat) {
    if (!mat) {
        mat = hermite_matrix(p1, v1, p2, v2);
    }
    const vec = glMatrix.vec4.fromValues(1, u, u*u, u*u*u);
    glMatrix.vec4.transformMat4(vec, vec, mat);
    const vel = glMatrix.vec4.fromValues(0, 1, 2*u, 3*u*u);
    glMatrix.vec4.transformMat4(vel, vel, mat);
    // console.log("at u", u, vel);
    return vec;
}
// returns the matrix for the hermite curve from p1 to p2
// with velocity v1 and v2
function hermite_matrix(p1, v1, p2, v2) {
    // column major hermite matrix
    const mat = glMatrix.mat4.fromValues(1, 0 ,0 ,0,
        0, 0, 1, 0,
        -3, 3, -2, -1,
        2, -2, 1, 1);

    // using a 4x4 matrix here because a 2x4 isn't supported
    const point_matrix = glMatrix.mat4.fromValues(p1[0], p1[1], 0, 0,
        p2[0], p2[1], 0, 0,
        v1[0], v1[1], 0, 0,
        v2[0], v2[1], 0, 0);

    glMatrix.mat4.multiply(mat, point_matrix, mat);
    return mat;
}