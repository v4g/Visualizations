(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "tjUo":
/***/ (function(module, exports) {

function setup() {
    createCanvas(500, 500);
}

function draw() {
    background(220);
    ellipse(50,50,80,80);
}

// function createCurve(p1, v1, p2, v2) {
//     var anchors = new Array(4);
//     anchors[0] = new Two.Anchor(p1.x, p1.y);
//     anchors[1] = new Two.Anchor(p1.x + v1.x, p1.y + v1.y);
//     anchors[3] = new Two.Anchor(p2.x, p2.y);
//     anchors[2] = new Two.Anchor(p2.x + v2.x, p2.y + v2.y);
//     var path = two.makeCurve(anchors, true);
//     return path;
// }

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

// // find a point on the ellipse with a certain velocity direction
// // tan theta = a / b * (vel.y/vel.x)
// function findPointWithVelocity(ellipse, velocity) {
//     // let theta = 0;
//     let matrix = matrixForEllipse(ellipse).inverse();
//     let vel = matrixMultiplyVector(matrix, velocity);
//     if (ellipse.ccw)
//     {
//         vel.negate();
//     }
//     const a = ellipse.width / 2;
//     const b = ellipse.height / 2;
//     const sintheta = -vel.x/a;
//     const costheta = vel.y/b;
//     let vec = new Two.Vector(costheta, sintheta);
//     vec.normalize();
//     vec.x = a * vec.x;
//     vec.y = b * vec.y;
//     vec = matrixMultiplyPoint(matrixForEllipse(ellipse), vec);
//     return vec;
//     // if (vel.y === 0) {
//     //     theta = vel.x > 0 ? -Math.PI / 2 : Math.PI / 2;
//     // } else {
//     //     theta = vel.x / vel.y * b / a;
//     //     theta = Math.atan2(theta, 1);
//     // }
//     // let point = new Two.Vector();
//     // point.set(a * Math.cos(theta), b * Math.sin(theta));
//     // point = matrixMultiplyPoint(matrixForEllipse(ellipse), point);
//     // return point;
// }

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



/***/ })

},[["tjUo",1]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0dXAoKSB7XHJcbiAgICBjcmVhdGVDYW52YXMoNTAwLCA1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmF3KCkge1xyXG4gICAgYmFja2dyb3VuZCgyMjApO1xyXG4gICAgZWxsaXBzZSg1MCw1MCw4MCw4MCk7XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIGNyZWF0ZUN1cnZlKHAxLCB2MSwgcDIsIHYyKSB7XHJcbi8vICAgICB2YXIgYW5jaG9ycyA9IG5ldyBBcnJheSg0KTtcclxuLy8gICAgIGFuY2hvcnNbMF0gPSBuZXcgVHdvLkFuY2hvcihwMS54LCBwMS55KTtcclxuLy8gICAgIGFuY2hvcnNbMV0gPSBuZXcgVHdvLkFuY2hvcihwMS54ICsgdjEueCwgcDEueSArIHYxLnkpO1xyXG4vLyAgICAgYW5jaG9yc1szXSA9IG5ldyBUd28uQW5jaG9yKHAyLngsIHAyLnkpO1xyXG4vLyAgICAgYW5jaG9yc1syXSA9IG5ldyBUd28uQW5jaG9yKHAyLnggKyB2Mi54LCBwMi55ICsgdjIueSk7XHJcbi8vICAgICB2YXIgcGF0aCA9IHR3by5tYWtlQ3VydmUoYW5jaG9ycywgdHJ1ZSk7XHJcbi8vICAgICByZXR1cm4gcGF0aDtcclxuLy8gfVxyXG5cclxuLy8gLy8gc2VsZWN0IGEgcmFuZG9tIHBvaW50IG9uIHRoZSBlbGxpcHNlIGFuZCBkcmF3IGFub3RoZXIgY2lyY2xlXHJcbi8vIC8vIG9mIHJhbmRvbSByYWRpdXMgc29tZSBkaXN0YW5jZSBhd2F5XHJcbi8vIGZ1bmN0aW9uIGRyYXdpbmcxKCkge1xyXG4vLyAgICAgdmFyIGVsbGlwc2UxID0gdHdvLm1ha2VFbGxpcHNlKDAsIDAsIDUwKTtcclxuLy8gICAgIHZhciBlbGxpcHNlMiA9IHR3by5tYWtlRWxsaXBzZSgyNTAsIDUwLCA1MCk7XHJcbi8vICAgICBlbGxpcHNlMS5jY3cgPSB0cnVlO1xyXG4vLyAgICAgZWxsaXBzZTIuY2N3ID0gZmFsc2U7XHJcbi8vICAgICBlbGxpcHNlMS50cmFuc2xhdGlvbi5zZXQoNTAsIDUwKTtcclxuLy8gICAgIGNvbnNvbGUubG9nKGVsbGlwc2UxKTtcclxuLy8gICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5QSSAvIDI7XHJcbi8vICAgICBjb25zdCBwMSA9IHBvaW50T25FbGxpcHNlKGVsbGlwc2UxLCBhbmdsZSk7XHJcbi8vICAgICBjb25zdCB2MSA9IGZpbmRWZWxvY2l0eUF0QW5nbGUoZWxsaXBzZTEsIGFuZ2xlKTtcclxuLy8gICAgIGNvbnN0IHAyID0gZmluZFBvaW50V2l0aFZlbG9jaXR5KGVsbGlwc2UyLCB2MSk7XHJcbi8vICAgICBjb25zb2xlLmxvZyh2MSk7XHJcbi8vICAgICB2MS5tdWx0aXBseVNjYWxhcigyNSk7XHJcbi8vICAgICBjb25zdCB2MiA9IHYxLmNsb25lKCk7XHJcbi8vICAgICB2Mi5tdWx0aXBseVNjYWxhcigtMSk7XHJcbi8vICAgICBjcmVhdGVDdXJ2ZShwMSwgdjEsIHAyLCB2Mik7XHJcblxyXG4vLyB9XHJcblxyXG4vLyAvLyBmaW5kIGEgcG9pbnQgb24gdGhlIGVsbGlwc2Ugd2l0aCBhIGNlcnRhaW4gdmVsb2NpdHkgZGlyZWN0aW9uXHJcbi8vIC8vIHRhbiB0aGV0YSA9IGEgLyBiICogKHZlbC55L3ZlbC54KVxyXG4vLyBmdW5jdGlvbiBmaW5kUG9pbnRXaXRoVmVsb2NpdHkoZWxsaXBzZSwgdmVsb2NpdHkpIHtcclxuLy8gICAgIC8vIGxldCB0aGV0YSA9IDA7XHJcbi8vICAgICBsZXQgbWF0cml4ID0gbWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKS5pbnZlcnNlKCk7XHJcbi8vICAgICBsZXQgdmVsID0gbWF0cml4TXVsdGlwbHlWZWN0b3IobWF0cml4LCB2ZWxvY2l0eSk7XHJcbi8vICAgICBpZiAoZWxsaXBzZS5jY3cpXHJcbi8vICAgICB7XHJcbi8vICAgICAgICAgdmVsLm5lZ2F0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgY29uc3QgYSA9IGVsbGlwc2Uud2lkdGggLyAyO1xyXG4vLyAgICAgY29uc3QgYiA9IGVsbGlwc2UuaGVpZ2h0IC8gMjtcclxuLy8gICAgIGNvbnN0IHNpbnRoZXRhID0gLXZlbC54L2E7XHJcbi8vICAgICBjb25zdCBjb3N0aGV0YSA9IHZlbC55L2I7XHJcbi8vICAgICBsZXQgdmVjID0gbmV3IFR3by5WZWN0b3IoY29zdGhldGEsIHNpbnRoZXRhKTtcclxuLy8gICAgIHZlYy5ub3JtYWxpemUoKTtcclxuLy8gICAgIHZlYy54ID0gYSAqIHZlYy54O1xyXG4vLyAgICAgdmVjLnkgPSBiICogdmVjLnk7XHJcbi8vICAgICB2ZWMgPSBtYXRyaXhNdWx0aXBseVBvaW50KG1hdHJpeEZvckVsbGlwc2UoZWxsaXBzZSksIHZlYyk7XHJcbi8vICAgICByZXR1cm4gdmVjO1xyXG4vLyAgICAgLy8gaWYgKHZlbC55ID09PSAwKSB7XHJcbi8vICAgICAvLyAgICAgdGhldGEgPSB2ZWwueCA+IDAgPyAtTWF0aC5QSSAvIDIgOiBNYXRoLlBJIC8gMjtcclxuLy8gICAgIC8vIH0gZWxzZSB7XHJcbi8vICAgICAvLyAgICAgdGhldGEgPSB2ZWwueCAvIHZlbC55ICogYiAvIGE7XHJcbi8vICAgICAvLyAgICAgdGhldGEgPSBNYXRoLmF0YW4yKHRoZXRhLCAxKTtcclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIGxldCBwb2ludCA9IG5ldyBUd28uVmVjdG9yKCk7XHJcbi8vICAgICAvLyBwb2ludC5zZXQoYSAqIE1hdGguY29zKHRoZXRhKSwgYiAqIE1hdGguc2luKHRoZXRhKSk7XHJcbi8vICAgICAvLyBwb2ludCA9IG1hdHJpeE11bHRpcGx5UG9pbnQobWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSwgcG9pbnQpO1xyXG4vLyAgICAgLy8gcmV0dXJuIHBvaW50O1xyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBmaW5kVmVsb2NpdHlBdEFuZ2xlKGVsbGlwc2UsIGFuZ2xlKSB7XHJcbi8vICAgICBsZXQgYSA9IGVsbGlwc2Uud2lkdGggLyAyO1xyXG4vLyAgICAgbGV0IGIgPSBlbGxpcHNlLmhlaWdodCAvIDI7XHJcblxyXG4vLyAgICAgbGV0IHggPSBhICogTWF0aC5jb3MoYW5nbGUpO1xyXG4vLyAgICAgbGV0IHkgPSBiICogTWF0aC5zaW4oYW5nbGUpO1xyXG5cclxuLy8gICAgIGxldCBkeCA9IC1hICogTWF0aC5zaW4oYW5nbGUpO1xyXG4vLyAgICAgbGV0IGR5ID0gYiAqIE1hdGguY29zKGFuZ2xlKTtcclxuLy8gICAgIGxldCB2ZWwgPSBuZXcgVHdvLlZlY3RvcihkeCwgZHkpO1xyXG4vLyAgICAgdmVsLm5vcm1hbGl6ZSgpO1xyXG4vLyAgICAgaWYgKGVsbGlwc2UuY2N3KSB7XHJcbi8vICAgICAgICAgdmVsLm5lZ2F0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgdmVsID0gbWF0cml4TXVsdGlwbHlWZWN0b3IobWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSwgdmVsKTtcclxuLy8gICAgIHJldHVybiB2ZWw7XHJcbi8vICAgICAvLyBsZXQgdGFudGhldGEgPSBJbmZpbml0eTtcclxuXHJcbi8vICAgICAvLyBpZiAoeSA9PSAwKSB7XHJcbi8vICAgICAvLyAgICAgdGFudGhldGEgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XHJcbi8vICAgICAvLyB9IGVsc2Uge1xyXG4vLyAgICAgLy8gICAgIHRhbnRoZXRhID0geCAvIHkgKiBiICogYiAvIChhICogYSk7XHJcblxyXG4vLyAgICAgLy8gfVxyXG4vLyAgICAgLy8gaWYgKGVsbGlwc2UuY2N3KSB7XHJcbi8vICAgICAvLyAgICAgdGFudGhldGEgPSAtdGFudGhldGE7XHJcbi8vICAgICAvLyB9XHJcbi8vICAgICAvLyB2ZWwgPSBuZXcgVHdvLlZlY3RvcigxLCB0YW50aGV0YSk7XHJcblxyXG4vLyAgICAgLy8gLy9oYXZlIHRvIGRvIHRoaXMgYmVjYXVzZSB0aGlzIHRoaW5nIGNhbid0IGhhbmRsZSBpbmZpbml0aWVzXHJcbi8vICAgICAvLyBpZiAodGFudGhldGEgPT0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKSB7XHJcbi8vICAgICAvLyAgICAgdmVsID0gbmV3IFR3by5WZWN0b3IoMCwgMSk7XHJcbi8vICAgICAvLyB9IGVsc2UgaWYgKHRhbnRoZXRhID09IE51bWJlci5ORUdBVElWRV9JTkZJTklUWSkge1xyXG4vLyAgICAgLy8gICAgIHZlbCA9IG5ldyBUd28uVmVjdG9yKDAsIC0xKTtcclxuLy8gICAgIC8vIH1cclxuLy8gICAgIC8vIHZlbC5ub3JtYWxpemUoKTtcclxuLy8gICAgIC8vIHZlbCA9IG1hdHJpeE11bHRpcGx5VmVjdG9yKG1hdHJpeEZvckVsbGlwc2UoZWxsaXBzZSksIHZlbCk7XHJcbi8vICAgICAvLyByZXR1cm4gdmVsO1xyXG4vLyB9XHJcblxyXG4vLyBmdW5jdGlvbiBwb2ludE9uRWxsaXBzZShlbGxpcHNlLCBhbmdsZSkge1xyXG4vLyAgICAgbGV0IHggPSBNYXRoLmNvcyhhbmdsZSkgKiBlbGxpcHNlLndpZHRoIC8gMjtcclxuLy8gICAgIGxldCB5ID0gTWF0aC5zaW4oYW5nbGUpICogZWxsaXBzZS5oZWlnaHQgLyAyO1xyXG4vLyAgICAgbGV0IHBvaW50ID0gbmV3IFR3by5WZWN0b3IoeCwgeSk7XHJcbi8vICAgICBsZXQgbWF0cml4ID0gbmV3IFR3by5NYXRyaXgoKTtcclxuLy8gICAgIG1hdHJpeC5yb3RhdGUoZWxsaXBzZS5yb3RhdGlvbik7XHJcbi8vICAgICBtYXRyaXgudHJhbnNsYXRlKGVsbGlwc2UudHJhbnNsYXRpb24ueCwgZWxsaXBzZS50cmFuc2xhdGlvbi55KTtcclxuLy8gICAgIHBvaW50ID0gbWF0cml4TXVsdGlwbHlQb2ludChtYXRyaXgsIHBvaW50KTtcclxuLy8gICAgIGNvbnNvbGUubG9nKHBvaW50KTtcclxuLy8gICAgIHJldHVybiBwb2ludDtcclxuLy8gfVxyXG5cclxuLy8gZnVuY3Rpb24gbWF0cml4Rm9yRWxsaXBzZShlbGxpcHNlKSB7XHJcbi8vICAgICBsZXQgbWF0cml4ID0gbmV3IFR3by5NYXRyaXgoKTtcclxuLy8gICAgIG1hdHJpeC5yb3RhdGUoZWxsaXBzZS5yb3RhdGlvbik7XHJcbi8vICAgICBtYXRyaXgudHJhbnNsYXRlKGVsbGlwc2UudHJhbnNsYXRpb24ueCwgZWxsaXBzZS50cmFuc2xhdGlvbi55KTtcclxuLy8gICAgIHJldHVybiBtYXRyaXg7XHJcbi8vIH1cclxuXHJcbi8vIC8vIE1hdHJpeCBtdWx0aXBseSBjdXogdHdvIGRvZXNuJ3QgaGF2ZSBpdD8/Pz8/XHJcbi8vIGZ1bmN0aW9uIG1hdHJpeE11bHRpcGx5UG9pbnQobWF0cml4LCBwb2ludCkge1xyXG4vLyAgICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cztcclxuLy8gICAgIGxldCB4ID0gcG9pbnQueCAqIG1bMF0gKyBwb2ludC55ICogbVsxXSArIG1bMl07XHJcbi8vICAgICBsZXQgeSA9IHBvaW50LnggKiBtWzNdICsgcG9pbnQueSAqIG1bNF0gKyBtWzVdO1xyXG4vLyAgICAgbGV0IHJlc3VsdCA9IG5ldyBUd28uVmVjdG9yKHgsIHkpO1xyXG4vLyAgICAgcmV0dXJuIHJlc3VsdDtcclxuLy8gfVxyXG4vLyBmdW5jdGlvbiBtYXRyaXhNdWx0aXBseVZlY3RvcihtYXRyaXgsIHZlYykge1xyXG4vLyAgICAgY29uc3QgbSA9IG1hdHJpeC5lbGVtZW50cztcclxuLy8gICAgIGxldCB4ID0gdmVjLnggKiBtWzBdICsgdmVjLnkgKiBtWzFdO1xyXG4vLyAgICAgbGV0IHkgPSB2ZWMueCAqIG1bM10gKyB2ZWMueSAqIG1bNF07XHJcbi8vICAgICBsZXQgcG9pbnQgPSBuZXcgVHdvLlZlY3Rvcih4LCB5KTtcclxuLy8gICAgIHJldHVybiBwb2ludDtcclxuLy8gfVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==