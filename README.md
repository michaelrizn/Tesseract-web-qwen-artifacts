# 4D Tesseract Visualization Inspired by String Theory

## Features

1. **Interactive 4D Tesseract**:
   - A 4D hypercube (tesseract) is rendered in 3D space using perspective projection.
   - The fourth dimension (W-axis) is visualized through oscillations and rotations.
   - Enhanced depth perception with improved perspective calculations.

2. **Color-Coded Structure**:
   - Each face of the tesseract is assigned a distinct color for better spatial understanding.
   - Edges are colored based on their orientation in 4D space, making it easier to track the tesseract's geometry.
   - The color scheme helps distinguish between parallel faces across different dimensions.

3. **String Theory Concepts**:
   - Oscillations in the W-axis simulate the vibrational nature of strings in string theory.
   - Four axes (X, Y, Z, W) are displayed to emphasize the multidimensional nature of the object.

4. **Rotations in 4D Space**:
   - Users can rotate the tesseract in three dimensions (XY, XZ, YZ) and along the fourth dimension (XW) using mouse drag.
   - Smooth animations showcase how the tesseract "folds" and "unfolds" in 3D space.

5. **Interactive Controls**:
   - Mouse/Touch drag for intuitive rotation control.
   - Pinch-to-zoom on touch devices for dynamic scaling.
   - Mouse wheel support for smooth zooming.

6. **Responsive Design**:
   - The canvas dynamically adjusts to fit the browser window.
   - Full support for both desktop and mobile devices.
   - Touch-optimized interface for mobile interaction.

## How It Works

- **Vertices and Edges**:
  - The tesseract consists of 16 vertices and 32 edges, forming two cubes connected across the fourth dimension.
  - Each vertex is represented as a 4D point `[x, y, z, w]`.

- **Rotation Matrices**:
  - Rotations in 4D space are achieved using rotation matrices for XY, XZ, YZ, and XW planes.
  - These matrices transform the 4D points into a rotated state before projecting them into 3D space.

- **Projection**:
  - The 4D points are projected into 3D space using a perspective projection.
  - Enhanced depth perception through optimized z-coordinate calculations.
  - The resulting 3D points are then projected onto the 2D canvas for rendering.

- **Oscillation**:
  - The W-axis is modulated using a cosine function to simulate string-like vibrations.
  - This creates a dynamic effect that helps visualize the fourth dimension.

## Controls

- **Mouse/Touch Interaction**:
  - Click and drag (or touch and drag) to rotate the tesseract in 3D and 4D space.
  - Horizontal movement controls XY and XW rotations.
  - Vertical movement controls XZ rotation.

- **Zoom**:
  - Use mouse wheel to zoom in/out on desktop.
  - Pinch gestures for zooming on touch devices.
  - Dynamic scaling maintains visual clarity at different zoom levels.

- **Touch Features**:
  - Single-finger drag for rotation.
  - Two-finger pinch for scaling.
  - Smooth touch response for natural interaction.
