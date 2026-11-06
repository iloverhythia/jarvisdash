// Web port of 3rdparty/cocos/wrapper.hpp + wrapper.cpp
//
// Wrapper for calling the original Cocos2d functions.
// On Windows these come from cocos2d-x.dll. On the web the "DLL" is a
// JavaScript module that exports the same function names.

export class AppDelegate {
    constructor(dllPath = "./cocos2d-x.js") {
        this.dllHandle = null;
        this.dllPath = dllPath;

        // Function pointers
        this.createFn = null;
        this.launchFn = null;
    }

    // Replaces the C++ destructor (FreeLibrary).
    dispose() {
        this.dllHandle = null;
        this.createFn = null;
        this.launchFn = null;
    }

    // Loads the DLL (LoadLibraryA + GetProcAddress).
    async loadDLL() {
        try {
            this.dllHandle = await import(new URL(this.dllPath, document.baseURI));
        } catch {
            this.dllHandle = null;
        }
        if (!this.dllHandle) return false;

        this.createFn = this.dllHandle["AppDelegate_create"] ?? null;
        this.launchFn = this.dllHandle["AppDelegate_applicationDidFinishLaunching"] ?? null;

        return (this.createFn !== null) && (this.launchFn !== null);
    }

    // Calls AppDelegate_create
    create() {
        if (!this.createFn) throw new Error("createFn not loaded");
        return this.createFn();
    }

    // Calls AppDelegate_applicationDidFinishLaunching
    launch(app) {
        if (!this.launchFn) throw new Error("launchFn not loaded");
        this.launchFn(app);
    }

    // Convenience: load DLL, create and launch.
    // src/game/main.cpp calls this, but the C++ wrapper never defined it.
    async applicationDidFinishLaunching() {
        if (!(await this.loadDLL())) {
            console.warn(`Could not load ${this.dllPath}`);
            return false;
        }
        this.launch(this.create());
        return true;
    }
}
