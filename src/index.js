var spiral1, spiral2, spiral3;
var spirals;
var frame = 0;
function setup() {
    createCanvas(500, 500);
    // noLoop();
    myscene_spirals()
}

function draw() {
    background(220);
    if (frame % 20 == 0) {
        // background(220);
    }
    frame += 1;
    draw_myscene();
}
function draw_myscene() {
    myscene_spirals();
    for (let i = 0; i < spirals.length; i++) {
        let spiral = spirals[i];
        if (spiral.ccw) {
            spiral.obj.rotate = spiral.obj.rotate - Math.PI / 200;
        } else {
            spiral.obj.rotate = spiral.obj.rotate - Math.PI / 200;
        }
    }
    let spiral_u_max = new Array(spirals.length);//initialized with 0s
    for (let i = 0; i < spiral_u_max.length; i++) {
        spiral_u_max[i] = 1;
    }
    // for (let i = 0; i < spirals.length - 1; i++) {
    //     u = connect_spirals(spirals[i], spirals[i + 1]);
    //     spiral_u_max[i] = Math.max(u.u1, spiral_u_max[i]);
    //     spiral_u_max[i + 1] = Math.max(u.u2, spiral_u_max[i + 1]);
    // }
    for (let i = 0; i < spirals.length; i++) {
        let spiral = spirals[i];
        spiral.draw(spiral_u_max[i]);
    }
}

// function draw_myscene() {
//     spiral2.obj.rotate = spiral2.obj.rotate - Math.PI/200;
//     spiral1.obj.rotate = spiral1.obj.rotate + Math.PI/200;
//     u = connect_spirals(spiral1, spiral2);
//     u2 = connect_spirals(spiral2, spiral3);
//     spiral1.draw(u.u1);
//     spiral2.draw(Math.max(u2.u1, u.u2));
//     spiral3.draw(u2.u2);
// }
function myscene() {
    const ellipse1 = new Spiral(60, 50, 80, 80, 5, false);
    const ellipse2 = new Spiral(50, 40, 210, 80, 5, true);
    const ellipse3 = new Ellipse(100, 60, 290, 300);
    ellipse3.obj.rotate = Math.PI / 3;
    ellipse1.draw();
    ellipse2.draw();
    ellipse3.draw();
    createCurveBetweenTwoSpirals(ellipse1, ellipse2, Math.PI / 2);
    createCurveBetweenTwoEllipses(ellipse2, ellipse3, 0);
}
function myscene_spiral() {
    spiral1 = new ExpSpiral(60, 80, 80, 5, true);
    spiral2 = new ExpSpiral(50, 210, 80, 5, false);
    spiral3 = new ExpSpiral(50, 210, 220, 5, true);
    spiral1.draw();
    spiral2.draw();
}
function myscene_spirals() {
    // spirals = arrange_grid(50, 500, 500);
    spirals = arrange_inspirals(50, 250, 250, 5);
}
function arrange_grid(radius, width, height, spacing = 0, number_of_rotations = 5) {
    const overflow_width = (width % radius) / 2;
    const overflow_height = (width % radius) / 2;
    const spirals_per_row = Math.floor(width / (2 * radius + spacing));
    const spirals_per_col = Math.floor(height / (2 * radius + spacing));
    let spirals = new Array(spirals_per_row * spirals_per_col);
    for (let i = 0; i < spirals_per_row; i += 1) {
        for (let j = 0; j < spirals_per_col; j += 1) {
            // snake pattern
            let x = (overflow_width + radius) + i * 2 * radius + spacing;
            x = j % 2 == 0 ? x : width - x;
            let y = (overflow_height + radius) + j * 2 * radius;
            spirals[j * spirals_per_row + i] = new ExpSpiral(radius, x, y, number_of_rotations, i % 2 == 0)
        }
    }
    return spirals;
}
// One main spiral, with many spirals inside it
// Could be recursive. The spirals sit inside the long arm of a spiral
function arrange_inspirals(radius, x, y, n) {
    // one main spiral
    const spirals = new Array(2);
    const big_spiral = new ExpSpiral(radius, x, y, n);

    // find the radius of the other spirals they should be between two arms of the spiral
    // same theta, different u's
    let u1 = big_spiral.at((big_spiral.n - 2) / big_spiral.n);
    let u2 = big_spiral.at((big_spiral.n - 1) / big_spiral.n);
    let vec = glMatrix.vec2.create();
    glMatrix.vec2.sub(vec, u2, u1);
    let diameter = glMatrix.vec2.len(vec);
    console.log(diameter);
    // ratio of r at upper point to r at lower point
    let ratio = big_spiral.parameters((2 * big_spiral.n - 1) / (2 * big_spiral.n)).scale / big_spiral.parameters(1).scale;
    diameter = diameter * (ratio / (ratio + 1));
    ratio = ratio / (ratio + 1);
    let center = glMatrix.vec2.create();
    glMatrix.vec2.scaleAndAdd(center, u1, vec, ratio);

    // diameter = ratio * diameter;
    // this could be way faster if when calculating the point by a spiral
    // we specify the scale as (n-1)/n + 1/2n and stay with the same angle
    // glMatrix.vec2.scale(vec, vec, ratio);
    // glMatrix.vec2.add(center, u1, vec);
    const small_spiral = new ExpSpiral(diameter, center[0], center[1], n);
    spirals[0] = big_spiral;
    spirals[1] = small_spiral;
    return spirals;
}

