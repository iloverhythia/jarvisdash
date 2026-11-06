# Geometry Dash Decompilation
Geometry Dash's source in C++

## Tools/binaries used in this project
- ``gcc`` - Compiling C++ (included with ``mingw-w64``)
- ``mingw-w64`` - Crosscompiling Windows on Linux.

## Web version
The ``web/`` folder is a 1:1 JavaScript port of the C++ source, with the same file layout:

| C++ | Web |
| --- | --- |
| ``src/game/main.cpp`` | ``web/src/game/main.js`` (+ ``web/index.html``) |
| ``src/steam/main.cpp``, ``include/steam/main.hpp`` | ``web/src/steam/main.js`` |
| ``stub/steam/main.cpp``, ``stub/steam/header.hpp`` | ``web/stub/steam/main.js`` |
| ``3rdparty/cocos/wrapper.cpp``, ``wrapper.hpp`` | ``web/3rdparty/cocos/wrapper.js`` |

The Win32 window becomes an 800x600 ``<canvas>``. Instead of loading ``cocos2d-x.dll``,
the Cocos wrapper loads ``web/cocos2d-x.js``, a module that exports
``AppDelegate_create`` and ``AppDelegate_applicationDidFinishLaunching``.

Run it with ``make web`` and open http://localhost:8000. Browsers block JavaScript modules
opened straight from disk, so it has to be served.
