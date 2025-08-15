/**
 * GENERAL PHYSICS 1 LEARNING HUB - Interactive Educational Platform
 * 
 * This application provides an interactive learning experience for General Physics 1,
 * covering mechanics and thermodynamics with visual demonstrations, examples,
 * and comprehensive explanations.
 * 
 * Key Features:
 * - Interactive vector demonstrations
 * - Motion simulations
 * - Mathematical derivations with step-by-step explanations
 * - Real-world physics examples and applications
 * - Mobile-responsive design
 * 
 * Educational Approach:
 * - Build intuitive understanding before introducing formulas
 * - Connect physics concepts to everyday experiences
 * - Provide multiple perspectives on each concept
 * - Encourage active learning through interactive demos
 */

document.addEventListener('DOMContentLoaded', async () => {
    // =============================================================================
    // GLOBAL VARIABLES AND CONFIGURATION
    // =============================================================================
    
    // Core application data structure containing all physics topics and content
    let topics = [];
    
    // Main DOM elements for navigation and content display
    const navMenu = document.getElementById('nav-menu');
    const mainContent = document.getElementById('main-content');
    
    // Chart.js instances for kinematic graphs (position vs time, velocity vs time)
    let positionChart = null;
    let velocityChart = null;

    // =============================================================================
    // INTERACTIVE DEMONSTRATION VARIABLES
    // =============================================================================
    
    // Vector demonstration system - allows users to draw and manipulate vectors
    let vectors = []; // Array storing user-drawn vectors with start/end points
    let vectorCanvas, vectorCtx; // Canvas elements for vector visualization
    let showComponentsFlag = false; // Toggle for showing vector components (x,y)
    let showResultantFlag = false; // Toggle for showing vector sum/resultant
    
    // Physics motion simulation system
    let motionCanvas, motionCtx; // Canvas elements for motion animation
    let animationId; // RequestAnimationFrame ID for smooth animation
    
    // Physics simulation object representing a projectile
    let ball = {
        x: 50,      // Initial horizontal position (pixels)
        y: 100,     // Initial vertical position (pixels)
        vx: 20,     // Initial horizontal velocity (pixels/frame)
        vy: 0,      // Initial vertical velocity (pixels/frame)
        ax: 0,      // Horizontal acceleration (typically 0 for projectile)
        ay: -9.8    // Vertical acceleration (gravity, negative = downward)
    };
    
    let time = 0; // Simulation time counter
    
    // Vector drawing interaction state
    let drawingVector = false; // Whether user is currently drawing a vector
    let startPoint = {x: 0, y: 0}; // Starting point for vector being drawn

    // --- EMBEDDED CONTENT ---
    function loadContent() {
        topics = [
            {
                id: 'home',
                title: 'Home',
                icon: 'home',
                content: `
                    <h2>Welcome to the General Physics 1 Learning Hub!</h2>
                    <p>Hello Renz! Think of this website as your personal guide to understanding the world around you. Physics isn't just about complicated formulas; it's the rulebook for everything, from a basketball's arc to the orbit of the Moon.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="brain"></i>Why Physics Matters</h4>
                        <p>Physics is the foundation of all natural sciences. When you understand physics, you understand:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>How things move:</strong> From walking to rocket launches</li>
                            <li><strong>Why things happen:</strong> The cause-and-effect relationships in nature</li>
                            <li><strong>How to solve problems:</strong> Logical thinking and mathematical modeling</li>
                            <li><strong>How technology works:</strong> From smartphones to space shuttles</li>
                        </ul>
                    </div>
                    
                    <p class="mt-4">This course, General Physics 1, is all about <strong>mechanics</strong> and <strong>thermodynamics</strong>. We'll build your intuition for how things move, why they move, and how energy flows through the universe. By the end, you'll see physics in action everywhere you look.</p>
                    
                    <h3>Learning Philosophy: Understanding Over Memorization</h3>
                    <p>This course emphasizes <em>conceptual understanding</em> over rote memorization. Here's how we approach each topic:</p>
                    <ol class="list-decimal list-inside ml-4">
                        <li><strong>Start with intuition:</strong> Connect new concepts to your everyday experience</li>
                        <li><strong>Visualize the physics:</strong> Use interactive demos and animations</li>
                        <li><strong>Build the mathematics:</strong> Derive formulas step-by-step from basic principles</li>
                        <li><strong>Apply to real problems:</strong> Solve practical examples you might encounter</li>
                        <li><strong>Connect the concepts:</strong> See how different topics relate to each other</li>
                    </ol>
                    
                    <h3>How to Use This Site</h3>
                    <p>Use the menu on the left to jump between topics. Each section breaks down the big ideas, shows you the key formulas, and gives you different ways to think about the concepts. Look for these special elements:</p>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="lightbulb"></i>Key Insights</h4>
                            <p>Important conceptual understanding that helps you think like a physicist.</p>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="calculator"></i>Derivation Boxes</h4>
                            <p>Step-by-step mathematical development of important equations.</p>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="play-circle"></i>Interactive Demos</h4>
                            <p>Hands-on simulations where you can experiment with physics concepts.</p>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="book-open"></i>Example Problems</h4>
                            <p>Worked solutions showing you how to approach typical physics problems.</p>
                        </div>
                    </div>
                    
                    <p class="mt-4">Let's start building your physics intuition! Remember: every expert was once a beginner who kept practicing.</p>
                `
            },
            {
                id: 'vectors',
                title: 'Units, Quantities & Vectors',
                icon: 'move-3d',
                content: `
                    <h2>Units, Physical Quantities, and Vectors</h2>
                    <p class="intro">Physics is fundamentally a quantitative science that seeks to describe natural phenomena through precise measurements and mathematical relationships. In this endeavor, we encounter two distinct types of physical quantities: scalars, which are completely specified by their magnitude alone, and vectors, which require both magnitude and direction for complete description.</p>
                    
                    <p>The distinction between scalar and vector quantities is not merely mathematical convenience—it reflects the fundamental nature of physical space and the phenomena that occur within it. Consider, for example, the difference between saying "the temperature is 25°C" (a scalar statement) and "the wind is blowing at 15 m/s toward the northeast" (a vector statement). The former tells us everything we need to know about the thermal state at a point, while the latter requires both speed and direction to fully characterize the wind's motion.</p>
                    
                    <p>This chapter establishes the mathematical framework for handling both types of quantities, with particular emphasis on vector analysis—a tool so fundamental to physics that it appears in every subsequent topic from mechanics to electromagnetism. We begin with the international system of units, proceed through the algebra and geometry of vectors, and conclude with applications that demonstrate why vectors are indispensable for understanding the physical world.</p>

                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/ml4NSzCQobk" title="Introduction to Vectors - Khan Academy"></iframe>
                    </div>

                    <h3>1. The International System of Units (SI)</h3>
                    
                    <p>The development of a universal system of measurement represents one of humanity's greatest intellectual achievements. Before the establishment of the International System of Units (Système International d'Unités, or SI), scientific communication was hampered by a bewildering array of local measurement standards. The meter varied from city to city, the pound meant different things in different countries, and reproducible scientific experiments were nearly impossible.</p>
                    
                    <p>The SI system, established by international treaty, solves this problem through a hierarchical approach. Seven carefully chosen base units serve as the foundation, with each defined in terms of fundamental physical constants or reproducible natural phenomena. All other units—termed derived units—are constructed through mathematical combinations of these base units.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="atom"></i>The Philosophy Behind SI Base Units</h4>
                        <p>Each SI base unit is defined in terms of constants or phenomena that are:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Universal:</strong> The same everywhere in the universe</li>
                            <li><strong>Invariant:</strong> Do not change with time</li>
                            <li><strong>Reproducible:</strong> Can be realized with high precision in any properly equipped laboratory</li>
                            <li><strong>Practical:</strong> Suitable for everyday scientific and technological applications</li>
                        </ul>
                        <p>For instance, the meter is defined not by a physical artifact (which could be damaged or lost), but by the distance light travels in vacuum in a precisely specified time interval—a definition that links space and time through the fundamental constant c (speed of light).</p>
                    </div>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="ruler"></i>Base SI Units</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Length:</strong> meter (m) - distance light travels in vacuum in 1/299,792,458 second</li>
                                <li><strong>Mass:</strong> kilogram (kg) - defined by Planck's constant</li>
                                <li><strong>Time:</strong> second (s) - 9,192,631,770 periods of cesium-133 radiation</li>
                                <li><strong>Electric Current:</strong> ampere (A) - defined by elementary charge</li>
                                <li><strong>Temperature:</strong> kelvin (K) - defined by Boltzmann constant</li>
                                <li><strong>Amount of Substance:</strong> mole (mol) - exactly 6.02214076×10²³ particles</li>
                                <li><strong>Luminous Intensity:</strong> candela (cd) - luminous efficacy of 540 THz radiation</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="calculator"></i>Common Derived Units</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Force:</strong> newton (N = kg⋅m/s²)</li>
                                <li><strong>Energy:</strong> joule (J = N⋅m = kg⋅m²/s²)</li>
                                <li><strong>Power:</strong> watt (W = J/s = kg⋅m²/s³)</li>
                                <li><strong>Pressure:</strong> pascal (Pa = N/m² = kg/(m⋅s²))</li>
                                <li><strong>Frequency:</strong> hertz (Hz = 1/s)</li>
                                <li><strong>Charge:</strong> coulomb (C = A⋅s)</li>
                                <li><strong>Voltage:</strong> volt (V = J/C = kg⋅m²/(A⋅s³))</li>
                            </ul>
                        </div>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="lightbulb"></i>Unit Analysis: Your Problem-Solving Superpower</h4>
                        <p>Unit analysis (dimensional analysis) is one of the most powerful tools in physics. Every equation must be dimensionally consistent - both sides must have the same units.</p>
                        <p><strong>Example:</strong> For kinematic equation $v = v_0 + at$:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$v$ has units [m/s]</li>
                            <li>$v_0$ has units [m/s]</li>
                            <li>$a$ has units [m/s²] and $t$ has units [s]</li>
                            <li>So $at$ has units [m/s²][s] = [m/s] ✓</li>
                        </ul>
                        <p>If your units don't work out, your equation is wrong!</p>
                    </div>

                    <h3>2. Scalars vs Vectors: The Fundamental Distinction</h3>
                    
                    <div class="section-divider"></div>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="brain"></i>The Critical Difference</h4>
                        <p>Imagine you're giving directions to a friend. If you say "drive 5 miles," that's incomplete - they need to know which direction! This is the difference between scalars (magnitude only) and vectors (magnitude + direction).</p>
                    </div>
                    
                    <h4>Scalars: Magnitude Only</h4>
                    <p>Scalars are quantities completely described by a single number (with units). They represent "how much" of something without caring about direction.</p>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h5><i data-lucide="thermometer"></i>Fundamental Scalars</h5>
                            <ul class="list-disc list-inside">
                                <li><strong>Mass:</strong> 5.2 kg - amount of matter</li>
                                <li><strong>Temperature:</strong> 293 K - thermal energy level</li>
                                <li><strong>Time:</strong> 3.7 s - duration of events</li>
                                <li><strong>Electric charge:</strong> -1.6×10⁻¹⁹ C - quantity of charge</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h5><i data-lucide="gauge"></i>Derived Scalars</h5>
                            <ul class="list-disc list-inside">
                                <li><strong>Speed:</strong> 65 mph - rate of motion</li>
                                <li><strong>Energy:</strong> 100 J - capacity to do work</li>
                                <li><strong>Power:</strong> 75 W - rate of energy transfer</li>
                                <li><strong>Pressure:</strong> 101,325 Pa - force per area</li>
                            </ul>
                        </div>
                    </div>

                    <h4>Vectors: Magnitude AND Direction</h4>
                    <p>Vectors require both magnitude and direction for complete description. They represent quantities that have a specific orientation in space.</p>
                    
                    <div class="example-box">
                        <h5><i data-lucide="car"></i>Real-World Vector Examples</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Displacement:</strong> "I walked 5 km northeast" - tells you both how far and which way</li>
                            <li><strong>Velocity:</strong> "The car is traveling 60 mph due north" - speed + direction</li>
                            <li><strong>Force:</strong> "Push the box with 50 N horizontally to the right" - strength + direction</li>
                            <li><strong>Wind velocity:</strong> "15 m/s from the southwest" - essential for pilots and sailors</li>
                            <li><strong>Gravitational field:</strong> "9.8 m/s² downward" - points toward Earth's center</li>
                        </ul>
                        
                        <h6>Why Direction Matters:</h6>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Navigation:</strong> GPS needs both distance and bearing</li>
                            <li><strong>Forces:</strong> A 100N force up vs down has opposite effects</li>
                            <li><strong>Electric fields:</strong> Direction determines which way charges move</li>
                            <li><strong>Momentum:</strong> A car's momentum depends on its direction of travel</li>
                        </ul>
                    </div>

                    <div class="info-box pitfall-box">
                        <h4><i data-lucide="alert-triangle"></i>Common Confusion: Speed vs Velocity</h4>
                        <p><strong>Speed</strong> is a scalar - it only tells you how fast something is moving (e.g., "30 mph").</p>
                        <p><strong>Velocity</strong> is a vector - it tells you how fast AND in what direction (e.g., "30 mph north").</p>
                        <p><strong>Key insight:</strong> An object moving in a circle at constant speed is actually accelerating because its velocity vector is constantly changing direction!</p>
                    </div>

                    <div class="derivation-box">
                        <h4><i data-lucide="compass"></i>Vector Notation and Representation</h4>
                        <p>Vectors can be represented in multiple ways:</p>
                        <h5>1. Arrow Notation:</h5>
                        <p>$\\vec{A}$ or $\\mathbf{A}$ - the arrow or boldface indicates it's a vector</p>
                        
                        <h5>2. Magnitude-Direction Form:</h5>
                        <p>$\\vec{A} = A \\text{ at angle } \\theta$ where $A = |\\vec{A}|$ is the magnitude</p>
                        
                        <h5>3. Component Form:</h5>
                        <p>$\\vec{A} = A_x \\hat{i} + A_y \\hat{j} + A_z \\hat{k}$ or $\\vec{A} = (A_x, A_y, A_z)$</p>
                        
                        <h5>4. Unit Vector Form:</h5>
                        <p>$\\vec{A} = |\\vec{A}| \\hat{A}$ where $\\hat{A}$ is the unit vector in the direction of $\\vec{A}$</p>
                    </div>

                    <h3>3. Vector Components and Trigonometry</h3>
                    
                    <p>The resolution of vectors into components represents one of the most powerful techniques in physics. This process, rooted in the geometry of right triangles and the principles of trigonometry, allows us to decompose any vector into perpendicular components along chosen coordinate axes.</p>
                    
                    <p>The fundamental insight underlying component analysis is that any vector can be uniquely represented as the sum of vectors parallel to the coordinate axes. This decomposition is not merely a mathematical trick—it reflects the physical reality that the effect of a vector quantity (such as force or velocity) can be analyzed independently along each spatial dimension.</p>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="triangle"></i>Mathematical Foundation: From Geometry to Algebra</h4>
                        <p>Consider a vector $\\vec{A}$ in a two-dimensional coordinate system. If we draw this vector from the origin, it forms the hypotenuse of a right triangle whose legs lie along the x and y axes.</p>
                        
                        <p><strong>Geometric Interpretation:</strong></p>
                        <p>The projection of $\\vec{A}$ onto the x-axis gives us $A_x$, while the projection onto the y-axis gives us $A_y$. These projections are precisely what we mean by the "components" of the vector.</p>
                        
                        <p><strong>Trigonometric Relationships:</strong></p>
                        <p>If $\\vec{A}$ makes an angle $\\theta$ with the positive x-axis and has magnitude $|\\vec{A}|$, then:</p>
                        $$ A_x = |\\vec{A}| \\cos(\\theta) $$
                        $$ A_y = |\\vec{A}| \\sin(\\theta) $$
                        
                        <p><strong>Physical Reasoning:</strong></p>
                        <p>These relationships arise naturally from the definition of sine and cosine in a right triangle. The cosine gives us the ratio of the adjacent side (x-component) to the hypotenuse (magnitude), while the sine gives us the ratio of the opposite side (y-component) to the hypotenuse.</p>
                        
                        <p><strong>Why This Works:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>The cosine function naturally captures the "horizontal content" of an angled vector</li>
                            <li>The sine function captures the "vertical content"</li>
                            <li>Together, they ensure that $A_x^2 + A_y^2 = |\\vec{A}|^2$ (Pythagorean theorem)</li>
                            <li>This decomposition is unique and reversible</li>
                        </ul>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="triangle"></i>The Component Breakdown</h4>
                        <p>For any vector $\\vec{A}$ making angle $\\theta$ with the positive x-axis:</p>
                        $$ A_x = |\\vec{A}| \\cos(\\theta) $$
                        $$ A_y = |\\vec{A}| \\sin(\\theta) $$
                        <p><strong>Remember:</strong> Cosine goes with x (horizontal), sine goes with y (vertical)</p>
                        <p><strong>Why?</strong> This comes directly from the definition of sine and cosine in a right triangle!</p>
                    </div>

                    <div class="interactive-demo">
                        <h4><i data-lucide="play-circle"></i>Interactive Vector Component Demo</h4>
                        <p>Click and drag to create vectors, then see their components!</p>
                        <div class="canvas-container">
                            <canvas id="vectorCanvas" width="400" height="300" style="border: 2px solid var(--accent-blue); border-radius: 0.5rem; background-color: var(--bg-dark);"></canvas>
                        </div>
                        <div class="demo-controls">
                            <button class="demo-button" onclick="clearVectors()">Clear</button>
                            <button class="demo-button" onclick="showComponents()">Show Components</button>
                            <button class="demo-button" onclick="showResultant()">Show Resultant</button>
                        </div>
                    </div>

                    <h4>Reconstructing Magnitude and Direction from Components</h4>
                    <p>If you know the components, you can find the magnitude and direction:</p>
                    $$ |\\vec{A}| = \\sqrt{A_x^2 + A_y^2 + A_z^2} $$
                    $$ \\theta = \\tan^{-1}\\left(\\frac{A_y}{A_x}\\right) $$
                    
                    <div class="info-box pitfall-box">
                        <h4><i data-lucide="alert-triangle"></i>Angle Calculation Pitfall</h4>
                        <p><strong>Watch out for quadrants!</strong> The arctangent function only gives angles from -90° to +90°. You need to consider the signs of $A_x$ and $A_y$ to determine the correct quadrant:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Quadrant I:</strong> $A_x > 0, A_y > 0$ → Use $\\tan^{-1}(A_y/A_x)$ directly</li>
                            <li><strong>Quadrant II:</strong> $A_x < 0, A_y > 0$ → Add 180° to result</li>
                            <li><strong>Quadrant III:</strong> $A_x < 0, A_y < 0$ → Add 180° to result</li>
                            <li><strong>Quadrant IV:</strong> $A_x > 0, A_y < 0$ → Add 360° (or use negative angle)</li>
                        </ul>
                        <p>Many calculators have an "atan2" function that handles this automatically!</p>
                    </div>

                    <h3>4. Vector Addition and Subtraction</h3>
                    
                    <h4>Component Method (Algebraic Approach)</h4>
                    
                    <p>The component method represents the most systematic and powerful approach to vector addition. This algebraic technique leverages the principle that vector addition can be performed independently along each coordinate axis—a consequence of the linearity of vector operations and the orthogonality of coordinate axes.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="brain"></i>Theoretical Foundation</h4>
                        <p>The component method works because of two fundamental principles:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Linearity:</strong> Vector addition is a linear operation, meaning $(\\vec{A} + \\vec{B})_x = A_x + B_x$</li>
                            <li><strong>Orthogonality:</strong> Motions along perpendicular axes are independent and do not interfere with each other</li>
                        </ul>
                        <p>These principles reflect deep truths about the structure of space itself. In Cartesian coordinates, the independence of orthogonal directions is a manifestation of the Euclidean geometry that governs our everyday experience.</p>
                    </div>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="plus"></i>Vector Addition Algorithm</h4>
                        <p>To add vectors $\\vec{A} + \\vec{B} = \\vec{R}$:</p>
                        <ol class="list-decimal list-inside ml-4">
                            <li><strong>Break into components:</strong>
                                <ul class="list-disc list-inside ml-8">
                                    <li>$A_x = |\\vec{A}| \\cos(\\theta_A)$, $A_y = |\\vec{A}| \\sin(\\theta_A)$</li>
                                    <li>$B_x = |\\vec{B}| \\cos(\\theta_B)$, $B_y = |\\vec{B}| \\sin(\\theta_B)$</li>
                                </ul>
                            </li>
                            <li><strong>Add components separately:</strong>
                                <ul class="list-disc list-inside ml-8">
                                    <li>$R_x = A_x + B_x$</li>
                                    <li>$R_y = A_y + B_y$</li>
                                </ul>
                            </li>
                            <li><strong>Find resultant magnitude and direction:</strong>
                                <ul class="list-disc list-inside ml-8">
                                    <li>$|\\vec{R}| = \\sqrt{R_x^2 + R_y^2}$</li>
                                    <li>$\\theta_R = \\tan^{-1}(R_y/R_x)$ (watch quadrants!)</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <h4>Graphical Methods</h4>
                    <p>Before calculators and computers, physicists solved vector problems graphically. These methods still provide valuable intuition!</p>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h5><i data-lucide="arrow-right"></i>Head-to-Tail Method</h5>
                            <p><strong>Think of it as:</strong> Following a path of consecutive displacements</p>
                            <ol class="list-decimal list-inside">
                                <li>Draw first vector to scale</li>
                                <li>Draw second vector starting from the head of the first</li>
                                <li>The resultant goes from the tail of the first to the head of the second</li>
                            </ol>
                            <p><strong>Physical meaning:</strong> This is literally what happens when you walk 5m north, then 3m east - you end up at the vector sum!</p>
                        </div>
                        <div class="grid-item">
                            <h5><i data-lucide="square"></i>Parallelogram Method</h5>
                            <p><strong>Think of it as:</strong> Two forces acting on the same object</p>
                            <ol class="list-decimal list-inside">
                                <li>Draw both vectors starting from the same point</li>
                                <li>Complete the parallelogram</li>
                                <li>The resultant is the diagonal from the starting point</li>
                            </ol>
                            <p><strong>Physical meaning:</strong> This shows the combined effect when multiple forces act simultaneously on an object.</p>
                        </div>
                    </div>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="lightbulb"></i>Why Vectors Add This Way</h4>
                        <p>Vector addition might seem arbitrary, but it comes from the physics of combining effects:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Displacements:</strong> If you move 3m east then 4m north, your final position is the same as moving 5m northeast</li>
                            <li><strong>Forces:</strong> Two people pushing a box - the box moves as if pushed by a single force equal to the vector sum</li>
                            <li><strong>Velocities:</strong> A boat's velocity relative to shore = boat velocity relative to water + water velocity relative to shore</li>
                        </ul>
                        <p><strong>The key insight:</strong> Vector addition represents the superposition principle - effects combine linearly!</p>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="map"></i>Worked Example: Navigation Problem</h4>
                        <p><strong>Problem:</strong> A pilot flies 100 km due north, then 150 km at 60° east of north. Find the displacement from the starting point.</p>
                        
                        <p><strong>Solution:</strong></p>
                        <h5>Step 1: Set up coordinate system</h5>
                        <p>Let +x = east, +y = north</p>
                        
                        <h5>Step 2: Find components of each vector</h5>
                        <p><strong>Vector A (first leg):</strong> 100 km north</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$A_x = 0$ km</li>
                            <li>$A_y = 100$ km</li>
                        </ul>
                        
                        <p><strong>Vector B (second leg):</strong> 150 km at 60° east of north</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$B_x = 150 \\cos(90° - 60°) = 150 \\cos(30°) = 150 × 0.866 = 130$ km</li>
                            <li>$B_y = 150 \\sin(90° - 60°) = 150 \\sin(30°) = 150 × 0.5 = 75$ km</li>
                        </ul>
                        
                        <h5>Step 3: Add components</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$R_x = A_x + B_x = 0 + 130 = 130$ km</li>
                            <li>$R_y = A_y + B_y = 100 + 75 = 175$ km</li>
                        </ul>
                        
                        <h5>Step 4: Find magnitude and direction</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$|\\vec{R}| = \\sqrt{130^2 + 175^2} = \\sqrt{16900 + 30625} = \\sqrt{47525} = 218$ km</li>
                            <li>$\\theta = \\tan^{-1}(175/130) = \\tan^{-1}(1.346) = 53.4°$ north of east</li>
                        </ul>
                        
                        <p><strong>Answer:</strong> The pilot is 218 km from the starting point, at 53.4° north of east.</p>
                    </div>

                    <h3>5. Unit Vectors and Vector Multiplication</h3>
                    
                    <h4>Unit Vectors</h4>
                    <p>Unit vectors have magnitude 1 and point in specific directions. The standard unit vectors are:</p>
                    <ul class="list-disc list-inside ml-4">
                        <li>$\\hat{i}$ or $\\hat{x}$: points in +x direction</li>
                        <li>$\\hat{j}$ or $\\hat{y}$: points in +y direction</li>
                        <li>$\\hat{k}$ or $\\hat{z}$: points in +z direction</li>
                    </ul>
                    
                    <p>Any vector can be written as: $\\vec{A} = A_x \\hat{i} + A_y \\hat{j} + A_z \\hat{k}$</p>

                    <div class="info-box advanced-box">
                        <h4><i data-lucide="brain-circuit"></i>Vector Multiplication: Dot and Cross Products</h4>
                        
                        <h5>Dot Product (Scalar Product)</h5>
                        <p>The dot product gives a scalar result:</p>
                        $$ \\vec{A} \\cdot \\vec{B} = |\\vec{A}| |\\vec{B}| \\cos(\\theta) = A_x B_x + A_y B_y + A_z B_z $$
                        
                        <p><strong>Physical Applications:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Work:</strong> $W = \\vec{F} \\cdot \\vec{d}$ (force dot displacement)</li>
                            <li><strong>Power:</strong> $P = \\vec{F} \\cdot \\vec{v}$ (force dot velocity)</li>
                            <li><strong>Projection:</strong> Component of $\\vec{A}$ along $\\vec{B}$ is $\\vec{A} \\cdot \\hat{B}$</li>
                        </ul>
                        
                        <p><strong>Key Properties:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>If $\\theta = 0°$ (parallel): $\\vec{A} \\cdot \\vec{B} = |\\vec{A}| |\\vec{B}|$ (maximum)</li>
                            <li>If $\\theta = 90°$ (perpendicular): $\\vec{A} \\cdot \\vec{B} = 0$</li>
                            <li>If $\\theta = 180°$ (antiparallel): $\\vec{A} \\cdot \\vec{B} = -|\\vec{A}| |\\vec{B}|$ (minimum)</li>
                        </ul>

                        <h5>Cross Product (Vector Product)</h5>
                        <p>The cross product gives a vector result:</p>
                        $$ |\\vec{A} \\times \\vec{B}| = |\\vec{A}| |\\vec{B}| \\sin(\\theta) $$
                        <p>Direction: Right-hand rule (fingers curl from $\\vec{A}$ to $\\vec{B}$, thumb points along $\\vec{A} \\times \\vec{B}$)</p>
                        
                        <p><strong>Component Form:</strong></p>
                        $$ \\vec{A} \\times \\vec{B} = (A_y B_z - A_z B_y)\\hat{i} + (A_z B_x - A_x B_z)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k} $$
                        
                        <p><strong>Physical Applications:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Torque:</strong> $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$ (position cross force)</li>
                            <li><strong>Angular momentum:</strong> $\\vec{L} = \\vec{r} \\times \\vec{p}$ (position cross momentum)</li>
                            <li><strong>Magnetic force:</strong> $\\vec{F} = q\\vec{v} \\times \\vec{B}$ (velocity cross magnetic field)</li>
                        </ul>
                    </div>

                    <div class="practice-problem">
                        <h4><i data-lucide="brain"></i>Challenge Problem: 3D Vector Analysis</h4>
                        <p><strong>Problem:</strong> Two vectors are given: $\\vec{A} = 3\\hat{i} + 4\\hat{j} - 2\\hat{k}$ and $\\vec{B} = -2\\hat{i} + \\hat{j} + 3\\hat{k}$. Find:</p>
                        <ol class="list-decimal list-inside ml-4">
                            <li>The magnitude of each vector</li>
                            <li>The angle between the vectors</li>
                            <li>$\\vec{A} + \\vec{B}$ and $\\vec{A} - \\vec{B}$</li>
                            <li>$\\vec{A} \\cdot \\vec{B}$ and $\\vec{A} \\times \\vec{B}$</li>
                        </ol>
                        
                        <p><strong>Solution:</strong></p>
                        <h5>1. Magnitudes:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$|\\vec{A}| = \\sqrt{3^2 + 4^2 + (-2)^2} = \\sqrt{9 + 16 + 4} = \\sqrt{29} = 5.39$</li>
                            <li>$|\\vec{B}| = \\sqrt{(-2)^2 + 1^2 + 3^2} = \\sqrt{4 + 1 + 9} = \\sqrt{14} = 3.74$</li>
                        </ul>
                        
                        <h5>2. Angle between vectors:</h5>
                        <p>$\\cos(\\theta) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}| |\\vec{B}|}$</p>
                        <p>$\\vec{A} \\cdot \\vec{B} = (3)(-2) + (4)(1) + (-2)(3) = -6 + 4 - 6 = -8$</p>
                        <p>$\\cos(\\theta) = \\frac{-8}{5.39 × 3.74} = \\frac{-8}{20.16} = -0.397$</p>
                        <p>$\\theta = \\cos^{-1}(-0.397) = 113.4°$</p>
                        
                        <h5>3. Vector addition and subtraction:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$\\vec{A} + \\vec{B} = (3-2)\\hat{i} + (4+1)\\hat{j} + (-2+3)\\hat{k} = \\hat{i} + 5\\hat{j} + \\hat{k}$</li>
                            <li>$\\vec{A} - \\vec{B} = (3-(-2))\\hat{i} + (4-1)\\hat{j} + (-2-3)\\hat{k} = 5\\hat{i} + 3\\hat{j} - 5\\hat{k}$</li>
                        </ul>
                        
                        <h5>4. Products:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$\\vec{A} \\cdot \\vec{B} = -8$ (calculated above)</li>
                            <li>$\\vec{A} \\times \\vec{B} = (4×3 - (-2)×1)\\hat{i} + ((-2)×(-2) - 3×3)\\hat{j} + (3×1 - 4×(-2))\\hat{k}$</li>
                            <li>$\\vec{A} \\times \\vec{B} = (12 + 2)\\hat{i} + (4 - 9)\\hat{j} + (3 + 8)\\hat{k} = 14\\hat{i} - 5\\hat{j} + 11\\hat{k}$</li>
                        </ul>
                    </div>

                    <div class="learning-resources">
                        <h4><i data-lucide="book-open"></i>Additional Learning Resources</h4>
                        <div class="resource-links">
                            <a href="https://www.khanacademy.org/science/physics/one-dimensional-motion/displacement-velocity-time/a/what-is-displacement" class="resource-link" target="_blank">
                                <i data-lucide="external-link"></i>Khan Academy: Vector Basics
                            </a>
                            <a href="https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_en.html" class="resource-link" target="_blank">
                                <i data-lucide="play-circle"></i>PhET: Vector Addition Simulation
                            </a>
                            <a href="https://www.physicsclassroom.com/class/vectors" class="resource-link" target="_blank">
                                <i data-lucide="book"></i>Physics Classroom: Vectors
                            </a>
                            <a href="https://www.wolframalpha.com/widgets/gallery/view.jsp?id=8ab70731b1553f17c11a3bbc87e0b605" class="resource-link" target="_blank">
                                <i data-lucide="calculator"></i>Vector Calculator
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'kinematics',
                title: 'Kinematics',
                icon: 'rocket',
                content: `
                    <h2>Kinematics: Describing Motion</h2>
                    <p class="intro">Kinematics, derived from the Greek word "kinema" meaning movement, constitutes the mathematical description of motion without regard to the forces that cause it. This branch of mechanics forms the essential foundation for all subsequent study of dynamics, thermodynamics, and indeed, all of physics.</p>
                    
                    <p>The kinematic description of motion involves three fundamental quantities: position, velocity, and acceleration. These quantities are intrinsically related through the mathematical operations of differentiation and integration, establishing a hierarchy of concepts that mirrors the physical relationships between spatial location, rate of change of location, and rate of change of that rate of change.</p>
                    
                    <p>The power of kinematics lies in its generality. Whether we are analyzing the motion of planets around the Sun, electrons in an atom, or a thrown baseball, the same mathematical framework applies. By mastering the concepts presented in this chapter, you will possess the tools to analyze and predict motion in systems ranging from the astronomical to the subatomic scale.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="target"></i>The Goals of Kinematic Analysis</h4>
                        <p>In any kinematic problem, we seek to establish relationships between:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Position:</strong> Where is the object at any given time?</li>
                            <li><strong>Velocity:</strong> How fast and in what direction is it moving?</li>
                            <li><strong>Acceleration:</strong> How is the velocity changing with time?</li>
                            <li><strong>Time:</strong> When do specific events occur in the motion?</li>
                        </ul>
                        <p>These four quantities—position, velocity, acceleration, and time—are the fundamental variables of kinematics, and all kinematic equations express relationships among them.</p>
                    </div>

                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/ZM8ECpBuQYE" title="Introduction to Kinematics - Khan Academy"></iframe>
                    </div>

                    <h3>1. Fundamental Concepts of Motion</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="compass"></i>Motion is Relative</h4>
                        <p>Motion only makes sense with respect to a <strong>reference frame</strong>. You're stationary relative to your chair, but moving at 30 km/s relative to the Sun! Always establish your reference frame first.</p>
                    </div>

                    <h4>Position, Displacement, and Distance: The Geometry of Motion</h4>
                    
                    <p>The description of motion begins with the concept of position—the specification of where an object is located in space at any given instant. Position is fundamentally a geometric concept, requiring the establishment of a coordinate system (reference frame) that serves as the foundation for all subsequent kinematic analysis.</p>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="map-pin"></i>Position: The Foundation of Kinematics</h4>
                        
                        <p><strong>Mathematical Definition:</strong></p>
                        <p>Position is a vector quantity that specifies the location of an object relative to a chosen origin. The position vector points from the origin to the object's location.</p>
                        
                        <p><strong>One-dimensional case:</strong> $x(t)$ represents position as a function of time along a single axis</p>
                        <p><strong>Three-dimensional case:</strong> $\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j} + z(t)\\hat{k}$</p>
                        
                        <p><strong>Physical Interpretation:</strong></p>
                        <p>The position function $\\vec{r}(t)$ completely specifies the trajectory of an object through space. At each instant $t$, the vector $\\vec{r}(t)$ gives the instantaneous location of the object. As time progresses, the tip of this vector traces out the path followed by the object—its trajectory.</p>
                        
                        <p><strong>Coordinate System Dependence:</strong></p>
                        <p>It is crucial to recognize that position is always relative to a chosen coordinate system. The same physical motion will have different mathematical descriptions in different reference frames, though all observers will agree on the physical relationships between events.</p>
                    </div>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="navigation"></i>Displacement: The Change That Matters</h4>
                        
                        <p>While position tells us where an object is, displacement tells us how its position has changed. Displacement is the vector difference between final and initial positions, representing the shortest path between two points.</p>
                        
                        <p><strong>Mathematical Definition:</strong></p>
                        $$ \\Delta\\vec{r} = \\vec{r}_f - \\vec{r}_i $$
                        <p>In 1D: $\\Delta x = x_f - x_i$</p>
                        
                        <p><strong>Distance</strong> is the total path length traveled (always positive):</p>
                        <p>For motion with changing direction, distance ≥ |displacement|</p>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="route"></i>Position vs Displacement Example</h4>
                        <p>A runner goes from point A (x = 0) to point B (x = 100 m), then back to point C (x = 30 m).</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Final position:</strong> x = 30 m</li>
                            <li><strong>Displacement:</strong> Δx = 30 - 0 = 30 m</li>
                            <li><strong>Distance traveled:</strong> 100 + 70 = 170 m</li>
                        </ul>
                        <p>The displacement tells you where you ended up relative to start; distance tells you how far you actually traveled.</p>
                    </div>

                    <h3>2. Velocity: The Rate of Position Change</h3>

                    <h4>Average vs Instantaneous Velocity</h4>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="gauge"></i>Velocity Definitions</h4>
                        
                        <h5>Average Velocity:</h5>
                        $$ \\vec{v}_{avg} = \\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{\\vec{r}_f - \\vec{r}_i}{t_f - t_i} $$
                        <p>This is the displacement divided by time elapsed.</p>
                        
                        <h5>Instantaneous Velocity:</h5>
                        $$ \\vec{v}(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta\\vec{r}}{\\Delta t} = \\frac{d\\vec{r}}{dt} $$
                        <p>This is the derivative of position with respect to time - the slope of the position-time graph at any instant.</p>
                        
                        <h5>Speed vs Velocity:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Speed:</strong> $|\\vec{v}|$ (magnitude of velocity, always ≥ 0)</li>
                            <li><strong>Velocity:</strong> Vector with magnitude and direction</li>
                        </ul>
                    </div>

                    <div class="interactive-demo">
                        <h4><i data-lucide="play-circle"></i>Interactive Motion Simulator</h4>
                        <p>Adjust the initial velocity and acceleration to see how objects move!</p>
                        <div class="canvas-container">
                            <canvas id="motionCanvas" width="500" height="200" style="border: 2px solid var(--accent-blue); border-radius: 0.5rem; background-color: var(--bg-dark);"></canvas>
                        </div>
                        <div class="demo-controls">
                            <label style="color: white; margin-right: 1rem;">Initial Velocity: <input type="range" id="velocitySlider" min="-50" max="50" value="20" style="margin-left: 0.5rem;"></label>
                            <label style="color: white; margin-right: 1rem;">Acceleration: <input type="range" id="accelerationSlider" min="-20" max="20" value="-9.8" style="margin-left: 0.5rem;"></label>
                            <button class="demo-button" onclick="startMotion()">Start</button>
                            <button class="demo-button" onclick="resetMotion()">Reset</button>
                        </div>
                    </div>

                    <h3>3. Acceleration: The Rate of Velocity Change</h3>

                    <div class="derivation-box">
                        <h4><i data-lucide="zap"></i>Acceleration Definitions</h4>
                        
                        <h5>Average Acceleration:</h5>
                        $$ \\vec{a}_{avg} = \\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{\\vec{v}_f - \\vec{v}_i}{t_f - t_i} $$
                        
                        <h5>Instantaneous Acceleration:</h5>
                        $$ \\vec{a}(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta\\vec{v}}{\\Delta t} = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{r}}{dt^2} $$
                        
                        <p><strong>Key Insight:</strong> Acceleration occurs whenever velocity changes in magnitude OR direction. A car turning at constant speed is accelerating!</p>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="alert-circle"></i>Common Misconceptions</h4>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Acceleration ≠ Speed:</strong> You can have high acceleration with low speed (starting from rest)</li>
                            <li><strong>Negative acceleration ≠ Slowing down:</strong> If velocity is negative, negative acceleration means speeding up!</li>
                            <li><strong>Zero acceleration ≠ Zero velocity:</strong> Constant velocity means zero acceleration</li>
                            <li><strong>Acceleration can be perpendicular to velocity:</strong> This changes direction without changing speed</li>
                        </ul>
                    </div>

                    <h3>4. Graphical Analysis: Reading the Story of Motion</h3>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="trending-up"></i>Position-Time Graphs</h4>
                            <p><strong>Key Relationships:</strong></p>
                            <ul class="list-disc list-inside ml-4">
                                <li><strong>Slope = velocity</strong></li>
                                <li>Horizontal line → at rest</li>
                                <li>Straight line → constant velocity</li>
                                <li>Curved line → acceleration present</li>
                                <li>Steeper slope → higher speed</li>
                                <li>Negative slope → moving toward origin</li>
                            </ul>
                            <div class="graph-container"><canvas id="positionTimeChart"></canvas></div>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="activity"></i>Velocity-Time Graphs</h4>
                            <p><strong>Key Relationships:</strong></p>
                            <ul class="list-disc list-inside ml-4">
                                <li><strong>Slope = acceleration</strong></li>
                                <li><strong>Area = displacement</strong></li>
                                <li>Horizontal line → constant velocity</li>
                                <li>Straight line → constant acceleration</li>
                                <li>Above x-axis → positive direction</li>
                                <li>Below x-axis → negative direction</li>
                            </ul>
                            <div class="graph-container"><canvas id="velocityTimeChart"></canvas></div>
                        </div>
                    </div>

                    <div class="derivation-box">
                        <h4><i data-lucide="bar-chart-3"></i>Area Under Velocity-Time Curve</h4>
                        <p>Why does area under a v-t curve give displacement?</p>
                        
                        <p>For small time interval Δt:</p>
                        <p>Displacement ≈ v × Δt (area of thin rectangle)</p>
                        
                        <p>Total displacement = sum of all rectangles = area under curve</p>
                        
                        <p>Mathematically:</p>
                        $$ \\Delta x = \\int_{t_i}^{t_f} v(t) dt $$
                        
                        <p>This is the fundamental theorem of calculus applied to kinematics!</p>
                    </div>

                    <h3>5. Constant Acceleration: The Kinematic Equations</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="formula"></i>Deriving the Kinematic Equations</h4>
                        
                        <p>Starting with the definition of acceleration:</p>
                        $$ a = \\frac{dv}{dt} $$
                        
                        <p>For constant acceleration, integrating:</p>
                        $$ v = v_0 + at \\quad \\text{(Equation 1)} $$
                        
                        <p>Since $v = \\frac{dx}{dt}$, substituting and integrating:</p>
                        $$ x = x_0 + v_0 t + \\frac{1}{2}at^2 \\quad \\text{(Equation 2)} $$
                        
                        <p>Eliminating time between equations 1 and 2:</p>
                        $$ v^2 = v_0^2 + 2a(x - x_0) \\quad \\text{(Equation 3)} $$
                        
                        <p>Average velocity for constant acceleration:</p>
                        $$ x - x_0 = \\frac{v_0 + v}{2} t \\quad \\text{(Equation 4)} $$
                    </div>

                    <div class="simulation-container">
                        <h4><i data-lucide="calculator"></i>The Big Four Kinematic Equations</h4>
                        <div class="topic-grid">
                            <div class="grid-item">
                                <h5>Equation 1: Velocity-Time</h5>
                                $$ v_f = v_i + at $$
                                <p><strong>Use when:</strong> You don't need displacement</p>
                                <p><strong>Missing:</strong> Δx</p>
                            </div>
                            <div class="grid-item">
                                <h5>Equation 2: Displacement-Time</h5>
                                $$ \\Delta x = v_i t + \\frac{1}{2}at^2 $$
                                <p><strong>Use when:</strong> You don't need final velocity</p>
                                <p><strong>Missing:</strong> v_f</p>
                            </div>
                        </div>
                        <div class="topic-grid">
                            <div class="grid-item">
                                <h5>Equation 3: "Timeless" Equation</h5>
                                $$ v_f^2 = v_i^2 + 2a\\Delta x $$
                                <p><strong>Use when:</strong> Time is unknown</p>
                                <p><strong>Missing:</strong> t</p>
                            </div>
                            <div class="grid-item">
                                <h5>Equation 4: Average Velocity</h5>
                                $$ \\Delta x = \\frac{v_i + v_f}{2} \\cdot t $$
                                <p><strong>Use when:</strong> You don't need acceleration</p>
                                <p><strong>Missing:</strong> a</p>
                            </div>
                        </div>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="target"></i>Problem-Solving Strategy</h4>
                        <ol class="list-decimal list-inside ml-4">
                            <li><strong>Read carefully</strong> and visualize the situation</li>
                            <li><strong>Choose coordinate system</strong> (usually put origin at initial position)</li>
                            <li><strong>List known values</strong> with correct signs</li>
                            <li><strong>Identify what you're solving for</strong></li>
                            <li><strong>Choose appropriate kinematic equation</strong> (contains 3 knowns, 1 unknown)</li>
                            <li><strong>Substitute and solve</strong></li>
                            <li><strong>Check your answer</strong> for reasonableness</li>
                        </ol>
                    </div>

                    <h3>6. Free Fall Motion</h3>
                    
                    <p>Free fall is motion under gravity alone, with acceleration $g = 9.81 \\text{ m/s}^2$ downward.</p>

                    <div class="example-box">
                        <h4><i data-lucide="arrow-down"></i>Worked Example: Throwing Ball Upward</h4>
                        <p><strong>Problem:</strong> A ball is thrown upward with initial velocity 20 m/s. Find: (a) maximum height, (b) time to return to ground, (c) velocity when returning.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Setup:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>Choose +y upward, origin at ground</li>
                            <li>$v_0 = +20$ m/s, $a = -g = -9.81$ m/s²</li>
                        </ul>
                        
                        <h5>(a) Maximum height:</h5>
                        <p>At max height: $v = 0$</p>
                        <p>Use: $v^2 = v_0^2 + 2a\\Delta y$</p>
                        <p>$0 = (20)^2 + 2(-9.81)\\Delta y$</p>
                        <p>$\\Delta y = \\frac{400}{19.62} = 20.4$ m</p>
                        
                        <h5>(b) Time to return:</h5>
                        <p>When ball returns: $\\Delta y = 0$</p>
                        <p>Use: $\\Delta y = v_0 t + \\frac{1}{2}at^2$</p>
                        <p>$0 = 20t - \\frac{1}{2}(9.81)t^2$</p>
                        <p>$t(20 - 4.905t) = 0$</p>
                        <p>$t = 0$ (start) or $t = \\frac{20}{4.905} = 4.08$ s</p>
                        
                        <h5>(c) Return velocity:</h5>
                        <p>Use: $v = v_0 + at$</p>
                        <p>$v = 20 + (-9.81)(4.08) = -20$ m/s</p>
                        
                        <p><strong>Key Insight:</strong> Return velocity has same magnitude but opposite direction!</p>
                    </div>

                    <h3>7. Two-Dimensional Motion</h3>
                    
                    <p>The key insight: horizontal and vertical motions are independent!</p>

                    <div class="derivation-box">
                        <h4><i data-lucide="move"></i>2D Kinematics</h4>
                        
                        <p>Position vector: $\\vec{r}(t) = x(t)\\hat{i} + y(t)\\hat{j}$</p>
                        <p>Velocity vector: $\\vec{v}(t) = v_x(t)\\hat{i} + v_y(t)\\hat{j}$</p>
                        <p>Acceleration vector: $\\vec{a}(t) = a_x(t)\\hat{i} + a_y(t)\\hat{j}$</p>
                        
                        <p><strong>Component Analysis:</strong></p>
                        <p>x-direction: $x = x_0 + v_{0x}t + \\frac{1}{2}a_x t^2$</p>
                        <p>y-direction: $y = y_0 + v_{0y}t + \\frac{1}{2}a_y t^2$</p>
                        
                        <p>Each component follows 1D kinematics independently!</p>
                    </div>

                    <h3>8. Projectile Motion</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="target"></i>Projectile Motion Key Principles</h4>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Horizontal:</strong> $a_x = 0$ (constant velocity)</li>
                            <li><strong>Vertical:</strong> $a_y = -g$ (free fall)</li>
                            <li><strong>Time of flight:</strong> determined by vertical motion only</li>
                            <li><strong>Range:</strong> depends on both $v_0$ and launch angle $\\theta$</li>
                            <li><strong>Trajectory:</strong> parabolic path</li>
                        </ul>
                    </div>

                    <div class="derivation-box">
                        <h4><i data-lucide="arc"></i>Projectile Motion Equations</h4>
                        
                        <p>For projectile launched at angle $\\theta$ with speed $v_0$:</p>
                        
                        <p><strong>Initial conditions:</strong></p>
                        <p>$v_{0x} = v_0 \\cos\\theta$</p>
                        <p>$v_{0y} = v_0 \\sin\\theta$</p>
                        
                        <p><strong>Position equations:</strong></p>
                        <p>$x(t) = v_0 \\cos\\theta \\cdot t$</p>
                        <p>$y(t) = v_0 \\sin\\theta \\cdot t - \\frac{1}{2}gt^2$</p>
                        
                        <p><strong>Velocity equations:</strong></p>
                        <p>$v_x(t) = v_0 \\cos\\theta$ (constant)</p>
                        <p>$v_y(t) = v_0 \\sin\\theta - gt$</p>
                        
                        <p><strong>Key Results:</strong></p>
                        <p>Time to max height: $t_{up} = \\frac{v_0 \\sin\\theta}{g}$</p>
                        <p>Maximum height: $h_{max} = \\frac{v_0^2 \\sin^2\\theta}{2g}$</p>
                        <p>Range: $R = \\frac{v_0^2 \\sin(2\\theta)}{g}$</p>
                        <p>Total flight time: $t_{total} = \\frac{2v_0 \\sin\\theta}{g}$</p>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="compass"></i>Worked Example: Projectile Motion</h4>
                        <p><strong>Problem:</strong> A cannon fires a projectile at 45° with initial speed 50 m/s. Find the range and maximum height.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <p><strong>Given:</strong> $\\theta = 45°$, $v_0 = 50$ m/s</p>
                        
                        <h5>Range:</h5>
                        <p>$R = \\frac{v_0^2 \\sin(2\\theta)}{g} = \\frac{(50)^2 \\sin(90°)}{9.81} = \\frac{2500 \\times 1}{9.81} = 255$ m</p>
                        
                        <h5>Maximum height:</h5>
                        <p>$h_{max} = \\frac{v_0^2 \\sin^2\\theta}{2g} = \\frac{(50)^2 \\sin^2(45°)}{2(9.81)} = \\frac{2500 \\times 0.5}{19.62} = 63.7$ m</p>
                        
                        <p><strong>Note:</strong> 45° gives maximum range for projectile motion!</p>
                    </div>

                    <div class="practice-problem">
                        <h4><i data-lucide="brain"></i>Challenge Problem: Motion on an Incline</h4>
                        <p><strong>Problem:</strong> A ball rolls down a frictionless incline of angle 30°. If it starts from rest and travels 10 m along the incline, find: (a) its acceleration, (b) final speed, (c) time taken.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>(a) Acceleration:</h5>
                        <p>Component of gravity along incline: $a = g\\sin(30°) = 9.81 \\times 0.5 = 4.905$ m/s²</p>
                        
                        <h5>(b) Final speed:</h5>
                        <p>Using $v^2 = v_0^2 + 2as$ with $v_0 = 0$, $s = 10$ m:</p>
                        <p>$v^2 = 2(4.905)(10) = 98.1$</p>
                        <p>$v = 9.90$ m/s</p>
                        
                        <h5>(c) Time taken:</h5>
                        <p>Using $s = v_0 t + \\frac{1}{2}at^2$ with $v_0 = 0$:</p>
                        <p>$10 = \\frac{1}{2}(4.905)t^2$</p>
                        <p>$t = \\sqrt{\\frac{20}{4.905}} = 2.02$ s</p>
                    </div>

                    <div class="learning-resources">
                        <h4><i data-lucide="book-open"></i>Additional Learning Resources</h4>
                        <div class="resource-links">
                            <a href="https://www.khanacademy.org/science/physics/one-dimensional-motion" class="resource-link" target="_blank">
                                <i data-lucide="external-link"></i>Khan Academy: 1D Motion
                            </a>
                            <a href="https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html" class="resource-link" target="_blank">
                                <i data-lucide="play-circle"></i>PhET: Projectile Motion Sim
                            </a>
                            <a href="https://www.physicsclassroom.com/class/1DKin" class="resource-link" target="_blank">
                                <i data-lucide="book"></i>Physics Classroom: Kinematics
                            </a>
                            <a href="https://www.desmos.com/calculator/u8c5ck1ys3" class="resource-link" target="_blank">
                                <i data-lucide="trending-up"></i>Desmos: Kinematic Graphs
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'dynamics',
                title: 'Dynamics: Newton\'s Laws',
                icon: 'mountain',
                content: `
                    <h2>Dynamics: Newton's Laws of Motion</h2>
                    <p class="intro">Dynamics bridges kinematics and the real world by answering the fundamental question: "What causes motion?" Through Newton's three laws, we'll understand how forces create acceleration, predict motion from forces, and solve complex real-world problems involving friction, tension, and circular motion.</p>

                    <h3>1. The Concept of Force</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="hand"></i>What is a Force?</h4>
                        <p>A force is an interaction that tends to change the motion of an object. Forces can:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Start motion:</strong> Push a stationary cart</li>
                            <li><strong>Stop motion:</strong> Apply brakes to a car</li>
                            <li><strong>Change direction:</strong> Bat hitting a baseball</li>
                            <li><strong>Change shape:</strong> Compress a spring</li>
                        </ul>
                        <p><strong>Key Point:</strong> Forces are vectors - they have both magnitude (strength) and direction!</p>
                    </div>

                    <h4>Types of Forces</h4>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="contact"></i>Contact Forces</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Normal Force (N):</strong> Perpendicular push from a surface</li>
                                <li><strong>Friction (f):</strong> Parallel to surface, opposes motion</li>
                                <li><strong>Tension (T):</strong> Pull through a string or rope</li>
                                <li><strong>Applied Force (F_app):</strong> Direct push or pull</li>
                                <li><strong>Air Resistance:</strong> Drag force opposing motion through fluid</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="radio"></i>Field Forces (Action-at-a-Distance)</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Gravitational (W = mg):</strong> Always attractive, acts on mass</li>
                                <li><strong>Electric:</strong> Acts on electric charge</li>
                                <li><strong>Magnetic:</strong> Acts on moving charges</li>
                                <li><strong>Nuclear:</strong> Short-range forces in atomic nuclei</li>
                            </ul>
                        </div>
                    </div>

                    <h3>2. Newton's First Law: The Law of Inertia</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="pause"></i>Statement of First Law</h4>
                        <p><strong>Original Statement:</strong> "Every body perseveres in its state of rest, or of uniform motion in a straight line, unless it is compelled to change that state by forces impressed upon it."</p>
                        
                        <p><strong>Modern Statement:</strong> An object at rest remains at rest, and an object in motion continues moving at constant velocity, unless acted upon by a net external force.</p>
                        
                        <p><strong>Mathematical Form:</strong></p>
                        $$ \\text{If } \\sum \\vec{F} = 0, \\text{ then } \\vec{a} = 0 $$
                        
                        <p><strong>Key Insight:</strong> This law defines inertial reference frames and introduces the concept of equilibrium!</p>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="balance-scale"></i>Understanding Inertia</h4>
                        <p><strong>Inertia</strong> is an object's tendency to resist changes in its state of motion. It's measured by mass:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Large mass = Large inertia:</strong> Hard to start moving, hard to stop</li>
                            <li><strong>Small mass = Small inertia:</strong> Easy to accelerate or decelerate</li>
                        </ul>
                        <p><strong>Everyday Examples:</strong> You lean backward when a car accelerates forward (your body's inertia), objects slide forward when a car brakes suddenly.</p>
                    </div>

                    <h3>3. Newton's Second Law: The Heart of Dynamics</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="zap"></i>The Fundamental Equation of Motion</h4>
                        
                        <p><strong>Newton's Original Form:</strong></p>
                        $$ \\vec{F}_{net} = \\frac{d\\vec{p}}{dt} $$
                        <p>where $\\vec{p} = m\\vec{v}$ is momentum</p>
                        
                        <p><strong>For Constant Mass:</strong></p>
                        $$ \\sum \\vec{F} = m\\vec{a} $$
                        
                        <p><strong>Component Form:</strong></p>
                        <p>$\\sum F_x = ma_x$</p>
                        <p>$\\sum F_y = ma_y$</p>
                        <p>$\\sum F_z = ma_z$</p>
                        
                        <p><strong>Key Insights:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Acceleration is proportional to net force</li>
                            <li>Acceleration is inversely proportional to mass</li>
                            <li>Acceleration is in the same direction as net force</li>
                        </ul>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="scale"></i>Units and Dimensional Analysis</h4>
                        <p>Force has units of Newtons (N):</p>
                        $$ 1 \\text{ N} = 1 \\text{ kg⋅m/s}^2 $$
                        
                        <p><strong>To give perspective:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Weight of a small apple ≈ 1 N</li>
                            <li>Weight of this textbook ≈ 15 N</li>
                            <li>Weight of a person ≈ 700 N</li>
                            <li>Weight of a car ≈ 15,000 N</li>
                        </ul>
                    </div>

                    <h3>4. Free Body Diagrams: The Problem-Solving Foundation</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="box"></i>How to Draw Free Body Diagrams</h4>
                        
                        <p><strong>Step 1: Isolate the Object</strong></p>
                        <p>Draw the object as a simple box or dot, separated from everything else</p>
                        
                        <p><strong>Step 2: Identify All Forces</strong></p>
                        <p>For each force, ask: "What is touching this object or pulling on it?"</p>
                        
                        <p><strong>Step 3: Draw Force Vectors</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Start each vector at the center of the object</li>
                            <li>Point in the direction the force acts</li>
                            <li>Make length proportional to magnitude (when known)</li>
                            <li>Label each force clearly</li>
                        </ul>
                        
                        <p><strong>Step 4: Choose Coordinate System</strong></p>
                        <p>Usually align axes with motion or with the surface the object sits on</p>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="box"></i>FBD Example: Block on Inclined Plane</h4>
                        <p><strong>Situation:</strong> A block sits on a frictionless inclined plane at angle θ</p>
                        
                        <p><strong>Forces Acting:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Weight:</strong> $\\vec{W} = m\\vec{g}$ (vertically downward)</li>
                            <li><strong>Normal:</strong> $\\vec{N}$ (perpendicular to surface)</li>
                        </ul>
                        
                        <p><strong>Coordinate System:</strong> x-axis along incline (positive down), y-axis perpendicular to incline</p>
                        
                        <p><strong>Component Analysis:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$W_x = mg\\sin\\theta$ (down the incline)</li>
                            <li>$W_y = mg\\cos\\theta$ (into the incline)</li>
                            <li>$N = mg\\cos\\theta$ (out of incline)</li>
                        </ul>
                        
                        <p><strong>Newton's Second Law:</strong></p>
                        <p>x-direction: $ma = mg\\sin\\theta \\Rightarrow a = g\\sin\\theta$</p>
                        <p>y-direction: $0 = N - mg\\cos\\theta \\Rightarrow N = mg\\cos\\theta$</p>
                    </div>

                    <h3>5. Friction: The Ubiquitous Force</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="grip"></i>Understanding Friction</h4>
                        
                        <p><strong>Static Friction (Object Not Moving):</strong></p>
                        <p>$f_s \\leq \\mu_s N$</p>
                        <p>Static friction adjusts to prevent motion, up to a maximum value</p>
                        
                        <p><strong>Kinetic Friction (Object Moving):</strong></p>
                        <p>$f_k = \\mu_k N$</p>
                        <p>Kinetic friction is constant and opposes motion</p>
                        
                        <p><strong>Key Properties:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Always parallel to the contact surface</li>
                            <li>Always opposes motion (or attempted motion)</li>
                            <li>Depends on the nature of surfaces ($\\mu$) and normal force</li>
                            <li>$\\mu_s > \\mu_k$ (static > kinetic coefficient)</li>
                            <li>Independent of contact area and speed (approximately)</li>
                        </ul>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="info"></i>Friction Misconceptions</h4>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Myth:</strong> Friction always opposes motion</li>
                            <li><strong>Truth:</strong> Friction opposes <em>relative</em> motion. It can cause forward motion (walking, car tires)</li>
                            <li><strong>Myth:</strong> More contact area = more friction</li>
                            <li><strong>Truth:</strong> Friction force is independent of contact area</li>
                            <li><strong>Myth:</strong> Heavier objects slide faster down inclines</li>
                            <li><strong>Truth:</strong> All objects slide at the same rate (if friction coefficients are equal)</li>
                        </ul>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="truck"></i>Worked Example: Friction Problem</h4>
                        <p><strong>Problem:</strong> A 50 kg crate sits on a horizontal floor. The coefficients of friction are μₛ = 0.6 and μₖ = 0.4. What horizontal force is needed to: (a) just start the crate moving? (b) keep it moving at constant velocity?</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Given Information:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>m = 50 kg</li>
                            <li>μₛ = 0.6, μₖ = 0.4</li>
                            <li>Surface is horizontal</li>
                        </ul>
                        
                        <h5>Free Body Diagram:</h5>
                        <p>Forces: Weight (W = mg = 490 N down), Normal (N up), Applied force (F_app right), Friction (f left)</p>
                        
                        <h5>(a) Force to just start moving:</h5>
                        <p>Vertical equilibrium: N = mg = 490 N</p>
                        <p>At the point of slipping: $f_s = \\mu_s N = 0.6 × 490 = 294$ N</p>
                        <p>For equilibrium: $F_{app} = f_s = 294$ N</p>
                        
                        <h5>(b) Force to maintain constant velocity:</h5>
                        <p>Once moving: $f_k = \\mu_k N = 0.4 × 490 = 196$ N</p>
                        <p>For constant velocity (a = 0): $F_{app} = f_k = 196$ N</p>
                        
                        <p><strong>Answer:</strong> (a) 294 N to start, (b) 196 N to maintain motion</p>
                    </div>

                    <h3>6. Newton's Third Law: Action and Reaction</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="repeat"></i>Understanding Action-Reaction Pairs</h4>
                        
                        <p><strong>Statement:</strong> For every action, there is an equal and opposite reaction.</p>
                        
                        <p><strong>Mathematical Form:</strong></p>
                        $$ \\vec{F}_{A \\text{ on } B} = -\\vec{F}_{B \\text{ on } A} $$
                        
                        <p><strong>Key Properties:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Action and reaction forces are equal in magnitude</li>
                            <li>Action and reaction forces are opposite in direction</li>
                            <li>Action and reaction forces act on different objects</li>
                            <li>Action and reaction forces exist simultaneously</li>
                            <li>They are the same type of force (both gravitational, both normal, etc.)</li>
                        </ul>
                    </div>

                    <div class="info-box pitfall-box">
                        <h4><i data-lucide="alert-triangle"></i>Common Third Law Misconceptions</h4>
                        <p><strong>Mistake:</strong> "Action-reaction pairs cancel out"</p>
                        <p><strong>Truth:</strong> They act on different objects, so they cannot cancel!</p>
                        
                        <p><strong>Example:</strong> You walking forward</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Action:</strong> Your foot pushes backward on Earth</li>
                            <li><strong>Reaction:</strong> Earth pushes forward on your foot</li>
                            <li>Result: You accelerate forward, Earth accelerates backward (imperceptibly)</li>
                        </ul>
                    </div>

                    <h3>7. Applications of Newton's Laws</h3>

                    <h4>Circular Motion</h4>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="refresh-cw"></i>Centripetal Force</h4>
                        
                        <p>For uniform circular motion, acceleration points toward the center:</p>
                        $$ a_c = \\frac{v^2}{r} = \\omega^2 r $$
                        
                        <p>Newton's second law requires a centripetal force:</p>
                        $$ F_c = ma_c = \\frac{mv^2}{r} $$
                        
                        <p><strong>Important:</strong> "Centripetal force" is not a new type of force! It's the net inward force from tension, gravity, normal force, friction, etc.</p>
                        
                        <p><strong>Common Sources of Centripetal Force:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Tension in a string (ball on a string)</li>
                            <li>Friction (car turning on road)</li>
                            <li>Normal force (roller coaster loop)</li>
                            <li>Gravitational force (planetary orbits)</li>
                        </ul>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="car"></i>Worked Example: Banked Curve</h4>
                        <p><strong>Problem:</strong> A car navigates a banked curve (angle θ = 15°) of radius 100 m. What speed allows the car to navigate the curve with no friction?</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Free Body Diagram:</h5>
                        <p>Forces on car: Weight (mg down), Normal force (N perpendicular to road surface)</p>
                        
                        <h5>Component Analysis:</h5>
                        <p>Centripetal direction (toward center): $N\\sin\\theta = \\frac{mv^2}{r}$</p>
                        <p>Vertical direction: $N\\cos\\theta = mg$</p>
                        
                        <h5>Solving:</h5>
                        <p>Divide the equations: $\\tan\\theta = \\frac{v^2}{rg}$</p>
                        <p>$v^2 = rg\\tan\\theta = 100 × 9.81 × \\tan(15°) = 100 × 9.81 × 0.268 = 263$</p>
                        <p>$v = 16.2$ m/s</p>
                        
                        <p><strong>Answer:</strong> The car can navigate at 16.2 m/s (58 km/h) with no friction needed.</p>
                    </div>

                    <h4>Connected Objects and Constraint Forces</h4>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="link"></i>Solving Systems with Multiple Objects</h4>
                        <p><strong>Strategy:</strong></p>
                        <ol class="list-decimal list-inside ml-4">
                            <li>Draw separate FBD for each object</li>
                            <li>Apply Newton's second law to each object</li>
                            <li>Use constraints (same rope length, same acceleration, etc.)</li>
                            <li>Solve the system of equations simultaneously</li>
                        </ol>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="package"></i>Worked Example: Atwood Machine</h4>
                        <p><strong>Problem:</strong> Two masses (m₁ = 4 kg, m₂ = 6 kg) are connected by a light string over a massless pulley. Find the acceleration and tension.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Free Body Diagrams:</h5>
                        <p>Mass 1: Weight (m₁g down), Tension (T up)</p>
                        <p>Mass 2: Weight (m₂g down), Tension (T up)</p>
                        
                        <h5>Newton's Second Law:</h5>
                        <p>For m₁ (going up): $T - m_1g = m_1a$</p>
                        <p>For m₂ (going down): $m_2g - T = m_2a$</p>
                        
                        <h5>Solving:</h5>
                        <p>Add equations: $(m_2 - m_1)g = (m_1 + m_2)a$</p>
                        <p>$a = \\frac{(m_2 - m_1)g}{m_1 + m_2} = \\frac{(6-4) × 9.81}{4+6} = \\frac{19.62}{10} = 1.96$ m/s²</p>
                        
                        <p>Substitute back: $T = m_1(g + a) = 4(9.81 + 1.96) = 47.1$ N</p>
                        
                        <p><strong>Answer:</strong> a = 1.96 m/s², T = 47.1 N</p>
                    </div>

                    <div class="practice-problem">
                        <h4><i data-lucide="brain"></i>Challenge Problem: Block on Moving Wedge</h4>
                        <p><strong>Problem:</strong> A block of mass m sits on a frictionless wedge of mass M and angle θ. The wedge can slide on a horizontal surface. If the wedge accelerates to the right with acceleration A, what is the acceleration of the block relative to the wedge?</p>
                        
                        <p><strong>Approach:</strong></p>
                        <ol class="list-decimal list-inside ml-4">
                            <li>Use non-inertial reference frame attached to wedge</li>
                            <li>Include pseudo-force mA to the left on block</li>
                            <li>Apply Newton's laws in wedge's reference frame</li>
                            <li>Block's acceleration relative to wedge is down the incline</li>
                        </ol>
                        
                        <p><strong>Result:</strong> $a_{rel} = g\\sin\\theta - A\\cos\\theta$ (down the incline)</p>
                        
                        <p><strong>Physical Insight:</strong> If A > g tan θ, the block accelerates up the wedge relative to it!</p>
                    </div>

                    <div class="learning-resources">
                        <h4><i data-lucide="book-open"></i>Additional Learning Resources</h4>
                        <div class="resource-links">
                            <a href="https://www.khanacademy.org/science/physics/forces-newtons-laws" class="resource-link" target="_blank">
                                <i data-lucide="external-link"></i>Khan Academy: Newton's Laws
                            </a>
                            <a href="https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_en.html" class="resource-link" target="_blank">
                                <i data-lucide="play-circle"></i>PhET: Forces and Motion
                            </a>
                            <a href="https://www.physicsclassroom.com/class/newtlaws" class="resource-link" target="_blank">
                                <i data-lucide="book"></i>Physics Classroom: Newton's Laws
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'work',
                title: 'Work, Energy, and Power',
                icon: 'bolt',
                content: `
                    <h2>Work, Energy, and Power</h2>
                    <p class="intro">Energy is the unifying concept that connects all of physics. It cannot be created or destroyed, only transformed from one form to another. Understanding work and energy provides powerful problem-solving tools that often make complex dynamics problems surprisingly simple.</p>

                    <h3>1. The Concept of Work</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="arrow-right"></i>Defining Work</h4>
                        
                        <p><strong>Intuitive Definition:</strong> Work is done when a force causes displacement in the direction of the force.</p>
                        
                        <p><strong>Mathematical Definition:</strong></p>
                        <p>For constant force: $W = \\vec{F} \\cdot \\vec{d} = |F| |d| \\cos\\theta$</p>
                        <p>For variable force: $W = \\int \\vec{F} \\cdot d\\vec{r}$</p>
                        
                        <p><strong>Key Insights:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Work is a scalar (dot product of vectors)</li>
                            <li>Only the force component parallel to displacement does work</li>
                            <li>If θ = 90°, no work is done (perpendicular force)</li>
                            <li>Positive work increases kinetic energy</li>
                            <li>Negative work decreases kinetic energy</li>
                        </ul>
                        
                        <p><strong>Units:</strong> 1 Joule (J) = 1 N⋅m = 1 kg⋅m²/s²</p>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="activity"></i>When is Work Done?</h4>
                        <div class="topic-grid">
                            <div class="grid-item">
                                <h5>Work IS Done:</h5>
                                <ul class="list-disc list-inside ml-4">
                                    <li>Lifting a book against gravity</li>
                                    <li>Pushing a box across the floor</li>
                                    <li>Stretching or compressing a spring</li>
                                    <li>Friction acting on a sliding object</li>
                                </ul>
                            </div>
                            <div class="grid-item">
                                <h5>Work is NOT Done:</h5>
                                <ul class="list-disc list-inside ml-4">
                                    <li>Holding a book stationary (no displacement)</li>
                                    <li>Normal force on rolling wheel (⊥ to motion)</li>
                                    <li>Centripetal force in uniform circular motion</li>
                                    <li>Carrying a backpack horizontally</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="weight"></i>Worked Example: Work by Multiple Forces</h4>
                        <p><strong>Problem:</strong> A 2 kg box is pulled 3 m across a horizontal floor by a 20 N force at 30° above horizontal. The coefficient of kinetic friction is 0.3. Find the work done by each force.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Force Analysis:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>Applied force: F = 20 N at 30°</li>
                            <li>Components: $F_x = 20\\cos(30°) = 17.3$ N, $F_y = 20\\sin(30°) = 10$ N</li>
                            <li>Weight: W = mg = 19.6 N downward</li>
                            <li>Normal: N = mg - F_y = 19.6 - 10 = 9.6 N</li>
                            <li>Friction: f = μN = 0.3 × 9.6 = 2.88 N</li>
                        </ul>
                        
                        <h5>Work Calculations:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$W_{applied} = F_x \\cdot d = 17.3 × 3 = 51.9$ J</li>
                            <li>$W_{friction} = -f \\cdot d = -2.88 × 3 = -8.64$ J (negative: opposes motion)</li>
                            <li>$W_{normal} = 0$ (perpendicular to motion)</li>
                            <li>$W_{weight} = 0$ (perpendicular to motion)</li>
                            <li>$W_{net} = 51.9 - 8.64 = 43.26$ J</li>
                        </ul>
                    </div>

                    <h3>2. Kinetic Energy and the Work-Energy Theorem</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="zap"></i>Deriving Kinetic Energy</h4>
                        
                        <p>Starting with Newton's second law and kinematics:</p>
                        <p>$F = ma$ and $v^2 = v_0^2 + 2ad$</p>
                        
                        <p>Work done by net force:</p>
                        <p>$W_{net} = F \\cdot d = mad$</p>
                        
                        <p>From kinematics: $d = \\frac{v^2 - v_0^2}{2a}$</p>
                        
                        <p>Substituting:</p>
                        <p>$W_{net} = ma \\cdot \\frac{v^2 - v_0^2}{2a} = \\frac{1}{2}m(v^2 - v_0^2)$</p>
                        
                        <p><strong>Work-Energy Theorem:</strong></p>
                        $$ W_{net} = \\Delta K = K_f - K_i $$
                        
                        <p>where <strong>Kinetic Energy:</strong> $K = \\frac{1}{2}mv^2$</p>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="target"></i>Power of the Work-Energy Theorem</h4>
                        <p>This theorem is incredibly powerful because:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>It's scalar:</strong> No vector components to worry about</li>
                            <li><strong>It's path-independent:</strong> Only initial and final states matter</li>
                            <li><strong>It handles complex forces:</strong> Just find the work, don't track F and a</li>
                            <li><strong>It's often simpler than F = ma:</strong> Especially for variable forces</li>
                        </ul>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="car"></i>Worked Example: Stopping Distance</h4>
                        <p><strong>Problem:</strong> A 1500 kg car traveling at 25 m/s brakes to a stop. If the braking force is 7500 N, find the stopping distance.</p>
                        
                        <p><strong>Solution using Work-Energy Theorem:</strong></p>
                        
                        <h5>Given:</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>m = 1500 kg</li>
                            <li>v₀ = 25 m/s, vf = 0</li>
                            <li>F_brake = 7500 N</li>
                        </ul>
                        
                        <h5>Apply Work-Energy Theorem:</h5>
                        <p>$W_{net} = \\Delta K$</p>
                        <p>$-F_{brake} \\cdot d = K_f - K_i$</p>
                        <p>$-7500d = 0 - \\frac{1}{2}(1500)(25)^2$</p>
                        <p>$-7500d = -468,750$</p>
                        <p>$d = 62.5$ m</p>
                        
                        <p><strong>Note:</strong> Much simpler than using kinematics or F = ma!</p>
                    </div>

                    <h3>3. Potential Energy and Conservative Forces</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="mountain"></i>Conservative vs Non-Conservative Forces</h4>
                        
                        <p><strong>Conservative Forces:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Work done is path-independent</li>
                            <li>Work done around closed path = 0</li>
                            <li>Can define potential energy</li>
                            <li>Examples: gravity, spring force, electrostatic</li>
                        </ul>
                        
                        <p><strong>Non-Conservative Forces:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Work done depends on path taken</li>
                            <li>Work done around closed path ≠ 0</li>
                            <li>Cannot define potential energy</li>
                            <li>Examples: friction, air resistance, applied forces</li>
                        </ul>
                        
                        <p><strong>Mathematical Test:</strong></p>
                        <p>For conservative force: $\\oint \\vec{F} \\cdot d\\vec{r} = 0$ (closed loop)</p>
                    </div>

                    <h4>Gravitational Potential Energy</h4>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="arrow-up"></i>Deriving Gravitational PE</h4>
                        
                        <p>Work done against gravity (lifting object):</p>
                        <p>$W_{against \\ gravity} = \\int_0^h mg \\, dy = mgh$</p>
                        
                        <p>This work becomes stored potential energy:</p>
                        $$ U_g = mgh $$
                        
                        <p><strong>Key Points:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Only changes in PE matter (reference point is arbitrary)</li>
                            <li>Choose convenient zero level (often ground level)</li>
                            <li>PE is positive above reference, negative below</li>
                            <li>Force and PE related by: $\\vec{F} = -\\nabla U$</li>
                        </ul>
                    </div>

                    <h4>Elastic Potential Energy</h4>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="move-horizontal"></i>Spring Potential Energy</h4>
                        
                        <p>For Hooke's Law: $F_s = -kx$</p>
                        
                        <p>Work to compress/stretch spring from 0 to x:</p>
                        <p>$W = \\int_0^x F_{applied} \\, dx = \\int_0^x kx \\, dx = \\frac{1}{2}kx^2$</p>
                        
                        <p><strong>Elastic Potential Energy:</strong></p>
                        $$ U_s = \\frac{1}{2}kx^2 $$
                        
                        <p><strong>Properties:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Always positive (depends on x²)</li>
                            <li>Zero at equilibrium position (x = 0)</li>
                            <li>Proportional to square of displacement</li>
                            <li>k is spring constant (stiffness)</li>
                        </ul>
                    </div>

                    <h3>4. Conservation of Mechanical Energy</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="balance-scale"></i>The Principle of Energy Conservation</h4>
                        <p><strong>For conservative forces only:</strong></p>
                        $$ E = K + U = \\text{constant} $$
                        $$ K_i + U_i = K_f + U_f $$
                        
                        <p><strong>With non-conservative forces:</strong></p>
                        $$ W_{nc} = \\Delta E = (K_f + U_f) - (K_i + U_i) $$
                        
                        <p><strong>Energy Conservation Strategy:</strong></p>
                        <ol class="list-decimal list-inside ml-4">
                            <li>Identify all energy forms present</li>
                            <li>Choose convenient reference levels</li>
                            <li>Write energy at initial and final states</li>
                            <li>Account for work by non-conservative forces</li>
                            <li>Solve for unknown</li>
                        </ol>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="mountain"></i>Worked Example: Roller Coaster</h4>
                        <p><strong>Problem:</strong> A 500 kg roller coaster car starts from rest at height 30 m. If it has speed 20 m/s at height 10 m, how much energy was lost to friction?</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Initial State (top):</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$K_i = 0$ (starts from rest)</li>
                            <li>$U_i = mgh_i = 500 × 9.81 × 30 = 147,150$ J</li>
                            <li>$E_i = 147,150$ J</li>
                        </ul>
                        
                        <h5>Final State (lower point):</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li>$K_f = \\frac{1}{2}mv_f^2 = \\frac{1}{2}(500)(20)^2 = 100,000$ J</li>
                            <li>$U_f = mgh_f = 500 × 9.81 × 10 = 49,050$ J</li>
                            <li>$E_f = 149,050$ J</li>
                        </ul>
                        
                        <h5>Energy Lost to Friction:</h5>
                        <p>$W_{friction} = E_f - E_i = 149,050 - 147,150 = -98,100$ J</p>
                        
                        <p><strong>Answer:</strong> 98,100 J of mechanical energy was converted to heat by friction.</p>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="circle"></i>Worked Example: Pendulum Motion</h4>
                        <p><strong>Problem:</strong> A 2 kg pendulum bob swings from rest at 60° to vertical. Find its speed at the bottom and the tension in the string at that point. String length = 1.5 m.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Energy Conservation (top to bottom):</h5>
                        <p>Take bottom as PE = 0 reference</p>
                        
                        <p>Initial height: $h = L - L\\cos(60°) = 1.5(1 - 0.5) = 0.75$ m</p>
                        
                        <p>$K_i + U_i = K_f + U_f$</p>
                        <p>$0 + mgh = \\frac{1}{2}mv^2 + 0$</p>
                        <p>$v = \\sqrt{2gh} = \\sqrt{2 × 9.81 × 0.75} = 3.83$ m/s</p>
                        
                        <h5>Tension at Bottom (circular motion):</h5>
                        <p>Net inward force provides centripetal acceleration:</p>
                        <p>$T - mg = \\frac{mv^2}{L}$</p>
                        <p>$T = mg + \\frac{mv^2}{L} = 2(9.81) + \\frac{2(3.83)^2}{1.5}$</p>
                        <p>$T = 19.62 + 19.54 = 39.16$ N</p>
                        
                        <p><strong>Answer:</strong> v = 3.83 m/s, T = 39.16 N</p>
                    </div>

                    <h3>5. Power: The Rate of Energy Transfer</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="gauge"></i>Defining Power</h4>
                        
                        <p><strong>Average Power:</strong></p>
                        $$ P_{avg} = \\frac{W}{\\Delta t} $$
                        
                        <p><strong>Instantaneous Power:</strong></p>
                        $$ P = \\frac{dW}{dt} = \\vec{F} \\cdot \\vec{v} $$
                        
                        <p><strong>Units:</strong> Watt (W) = J/s = kg⋅m²/s³</p>
                        
                        <p><strong>Common Power Units:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>1 horsepower (hp) = 746 W</li>
                            <li>1 kilowatt-hour (kWh) = 3.6 × 10⁶ J</li>
                            <li>Human at rest ≈ 100 W</li>
                            <li>Automobile engine ≈ 100 kW</li>
                            <li>Power plant ≈ 1000 MW</li>
                        </ul>
                    </div>

                    <div class="key-insight">
                        <h4><i data-lucide="lightning"></i>Understanding Power</h4>
                        <p><strong>Key Concepts:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Power measures how quickly work is done</li>
                            <li>Same work done faster requires more power</li>
                            <li>P = Fv for force parallel to velocity</li>
                            <li>Power = energy/time, not energy itself</li>
                        </ul>
                        
                        <p><strong>Power in Different Contexts:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Mechanical:</strong> Engine power, lifting power</li>
                            <li><strong>Electrical:</strong> P = IV (current × voltage)</li>
                            <li><strong>Thermal:</strong> Heat transfer rate</li>
                            <li><strong>Metabolic:</strong> Energy consumption rate</li>
                        </ul>
                    </div>

                    <div class="example-box">
                        <h4><i data-lucide="car"></i>Worked Example: Car Power</h4>
                        <p><strong>Problem:</strong> A 1200 kg car accelerates from rest to 30 m/s in 8 seconds while traveling 120 m. Air resistance averages 400 N. Find the average power output of the engine.</p>
                        
                        <p><strong>Solution:</strong></p>
                        
                        <h5>Method 1: Using Work and Time</h5>
                        <p>Work by engine = ΔKE + Work against air resistance</p>
                        <p>$W_{engine} = \\frac{1}{2}mv^2 + F_{air} \\cdot d$</p>
                        <p>$W_{engine} = \\frac{1}{2}(1200)(30)^2 + 400 × 120$</p>
                        <p>$W_{engine} = 540,000 + 48,000 = 588,000$ J</p>
                        
                        <p>$P_{avg} = \\frac{W_{engine}}{t} = \\frac{588,000}{8} = 73,500$ W = 73.5 kW</p>
                        
                        <h5>Method 2: Using F⋅v</h5>
                        <p>From kinematics: $a = \\frac{30}{8} = 3.75$ m/s²</p>
                        <p>Engine force: $F_{engine} = ma + F_{air} = 1200(3.75) + 400 = 4900$ N</p>
                        <p>Average velocity: $v_{avg} = 15$ m/s</p>
                        <p>$P_{avg} = F_{engine} \\cdot v_{avg} = 4900 × 15 = 73,500$ W</p>
                    </div>

                    <div class="practice-problem">
                        <h4><i data-lucide="brain"></i>Challenge Problem: Energy in Circular Motion</h4>
                        <p><strong>Problem:</strong> A small bead slides on a frictionless vertical circular track of radius R. If released from rest at the top, find: (a) minimum speed at the top for the bead to complete the loop, (b) normal force from track at the bottom.</p>
                        
                        <p><strong>Solution Strategy:</strong></p>
                        
                        <h5>(a) Minimum Speed at Top:</h5>
                        <p>At the top, for minimum speed, normal force N = 0</p>
                        <p>Only gravity provides centripetal force:</p>
                        <p>$mg = \\frac{mv_{top}^2}{R} \\Rightarrow v_{top} = \\sqrt{gR}$</p>
                        
                        <p>Energy conservation from bottom to top:</p>
                        <p>$\\frac{1}{2}mv_{bottom}^2 = \\frac{1}{2}mv_{top}^2 + mg(2R)$</p>
                        <p>$v_{bottom} = \\sqrt{5gR}$</p>
                        
                        <h5>(b) Normal Force at Bottom:</h5>
                        <p>$N - mg = \\frac{mv_{bottom}^2}{R} = \\frac{m(5gR)}{R} = 5mg$</p>
                        <p>$N = 6mg$</p>
                        
                        <p><strong>Physical Insight:</strong> The track pushes with 6 times the weight to provide the large centripetal acceleration!</p>
                    </div>

                    <div class="learning-resources">
                        <h4><i data-lucide="book-open"></i>Additional Learning Resources</h4>
                        <div class="resource-links">
                            <a href="https://www.khanacademy.org/science/physics/work-and-energy" class="resource-link" target="_blank">
                                <i data-lucide="external-link"></i>Khan Academy: Work and Energy
                            </a>
                            <a href="https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_en.html" class="resource-link" target="_blank">
                                <i data-lucide="play-circle"></i>PhET: Energy Skate Park
                            </a>
                            <a href="https://www.physicsclassroom.com/class/energy" class="resource-link" target="_blank">
                                <i data-lucide="book"></i>Physics Classroom: Energy
                            </a>
                        </div>
                    </div>
                `
            },
            {
                id: 'momentum',
                title: 'Impulse, Momentum & Collisions',
                icon: 'git-commit-horizontal',
                content: `
                    <h2>Impulse, Momentum, and Collisions</h2>
                    
                    <p class="intro">Momentum represents one of physics' most profound concepts—a quantity that bridges Newton's laws with conservation principles that govern the universe from subatomic particles to galactic clusters. The study of momentum and impulse reveals why a small bullet can have devastating effects, why airbags save lives, and why rocket propulsion works in the vacuum of space.</p>
                    
                    <p>This chapter explores the deep connections between force, time, and motion through the lens of momentum conservation. We'll discover that while forces may vary wildly during collisions, certain quantities remain absolutely constant—a principle so fundamental that it holds even when Newton's laws break down at relativistic speeds.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="brain"></i>The Profound Significance of Momentum</h4>
                        <p>Momentum is more than just "mass times velocity"—it's a window into the fundamental structure of physics:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Conservation Principle:</strong> Momentum conservation emerges from the symmetry of space itself</li>
                            <li><strong>Universal Applicability:</strong> Applies to everything from billiard balls to galaxies</li>
                            <li><strong>Relativistic Invariance:</strong> The concept extends seamlessly to Einstein's relativity</li>
                            <li><strong>Quantum Mechanics:</strong> Momentum is a fundamental observable in quantum theory</li>
                        </ul>
                        <p>Understanding momentum means understanding one of the universe's most basic operating principles.</p>
                    </div>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Momentum ($\\vec{p}$):</strong> Often called "mass in motion." It's a measure of how hard it is to stop a moving object. It's a vector.</li>
                                <li><strong>Impulse ($\\vec{J}$):</strong> The change in an object's momentum. An impulse is delivered by a force acting over a period of time.</li>
                                <li><strong>Elastic Collision:</strong> A collision where objects bounce off each other perfectly, and no kinetic energy is lost.</li>
                                <li><strong>Inelastic Collision:</strong> A collision where kinetic energy is lost (usually to heat, sound, or deformation). A "perfectly inelastic" collision is when the objects stick together.</li>
                                <li><strong>Center of Mass:</strong> The "average" position of all the mass in a system. For an isolated system, the center of mass moves at a constant velocity, no matter how complex the collisions are within it.</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables</h4>
                            <ul class="list-disc list-inside">
                                <li>$\\vec{p} = m\\vec{v}$: Linear momentum.</li>
                                <li>$\\vec{J} = \\vec{F}_{avg} \\Delta t = \\Delta\\vec{p}$: Impulse.</li>
                                <li>$m$: Mass.</li>
                                <li>$\\vec{v}$: Velocity.</li>
                            </ul>
                        </div>
                    </div>

                    <h3>1. Linear Momentum: The Foundation</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="move"></i>Defining Momentum from Newton's Laws</h4>
                        <p>Momentum emerges naturally from Newton's second law. In its original formulation, Newton wrote:</p>
                        $$ \\vec{F} = \\frac{d\\vec{p}}{dt} $$
                        <p>where $\\vec{p} = m\\vec{v}$ is the momentum vector.</p>
                        
                        <p><strong>Physical Interpretation:</strong></p>
                        <p>Momentum represents the "quantity of motion" possessed by an object. Unlike velocity, which depends only on the object's speed and direction, momentum also incorporates the object's inertia (mass). This makes momentum a better measure of how difficult it is to stop a moving object.</p>
                        
                        <p><strong>Why Momentum Matters More Than Velocity:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>A slow-moving truck has more momentum than a fast-moving bicycle</li>
                            <li>Momentum determines the force needed to stop an object in a given time</li>
                            <li>Momentum is conserved in collisions, velocity is not</li>
                            <li>Momentum connects to fundamental symmetries in physics</li>
                        </ul>
                    </div>
                    
                    <h3>2. Impulse: The Cause of Momentum Change</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="zap"></i>The Impulse-Momentum Theorem</h4>
                        <p>Starting from Newton's second law in its momentum form:</p>
                        $$ \\vec{F} = \\frac{d\\vec{p}}{dt} $$
                        
                        <p>Rearranging and integrating over time interval $\\Delta t$:</p>
                        $$ \\int_{t_i}^{t_f} \\vec{F} \\, dt = \\int_{t_i}^{t_f} \\frac{d\\vec{p}}{dt} \\, dt = \\Delta \\vec{p} $$
                        
                        <p>The left side is defined as <strong>impulse</strong>:</p>
                        $$ \\vec{J} = \\int_{t_i}^{t_f} \\vec{F} \\, dt = \\vec{F}_{avg} \\Delta t $$
                        
                        <p>Therefore: <strong>Impulse-Momentum Theorem</strong></p>
                        $$ \\vec{J} = \\Delta \\vec{p} $$
                        
                        <p><strong>Physical Meaning:</strong></p>
                        <p>Impulse represents the cumulative effect of a force acting over time. It's the "push" or "pull" needed to change an object's momentum. The same momentum change can result from:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Large force × short time (hammer hitting nail)</li>
                            <li>Small force × long time (wind accelerating sailboat)</li>
                        </ul>
                    </div>
                    
                    <div class="example-box">
                        <h4><i data-lucide="shield"></i>Real-World Application: Safety Systems</h4>
                        
                        <h5>Airbags and Car Safety</h5>
                        <p>Consider a 70 kg person moving at 15 m/s (about 33 mph) who must be stopped:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Initial momentum:</strong> $p = (70)(15) = 1050$ kg⋅m/s</li>
                            <li><strong>Required momentum change:</strong> $\\Delta p = 0 - 1050 = -1050$ kg⋅m/s</li>
                        </ul>
                        
                        <p><strong>Without airbag</strong> (stopping in 0.1 s):</p>
                        $$ F_{avg} = \\frac{\\Delta p}{\\Delta t} = \\frac{1050}{0.1} = 10,500 \\text{ N} $$
                        
                        <p><strong>With airbag</strong> (stopping in 0.5 s):</p>
                        $$ F_{avg} = \\frac{\\Delta p}{\\Delta t} = \\frac{1050}{0.5} = 2,100 \\text{ N} $$
                        
                        <p><strong>Result:</strong> The airbag reduces the force by a factor of 5, dramatically reducing injury risk.</p>
                        
                        <h5>Sports Applications</h5>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Baseball follow-through:</strong> Increases contact time, maximizing impulse</li>
                            <li><strong>Landing techniques:</strong> Gymnasts bend knees to increase stopping time</li>
                            <li><strong>Boxing gloves:</strong> Increase contact time, reducing peak forces</li>
                        </ul>
                    </div>
                    
                    <h3>3. Conservation of Momentum: The Universal Principle</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="infinity"></i>The Deepest Principle in Physics</h4>
                        <p>Momentum conservation isn't just another equation—it's a fundamental law of nature that emerges from the symmetry of space itself. According to Noether's theorem, every conservation law corresponds to a symmetry in nature:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Translation symmetry:</strong> Physics is the same everywhere in space</li>
                            <li><strong>This symmetry implies:</strong> Linear momentum is conserved</li>
                            <li><strong>Universal validity:</strong> Holds in all known physical theories</li>
                        </ul>
                    </div>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="balance-scale"></i>Mathematical Statement of Momentum Conservation</h4>
                        
                        <p><strong>For an isolated system</strong> (no external forces):</p>
                        $$ \\vec{p}_{total,initial} = \\vec{p}_{total,final} $$
                        $$ \\sum_{i} m_i \\vec{v}_{i,initial} = \\sum_{i} m_i \\vec{v}_{i,final} $$
                        
                        <p><strong>In component form:</strong></p>
                        $$ \\sum p_{x,initial} = \\sum p_{x,final} $$
                        $$ \\sum p_{y,initial} = \\sum p_{y,final} $$
                        $$ \\sum p_{z,initial} = \\sum p_{z,final} $$
                        
                        <p><strong>Key Points:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>Each component of momentum is conserved independently</li>
                            <li>The law applies to any number of interacting objects</li>
                            <li>Internal forces (action-reaction pairs) cancel out</li>
                            <li>Only external forces can change total system momentum</li>
                        </ul>
                    </div>
                    
                    <h3>4. Types of Collisions</h3>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="bounce"></i>Elastic Collisions</h4>
                            <p><strong>Both momentum AND kinetic energy are conserved</strong></p>
                            <p><strong>Conditions:</strong></p>
                            <ul class="list-disc list-inside">
                                <li>$\\sum \\vec{p}_i = \\sum \\vec{p}_f$</li>
                                <li>$\\sum K_i = \\sum K_f$</li>
                            </ul>
                            <p><strong>Examples:</strong> Billiard balls, atomic collisions, bouncing balls (approximately)</p>
                            
                            <p><strong>1D Elastic Collision Formulas:</strong></p>
                            <p>For objects with masses $m_1, m_2$ and initial velocities $v_{1i}, v_{2i}$:</p>
                            $$ v_{1f} = \\frac{(m_1-m_2)v_{1i} + 2m_2v_{2i}}{m_1 + m_2} $$
                            $$ v_{2f} = \\frac{(m_2-m_1)v_{2i} + 2m_1v_{1i}}{m_1 + m_2} $$
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="merge"></i>Inelastic Collisions</h4>
                            <p><strong>Momentum is conserved, but kinetic energy is NOT</strong></p>
                            <p><strong>Conditions:</strong></p>
                            <ul class="list-disc list-inside">
                                <li>$\\sum \\vec{p}_i = \\sum \\vec{p}_f$</li>
                                <li>$\\sum K_i > \\sum K_f$</li>
                            </ul>
                            <p><strong>Examples:</strong> Car crashes, clay balls sticking, most real collisions</p>
                            
                            <p><strong>Perfectly Inelastic (objects stick):</strong></p>
                            $$ (m_1 + m_2)v_f = m_1v_{1i} + m_2v_{2i} $$
                            $$ v_f = \\frac{m_1v_{1i} + m_2v_{2i}}{m_1 + m_2} $$
                            
                            <p><strong>Energy "lost":</strong> Converted to heat, sound, deformation</p>
                        </div>
                    </div>
                `
            },
            {
                id: 'rotation',
                title: 'Rotational Motion',
                icon: 'rotate-cw',
                content: `
                    <h2>Rotational Equilibrium and Dynamics</h2>
                    <p>So far, we've treated objects as points. But what happens when things spin, tumble, or roll? This is where we learn the physics of rotation. The cool part? Almost every concept from linear motion has a direct rotational equivalent.</p>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Torque ($\\tau$):</strong> The rotational version of force. It's a "twist" or "turn" caused by a force applied at a distance from a pivot.</li>
                                <li><strong>Moment of Inertia ($I$):</strong> The rotational version of mass. It's an object's resistance to being spun. It depends not just on mass, but on how that mass is distributed.</li>
                                <li><strong>Angular Momentum ($L$):</strong> The rotational version of linear momentum. It's a measure of an object's "quantity of spin."</li>
                                <li><strong>Rotational Equilibrium:</strong> The state where an object is not rotating or is rotating at a constant rate. This happens when the net torque is zero.</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables (Linear $\\rightarrow$ Rotational)</h4>
                            <ul class="list-disc list-inside">
                                <li>$x, v, a \\rightarrow \\theta, \\omega, \\alpha$: (Angular position, velocity, acceleration)</li>
                                <li>$F \\rightarrow \\tau$: (Force $\\rightarrow$ Torque)</li>
                                <li>$m \\rightarrow I$: (Mass $\\rightarrow$ Moment of Inertia)</li>
                                <li>$p \\rightarrow L$: (Momentum $\\rightarrow$ Angular Momentum)</li>
                                <li>$r$: Lever arm/radius.</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Torque and Moment of Inertia</h3>
                    <p><strong>Torque</strong> is not just about how hard you push, but also *where* you push. Pushing on a door far from its hinges creates more torque and is easier than pushing near the hinges. The formula is $$ \\vec{\\tau} = \\vec{r} \\times \\vec{F} $$, where $\\vec{r}$ is the vector from the pivot to where the force is applied.</p>
                    <p>Just like Newton's second law for linear motion ($F=ma$), there's a version for rotation:</p>
                    $$ \\sum \\vec{\\tau} = I\\vec{\\alpha} $$
                    <p>This says that a net torque causes an angular acceleration. The <strong>Moment of Inertia ($I$)</strong> tells you how much the object resists this. An object with its mass far from the center (like a big wheel) has a large $I$ and is hard to spin. An object with its mass close to the center (like a solid disk) has a smaller $I$ and is easier to spin.</p>
                    <p>The <strong>Parallel Axis Theorem</strong> is a handy tool to calculate $I$ if you're spinning an object around a point other than its center of mass: $$I = I_{CM} + Md^2$$.</p>
                `
            },
            {
                id: 'gravity',
                title: 'Universal Gravitation',
                icon: 'globe',
                content: `
                    <h2>Universal Gravitation</h2>
                    <p>Newton realized that the same force that makes an apple fall from a tree is the one that keeps the Moon in orbit around the Earth. Gravity is a universal force: every object with mass pulls on every other object with mass, everywhere in the universe.</p>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Gravitational Field:</strong> The area of influence around a massive object. You can think of it as the object warping the space around it.</li>
                                <li><strong>Kepler's Laws:</strong> Three laws, discovered before Newton, that perfectly describe the motion of planets (e.g., orbits are ellipses). Newton's law of gravity explains *why* these laws are true.</li>
                                <li><strong>Orbital Mechanics:</strong> The study of how objects (like satellites and planets) move in orbits.</li>
                                <li><strong>Escape Velocity:</strong> The minimum speed an object needs to completely escape a planet's gravitational pull and never come back.</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables</h4>
                            <ul class="list-disc list-inside">
                                <li>$\\vec{F}_g$: Gravitational Force.</li>
                                <li>$G$: The Universal Gravitational Constant (a very small number).</li>
                                <li>$m, M$: The two masses that are attracting each other.</li>
                                <li>$r$: The distance between the centers of the two masses.</li>
                                <li>$\\vec{g}$: Gravitational field strength (on Earth's surface, this is $9.8$ N/kg or $9.8$ m/s²).</li>
                                <li>$T$: Orbital Period (the time for one full orbit).</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Newton's Law of Universal Gravitation</h3>
                    <p>The force of gravity depends on two things: how massive the objects are, and how far apart they are. The force is stronger for more massive objects, and gets much weaker as the objects get farther apart (an inverse square law).</p>
                    $$ F_g = G \\frac{m_1 m_2}{r^2} $$

                    <h3>Escape Velocity</h3>
                    <p>To escape a planet's gravity, you need to be going fast enough that its pull can't bring you back down. This happens when your initial kinetic energy is equal to the gravitational potential energy holding you there. For Earth, this speed is about 11.2 km/s (over 40,000 km/h)!</p>
                    $$ v_{esc} = \\sqrt{\\frac{2GM}{R}} $$
                    <p>Notice that the escape velocity depends on the planet's mass ($M$) and radius ($R$), but not on the mass of the object that is escaping.</p>
                `
            },
            {
                id: 'periodic',
                title: 'Periodic Motion',
                icon: 'circle-dot',
                content: `
                    <h2>Periodic Motion</h2>
                    <p>Periodic motion is any motion that repeats itself in a regular cycle, like a swinging pendulum, a bouncing spring, or the hands of a clock. The most fundamental type of this motion is called Simple Harmonic Motion (SHM).</p>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Simple Harmonic Motion (SHM):</strong> A special kind of oscillation where the restoring force is directly proportional to the displacement from equilibrium. In simple terms: the further you pull it, the harder it pulls back.</li>
                                <li><strong>Amplitude (A):</strong> The maximum distance the object moves from its equilibrium (center) position.</li>
                                <li><strong>Period (T):</strong> The time it takes to complete one full cycle of motion.</li>
                                <li><strong>Frequency (f):</strong> How many cycles happen per second (measured in Hertz, Hz). $f = 1/T$.</li>
                                <li><strong>Resonance:</strong> The phenomenon where pushing an oscillating system at its natural frequency causes the amplitude to grow dramatically. This is how you pump a swing higher and higher.</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables</h4>
                            <ul class="list-disc list-inside">
                                <li>$A$: Amplitude.</li>
                                <li>$\\omega$: Angular Frequency ($= 2\\pi f$). It's a way to measure frequency in radians per second.</li>
                                <li>$\\phi$: Phase Constant (tells you the starting position of the cycle at $t=0$).</li>
                                <li>$T$: Period.</li>
                                <li>$f$: Frequency.</li>
                                <li>$k$: Spring constant.</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Simple Harmonic Motion (SHM)</h3>
                    <p>SHM is the blueprint for all things that vibrate. The defining feature is Hooke's Law: the restoring force tries to bring the object back to the middle, and this force gets stronger the farther the object is from the middle ($F_{restore} = -kx$).</p>
                    <p>The motion of an object in SHM can be perfectly described by a cosine (or sine) function:</p>
                    $$ x(t) = A \\cos(\\omega t + \\phi) $$
                    <p>This equation might look complex, but it's just a mathematical way of saying the object wiggles back and forth between $+A$ and $-A$ in a smooth, repeating pattern.</p>
                `
            },
            {
                id: 'waves',
                title: 'Mechanical Waves and Sound',
                icon: 'waves',
                content: `
                    <h2>Mechanical Waves and Sound</h2>
                    <p>A wave is a fascinating thing: it's a disturbance that travels through a medium (like air, water, or a string), carrying energy from one place to another without any net movement of the medium itself. Think of "the wave" in a stadium—people move up and down, but the wave travels around the stadium.</p>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Wave:</strong> A traveling disturbance of energy.</li>
                                <li><strong>Wavelength ($\\lambda$):</strong> The distance from one peak of the wave to the next peak.</li>
                                <li><strong>Superposition:</strong> When two waves meet, they pass through each other. Their displacements simply add together at every point.</li>
                                <li><strong>Interference:</strong> The result of superposition. It can be <strong>constructive</strong> (waves add up to make a bigger wave) or <strong>destructive</strong> (waves cancel each other out).</li>
                                <li><strong>Doppler Effect:</strong> The apparent change in a wave's frequency because of motion between the source and the observer.</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables</h4>
                            <ul class="list-disc list-inside">
                                <li>$v$: Wave Speed.</li>
                                <li>$f$: Frequency (how many wave crests pass per second).</li>
                                <li>$\\lambda$: Wavelength (the distance between crests).</li>
                                <li>$k$: Wave Number ($k = 2\\pi/\\lambda$).</li>
                                <li>$I$: Intensity (Power per unit area, related to loudness).</li>
                                <li>$\\beta$: Sound Level (what we measure in decibels, dB).</li>
                            </ul>
                        </div>
                    </div>

                    <h3>Wave Properties</h3>
                    <p>There's a simple, fundamental relationship that connects the speed, frequency, and wavelength of any wave. The speed of a wave is determined by the properties of the medium it's traveling through (like the tension in a string or the temperature of the air).</p>
                    $$ v = f\\lambda $$

                    <h3>The Doppler Effect</h3>
                    <p>This is the classic "siren effect." When an ambulance is racing towards you, the sound waves get bunched up, so you hear a higher frequency (higher pitch). When it's racing away, the waves get stretched out, so you hear a lower frequency (lower pitch). The same thing happens with light from distant stars!</p>
                    $$ f' = f \\left( \\frac{v_{sound} \\pm v_{observer}}{v_{sound} \\mp v_{source}} \\right) $$
                    <p>The signs depend on whether the source and observer are moving towards or away from each other. The general rule is: use the top sign for "towards" motion.</p>
                `
            },
            {
                id: 'thermo',
                title: 'Thermodynamics',
                icon: 'thermometer',
                content: `
                    <h2>Thermodynamics: The Science of Energy and Entropy</h2>
                    
                    <p class="intro">Thermodynamics stands as one of the most profound and practical branches of physics, governing phenomena from the quantum scale to the cosmic. It emerged from humanity's quest to understand heat engines during the Industrial Revolution, but its principles extend far beyond technology to encompass the fundamental nature of energy, information, and time's arrow itself.</p>
                    
                    <p>This science reveals why perpetual motion machines are impossible, why your coffee always cools down, and why stars must eventually die. It provides the theoretical foundation for engines, refrigerators, chemical reactions, biological processes, and even the ultimate fate of the universe. Through its elegant laws, thermodynamics connects the microscopic world of atoms to the macroscopic world of everyday experience.</p>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="thermometer"></i>The Revolutionary Nature of Thermodynamics</h4>
                        <p>Thermodynamics introduced concepts that fundamentally changed how we view nature:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Statistical Nature of Matter:</strong> Macroscopic properties emerge from microscopic chaos</li>
                            <li><strong>Irreversibility:</strong> Not all processes can be reversed—time has a direction</li>
                            <li><strong>Limitations of Energy:</strong> Energy quality matters as much as quantity</li>
                            <li><strong>Universal Principles:</strong> The same laws govern steam engines and stellar fusion</li>
                        </ul>
                        <p>These insights revolutionized not just physics, but chemistry, biology, engineering, and even information theory.</p>
                    </div>

                    <h3>Keywords & Key Variables</h3>
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4>Keywords</h4>
                            <ul class="list-disc list-inside">
                                <li><strong>Heat (Q):</strong> Energy that is transferred from a hotter object to a colder one simply because of their temperature difference.</li>
                                <li><strong>Internal Energy (U):</strong> The grand total of all the microscopic kinetic and potential energies of the atoms and molecules inside a system.</li>
                                <li><strong>Entropy (S):</strong> A measure of a system's disorder or randomness. The Second Law says that the entropy of the universe is always increasing.</li>
                                <li><strong>Heat Engine:</strong> Any device that takes in heat from a hot source, converts some of it into useful work, and expels the rest to a cold sink.</li>
                                <li><strong>Isothermal:</strong> A process that happens at a constant temperature.</li>
                                <li><strong>Adiabatic:</strong> A process where no heat is allowed to enter or leave the system ($Q=0$).</li>
                            </ul>
                        </div>
                        <div class="grid-item">
                            <h4>Key Variables</h4>
                            <ul class="list-disc list-inside">
                                <li>$U$: Internal Energy.</li>
                                <li>$Q$: Heat.</li>
                                <li>$W$: Work.</li>
                                <li>$T$: Temperature (in Kelvin!).</li>
                                <li>$S$: Entropy.</li>
                                <li>$\\eta$ (eta): Efficiency of an engine.</li>
                            </ul>
                        </div>
                    </div>

                    <h3>1. Fundamental Concepts of Thermodynamics</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="atom"></i>Systems, States, and Processes</h4>
                        
                        <p><strong>Thermodynamic System:</strong> The specific portion of matter or region of space we're studying</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Isolated System:</strong> No energy or matter exchange with surroundings</li>
                            <li><strong>Closed System:</strong> Energy exchange allowed, matter exchange forbidden</li>
                            <li><strong>Open System:</strong> Both energy and matter can be exchanged</li>
                        </ul>
                        
                        <p><strong>State Variables:</strong> Properties that describe the system's current condition</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Extensive:</strong> Depend on system size (volume, mass, total energy)</li>
                            <li><strong>Intensive:</strong> Independent of system size (temperature, pressure, density)</li>
                        </ul>
                        
                        <p><strong>Equilibrium:</strong> A state where all macroscopic properties remain constant with time</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Thermal equilibrium:</strong> Temperature uniform throughout</li>
                            <li><strong>Mechanical equilibrium:</strong> No net forces acting</li>
                            <li><strong>Chemical equilibrium:</strong> No net chemical reactions occurring</li>
                        </ul>
                    </div>
                    
                    <h3>2. The Zeroth Law of Thermodynamics</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="equals"></i>The Foundation of Temperature</h4>
                        <p><strong>Statement:</strong> If two systems are in thermal equilibrium with a third system, they are in thermal equilibrium with each other.</p>
                        
                        <p><strong>Profound Implication:</strong> This seemingly obvious statement actually defines the concept of temperature and makes thermometry possible. It establishes that temperature is a universal property that all systems can share.</p>
                        
                        <p><strong>Why it's called "Zeroth":</strong> This law was recognized as fundamental after the First and Second Laws were already established, but it logically precedes them.</p>
                    </div>
                    
                    <h3>3. The First Law of Thermodynamics</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="battery"></i>Energy Conservation in Thermodynamic Systems</h4>
                        
                        <p><strong>Mathematical Statement:</strong></p>
                        $$ \\Delta U = Q - W $$
                        <p>Where:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$\\Delta U$ = change in internal energy</li>
                            <li>$Q$ = heat added to the system</li>
                            <li>$W$ = work done by the system</li>
                        </ul>
                        
                        <p><strong>Sign Conventions:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$Q > 0$: Heat flows into system (system gains energy)</li>
                            <li>$Q < 0$: Heat flows out of system (system loses energy)</li>
                            <li>$W > 0$: System does work on surroundings (system loses energy)</li>
                            <li>$W < 0$: Surroundings do work on system (system gains energy)</li>
                        </ul>
                        
                        <p><strong>Physical Meaning:</strong></p>
                        <p>The First Law states that energy cannot be created or destroyed, only transferred or transformed. For a thermodynamic system, energy can enter or leave as heat or work, but the total energy of the universe remains constant.</p>
                        
                        <p><strong>Alternative Forms:</strong></p>
                        <p>For infinitesimal processes: $dU = \\delta Q - \\delta W$</p>
                        <p>For cyclic processes: $Q_{net} = W_{net}$ (since $\\Delta U = 0$)</p>
                    </div>
                    
                    <div class="example-box">
                        <h4><i data-lucide="car"></i>First Law Application: Car Engine</h4>
                        <p>Consider one cycle of a car engine:</p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Heat input:</strong> $Q_H = 2000$ J (from fuel combustion)</li>
                            <li><strong>Work output:</strong> $W = 600$ J (to move the car)</li>
                            <li><strong>Heat rejected:</strong> $Q_C = ?$ (to radiator and exhaust)</li>
                        </ul>
                        
                        <p><strong>Solution:</strong></p>
                        <p>For a complete cycle, $\\Delta U = 0$, so:</p>
                        $$ Q_H - Q_C = W $$
                        $$ Q_C = Q_H - W = 2000 - 600 = 1400 \\text{ J} $$
                        
                        <p><strong>Efficiency:</strong> $\\eta = \\frac{W}{Q_H} = \\frac{600}{2000} = 30\\%$</p>
                        <p>Note: 70% of the fuel energy becomes waste heat!</p>
                    </div>
                    
                    <h3>4. The Second Law of Thermodynamics</h3>
                    
                    <div class="key-insight">
                        <h4><i data-lucide="trending-up"></i>The Law That Explains Time's Arrow</h4>
                        <p>The Second Law is arguably the most profound statement in all of science. It explains why certain processes occur naturally while their reverse does not, effectively defining the direction of time.</p>
                    </div>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="arrow-up-right"></i>Multiple Formulations of the Second Law</h4>
                        
                        <p><strong>Clausius Statement:</strong></p>
                        <p>"Heat cannot flow spontaneously from a cold object to a hot object."</p>
                        
                        <p><strong>Kelvin-Planck Statement:</strong></p>
                        <p>"No heat engine can be 100% efficient when operating between two thermal reservoirs."</p>
                        
                        <p><strong>Entropy Statement:</strong></p>
                        <p>"The entropy of an isolated system never decreases."</p>
                        $$ \\Delta S_{universe} \\geq 0 $$
                        
                        <p><strong>Statistical Statement:</strong></p>
                        <p>"Natural processes proceed toward states of higher probability (higher entropy)."</p>
                        
                        <p><strong>Key Insight:</strong> All these statements are equivalent and express the same fundamental principle: there's a preferred direction for natural processes.</p>
                    </div>
                    
                    <h3>5. Entropy: The Heart of the Second Law</h3>
                    
                    <div class="derivation-box">
                        <h4><i data-lucide="shuffle"></i>Understanding Entropy</h4>
                        
                        <p><strong>Thermodynamic Definition:</strong></p>
                        $$ dS = \\frac{\\delta Q_{rev}}{T} $$
                        <p>For finite processes: $\\Delta S = \\int \\frac{dQ_{rev}}{T}$</p>
                        
                        <p><strong>Statistical Definition (Boltzmann):</strong></p>
                        $$ S = k \\ln(\\Omega) $$
                        <p>Where $\\Omega$ is the number of microscopic ways to achieve the macroscopic state.</p>
                        
                        <p><strong>Physical Meaning:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li><strong>Measure of disorder:</strong> Higher entropy = more randomness</li>
                            <li><strong>Measure of information:</strong> Higher entropy = less information about microscopic state</li>
                            <li><strong>Measure of irreversibility:</strong> Entropy increase marks irreversible processes</li>
                        </ul>
                        
                        <p><strong>Why Entropy Always Increases:</strong></p>
                        <p>Systems naturally evolve toward states with more microscopic arrangements (higher $\\Omega$) because these states are vastly more probable. It's not impossible for entropy to decrease—just astronomically unlikely.</p>
                    </div>
                    
                    <h3>6. Heat Engines and Refrigerators</h3>
                    
                    <div class="topic-grid">
                        <div class="grid-item">
                            <h4><i data-lucide="cog"></i>Heat Engines</h4>
                            <p><strong>Purpose:</strong> Convert heat into useful work</p>
                            
                            <p><strong>Operating Principle:</strong></p>
                            <ol class="list-decimal list-inside">
                                <li>Absorb heat $Q_H$ from hot reservoir</li>
                                <li>Convert some to work $W$</li>
                                <li>Reject remaining heat $Q_C$ to cold reservoir</li>
                            </ol>
                            
                            <p><strong>Efficiency:</strong></p>
                            $$ \\eta = \\frac{W}{Q_H} = \\frac{Q_H - Q_C}{Q_H} = 1 - \\frac{Q_C}{Q_H} $$
                            
                            <p><strong>Carnot Engine (Theoretical Maximum):</strong></p>
                            $$ \\eta_{Carnot} = 1 - \\frac{T_C}{T_H} $$
                            
                            <p><strong>Key Insight:</strong> Perfect efficiency ($\\eta = 1$) requires $T_C = 0$ K, which is impossible.</p>
                        </div>
                        <div class="grid-item">
                            <h4><i data-lucide="snowflake"></i>Refrigerators</h4>
                            <p><strong>Purpose:</strong> Move heat from cold to hot reservoir</p>
                            
                            <p><strong>Operating Principle:</strong></p>
                            <ol class="list-decimal list-inside">
                                <li>Extract heat $Q_C$ from cold reservoir</li>
                                <li>Input work $W$</li>
                                <li>Reject heat $Q_H = Q_C + W$ to hot reservoir</li>
                            </ol>
                            
                            <p><strong>Coefficient of Performance (COP):</strong></p>
                            $$ COP = \\frac{Q_C}{W} = \\frac{Q_C}{Q_H - Q_C} $$
                            
                            <p><strong>Carnot Refrigerator (Theoretical Maximum):</strong></p>
                            $$ COP_{Carnot} = \\frac{T_C}{T_H - T_C} $$
                            
                            <p><strong>Key Insight:</strong> COP can be greater than 1—refrigerators can move more heat than the work input.</p>
                        </div>
                    </div>
                    
                    <div class="example-box">
                        <h4><i data-lucide="factory"></i>Real-World Thermodynamics: Power Plant Analysis</h4>
                        
                        <p><strong>Scenario:</strong> A coal power plant operates between 600°C (hot reservoir) and 25°C (cold reservoir).</p>
                        
                        <p><strong>Given:</strong></p>
                        <ul class="list-disc list-inside ml-4">
                            <li>$T_H = 600°C = 873$ K</li>
                            <li>$T_C = 25°C = 298$ K</li>
                            <li>Heat input rate: $\\dot{Q}_H = 1000$ MW</li>
                        </ul>
                        
                        <p><strong>Theoretical Maximum Efficiency (Carnot):</strong></p>
                        $$ \\eta_{Carnot} = 1 - \\frac{T_C}{T_H} = 1 - \\frac{298}{873} = 0.658 = 65.8\\% $$
                        
                        <p><strong>Actual Efficiency (typically 35-40%):</strong> $\\eta_{actual} = 38\\%$</p>
                        
                        <p><strong>Power Output:</strong></p>
                        $$ \\dot{W} = \\eta_{actual} \\times \\dot{Q}_H = 0.38 \\times 1000 = 380 \\text{ MW} $$
                        
                        <p><strong>Waste Heat:</strong></p>
                        $$ \\dot{Q}_C = \\dot{Q}_H - \\dot{W} = 1000 - 380 = 620 \\text{ MW} $$
                        
                        <p><strong>Analysis:</strong> Even this high-performance plant wastes 62% of its fuel energy as heat—a consequence of the Second Law, not poor engineering!</p>
                    </div>
                `
            }
        ];

        console.log('Successfully loaded topics:', topics.length);
    }

    // --- NAVIGATION SETUP ---
    function setupNavigation() {
        navMenu.innerHTML = '';
        topics.forEach(topic => {
            const link = document.createElement('a');
            link.className = 'nav-link';
            link.dataset.topic = topic.id;
            link.innerHTML = `<i data-lucide="${topic.icon}"></i><span>${topic.title}</span>`;
            navMenu.appendChild(link);
        });
        lucide.createIcons(); // Render icons
    }

    // --- CHART RENDERING ---
    function renderKinematicsGraphs() {
        // Destroy existing charts if they exist
        if (positionChart) {
            positionChart.destroy();
        }
        if (velocityChart) {
            velocityChart.destroy();
        }

        const posCtx = document.getElementById('positionTimeChart')?.getContext('2d');
        if (posCtx) {
            positionChart = new Chart(posCtx, {
                type: 'line',
                data: {
                    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
                    datasets: [{
                        label: 'Position (m)',
                        data: [0, 5, 18, 37, 60, 85],
                        borderColor: 'rgba(96, 165, 250, 1)',
                        backgroundColor: 'rgba(96, 165, 250, 0.2)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { labels: { color: '#d1d5db' } } },
                    scales: {
                        x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                        y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
                    }
                }
            });
        }

        const velCtx = document.getElementById('velocityTimeChart')?.getContext('2d');
        if (velCtx) {
            velocityChart = new Chart(velCtx, {
                type: 'line',
                data: {
                    labels: ['0s', '1s', '2s', '3s', '4s', '5s'],
                    datasets: [{
                        label: 'Velocity (m/s)',
                        data: [2, 7, 12, 17, 22, 27],
                        borderColor: 'rgba(52, 211, 153, 1)',
                        backgroundColor: 'rgba(52, 211, 153, 0.2)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    plugins: { legend: { labels: { color: '#d1d5db' } } },
                    scales: {
                        x: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } },
                        y: { ticks: { color: '#9ca3af' }, grid: { color: '#374151' } }
                    }
                }
            });
        }
    }

    // --- TOPIC DISPLAY ---
    function showTopic(topicId) {
        const topic = topics.find(t => t.id === topicId);
        if (topic) {
            // Clear the main content completely first
            mainContent.innerHTML = '';
            
            // Create a new content area div
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content-area';
            contentDiv.innerHTML = topic.content;
            
            // Append to main content
            mainContent.appendChild(contentDiv);
            
            // Re-render KaTeX and Lucide icons for the new content
            if (window.renderMathInElement) {
                renderMathInElement(contentDiv, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
                    throwOnError: false,
                    output: 'mathml'
                });
            }
            lucide.createIcons();
            
            if (topicId === 'kinematics') {
                renderKinematicsGraphs();
            }

            // Update active link in navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.toggle('active', link.dataset.topic === topicId);
            });
            
            // Scroll to top of content area
            mainContent.scrollTop = 0;

            // Initialize interactive demos
            setTimeout(() => {
                if (topicId === 'vectors') {
                    initVectorCanvas();
                } else if (topicId === 'kinematics') {
                    initMotionCanvas();
                    resetMotion();
                }
            }, 100);
        }
    }

    // --- VECTOR CANVAS DEMO (Touch and Mouse Support) ---
    function initVectorCanvas() {
        vectorCanvas = document.getElementById('vectorCanvas');
        if (vectorCanvas) {
            vectorCtx = vectorCanvas.getContext('2d');
            
            // Mouse events
            vectorCanvas.addEventListener('mousedown', startVector);
            vectorCanvas.addEventListener('mousemove', drawVector);
            vectorCanvas.addEventListener('mouseup', endVector);
            
            // Touch events for mobile
            vectorCanvas.addEventListener('touchstart', handleTouchStart);
            vectorCanvas.addEventListener('touchmove', handleTouchMove);
            vectorCanvas.addEventListener('touchend', handleTouchEnd);
            
            // Prevent context menu on long press
            vectorCanvas.addEventListener('contextmenu', (e) => e.preventDefault());
            
            drawVectorGrid();
        }
    }

    function getEventCoordinates(e) {
        const rect = vectorCanvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    function startVector(e) {
        const coords = getEventCoordinates(e);
        startPoint.x = coords.x;
        startPoint.y = coords.y;
        drawingVector = true;
    }

    function drawVector(e) {
        if (!drawingVector) return;
        const coords = getEventCoordinates(e);
        
        redrawVectorCanvas();
        drawArrow(vectorCtx, startPoint.x, startPoint.y, coords.x, coords.y, '#60a5fa');
    }

    function endVector(e) {
        if (!drawingVector) return;
        const coords = getEventCoordinates(e);
        
        vectors.push({
            startX: startPoint.x,
            startY: startPoint.y,
            endX: coords.x,
            endY: coords.y
        });
        
        drawingVector = false;
        redrawVectorCanvas();
    }

    // Touch event handlers
    function handleTouchStart(e) {
        e.preventDefault();
        startVector(e);
    }

    function handleTouchMove(e) {
        e.preventDefault();
        drawVector(e);
    }

    function handleTouchEnd(e) {
        e.preventDefault();
        endVector(e);
    }

    function drawArrow(ctx, fromX, fromY, toX, toY, color = '#60a5fa') {
        const headlen = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(toX, toY);
        ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
        ctx.stroke();
    }

    function drawVectorGrid() {
        if (!vectorCtx) return;
        vectorCtx.strokeStyle = '#374151';
        vectorCtx.lineWidth = 1;
        
        // Draw grid
        for (let i = 0; i <= vectorCanvas.width; i += 20) {
            vectorCtx.beginPath();
            vectorCtx.moveTo(i, 0);
            vectorCtx.lineTo(i, vectorCanvas.height);
            vectorCtx.stroke();
        }
        for (let i = 0; i <= vectorCanvas.height; i += 20) {
            vectorCtx.beginPath();
            vectorCtx.moveTo(0, i);
            vectorCtx.lineTo(vectorCanvas.width, i);
            vectorCtx.stroke();
        }
        
        // Draw axes
        vectorCtx.strokeStyle = '#9ca3af';
        vectorCtx.lineWidth = 2;
        vectorCtx.beginPath();
        vectorCtx.moveTo(vectorCanvas.width/2, 0);
        vectorCtx.lineTo(vectorCanvas.width/2, vectorCanvas.height);
        vectorCtx.moveTo(0, vectorCanvas.height/2);
        vectorCtx.lineTo(vectorCanvas.width, vectorCanvas.height/2);
        vectorCtx.stroke();
    }

    function redrawVectorCanvas() {
        vectorCtx.clearRect(0, 0, vectorCanvas.width, vectorCanvas.height);
        drawVectorGrid();
        
        vectors.forEach(vector => {
            drawArrow(vectorCtx, vector.startX, vector.startY, vector.endX, vector.endY, '#60a5fa');
            
            if (showComponentsFlag) {
                // Draw components
                vectorCtx.strokeStyle = '#34d399';
                vectorCtx.lineWidth = 1;
                vectorCtx.setLineDash([5, 5]);
                vectorCtx.beginPath();
                vectorCtx.moveTo(vector.startX, vector.startY);
                vectorCtx.lineTo(vector.endX, vector.startY);
                vectorCtx.lineTo(vector.endX, vector.endY);
                vectorCtx.stroke();
                vectorCtx.setLineDash([]);
            }
        });
        
        if (showResultantFlag && vectors.length > 1) {
            // Calculate and draw resultant
            let totalX = 0, totalY = 0;
            vectors.forEach(vector => {
                totalX += (vector.endX - vector.startX);
                totalY += (vector.endY - vector.startY);
            });
            
            const centerX = vectorCanvas.width / 2;
            const centerY = vectorCanvas.height / 2;
            drawArrow(vectorCtx, centerX, centerY, centerX + totalX, centerY + totalY, '#f59e0b');
        }
    }

    // --- MOTION SIMULATION ---
    function initMotionCanvas() {
        motionCanvas = document.getElementById('motionCanvas');
        if (motionCanvas) {
            motionCtx = motionCanvas.getContext('2d');
        }
    }

    function startMotion() {
        const vSlider = document.getElementById('velocitySlider');
        const aSlider = document.getElementById('accelerationSlider');
        
        if (vSlider && aSlider) {
            ball.vx = parseFloat(vSlider.value);
            ball.ay = parseFloat(aSlider.value);
            ball.x = 50;
            ball.y = motionCanvas ? motionCanvas.height - 50 : 150;
            time = 0;
            
            if (animationId) cancelAnimationFrame(animationId);
            animateMotion();
        }
    }

    function resetMotion() {
        if (animationId) cancelAnimationFrame(animationId);
        ball.x = 50;
        ball.y = motionCanvas ? motionCanvas.height - 50 : 150;
        ball.vx = 20;
        ball.vy = 0;
        time = 0;
        
        if (motionCtx) {
            motionCtx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);
            drawMotionScene();
        }
    }

    function animateMotion() {
        if (!motionCtx) return;
        
        const dt = 0.016; // ~60 FPS
        
        // Update position
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        
        // Update velocity
        ball.vy += ball.ay * dt;
        
        // Boundary checks
        if (ball.x > motionCanvas.width - 20 || ball.x < 20 || 
            ball.y > motionCanvas.height - 20 || ball.y < 20) {
            resetMotion();
            return;
        }
        
        // Draw
        motionCtx.clearRect(0, 0, motionCanvas.width, motionCanvas.height);
        drawMotionScene();
        
        time += dt;
        animationId = requestAnimationFrame(animateMotion);
    }

    function drawMotionScene() {
        if (!motionCtx) return;
        
        // Draw ground
        motionCtx.fillStyle = '#374151';
        motionCtx.fillRect(0, motionCanvas.height - 10, motionCanvas.width, 10);
        
        // Draw ball
        motionCtx.fillStyle = '#f59e0b';
        motionCtx.beginPath();
        motionCtx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
        motionCtx.fill();
        
        // Draw velocity vector
        const scale = 2;
        drawArrow(motionCtx, ball.x, ball.y, 
                 ball.x + ball.vx * scale, ball.y + ball.vy * scale, '#ef4444');
    }

    // --- GLOBAL FUNCTIONS FOR BUTTON CLICKS ---
    window.clearVectors = function() {
        vectors = [];
        showComponentsFlag = false;
        showResultantFlag = false;
        redrawVectorCanvas();
    };

    window.showComponents = function() {
        showComponentsFlag = !showComponentsFlag;
        redrawVectorCanvas();
    };

    window.showResultant = function() {
        showResultantFlag = !showResultantFlag;
        redrawVectorCanvas();
    };

    window.startMotion = startMotion;
    window.resetMotion = resetMotion;

    // --- MOBILE MENU FUNCTIONALITY ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu-button');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    function openMobileMenu() {
        sidebar.classList.add('sidebar-open');
        sidebarOverlay.classList.add('overlay-visible');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeMobileMenu() {
        sidebar.classList.remove('sidebar-open');
        sidebarOverlay.classList.remove('overlay-visible');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Mobile menu event listeners
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMobileMenu);
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeMobileMenu);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on navigation link (mobile)
    function handleNavClick(e) {
        const link = e.target.closest('.nav-link');
        if (link && link.dataset.topic) {
            showTopic(link.dataset.topic);
            
            // Close mobile menu if open
            if (window.innerWidth < 1024) {
                setTimeout(closeMobileMenu, 150); // Small delay for better UX
            }
        }
    }

    // Handle resize events
    function handleResize() {
        if (window.innerWidth >= 1024) {
            // Desktop view - close mobile menu if open
            closeMobileMenu();
        }
        
        // Resize canvas elements if they exist
        if (vectorCanvas) {
            // Adjust canvas size for mobile
            const maxWidth = Math.min(400, window.innerWidth - 40);
            vectorCanvas.width = maxWidth;
            vectorCanvas.height = Math.min(300, maxWidth * 0.75);
            redrawVectorCanvas();
        }
        
        if (motionCanvas) {
            const maxWidth = Math.min(500, window.innerWidth - 40);
            motionCanvas.width = maxWidth;
            motionCanvas.height = Math.min(200, maxWidth * 0.4);
            if (motionCtx) drawMotionScene();
        }
    }

    // --- EVENT LISTENERS ---
    navMenu.addEventListener('click', handleNavClick);
    window.addEventListener('resize', handleResize);

    // Handle escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Touch event handling for better mobile experience
    let touchStartY = 0;
    let touchStartX = 0;

    // Prevent pull-to-refresh on mobile when at top of page
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const isScrollingUp = touchY > touchStartY;
        const isHorizontalSwipe = Math.abs(touchX - touchStartX) > Math.abs(touchY - touchStartY);
        
        // Prevent pull-to-refresh if at top of page and scrolling up
        if (isScrollingUp && window.scrollY === 0 && !isHorizontalSwipe) {
            e.preventDefault();
        }
    }, { passive: false });

    // --- INITIALIZATION ---
    loadContent();
    setupNavigation();
    showTopic('home'); // Show the home page by default
    
    // Initial resize to set up responsive elements
    handleResize();
});