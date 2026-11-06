build:
	x86_64-w64-mingw32-g++ -o GeometryDash.exe src/game/main.cpp src/steam/main.cpp stub/steam/main.cpp 3rdparty/cocos/wrapper.cpp -Wall -I.

# Serve the web port at http://localhost:8000
web:
	python3 -m http.server 8000 -d web

.PHONY: build web