function arranger(n_spirals, algorithm) {

    function arrange() {

    }
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
function createCurveBetweenTwoSpirals(spiral1, spiral2, angle) {
    const vel = spiral1.velocityAtAngle(angle);
    const normalized_vel = glMatrix.vec2.create();
    glMatrix.vec2.normalize(normalized_vel, vel);
    const obj1 = spiral2.findPointWithVelocity(normalized_vel);
    const point = spiral1.at(spiral1.uFromTheta(angle));
    preprocess(spiral1, vel, point);
    preprocess(spiral2, obj1.velocity, obj1.point);
    createCurve(point, vel, obj1.point, obj1.velocity);
}

function preprocess(ellipse, vel, point) {
    // I have no idea why this works.. Why 3??
    // It just does
    let dist = glMatrix.vec2.fromValues(point[0] - ellipse.x, point[1] - ellipse.y);
    dist = glMatrix.vec2.len(dist);
    // the shorter the axis this is on, the more scaling needed
    const eccentricity = Math.max(ellipse.a, ellipse.b) / Math.min(ellipse.a, ellipse.b);
    const ext = 3 * Math.max(ellipse.a, ellipse.b) / dist;
    vel[0] *= ext;
    vel[1] *= ext;
}

function preprocessVel(spiral, vel) {
    // I have no idea why this works.. Why 3??
    // It just does
    const ext = 1.5;
    vel[0] *= ext;
    vel[1] *= ext;
}

// Draws a curve given a bunch of points
function draw_curve(curve_points) {
    stroke(0);
    noFill();
    beginShape();
    for (let i = 0; i < curve_points.length; i++) {
        vertex(curve_points[i][0], curve_points[i][1]);
    }
    endShape();
}

function createCurve(p1, v1, p2, v2) {

    curve_points = hermite(p1, v1, p2, v2, 200);
    draw_curve(curve_points);
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

function fx(x) {
    const res = (1 + Math.sin((-Math.PI / 2) + (x * Math.PI))) / 2;
    return res;
}
// interpolates the spiral curves from points at
// u1 and u2. Linear interpolation between the curves, returns
// the points
function interpolate_spirals(s1, u1, s2, u2, n = 10) {
    const u1_i = (u1[1] - u1[0]) / n;
    const u2_i = (u2[1] - u2[0]) / n;
    const results = new Array(n + 1);
    for (let i = 0; i <= n; i += 1) {
        // let w2 = (i * i * i) / (n * n * n);
        let w2 = fx(fx(fx(fx(i / n))));
        const w = 1 - w2;
        let p1 = s1.at(u1[0] + i * u1_i);
        glMatrix.vec2.scale(p1, p1, w);
        const p2 = s2.at(u2[0] + i * u2_i);
        glMatrix.vec2.scale(p2, p2, w2);
        glMatrix.vec2.add(p2, p2, p1);
        results[i] = p2;
    }
    return results;
}

function connect_spirals(s1, s2) {
    // subtract centers to get velocity
    // find the point on s1 with this velocity
    // find the point on s2 with this velocity
    // connect them using a curve
    const vel = [s2.x - s1.x, s2.y - s1.y];
    const u1 = s1.findPointWithVelocity(vel);
    const u2 = s2.findPointWithVelocity(vel);
    preprocessVel(s1, u1.velocity);
    preprocessVel(s2, u2.velocity);
    createCurve(u1.point, u1.velocity, u2.point, u2.velocity);
    // interpolate_spirals(s1, [u1, u1 - 0.1], s2, [u2, u2 - 0.1]);
    return { u1: u1.u, u2: u2.u };
}

function ExpSpiral(r, x, y, n, ccw) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.n = n; // no of rotations
    this.obj = new Object2D();
    this.obj.translate = [x, y];
    this.ccw = ccw ? ccw : false;

    this.at = function (u) {
        point = this.at_local(u);

        glMatrix.vec2.transformMat2d(point, point, this.obj.matrix);
        return point;
    }

    this.morphLocal = function (scale, theta) {
        const point = [scale * Math.cos(theta), scale * Math.sin(theta)];
        // clockwise rotation is just fliiping it around the x axis
        // could also be done with the matrix by inverting one rotation
        // axis
        // Doing the opposite here because the -ve here becomes +ve in the
        // viewport
        if (this.ccw) {
            point[1] = -point[1];
        }
        return point;

    }

    this.morph = function (scale, theta) {
        const point = [scale * Math.cos(theta), scale * Math.sin(theta)];
        // clockwise rotation is just fliiping it around the x axis
        // could also be done with the matrix by inverting one rotation
        // axis
        // Doing the opposite here because the -ve here becomes +ve in the
        // viewport
        if (this.ccw) {
            point[1] = -point[1];
        }
        glMatrix.vec2.transformMat2d(point, point, this.obj.matrix);
        return point;

    }

    this.at_local = function (u) {
        const obj = this.parameters(u);
        return this.morphLocal(obj.scale, obj.theta);
    }
    this.get_upair = function (u) {
        return u + 1 / this.n;
    }
    this.slope = function (u) {
        const obj = this.parameters(u);
        const result_x = u * obj.scale * Math.cos(obj.theta) - obj.scale * Math.sin(obj.theta);
        const result_y = u * obj.scale * Math.sin(obj.theta) + obj.scale * Math.cos(obj.theta);
        const result = [result_x, result_y];
        result[0] = -result[0];
        result[1] = -result[1];
        if (this.ccw) {
            // result[0] = -result[0];
            result[1] = -result[1];
        }
        return result;
    }

    // u between 0 and 1
    // at u = 0, the point should be nearly 0
    // at u = 1, the point should be the radius
    this.parameters = function (u) {
        const mapped_u = (u - 0.9) * 10
        const scale = this.r * Math.exp(mapped_u);
        const theta = u * this.n * 2 * Math.PI;
        return { scale, theta };
    }

    this.draw = function (u) {
        if (!u) {
            u = 1;
        }
        const m = this.obj.matrix;
        const subdivisions = 800;
        applyMatrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        const points = new Array(subdivisions);
        const center = subdivisions / 2;
        for (let i = 0; i < subdivisions; i++) {
            points[i] = this.at_local((i * u) / subdivisions);
        }
        stroke(0);
        noFill();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1]);
        }
        endShape();
        resetMatrix();
    }

    this.uFromTheta = function (theta, r) {
        if (!r) {
            r = this.n;
        }
        // Because the velocity is in the opposite direction
        // the theta should be subtracted from 2PI
        if (this.ccw) {
            theta = (2 * Math.PI - theta) % (2 * Math.PI);
        }
        const u = ((r - 1) / this.n) + (theta / (2 * Math.PI)) / this.n;
        return u;
    }

    this.getUforVelocity = function (velocity) {
        // let theta = 0;
        let matrix = glMatrix.mat2d.create();
        glMatrix.mat2d.invert(matrix, this.obj.matrix);
        let vel = glMatrix.vec2.transformMat2(glMatrix.vec2.create(), velocity, matrix);
        if (this.ccw) {
            glMatrix.vec2.negate(vel, vel);
        }
        // normalize so that it actually becomes valid sin and cos thetas
        glMatrix.vec2.normalize(vel, vel);
        let theta = Math.atan2(-vel[0], vel[1]);
        theta += Math.PI;
        const u = this.uFromTheta(theta);
        return u;
    }

    this.findPointWithVelocity = function (velocity) {
        const u = this.getUforVelocity(velocity);
        let vel = this.slope(u);
        const pos = this.at(u);
        vel = glMatrix.vec2.transformMat2(vel, vel, this.obj.matrix);
        return { point: pos, velocity: vel, u };
    }

}
function Spiral(a, b, x, y, r, ccw) {
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
    this.r = r; // no of rotations
    this.obj = new Object2D();
    this.obj.translate = [x, y];
    this.ccw = ccw ? ccw : false;

    this.at = function (u) {
        point = at.call(this, u);

        glMatrix.vec2.transformMat2d(point, point, this.obj.matrix);
        return point;
    }

    this.velocityAtAngle = function (angle, rev) {

        const u = this.uFromTheta(angle, rev);
        const vel = [-a * u * Math.sin(angle), b * u * Math.cos(angle)];
        if (this.ccw) {
            glMatrix.vec2.negate(vel, vel);
        }
        return vel;
    }

    this.uFromTheta = function (theta, r) {
        if (!r) {
            r = this.r;
        }
        if (this.ccw) {
            theta = (2 * Math.PI - theta) % (2 * Math.PI);
        }
        const u = ((r - 1) / this.r) + (theta / (2 * Math.PI)) / this.r;
        return u;
    }

    function at(u) {
        // point at u = acostheta, bsintheta
        // theta = u * r * 2PI
        const theta = u * r * 2 * Math.PI;
        const point = [a * u * Math.cos(theta), b * u * Math.sin(theta)];
        // clockwise rotation is just fliiping it around the x axis
        // could also be done with the matrix by inverting one rotation
        // axis
        // Doing the opposite here because the -ve here becomes +ve in the
        // viewport
        if (this.ccw) {
            point[1] = -point[1];
        }
        return point;
    }

    this.draw = function () {
        const m = this.obj.matrix;
        const subdivisions = 200;
        applyMatrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        const points = new Array(subdivisions);
        for (let i = 0; i < subdivisions; i++) {
            points[i] = at.call(this, i / subdivisions);
        }
        stroke(0);
        noFill();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1]);
        }
        endShape();
        resetMatrix();
    }

    this.findPointWithVelocity = function (velocity) {
        // let theta = 0;
        let matrix = glMatrix.mat2d.create();
        glMatrix.mat2d.invert(matrix, this.obj.matrix);
        let vel = glMatrix.vec2.transformMat2(glMatrix.vec2.create(), velocity, matrix);
        if (this.ccw) {
            glMatrix.vec2.negate(vel, vel);
        }
        const a = this.a;
        const b = this.b;
        const sintheta = -vel[0] / a;
        const costheta = vel[1] / b;
        let vec = [costheta, sintheta];
        // normalize so that it actually becomes valid sin and cos thetas
        glMatrix.vec2.normalize(vec, vec);
        const theta = Math.atan2(sintheta, costheta);
        const u = this.uFromTheta(theta);

        vec[0] = a * u * vec[0];
        vec[1] = b * u * vec[1];
        vel[0] = -a * u * vec[1] / b;
        vel[1] = b * u * vec[0] / a;
        if (this.ccw) {
            glMatrix.vec2.negate(vel, vel);
            // vec[1] = -vec[1];
        }
        vec = glMatrix.vec2.transformMat2d(vec, vec, this.obj.matrix);
        vel = glMatrix.vec2.transformMat2(vel, vel, this.obj.matrix);
        return { point: vec, velocity: vel };
    }
}
function Ellipse(a, b, x, y, ccw) {
    this.a = a;
    this.b = b;
    this.x = x;
    this.y = y;
    this.obj = new Object2D();
    this.obj.translate = [x, y];
    this.ccw = ccw ? ccw : false;

    this.draw = function () {
        const m = this.obj.matrix;
        applyMatrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        ellipse(0, 0, 2 * this.a, 2 * this.b);
        resetMatrix();
    }
}

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
    return { point: vec, velocity: vel };
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
    let points = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        points[i] = hermite_at(p1, v1, p2, v2, i / n, mat);
    }
    return points;
}
// gets the point on a hermite curve from p1 to p2
// with velocity v1 and v2 at u
function hermite_at(p1, v1, p2, v2, u, mat) {
    if (!mat) {
        mat = hermite_matrix(p1, v1, p2, v2);
    }
    const vec = glMatrix.vec4.fromValues(1, u, u * u, u * u * u);
    glMatrix.vec4.transformMat4(vec, vec, mat);
    const vel = glMatrix.vec4.fromValues(0, 1, 2 * u, 3 * u * u);
    glMatrix.vec4.transformMat4(vel, vel, mat);
    // console.log("at u", u, vel);
    return vec;
}
// returns the matrix for the hermite curve from p1 to p2
// with velocity v1 and v2
function hermite_matrix(p1, v1, p2, v2) {
    // column major hermite matrix
    const mat = glMatrix.mat4.fromValues(1, 0, 0, 0,
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
