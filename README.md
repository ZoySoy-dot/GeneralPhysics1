# General Physics 1 Learning Hub

A responsive, interactive physics learning website with simulations, videos, and comprehensive educational content.

## 🚀 Quick Start

### Method 1: Using the Start Script (Easiest)

**Windows:**
```bash
# Double-click start-server.bat
# OR run in command prompt:
start-server.bat
```

**Mac/Linux:**
```bash
# Make executable and run:
chmod +x start-server.sh
./start-server.sh
```

### Method 2: Manual Server Setup

Choose one of these commands based on what you have installed:

**Python 3 (Recommended):**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx serve . -l 8000
```

**PHP:**
```bash
php -S localhost:8000
```

### Method 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `Topics.html`
3. Select "Open with Live Server"

## 📂 File Structure

```
GehPhysics/
├── Topics.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # All JavaScript functionality
├── content.txt         # All topic content (easy to edit!)
├── start-server.bat    # Windows server script
├── start-server.sh     # Mac/Linux server script
└── README.md           # This file
```

## ✨ Features

- **📱 Fully Responsive**: Works on phones, tablets, and desktops
- **🎯 Interactive Simulations**: Vector addition, motion simulation
- **📊 Dynamic Charts**: Position/velocity graphs with Chart.js
- **🎥 Educational Videos**: Embedded Khan Academy content
- **🧮 LaTeX Math**: Beautiful equation rendering with KaTeX
- **🔗 External Resources**: Links to PhET, Khan Academy, and more
- **💫 Touch-Friendly**: Optimized for mobile devices

## 📝 Editing Content

All content is stored in `content.txt` using this simple format:

```
---TOPIC---
topic-id|Topic Title|icon-name
<h2>Topic Title</h2>
<p>Your content here...</p>

---TOPIC---
next-topic|Next Topic|another-icon
<h2>Next Topic</h2>
<p>More content...</p>
```

Simply edit the `content.txt` file to add or modify topics!

## 🌐 Browser Access

After starting the server, open your browser and navigate to:
- **http://localhost:8000**

## 🔧 Troubleshooting

### Content Not Loading?
- Make sure you're running a local server (not opening the HTML file directly)
- Check that all files are in the same directory
- Ensure `content.txt` exists and has the correct format

### Mobile Issues?
- Clear browser cache
- Try in incognito/private mode
- Ensure JavaScript is enabled

### Server Won't Start?
- Make sure Python/Node.js/PHP is installed
- Try a different port: `python -m http.server 3000`
- Check if port 8000 is already in use

## 📚 Topics Included

1. **Units, Quantities & Vectors** - SI units, vector operations, interactive demos
2. **Kinematics** - Motion analysis, graphs, projectile motion
3. **Dynamics** - Newton's laws, forces, friction
4. **Work, Energy & Power** - Conservation laws, work-energy theorem
5. **Impulse & Momentum** - Collisions, conservation of momentum
6. **Rotational Motion** - Torque, angular momentum, rotational dynamics
7. **Universal Gravitation** - Gravitational forces, orbital mechanics
8. **Periodic Motion** - Simple harmonic motion, oscillations
9. **Waves & Sound** - Wave properties, Doppler effect
10. **Thermodynamics** - Heat engines, entropy, energy conservation

## 🎓 Educational Features

- **Interactive Simulations**: Draw vectors, simulate motion
- **Real-World Examples**: GPS navigation, daily life applications
- **Practice Problems**: Step-by-step solutions
- **Visual Learning**: Graphs, charts, and diagrams
- **External Resources**: Links to additional learning materials
- **Mobile-Friendly**: Learn physics anywhere, anytime

## 🤝 Contributing

To add new content or features:
1. Edit `content.txt` for new topics
2. Modify `styles.css` for styling changes  
3. Update `script.js` for new functionality

## 📄 License

Educational use - feel free to modify and share!

---

**Happy Learning! 🎉**

*Made with ❤️ for physics students everywhere*