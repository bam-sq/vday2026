document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const promptScreen = document.getElementById('prompt-screen');
    const terminal = document.getElementById('terminal');
    const errorMsg = document.getElementById('error');
    const typingSound = document.getElementById('typing-sound');
    const explosionSound = document.getElementById('explosion-sound');
    const tickSound = document.getElementById('tick-sound');

    let username = '';

    // Login handler with validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const enteredUsername = document.getElementById('username').value;
        const enteredPassword = document.getElementById('password').value;
        if (enteredUsername === 'charmaigne' && enteredPassword === 'wheniflytowardsyou') {
            username = enteredUsername;
            errorMsg.style.display = 'none';
            loginScreen.style.display = 'none';
            promptScreen.style.display = 'block';
            startPrompt();
        } else {
            errorMsg.style.display = 'block';
        }
    });

    // Function to type text with continuous sound and delay (faster: 25ms per char)
    async function typeText(text, delay = 25, lineDelay = 1000) {
        typingSound.play(); // Start continuous sound
        for (let char of text) {
            terminal.textContent += char;
            await sleep(delay);
        }
        typingSound.pause(); // Stop sound after line
        typingSound.currentTime = 0;
        await sleep(lineDelay);
        terminal.textContent += '\n';
    }

    // Sleep function for delays
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Flash images
    async function flashImages() {
        const images = [];
        for (let i = 1; i <= 12; i++) {
            images.push(`https://via.placeholder.com/300x200?text=Photo+${i}`);
        }
        for (let imgSrc of images) {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.width = '300px';
            img.style.height = '200px';
            img.style.zIndex = '10';
            document.body.appendChild(img);
            await sleep(200);
            document.body.removeChild(img);
        }
    }

    // Function for handling user input (prompt and keypress logic)
    async function handleInput() {
        await typeText('>... type yes or no');
        terminal.textContent += '>... ';
        let userResponse = '';
        let inputActive = true;
        typingSound.play(); // Start continuous sound for user input

        // Handle user input via keypress
        const keyHandler = async (e) => {
            if (!inputActive) return;
            if (e.key === 'Enter') {
                inputActive = false;
                typingSound.pause(); // Stop sound on submit
                typingSound.currentTime = 0;
                document.removeEventListener('keypress', keyHandler);
                terminal.textContent += '\n'; // New line after input
                const response = userResponse.toLowerCase().trim();
                if (response === 'yes') {
                    await typeText('>... see you on february 14, my dearest');
                    await sleep(2000);
                    window.location.href = 'next-page.html'; // Redirect
                } else if (response === 'no') {
                    await typeText('>... the device will self destruct in 3 seconds');
                    await sleep(1500); // Delay before ticking starts
                    tickSound.play(); // Start continuous ticking
                    for (let i = 3; i > 0; i--) {
                        await typeText(`>... ${i}`);
                        await sleep(1000);
                    }
                    tickSound.pause(); // Stop ticking after countdown
                    tickSound.currentTime = 0;
                    explosionSound.play(); // Explosion after countdown
                    await typeText('>... BOOM!');
                    await sleep(2000);
                    terminal.textContent = ''; // Reset
                    resetToQuestion(); // Reset to question + input
                } else {
                    await typeText('>... invalid response. try again.');
                    terminal.textContent += '>... <';
                    userResponse = '';
                    inputActive = true;
                    typingSound.play(); // Restart sound for retry
                    document.addEventListener('keypress', keyHandler);
                }
            } else if (e.key === 'Backspace') {
                if (userResponse.length > 0) {
                    userResponse = userResponse.slice(0, -1);
                    terminal.textContent = terminal.textContent.slice(0, -1);
                }
            } else if (e.key.length === 1) { // Printable characters
                userResponse += e.key;
                terminal.textContent += e.key;
            }
        };
        document.addEventListener('keypress', keyHandler);
    }

    // Function to reset to the valentine question and input
    async function resetToQuestion() {
        await typeText('>... will you be my valentine?');
        await handleInput(); // Proceed to input
    }

    // Function for the valentine question and message (initial load only)
    async function askValentine() {
        await typeText('>... it is not february 14 yet');
        await typeText('>... i have spent my life searching for someone who would complete me');
        await typeText('>... i found someone worth living for and worth dying for');
        await typeText('>... this someone has become an important part of my life');
        await typeText(`>... my dear ${username}, that person is you`);
        await typeText('>... i never expected to fall for you, nor for my feelings to be reciprocated');
        await typeText('>... but here we are');
        await typeText('>... i have asked this question once already');
        await typeText('>... but i would like to ask again');
        await typeText(`>... my dearest ${username}`);
        await typeText('>... will you be my valentine?');
        await handleInput(); // Proceed to input
    }

    // Start the prompt sequence (initial load only)
    async function startPrompt() {
        await typeText('>... connection established');
        await typeText(`>... greetings user ${username}`);
        await typeText('>... sufficient data has been gathered');
        await flashImages();
        await askValentine(); // Proceed to valentine question and input
    }
});