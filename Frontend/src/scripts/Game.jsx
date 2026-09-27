import bowImg from "./bowImg.png"
import mango from "./mango.png"
import "./style.css"
import destroyed from "../assets/destroyed.mp3"

export const Game = ({ setScore, setActive }) => {

    window.onload = () => {
        const div = document.createElement("div")
        div.style.position = "relative"
        div.style.width = "950px"
        div.style.height = window.innerHeight

        const can = document.createElement("canvas")
        const h1 = document.createElement("H1")
        h1.style.fontSize = "100px"
        h1.className = "bg"
        h1.innerText = "Game over"
        h1.style.position = "absolute"
        h1.style.top = 0
        h1.style.right = 0
        h1.style.bottom = 0
        h1.style.left = 0
        h1.style.display = "none"
        h1.style.textAlign = "center"
        const span = document.createElement("span")
        span.setAttribute("id", "score")
        span.style.position = "absolute"
        span.style.top = 0

        div.append(can, h1, span)
        window.document.body.append(div)
        const canvas = document.querySelector("canvas")
        canvas.style.margin = "auto"
        canvas.style.border = "1px dotted white"
        const c = canvas.getContext("2d")


        canvas.width = 950
        canvas.height = window.innerHeight
        const shipSpeed = 10
        const enemydownspeed = 30
        const enemyshootspeed = 5
        const enemydispersespeed = 6
        const shipturnangle = 0.30
        const shipshootradius = 4
        const starsCount = 100
        const stones = "yellow"
        const enemyshootcolor = "red"
        const shipshootcolor = "yellow"
        let scoreboard = 0

        const enemyshootdim = {
            width: 5,
            height: 20
        }
        const backgroundspeed = 1
        let score = document.querySelector("#score")
        // const img = new Image();
        // img.src = 'data:image/jpeg;base64,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';
        // img.onload = function () {
        //     const canvas = document.getElementById('myCanvas');
        //     const context = canvas.getContext('2d');
        //     context.drawImage(img, 0, 0, canvas.width, canvas.height);

        //     // Draw on top of the canvas here
        // }
        class Player {
            constructor() {

                this.velocity = {
                    x: 0,
                    y: 0
                }

                this.rotation = 0
                this.opacity = 1

                const image = new Image()

                image.src = bowImg
                image.onload = () => {
                    const scale = 0.15
                    this.image = image
                    this.width = image.width * scale
                    this.height = image.height * scale
                    this.position = {
                        x: canvas.width / 2 - this.width / 2,
                        y: canvas.height - this.height - 20
                    }


                }



            }

            draw() {
                c.save()
                c.globalAlpha = this.opacity

                c.translate(
                    player.position.x + player.width / 2,
                    player.position.y + player.height / 2
                )

                c.rotate(this.rotation)

                c.translate(
                    -player.position.x - player.width / 2,
                    -player.position.y - player.height / 2
                )

                c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)


                c.restore()


            }

            update() {
                if (this.image) {
                    this.draw()
                    this.position.x += this.velocity.x
                }

            }
        }


        class Projectile {
            constructor({ position, velocity }) {
                this.position = position
                this.velocity = velocity
                this.radius = shipshootradius
            }

            draw() {
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                c.fillStyle = shipshootcolor
                c.fill()
                c.closePath()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }


        class EnemyProjectile {
            constructor({ position, velocity }) {
                this.position = position
                this.velocity = velocity
                this.width = enemyshootdim.width
                this.height = enemyshootdim.height
            }

            draw() {
                c.fillStyle = enemyshootcolor
                c.fillRect(this.position.x, this.position.y, this.width, this.height)

            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
            }
        }




        class Enemy {
            constructor({ position }) {

                this.velocity = {
                    x: 0,
                    y: 0
                }

                const image = new Image()
                image.src = mango

                image.onload = () => {
                    const scale = 0.05
                    this.image = image
                    this.width = image.width * scale
                    this.height = image.height * scale
                    this.position = {
                        x: position.x,
                        y: position.y
                    }


                }



            }

            draw() {



                c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)


            }

            update({ velocity }) {
                if (this.image) {
                    this.draw()
                    this.position.x += velocity.x
                    this.position.y += velocity.y
                }

            }

            shoot(enemyProjectiles) {
                if (this.image) {
                    enemyProjectiles.push(new EnemyProjectile({
                        position: {
                            x: this.position.x + this.width / 2,
                            y: this.position.y + this.height
                        },

                        velocity: {
                            x: 0,
                            y: enemyshootspeed
                        }
                    }))
                }

            }
        }


        class Grid {
            constructor() {
                this.position = {
                    x: 0,
                    y: 0
                }


                this.velocity = {
                    x: enemydispersespeed,
                    y: 0
                }

                this.enemys = []

                const rows = Math.floor(Math.random() * 5 + 2)
                const cols = Math.floor(Math.random() * 10 + 5)
                this.width = cols * 3
                for (let x = 0; x < cols; x++) {
                    for (let y = 0; y < rows; y++) {

                        this.enemys.push(new Enemy({
                            position: {

                                x: x * 30,
                                y: y * 30

                            }
                        }))
                    }
                }
            }

            update() {

                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
                this.velocity.y = 0
                if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
                    this.velocity.x = -this.velocity.x
                    this.velocity.y = enemydownspeed

                }
            }
        }



        class Particle {
            constructor({ position, velocity, radius, color, fades }) {
                this.position = position
                this.velocity = velocity
                this.radius = radius
                this.color = color
                this.opacity = 1
                this.fades = fades
            }

            draw() {
                c.save()
                c.globalAlpha = this.opacity
                c.beginPath()
                c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
                c.fillStyle = this.color
                c.fill()
                c.closePath()
                c.restore()
            }

            update() {
                this.draw()
                this.position.x += this.velocity.x
                this.position.y += this.velocity.y
                if (this.fades) this.opacity -= 0.01

            }
        }




        const player = new Player()
        const projectiles = []
        const grids = [new Grid()]
        const enemyProjectiles = []
        const particles = []

        let keys = {
            leftkey: {
                pressed: false
            },
            rightkey: {
                pressed: false
            },
            spacekey: {
                pressed: false
            }
        }

        let frames = 0
        let randomInterval = Math.floor(Math.random() * 500 + 500)
        let game = {
            over: false,
            active: true
        }


        function createBackground() {
            const gradient = c.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(0.5, 'rgb(33, 181, 239)')
            gradient.addColorStop(1, 'rgb(34, 139, 34)')
          
            c.fillStyle = gradient
            c.fillRect(0, 0, canvas.width, canvas.height)
          
            const bgImage = new Image()
            bgImage.src = "mango.png"
            bgImage.onload = function() {
              c.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
            }
          }
        
        

        function animate() {
            if (!game.active) return
            requestAnimationFrame(animate)

            // createBackground()

            
            const gradient = c.createLinearGradient(0, 0, 0, canvas.height)
            gradient.addColorStop(1, 'white')
            gradient.addColorStop(0.7, 'rgb(33, 181, 239)')
            gradient.addColorStop(1, "green")
          
            
            c.fillStyle = gradient
            


            c.fillRect(0, 0, canvas.width, canvas.height)

            player.update()




            particles.forEach((particle, index) => {

                if (particle.position.y - particle.radius >= canvas.height) {
                    particle.position.x = Math.random() * canvas.width
                    particle.position.y = -particle.radius
                }

                if (particle.opacity <= 0) {
                    particles.slice(1, index)
                    return
                }

                particle.update()
            })

            enemyProjectiles.forEach((enemyProjectile, index) => {
                if (enemyProjectile.position.y + enemyProjectile.height >= canvas.height) {

                    setTimeout(() => {

                        enemyProjectiles.splice(index, 1)

                    }, 0)

                } else {
                    enemyProjectile.update()

                }


                if (enemyProjectile.position.y + enemyProjectile.height >= player.position.y && enemyProjectile.position.x + enemyProjectile.width >= player.position.x && enemyProjectile.position.x <= player.position.x + player.width) {
                    console.log("you lose")
                    createParticles(player, "white", true)

                    setTimeout(() => {

                        enemyProjectiles.splice(index, 1)
                        player.opacity = 0
                        game.over = true
                        let audio = new Audio()
                        audio.src = destroyed
                        audio.play()
                        setActive(false)


                    }, 0)
                    setTimeout(() => {

                        game.active = false
                        document.querySelector("h1").style.display = "block"

                    }, 2000)

                }

            })

            projectiles.forEach((projectile, i) => {
                if (projectile.position.y + projectile.radius <= 0) {
                    setTimeout(() => {
                        projectiles.splice(i, 1)

                    }, 0)
                } else {
                    projectile.update()

                }

            })

            grids.forEach((grid, gridIndex) => {
                grid.update()

                if (frames % 100 == 0 && grid.enemys.length > 0) {
                    grid.enemys[Math.floor(Math.random() * grid.enemys.length)].shoot(enemyProjectiles)
                }



                grid.enemys.forEach((enemy, i) => {
                    enemy.update({ velocity: grid.velocity })

                    projectiles.forEach((projectile, j) => {
                        if (projectile.position.y - projectile.radius <= enemy.position.y + enemy.height && projectile.position.x + projectile.radius >= enemy.position.x && projectile.position.x - projectile.radius <= enemy.position.x + enemy.width && projectile.position.y + projectile.radius >= enemy.position.y) {



                            setTimeout(() => {
                                const enemyFound = grid.enemys.find(enemy2 => {
                                    return enemy2 == enemy
                                })
                                const projectileFound = projectiles.find(projectile2 =>
                                    projectile2 == projectile
                                )
                                if (enemyFound && projectileFound) {
                                    createParticles(enemy, "red", true)

                                    scoreboard += +100
                                    setScore(scoreboard)
                                    console.log(scoreboard)
                                    grid.enemys.splice(i, 1)
                                    projectiles.splice(j, 1)

                                    // score.innerHTML="Score: "+scoreboard

                                    //increase score add sound

                                    if (grid.enemys.length > 0) {
                                        const firstEnemy = grid.enemys[0]
                                        const lastEnemy = grid.enemys[grid.enemys.length - 1]

                                        grid.width = lastEnemy.position.x - firstEnemy.position.x + lastEnemy.width
                                        grid.position.x = firstEnemy.position.x
                                    } else {
                                        grids.splice(gridIndex, 1)
                                    }


                                }




                            }, 0)
                        }

                    })

                })
            })

            if (keys.leftkey.pressed && player.position.x >= 0) {
                player.velocity.x = -shipSpeed
                player.rotation = -shipturnangle
            } else if (keys.rightkey.pressed && player.position.x + player.width <= canvas.width) {
                player.velocity.x = shipSpeed
                player.rotation = shipturnangle

            } else {
                player.velocity.x = 0
                player.rotation = 0
            }

            if (frames % randomInterval == 0) {
                grids.push(new Grid())
                randomInterval = Math.floor(Math.random() * 500 + 500)
                frames = 0
            }



            frames++

        }
        animate()



        for (let i = 0; i < starsCount; i++) {
            particles.push(new Particle({
                position: {
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height
                },
                velocity: {
                    x: 0,
                    y: backgroundspeed
                },
                radius: Math.random() * 3,
                color: stones
            }))
        }



        function createParticles(object, color, fades) {
            console.log(object)
            for (let i = 0; i < 15; i++) {
                particles.push(new Particle({
                    position: {
                        x: object.position.x + object.width / 2,
                        y: object.position.y + object.height / 2
                    },
                    velocity: {
                        x: (Math.random() - 0.5) * 2,
                        y: (Math.random() - 0.5) * 2
                    },
                    radius: Math.random() * 3,
                    color: color || "yellow",
                    fades: fades
                }))
            }
        }



        const controls = {
            UP: "ArrowUp",
            DOWN: "ArrowDown",
            LEFT: "ArrowLeft",
            RIGHT: "ArrowRight",
            SPACE: " "
        }



        window.addEventListener("keydown", ({ key }) => {
            if (game.over) return
            let { UP, DOWN, LEFT, RIGHT, SPACE } = controls

            switch (key) {


                case LEFT: {
                    keys.leftkey.pressed = true
                    // console.log("Arrow left")
                    return
                }
                case RIGHT: {
                    keys.rightkey.pressed = true
                    // console.log("Arrow right")
                    return
                }
                case SPACE: {
                    keys.spacekey.pressed = true
                    projectiles.push(new Projectile({
                        position: {
                            x: player.position.x + player.width / 2,
                            y: player.position.y
                        },
                        velocity: {
                            x: 0,
                            y: -10
                        }
                    }))
                    return
                }
                default: {

                    return
                }

            }

        })

        window.addEventListener("keyup", ({ key }) => {
            let { UP, DOWN, LEFT, RIGHT, SPACE } = controls

            switch (key) {


                case LEFT: {
                    keys.leftkey.pressed = false
                    return
                }
                case RIGHT: {
                    keys.rightkey.pressed = false
                    return
                }
                case SPACE: {
                    return
                }
                default: {
                    return
                }

            }

        })


    }

}