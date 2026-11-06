// Web port of stub/steam/header.hpp + stub/steam/main.cpp
//
// Very small in-memory fake "interfaces" you can expand.
// JavaScript is single-threaded, so the C++ mutex is not needed.

const g_fakeInterfaces = new Map();
const g_fakeUser = 1;

export function SteamAPI_Init() {
    // Return non-zero on success to match some code expectations.
    return 1;
}

export function SteamAPI_GetHSteamUser() {
    return g_fakeUser;
}

export function SteamInternal_FindOrCreateUserInterface(hSteamUser, name) {
    if (!name) return null;
    const key = `${hSteamUser}:${name}`;
    const existing = g_fakeInterfaces.get(key);
    if (existing) return existing;

    // Create a tiny dummy object, same as malloc(64) + memset(0) in C++.
    const dummy = new ArrayBuffer(64);
    g_fakeInterfaces.set(key, dummy);
    return dummy;
}

export function SteamInternal_ContextInit(vtablePtr) {
    // Return a pointer to a dummy context; many callers treat it as "context".
    return new ArrayBuffer(32);
}

export function SteamInternal_SteamAPI_Init(name, unknown) {
    // Real SDK returns 0 on success in the decomp patterns.
    return 0;
}
