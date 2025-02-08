const canvas = document.getElementById("fourD");
const ctx = canvas.getContext("2d");

let scaleMultiplier = 1;
let angleXY = 0;
let angleXZ = 0;
let angleYZ = 0;
let angleXW = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const projection3D = (point, size) => {
    const scale = (Math.min(canvas.width, canvas.height) / 4) * scaleMultiplier;
    const x = point[0] * scale;
    const y = point[1] * scale;
    const z = point[2] * scale + size * 2;
    const fov = size / (z + size);
    return [
        x * fov + canvas.width / 2,
        y * fov + canvas.height / 2,
    ];
};

const project4Dto3D = (point4D) => {
    const w = point4D[3];
    const wFactor = Math.cos(w * 0.01); // Oscillation inspired by string vibrations
    return [
        point4D[0] * wFactor,
        point4D[1] * wFactor,
        point4D[2] * wFactor,
    ];
};

const tesseractVertices = [];
for (let i = 0; i < 16; i++) {
    const vertex = [
        (i & 1) === 0 ? -1 : 1,
        (i & 2) === 0 ? -1 : 1,
        (i & 4) === 0 ? -1 : 1,
        (i & 8) === 0 ? -1 : 1,
    ];
    tesseractVertices.push(vertex);
}

const tesseractEdges = [];
for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
        let edgeCount = 0;
        for (let k = 0; k < 4; k++) {
            if (tesseractVertices[i][k] !== tesseractVertices[j][k])
                edgeCount++;
        }
        if (edgeCount === 1) {
            tesseractEdges.push([i, j]);
        }
    }
}

const tesseractFaceColors = [
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080'  // Purple
];

function getEdgeColor(edge) {
    const [a, b] = edge;
    // Determine which face this edge belongs to based on the coordinates that change
    const vertexA = tesseractVertices[a];
    const vertexB = tesseractVertices[b];
    
    // Find which coordinate differs between the vertices
    let diffIndex = -1;
    for (let i = 0; i < 4; i++) {
        if (vertexA[i] !== vertexB[i]) {
            diffIndex = i;
            break;
        }
    }
    
    // Use different colors based on which coordinate changes
    return tesseractFaceColors[diffIndex * 2 + (vertexA[diffIndex] < 0 ? 0 : 1)];
}

function rotate4D(point) {
    const rotationXY = [
        [Math.cos(angleXY), -Math.sin(angleXY), 0, 0],
        [Math.sin(angleXY), Math.cos(angleXY), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];

    const rotationXZ = [
        [Math.cos(angleXZ), 0, Math.sin(angleXZ), 0],
        [0, 1, 0, 0],
        [-Math.sin(angleXZ), 0, Math.cos(angleXZ), 0],
        [0, 0, 0, 1],
    ];

    const rotationYZ = [
        [1, 0, 0, 0],
        [0, Math.cos(angleYZ), -Math.sin(angleYZ), 0],
        [0, Math.sin(angleYZ), Math.cos(angleYZ), 0],
        [0, 0, 0, 1],
    ];

    const rotationXW = [
        [Math.cos(angleXW), 0, 0, -Math.sin(angleXW)],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [Math.sin(angleXW), 0, 0, Math.cos(angleXW)],
    ];

    let rotated = multiplyMatrixVector(rotationXY, point);
    rotated = multiplyMatrixVector(rotationXZ, rotated);
    rotated = multiplyMatrixVector(rotationYZ, rotated);
    rotated = multiplyMatrixVector(rotationXW, rotated);

    return rotated;
}

function drawAxes(size) {
    const axes = [
        [
            [0, 0, 0, 0],
            [size, 0, 0, 0],
        ], // X-axis
        [
            [0, 0, 0, 0],
            [0, size, 0, 0],
        ], // Y-axis
        [
            [0, 0, 0, 0],
            [0, 0, size, 0],
        ], // Z-axis
        [
            [0, 0, 0, 0],
            [0, 0, 0, size],
        ], // W-axis
    ];

    const colors = ["red", "green", "blue", "purple"];

    axes.forEach(([start, end], index) => {
        const rotatedStart = rotate4D(start);
        const rotatedEnd = rotate4D(end);

        const projectedStart = projection3D(
            project4Dto3D(rotatedStart),
            canvas.width,
        );
        const projectedEnd = projection3D(
            project4Dto3D(rotatedEnd),
            canvas.width,
        );

        ctx.lineWidth = 2;
        ctx.strokeStyle = colors[index];
        ctx.beginPath();
        ctx.moveTo(projectedStart[0], projectedStart[1]);
        ctx.lineTo(projectedEnd[0], projectedEnd[1]);
        ctx.stroke();
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes(2);

    const rotatedVertices = tesseractVertices.map((v) =>
        rotate4D(v),
    );
    const projected3DVertices = rotatedVertices.map(project4Dto3D);
    const projected2DVertices = projected3DVertices.map((p) =>
        projection3D(p, canvas.width),
    );

    tesseractEdges.forEach((edge) => {
        const [a, b] = edge;
        const start = projected2DVertices[a];
        const end = projected2DVertices[b];
        if (start && end) {
            ctx.lineWidth = 9;
            ctx.strokeStyle = getEdgeColor(edge);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 10;
            ctx.shadowOffsetY = 10;
            ctx.beginPath();
            ctx.moveTo(start[0], start[1]);
            ctx.lineTo(end[0], end[1]);
            ctx.stroke();
            
            // Reset shadow settings for next edge
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    });

    requestAnimationFrame(draw);
}

function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum);
    }
    return result;
}



let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;
let lastTouchX = 0;
let lastTouchY = 0;
let lastPinchDistance = 0;

function getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDragging = true;
    if (e.touches.length === 1) {
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        lastPinchDistance = getTouchDistance(e.touches[0], e.touches[1]);
    }
});

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!isDragging) return;

    if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastTouchX;
        const deltaY = e.touches[0].clientY - lastTouchY;

        angleXY += deltaX * 0.01;
        angleXZ += deltaY * 0.01;
        angleXW += deltaX * 0.005;

        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
    } else if (e.touches.length === 2) {
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const scale = currentDistance / lastPinchDistance;
        scaleMultiplier *= scale;
        lastPinchDistance = currentDistance;
    }
});

canvas.addEventListener("touchend", () => {
    isDragging = false;
});

canvas.addEventListener("touchcancel", () => {
    isDragging = false;
});

canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    const scale = e.deltaY > 0 ? 0.9 : 1.1;
    scaleMultiplier *= scale;
});

canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        angleXY += deltaX * 0.01;
        angleXZ += deltaY * 0.01;
        angleXW += deltaX * 0.005;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;

        angleXY += deltaX * 0.01;
        angleXZ += deltaY * 0.01;
        angleXW += deltaX * 0.005;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

canvas.addEventListener("mouseleave", () => {
    isDragging = false;
});

draw();