// Web port of src/steam/main.cpp + include/steam/main.hpp
//
// The C++ functions write their result through a void** out-parameter.
// Here the out-parameter is an object, and the result goes in `.value`:
//
//     const user = { value: null };
//     SteamUtils.createSteamInterface23(user);

import {
    SteamAPI_GetHSteamUser,
    SteamInternal_FindOrCreateUserInterface,
} from "../../stub/steam/main.js";

export const SteamUtils = {

    createSteamInterface23(iface) {
        const steamUser = SteamAPI_GetHSteamUser();
        const userInterface = SteamInternal_FindOrCreateUserInterface(steamUser, "SteamUser023");
        iface.value = userInterface;
    },

    createSteamUtils010(util) {
        const utils = SteamInternal_FindOrCreateUserInterface(0, "SteamUtils010");
        util.value = utils;
    },

    createSteamInterface12(iface) {
        const steamUser = SteamAPI_GetHSteamUser();
        const userInterface =
            SteamInternal_FindOrCreateUserInterface(steamUser, "STEAMUSERSTATS_INTERFACE_VERSION012");
        iface.value = userInterface;
    },

};
