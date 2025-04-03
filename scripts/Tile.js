export default class Tile {
 #elementoTile
 #x
 #y
 #value

constructor(containerTile, value= Math.random() > 0.5 ? 2 : 4) {
    this.#elementoTile = document.createElement("div")
    this.#elementoTile.classList.add("tile")
    containerTile.append(this.#elementoTile)
    this.value = value
    }

get value() {
    return this.#value
    }

 set value(v) {
    this.#value = v
    this.#elementoTile.textContent = v
    const power = Math.log2(v)
    const backgroundLightness = 100 - power * 9
    this.#elementoTile.style.setProperty("--background-lightness", `${backgroundLightness}%`)
    this.#elementoTile.style.setProperty("--text-lightness", `${backgroundLightness < 50 ? 90 : 10}%`)
    }

set x(value) {
    this.#x = value
    this.#elementoTile.style.setProperty("--x", value)
    }

set y(value) {
    this.#y = value
    this.#elementoTile.style.setProperty("--y", value)
    }

 remove() {
    this.#elementoTile.remove()
    }

  waitForTransition(animation = false) {
    return new Promise(resolve => {
        this.#elementoTile.addEventListener(  animation ? "animationend" : "transitionend",  resolve, { once: true })
    })
    }
}
