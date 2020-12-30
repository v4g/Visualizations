var spiral1, spiral2, spiral3;
var spirals;
var frame = 0;
var big_spirals_rotation = 0;
var last_starting_u = 0;
var width = 1024;
var height = 768;
const btn = document.getElementById('recorder'),
    chunks = [];

function record() {
    chunks.length = 0;
    let stream = document.querySelector('canvas').captureStream(24),
        recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        if (e.data.size) {
            chunks.push(e.data);
        }
    };
    recorder.onstop = exportVideo;
    btn.onclick = e => {
        recorder.stop();
        btn.textContent = 'start recording';
        btn.onclick = record;
    };
    recorder.start();
    btn.textContent = 'stop recording';
}

function exportVideo(e) {
    var blob = new Blob(chunks);
    var vid = document.createElement('video');
    vid.id = 'recorded'
    vid.controls = true;
    vid.src = URL.createObjectURL(blob);
    document.body.appendChild(vid);
    vid.play();
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'test.webm';
    a.click();
    window.URL.revokeObjectURL(url);  
}
btn.onclick = record;
function setup() {
    createCanvas(1024, 768);
    // noLoop();
    setup_spirals();
    frameRate(24);
}

function draw() {
    background(0);
    if (frame % 20 == 0) {
        // background(220);
    }
    frame += 1;
    draw_myscene();
}
function draw_myscene() {
    // big_spirals_rotation -= Math.PI / 200;
    for (let i = 0; i < spirals.length; i++) {
        let spiral = spirals[i];
        update_rotating_inspirals(spiral);
    }
    let spiral_u_max = new Array(spirals.length);//initialized with 0s
    for (let i = 0; i < spiral_u_max.length; i++) {
        spiral_u_max[i] = 2;
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

function setup_spirals() {
    // const n = 3;
    // const offsetx = width / n / 2;
    // const offsety = height / n / 2;
    // spirals = new Array(n * n - Math.floor(n / 2));
    // let index = 0;

    // for (let i = 0; i < n; i++) {
    //     for (let j = 0; j < n; j++) {
    //         if (j % 2 == 1 && i == 0) continue;
    //         const in_index = i * n + j;

    //         const x = ((j % 2 == 1) ? 0 : offsetx) + i * width / n;
    //         const y = offsety + j * height / n;
    //         const condition = in_index % 2 == 0;
    //         const rotation = condition ? Math.PI : 0;
    //         spirals[index] = setup_rotating_spiral(50, x, y, 5, 10, false, rotation);
    //         index++;
    //     }
    // }

    spirals = new Array(2);
    // spirals[0] = setup_rotating_spiral(50, 250, 125, 5, 7, false, 0);
    // spirals[1] = setup_rotating_spiral(50, 250, 375, 5, 7, false, Math.PI);
    // spirals[2] = setup_rotating_spiral(50, 125, 250, 5, 7, false, 0);
    // spirals[3] = setup_rotating_spiral(50, 375, 250, 5, 7, false, Math.PI);
    spirals[0] = setup_rotating_spiral(50, 256, 256, 5, 5, false, 0);
    spirals[1] = setup_rotating_spiral(50, 768, 512, 5, 5, true, Math.PI);

}

function setup_rotating_spiral(radius, x, y, n, count = 5, ccw = false, rotation = 0) {

    const spirals = new Array(count);
    const big_spiral = new ExpSpiral(radius, x, y, n, ccw);
    big_spiral.obj.rotate = rotation;
    let starting_u = (big_spiral.n - 2) / big_spiral.n;
    let increment = get_u_increment(starting_u, big_spiral.n - 1, big_spiral, rotation);
    big_spiral.increment_u = increment.u;
    for (let i = 0; i < count; i++) {
        let u = starting_u + i * increment.u;
        const small_spiral = get_spiral_in_spiral(big_spiral, u, rotation);
        spirals[i] = small_spiral;
        // console.log(get_angle_on_spiral(small_spiral, big_spiral));
    }
    big_spiral.children = spirals;
    return big_spiral;

    function get_u_increment(u, r, big_spiral, big_spirals_rotation) {
        const small_spiral = get_spiral_in_spiral(big_spiral, u, big_spirals_rotation);
        // temp spiral at 0,0 because small spiral has local coordiantes now

        const temp_spiral = new ExpSpiral(big_spiral.r, 0, 0, big_spiral.n, big_spiral.ccw);
        let theta = get_angle_on_spiral(small_spiral, temp_spiral);

        // get next u incremented by theta
        const current_angle = big_spiral.parameters(u).theta % (2 * Math.PI);
        if (big_spiral.ccw)
            theta = Math.PI * 2 - theta;
        const new_angle = current_angle + theta;
        const new_u = big_spiral.uFromTheta(new_angle, r);
        return { u: new_u - u, theta };
    }
    function projection_formula(primary_spiral, secondary_spiral, theta) {
        const center = [primary_spiral.x, primary_spiral.y];
        const spiral_center = [secondary_spiral.x, secondary_spiral.y];
        const vec_to_center = glMatrix.vec2.create();
        glMatrix.vec2.sub(vec_to_center, spiral_center, center)
        const u = secondary_spiral.uFromTheta(theta);
        let point_at_u = secondary_spiral.at(u);
        let vec_to_point_at_u = glMatrix.vec2.create();
        glMatrix.vec2.sub(vec_to_point_at_u, point_at_u, center)

        glMatrix.vec2.normalize(vec_to_point_at_u, vec_to_point_at_u);
        glMatrix.vec2.normalize(vec_to_center, vec_to_center);
        const perpendicular = [vec_to_center[1], -vec_to_center[0]];
        const dot_with_perpendicular = glMatrix.vec2.dot(vec_to_point_at_u, perpendicular);

        theta = Math.acos(glMatrix.vec2.dot(vec_to_point_at_u, vec_to_center));
        if (dot_with_perpendicular > 0) {
            theta = -theta;
        }
        return theta;
    }
    // returns the angle subtended by the end points of this spiral
    // on the big spiral
    function get_angle_on_spiral(small_spiral, big_spiral) {
        // find the end points of this small spiral
        let theta = recursive_search(true, projection_formula, big_spiral, small_spiral, 0);
        let theta2 = recursive_search(false, projection_formula, big_spiral, small_spiral, Math.PI * 2);
        return Math.abs(theta) + Math.abs(theta2);
    }
}
// One main spiral, with many spirals inside it
// Could be recursive. The spirals sit inside the long arm of a spiral
function update_rotating_inspirals(big_spiral) {
    // one main spiral
    const spirals = big_spiral.children;
    if (!big_spiral.ccw)
        big_spiral.obj.rotate -= Math.PI / 200;
    else
        big_spiral.obj.rotate += Math.PI / 200;
    // let starting_u = (big_spiral.n - 2) / big_spiral.n;
    // let increment = big_spiral.increment_u;
    // for (let i = 0; i < spirals.length; i++) {
    //     let u = starting_u + i * increment;
    //     const small_spiral = get_spiral_in_spiral(big_spiral, u, big_spiral.obj.rotate);
    //     spirals[i] = small_spiral;
    // }
    return spirals;

}
function get_spiral_in_spiral(big_spiral, starting_u, rotation) {

    // find the radius of the other spirals they should be between two arms of the spiral
    // same theta, different u's
    let u_increment = 1 / big_spiral.n;
    let u1 = big_spiral.at_local(starting_u);
    let u2 = big_spiral.at_local(starting_u + u_increment);
    let vec = glMatrix.vec2.create();
    glMatrix.vec2.sub(vec, u2, u1);
    let diameter = glMatrix.vec2.len(vec);

    // ratio of r at upper point to r at lower point
    let ratio = big_spiral.parameters((2 * big_spiral.n - 1) / (2 * big_spiral.n)).scale / big_spiral.parameters(1).scale;
    diameter = diameter / (1 + ratio) / Math.exp(1);
    ratio = ratio / (ratio + 1);
    let center = glMatrix.vec2.create();
    glMatrix.vec2.scaleAndAdd(center, u1, vec, ratio);

    let local_rotation = big_spiral.parameters(starting_u).theta;
    const small_spiral = new ExpSpiral(diameter, center[0], center[1], big_spiral.n, big_spiral.ccw);
    if (big_spiral.ccw) {
        local_rotation = Math.PI * 2 - local_rotation;
    }
    small_spiral.obj.rotate = local_rotation;
    return small_spiral;

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

function recursive_search(maxima, formula, primary_spiral, secondary_spiral, initial_theta) {
    let theta = initial_theta;
    let count = 0;
    let depth = 0;
    let found = false;
    let comparator_maxima = function (a, b) { return a > b; }
    let comparator_minima = function (a, b) { return a < b; }
    let comparator = maxima == true ? comparator_maxima : comparator_minima;
    let old_value = maxima == true ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
    let increment = maxima == true ? (PI / 20) : (-PI / 20);
    while (!found) {
        // if new value less than old value, search between new and old values
        const projection = formula(primary_spiral, secondary_spiral, theta);

        let new_value = projection;
        if (comparator(old_value, new_value)) {
            count = 0;
            depth += 1;
            theta = theta - increment;
            increment = increment / 10;
        } else {
            count += 1;
            theta = theta + increment;
            old_value = new_value;
        }

        if (count >= 40 || depth > 10) {
            found = true;
        }
    }
    return old_value;
}

function ExpSpiral(r, x, y, n, ccw) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.n = n; // no of rotations
    this.obj = new Object2D();
    this.obj.translate = [x, y];
    this.ccw = ccw ? ccw : false;
    this.children = null;

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
        push();
        applyMatrix(m[0], m[1], m[2], m[3], m[4], m[5]);
        const points = new Array(subdivisions);
        const center = subdivisions / 2;
        for (let i = 0; i < subdivisions; i++) {
            points[i] = this.at_local((i * u) / subdivisions);
        }
        stroke(255, 0, 0);
        noFill();
        beginShape();
        for (let i = 0; i < points.length; i++) {
            vertex(points[i][0], points[i][1]);
        }
        endShape();
        if (this.children) {
            for (let i = 0; i < this.children.length; i++) {
                const child = this.children[i];
                child.draw(u);
            }
        }
        pop();
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
