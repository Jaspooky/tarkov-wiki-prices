.PHONY: all assemble build clean

all: clean build assemble

assemble:
	npm run assemble

build:
	npm run build

clean:
	rm -rf build
	rm -rf dist

