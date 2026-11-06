// Web port of src/game/main.cpp
import { AppDelegate } from "../../3rdparty/cocos/wrapper.js";

// Placeholder window procedure, same as DefWindowProc in the C++ version.
// Real GD hooks input elsewhere.
function DefWindowProc(hwnd, msg, event) {
    return 0;
}

async function WinMain() {
    // 1. Register window class
    const wc = {
        lpfnWndProc: DefWindowProc,
        lpszClassName: "GDWindowClass",
        hCursor: "default", // IDC_ARROW
    };

    // 2. Create the window
    const hwnd = document.createElement("canvas");
    hwnd.id = wc.lpszClassName;
    hwnd.width = 800;
    hwnd.height = 600;
    hwnd.style.cursor = wc.hCursor;
    hwnd.tabIndex = 0; // lets the canvas receive keyboard input
    document.title = "Geometry Dash";

    if (!hwnd)
        return -1;

    // ShowWindow / UpdateWindow
    document.body.appendChild(hwnd);
    hwnd.focus();

    // 3. Initialize game engine / Cocos stuff
    const app = new AppDelegate();
    await app.applicationDidFinishLaunching();

    // 4. Run main message loop
    // The browser runs the loop for us; we just forward each message
    // to the window procedure, like DispatchMessage does.
    const messages = [
        "mousedown", "mouseup", "mousemove",
        "keydown", "keyup",
        "touchstart", "touchend",
    ];
    for (const msg of messages) {
        const target = msg.startsWith("key") ? window : hwnd;
        target.addEventListener(msg, (event) => wc.lpfnWndProc(hwnd, msg, event));
    }

    return 0;
}

WinMain();
