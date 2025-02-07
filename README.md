# 14D Tesseract Visualization Inspired by String Theory

This project provides an interactive visualization of a 4D tesseract (hypercube) inspired by concepts from string theory. The goal is to explore higher-dimensional objects and their behavior in a way that aligns with theoretical physics ideas, such as vibrations, extra dimensions, and multidimensional rotations.

## Features

1. **Interactive 4D Tesseract**:
   - A 4D hypercube (tesseract) is rendered in 3D space using perspective projection.
   - The fourth dimension (W-axis) is visualized through oscillations and rotations.

2. **String Theory Concepts**:
   - Oscillations in the W-axis simulate the vibrational nature of strings in string theory.
   - Four axes (X, Y, Z, W) are displayed to emphasize the multidimensional nature of the object.

3. **Rotations in 4D Space**:
   - Users can rotate the tesseract in three dimensions (XY, XZ, YZ) and along the fourth dimension (XW) using mouse drag.
   - Smooth animations showcase how the tesseract "folds" and "unfolds" in 3D space.

4. **Zoom Control**:
   - Buttons allow users to zoom in and out for better exploration of the tesseract's structure.

5. **Responsive Design**:
   - The canvas dynamically adjusts to fit the browser window, ensuring a seamless experience on different screen sizes.

## How It Works

- **Vertices and Edges**:
  - The tesseract consists of 16 vertices and 32 edges, forming two cubes connected across the fourth dimension.
  - Each vertex is represented as a 4D point `[x, y, z, w]`.

- **Rotation Matrices**:
  - Rotations in 4D space are achieved using rotation matrices for XY, XZ, YZ, and XW planes.
  - These matrices transform the 4D points into a rotated state before projecting them into 3D space.

- **Projection**:
  - The 4D points are projected into 3D space using a simple perspective projection.
  - The resulting 3D points are then projected onto the 2D canvas for rendering.

- **Oscillation**:
  - The W-axis is modulated using a cosine function (`Math.cos`) to simulate string-like vibrations, creating a dynamic effect.

## Controls

- **Mouse Drag**:
  - Click and drag to rotate the tesseract in 3D and 4D space.

- **Zoom Buttons**:
  - Use the "Zoom In" and "Zoom Out" buttons to adjust the scale of the visualization.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/tesseract-visualization.git
