/* 
 ==========================================
  MEDISECURE AI INTERACTIVE SCRIPT (app.js)
 ==========================================
  Implements premium micro-interactions, particle animations,
  typing effects, on-scroll counters, live telemetry simulator,
  and dark/light modes.
*/

document.addEventListener("DOMContentLoaded", () => {
    
    /* --- Particle Blueprint (Declared first to avoid hoisting ReferenceError) --- */
    class Particle {
        constructor(canvas, ctx) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.reset();
        }

        reset() {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.radius = Math.random() * 2.5 + 0.5;
            // Slow speed for elegant drift
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.5 + 0.15;
            // Assign colors matching accent palette
            const colors = ['#00F5FF', '#3B82F6', '#8B5CF6', '#FFFFFF'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Fade in/out slightly near edges
            if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
                this.reset();
            }
        }

        draw() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = this.color;
            this.ctx.globalAlpha = this.alpha;
            this.ctx.shadowBlur = this.radius * 2;
            this.ctx.shadowColor = this.color;
            this.ctx.fill();
        }
    }

    /* ==========================================
       1. LOADING SCREEN TRANSITION
       ========================================== */
    const loader = document.getElementById("loader");
    window.addEventListener("load", () => {
        // Add a slight artificial delay for a premium loading feel
        setTimeout(() => {
            loader.classList.add("fade-out");
            // Trigger scrolling animations immediately for elements in initial fold
            triggerInitialScrollReveal();
        }, 1200);
    });

    /* ==========================================
       2. CANVAS PARTICLES ANIMATION
       ========================================== */
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let particleCount = window.innerWidth < 768 ? 40 : 100;

    // Handle Resize
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particleCount = window.innerWidth < 768 ? 40 : 100;
        initParticles();
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas, ctx));
        }
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();


    /* ==========================================
       3. AMBIENT GLOW AND PARALLAX MOUSE EFFECT
       ========================================== */
    const ambientGlow = document.getElementById("ambientGlow");
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth pointer animation (easing)
    function updateAmbientGlow() {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        currentX += dx * 0.08;
        currentY += dy * 0.08;
        
        ambientGlow.style.left = `${currentX}px`;
        ambientGlow.style.top = `${currentY}px`;
        
        requestAnimationFrame(updateAmbientGlow);
    }
    updateAmbientGlow();


    /* ==========================================
       4. HERO SECTION TYPING ANIMATION
       ========================================== */
    const typedTextSpan = document.getElementById("typed-text");
    const phrases = ["Medical Research.", "Clinical AI Models.", "Data Collaboration.", "SMPC Privacy Matrices."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        // Typing Speed Adjustments
        let typingSpeed = isDeleting ? 40 : 90;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at full word
            typingSpeed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            // Short delay before typing next word
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }
    // Start Typing
    if (typedTextSpan) {
        setTimeout(typeEffect, 1000);
    }


    /* ==========================================
       5. LIQUID GLASS CARD TILT & GLOW REFLECTIONS
       ========================================== */
    const tiltCards = document.querySelectorAll("[data-tilt]");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse x position inside element
            const y = e.clientY - rect.top;  // Mouse y position inside element
            
            // Calculate percentage positions
            const xPercent = x / rect.width;
            const yPercent = y / rect.height;
            
            // Max tilt limits (degrees)
            const maxTilt = 8;
            const rotateX = (maxTilt / 2 - yPercent * maxTilt).toFixed(2);
            const rotateY = (xPercent * maxTilt - maxTilt / 2).toFixed(2);
            
            // Dynamic Reflection/Shine overlay following cursor
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
            card.style.setProperty('--card-glow-overlay', `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 60%)`);
        });

        card.addEventListener("mouseleave", () => {
            // Reset to default styling state
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
            card.style.setProperty('--card-glow-overlay', 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0))');
        });
    });


    /* ==========================================
       6. THEME TOGGLER (DARK / LIGHT MODE)
       ========================================== */
    const themeToggle = document.getElementById("themeToggle");
    const mobileThemeToggle = document.getElementById("mobileThemeToggle");
    const htmlElement = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem("theme") || "dark";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateMobileThemeBtnText(savedTheme);

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateMobileThemeBtnText(newTheme);
        
        // Push a warning/info log in the terminal simulator
        pushConsoleLog(`[INFO] Global Theme switched to: ${newTheme.toUpperCase()}`, "info");
    }

    function updateMobileThemeBtnText(theme) {
        if (mobileThemeToggle) {
            mobileThemeToggle.querySelector("span").textContent = `Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
        }
    }

    if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener("click", toggleTheme);


    /* ==========================================
       7. STATS COUNT-UP ANIMATION
       ========================================== */
    const statValues = document.querySelectorAll(".stat-value");
    
    function formatStatValue(num, formatType) {
        if (formatType === "short" && num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M+";
        }
        return num.toLocaleString();
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute("data-target"), 10);
        const format = element.getAttribute("data-format");
        let start = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 30; // 30ms interval
        const steps = duration / stepTime;
        const increment = target / steps;

        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatStatValue(target, format);
                clearInterval(counter);
            } else {
                element.textContent = formatStatValue(Math.ceil(start), format);
            }
        }, stepTime);
    }


    /* ==========================================
       8. SCROLL REVEAL INTERSECTION OBSERVER
       ========================================== */
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                
                // If it is the stats section, run counters
                if (entry.target.classList.contains("stats-section")) {
                    statValues.forEach(val => animateCounter(val));
                }
                
                // If it is the dashboard section, animate charts
                if (entry.target.id === "dashboard") {
                    triggerDashboardAnimations();
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Fallback for initial view elements
    function triggerInitialScrollReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add("revealed");
                if (el.classList.contains("stats-section")) {
                    statValues.forEach(val => animateCounter(val));
                }
                if (el.id === "dashboard") {
                    triggerDashboardAnimations();
                }
            }
        });
    }


    /* ==========================================
       9. DASHBOARD METRICS AND CHART INITIALIZATION
       ========================================== */
    function triggerDashboardAnimations() {
        // Animate Progress Bars
        const progressBars = document.querySelectorAll(".progress-bar-fill");
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute("data-progress");
            bar.style.width = `${targetWidth}%`;
        });

        // Set bar heights in contribution chart
        const bars = document.querySelectorAll(".bar-bar");
        bars.forEach(bar => {
            const targetHeight = bar.style.getPropertyValue("--height") || "50%";
            bar.style.height = targetHeight;
        });

        // Push initial boot up simulator console logs
        startTelemetryStream();
    }


    /* ==========================================
       10. LIVE SECURE-COMPUTATION TELEMETRY SYSTEM
       ========================================== */
    const logsOutput = document.getElementById("logsOutput");
    const clearLogsBtn = document.getElementById("clearLogsBtn");
    let logInterval = null;

    const logTemplates = [
        { text: "Initializing cryptographic handshake protocol... Node count: 142.", status: "info" },
        { text: "Handshake verified successfully with Hospital A (St. Jude Center).", status: "success" },
        { text: "ChaCha20-Poly1305 encrypted session channel opened on port 8443.", status: "success" },
        { text: "Mayo Clinical Group (Hospital B) syncing verification hash standard RSA-4096...", status: "info" },
        { text: "Verification hash index matching active pool schema: 0x9B82AF1.", status: "success" },
        { text: "Commencing algebraic split sharing matrix split. Threshold (t=95, n=142).", status: "info" },
        { text: "Secret shards distributed successfully via Shamir's Scheme.", status: "success" },
        { text: "Evaluating encrypted gradient sums inside secure hardware enclave (TEE).", status: "info" },
        { text: "Warning: Beaver Multiplying Triple depletion detected. Replenishing entropy pool...", status: "warning" },
        { text: "Entropy pool replenished (+2.5 TB random bits generated).", status: "success" },
        { text: "Zero-Knowledge check active: validating node mathematical consistency...", status: "info" },
        { text: "ZK Proof verified (zk-SNARK check time: 1.48ms). Index 100% correct.", status: "success" },
        { text: "Commencing Laplace noise vector addition (Differential Privacy ε=0.05).", status: "info" },
        { text: "Added privacy noise vector. Leak metrics evaluate to absolute zero.", status: "success" },
        { text: "Aggregating multi-party weight sets for global Oncology model weights...", status: "info" },
        { text: "Model coefficients combined successfully. Epoch 84 training loss: 0.0821.", status: "success" },
        { text: "Error in heartbeat node 109: latency delay exceeded 120ms. Recovering connection...", status: "error" },
        { text: "Heartbeat recovered. Node 109 synchronized successfully.", status: "success" }
    ];

    function getTimestamp() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const ms = String(now.getMilliseconds()).padStart(3, '0');
        return `${hrs}:${mins}:${secs}.${ms}`;
    }

    function pushConsoleLog(text, status) {
        if (!logsOutput) return;

        const p = document.createElement("p");
        
        const spanTime = document.createElement("span");
        spanTime.className = "log-timestamp";
        spanTime.textContent = `[${getTimestamp()}]`;

        const spanText = document.createElement("span");
        spanText.className = `log-status-${status}`;
        spanText.textContent = ` ${text}`;

        p.appendChild(spanTime);
        p.appendChild(spanText);

        logsOutput.appendChild(p);
        
        // Auto Scroll to bottom
        logsOutput.scrollTop = logsOutput.scrollHeight;

        // Limit logs limit inside UI to 100 entries to prevent memory leak
        if (logsOutput.children.length > 100) {
            logsOutput.removeChild(logsOutput.firstChild);
        }
    }

    function startTelemetryStream() {
        if (logInterval) clearInterval(logInterval);
        
        // Initial Startup Logs sequence
        pushConsoleLog("MediSecure AI local kernel boot initialized.", "info");
        setTimeout(() => pushConsoleLog("Connecting to SMPC distributed aggregator layer...", "info"), 400);
        setTimeout(() => pushConsoleLog("142 secure nodes connected in clinical group database.", "success"), 900);

        logInterval = setInterval(() => {
            const randomLog = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            pushConsoleLog(randomLog.text, randomLog.status);
            
            // Randomly update line chart value to make it look active
            shakeLineChartIndicator();
        }, 3200);
    }

    if (clearLogsBtn) {
        clearLogsBtn.addEventListener("click", () => {
            logsOutput.innerHTML = "";
            pushConsoleLog("Console display buffer cleared by user.", "info");
        });
    }

    // Interactive chart movement to simulate live update
    function shakeLineChartIndicator() {
        const point = document.querySelector(".chart-pulse-point");
        if (point) {
            const currentY = parseFloat(point.getAttribute("cy"));
            // Shake Y slightly around 15px (between 10px and 22px)
            const offset = (Math.random() - 0.5) * 6;
            let newY = Math.max(10, Math.min(22, currentY + offset));
            point.setAttribute("cy", newY);
        }
    }


    /* ==========================================
       11. ARCHITECTURE MODAL CONTROL
       ========================================== */
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const archModal = document.getElementById("archModal");

    function openModal() {
        archModal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal() {
        archModal.classList.remove("active");
        document.body.style.overflow = ""; // Restore background scroll
    }

    if (openModalBtn) openModalBtn.addEventListener("click", openModal);
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);

    // Close when clicking modal backdrop
    if (archModal) {
        archModal.addEventListener("click", (e) => {
            if (e.target === archModal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape Keypress
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && archModal.classList.contains("active")) {
            closeModal();
        }
    });


    /* ==========================================
       12. MOBILE NAVIGATION BURGER MENU
       ========================================== */
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const mobileLinks = document.querySelectorAll(".mobile-nav-links a");

    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle("active");
        mobileNav.classList.toggle("active");
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    }

    // Close mobile nav drawer when link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            mobileNav.classList.remove("active");
        });
    });


    /* ==========================================
       13. COLLABORATION FORM INTERACTIVE SUBMIT
       ========================================== */
    const collabForm = document.getElementById("collaborationForm");
    const formFeedback = document.getElementById("formFeedback");

    if (collabForm) {
        collabForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Select submit button and simulate encryption signing process
            const submitBtn = collabForm.querySelector(".form-submit-btn");
            const btnSpan = submitBtn.querySelector("span");
            
            submitBtn.disabled = true;
            btnSpan.textContent = "Generating Cryptographic Key...";
            
            setTimeout(() => {
                btnSpan.textContent = "Signing Proposal Details...";
                
                setTimeout(() => {
                    // Hide Form and Show Success
                    collabForm.classList.add("hidden");
                    formFeedback.classList.remove("hidden");
                    
                    // Reset buttons
                    submitBtn.disabled = false;
                    btnSpan.textContent = "Initialize Proposal Sync";
                    
                    pushConsoleLog("[SUCCESS] Node Proposal Sync received. Initiating external audit handshake.", "success");
                }, 1200);
            }, 1200);
        });
    }


    /* ==========================================
       14. ACTIVE NAVBAR SCROLL LISTENER & ACTIVE LINKS
       ========================================== */
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");
    const header = document.querySelector(".navbar-wrapper");

    window.addEventListener("scroll", () => {
        // Sticky Header scroll styling
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Active Navigation Highlight
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });

});
