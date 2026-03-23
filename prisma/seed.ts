import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Categorías
  const ciencia = await prisma.category.upsert({
    where: { name: 'Ciencia' },
    update: {},
    create: { name: 'Ciencia', description: 'Datos científicos y naturaleza' },
  })

  const tecnologia = await prisma.category.upsert({
    where: { name: 'Tecnología' },
    update: {},
    create: { name: 'Tecnología', description: 'Inventos y avances tecnológicos' },
  })

  const historia = await prisma.category.upsert({
    where: { name: 'Historia' },
    update: {},
    create: { name: 'Historia', description: 'Eventos históricos del mundo' },
  })

  const entretenimiento = await prisma.category.upsert({
    where: { name: 'Entretenimiento' },
    update: {},
    create: { name: 'Entretenimiento', description: 'Cine, música y cultura pop' },
  })

  console.log('Categorías listas')

  const questions = [
    // ── CIENCIA (13 preguntas) ──────────────────────────────────────────
    {
      category_id: ciencia.id,
      statement: 'Las hormigas no duermen en el sentido tradicional, sino que toman miles de micro-siestas.',
      explanation: 'Las hormigas distribuyen su descanso en pausas muy cortas a lo largo del día.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'El corazón de un pulpo late tres veces más rápido cuando está dormido que cuando está despierto.',
      explanation: 'Los pulpos tienen tres corazones, pero no laten más rápido al dormir. Es inventado.',
      correct: 'Inventado',
    },
    {
      category_id: ciencia.id,
      statement: 'Los flamencos son rosados porque comen camarones y algas que contienen pigmentos carotenoides.',
      explanation: 'Sin esos pigmentos en su dieta, los flamencos serían blancos.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Existen más de 500 especies de pingüinos distribuidas por todo el hemisferio sur.',
      explanation: 'Solo existen entre 17 y 19 especies de pingüinos, no 500.',
      correct: 'Inventado',
    },
    {
      category_id: ciencia.id,
      statement: 'El ser humano tiene más bacterias en el cuerpo que células propias.',
      explanation: 'Se estima que hay aproximadamente la misma cantidad o más bacterias que células humanas en nuestro cuerpo.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Los pulpos tienen sangre azul porque contiene hierro, igual que la sangre humana.',
      explanation: 'La sangre de los pulpos es azul por la hemocianina, que contiene cobre, no hierro.',
      correct: 'Inventado',
    },
    {
      category_id: ciencia.id,
      statement: 'El agua caliente puede congelarse más rápido que el agua fría en ciertas condiciones.',
      explanation: 'Este fenómeno se llama efecto Mpemba y ha sido documentado científicamente, aunque su causa exacta aún se debate.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Los diamantes son la sustancia más dura de la naturaleza y no pueden ser destruidos por ningún medio.',
      explanation: 'Los diamantes son muy duros pero pueden romperse con un golpe fuerte o quemarse a altas temperaturas.',
      correct: 'Inventado',
    },
    {
      category_id: ciencia.id,
      statement: 'Una cucharada de materia de estrella de neutrones pesaría más que todos los edificios de una ciudad.',
      explanation: 'La densidad de una estrella de neutrones es tan extrema que una cucharadita equivaldría a mil millones de toneladas.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Los tiburones son los únicos animales que no pueden contraer ningún tipo de cáncer.',
      explanation: 'Los tiburones sí pueden desarrollar cáncer. Es un mito popular sin base científica.',
      correct: 'Inventado',
    },
    {
      category_id: ciencia.id,
      statement: 'El sonido viaja más rápido en el agua que en el aire.',
      explanation: 'En el agua el sonido viaja a unos 1500 m/s, mientras que en el aire lo hace a unos 343 m/s.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Los árboles se comunican entre sí a través de una red de hongos subterráneos llamada la "red de madera".',
      explanation: 'Los árboles intercambian nutrientes y señales químicas mediante redes miceliales subterráneas.',
      correct: 'Real',
    },
    {
      category_id: ciencia.id,
      statement: 'Los rayos nunca caen dos veces en el mismo lugar.',
      explanation: 'Los rayos pueden y suelen caer varias veces en el mismo lugar. El Empire State recibe más de 20 rayos al año.',
      correct: 'Inventado',
    },

    // ── TECNOLOGÍA (13 preguntas) ───────────────────────────────────────
    {
      category_id: tecnologia.id,
      statement: 'El primer correo electrónico se envió antes de que existiera la World Wide Web.',
      explanation: 'El email fue inventado en 1971 por Ray Tomlinson. La web surgió en 1991.',
      correct: 'Real',
    },
    {
      category_id: tecnologia.id,
      statement: 'El primer videojuego comercial de la historia fue Super Mario Bros en 1985.',
      explanation: 'El primer videojuego comercial fue Pong de Atari en 1972. Mario llegó después.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El término "bug" en programación proviene de un insecto real que causó un fallo en una computadora en 1947.',
      explanation: 'Grace Hopper encontró una polilla atascada en el Harvard Mark II, documentándolo como el primer "bug" real.',
      correct: 'Real',
    },
    {
      category_id: tecnologia.id,
      statement: 'Apple fue fundada en una oficina de Silicon Valley por Steve Jobs y Bill Gates.',
      explanation: 'Apple fue fundada por Steve Jobs, Steve Wozniak y Ronald Wayne. Bill Gates fundó Microsoft.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El GPS fue desarrollado originalmente por el ejército de los Estados Unidos.',
      explanation: 'El sistema GPS fue creado por el Departamento de Defensa de EE.UU. y abierto al público en los años 80.',
      correct: 'Real',
    },
    {
      category_id: tecnologia.id,
      statement: 'El primer teléfono móvil comercial pesaba menos de 200 gramos.',
      explanation: 'El Motorola DynaTAC 8000X de 1983 pesaba casi un kilogramo. Era enorme comparado con los actuales.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El nombre del lenguaje de programación Python viene de la serpiente pitón.',
      explanation: 'Guido van Rossum lo nombró por el programa de comedia británico "Monty Python\'s Flying Circus".',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'Internet y la World Wide Web son exactamente lo mismo.',
      explanation: 'Internet es la infraestructura de red global. La Web es solo uno de los servicios que corre sobre internet.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El primer disco duro comercial de IBM en 1956 tenía capacidad de almacenamiento de 5 megabytes.',
      explanation: 'El IBM 350 tenía 5 MB de capacidad y pesaba más de una tonelada.',
      correct: 'Real',
    },
    {
      category_id: tecnologia.id,
      statement: 'La pantalla táctil fue inventada después del primer iPhone de Apple en 2007.',
      explanation: 'Las pantallas táctiles existen desde los años 70. Apple las popularizó pero no las inventó.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El lenguaje de programación más antiguo que aún se usa en producción es COBOL, creado en 1959.',
      explanation: 'COBOL fue creado en 1959 y todavía procesa billones de transacciones bancarias al día.',
      correct: 'Real',
    },
    {
      category_id: tecnologia.id,
      statement: 'Wi-Fi es un acrónimo que significa "Wireless Fidelity".',
      explanation: 'Wi-Fi no significa nada oficialmente. Fue creado por una empresa de marketing y nunca tuvo un significado real.',
      correct: 'Inventado',
    },
    {
      category_id: tecnologia.id,
      statement: 'El número de transistores en un chip se duplica aproximadamente cada dos años según la Ley de Moore.',
      explanation: 'Gordon Moore predijo en 1965 que los transistores se duplicarían cada dos años, tendencia que se mantuvo décadas.',
      correct: 'Real',
    },

    // ── HISTORIA (12 preguntas) ─────────────────────────────────────────
    {
      category_id: historia.id,
      statement: 'Napoleón Bonaparte medía aproximadamente 1.68 metros, una altura normal para su época.',
      explanation: 'La idea de que Napoleón era muy bajo es un mito. Medía 1.68 m, promedio para la época.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'Napoleón fue coronado emperador dentro de una pirámide egipcia.',
      explanation: 'Napoleón fue coronado en la Catedral de Notre Dame de París en 1804, no en Egipto.',
      correct: 'Inventado',
    },
    {
      category_id: historia.id,
      statement: 'La Gran Muralla China es visible a simple vista desde el espacio.',
      explanation: 'Este es un mito popular. La muralla es demasiado delgada para verse a simple vista desde el espacio.',
      correct: 'Inventado',
    },
    {
      category_id: historia.id,
      statement: 'Cleopatra vivió más cerca en el tiempo de la llegada del hombre a la Luna que de la construcción de las pirámides de Giza.',
      explanation: 'Las pirámides se construyeron hace ~4500 años. Cleopatra vivió hace ~2000 años. La Luna fue en 1969, hace ~55 años.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'Los vikingos usaban cuernos en sus cascos de batalla.',
      explanation: 'Los cascos con cuernos son un mito romántico del siglo XIX. Los vikingos usaban cascos simples y funcionales.',
      correct: 'Inventado',
    },
    {
      category_id: historia.id,
      statement: 'El Imperio Romano nunca conquistó Escocia.',
      explanation: 'Roma llegó hasta el norte de Britania pero nunca logró conquistar lo que hoy es Escocia. Construyeron el Muro de Adriano como frontera.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'Albert Einstein reprobó matemáticas en la escuela.',
      explanation: 'Einstein era excelente en matemáticas desde niño. Este mito es completamente falso.',
      correct: 'Inventado',
    },
    {
      category_id: historia.id,
      statement: 'La Primera Guerra Mundial fue desencadenada en parte por el asesinato del Archiduque Francisco Fernando de Austria.',
      explanation: 'El asesinato de Francisco Fernando en Sarajevo en 1914 fue el detonante inmediato de la Primera Guerra Mundial.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'El Muro de Berlín cayó en 1989 después de que un funcionario anunciara accidentalmente su apertura inmediata.',
      explanation: 'Günter Schabowski anunció por error en una conferencia de prensa que los pasos fronterizos abrirían de inmediato.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'Las momias egipcias fueron envueltas en vendas de seda importada de China.',
      explanation: 'Las vendas de las momias eran de lino, no de seda. El comercio con China no era tan directo en esa época.',
      correct: 'Inventado',
    },
    {
      category_id: historia.id,
      statement: 'La Estatua de la Libertad fue un regalo de Francia a los Estados Unidos.',
      explanation: 'Francia regaló la estatua a EE.UU. en 1886 como símbolo de amistad y los ideales compartidos de libertad.',
      correct: 'Real',
    },
    {
      category_id: historia.id,
      statement: 'Julio César nació por cesárea, de ahí el nombre de la operación.',
      explanation: 'La etimología de "cesárea" probablemente viene del latín "caedere" (cortar), no del nombre de Julio César.',
      correct: 'Inventado',
    },

    // ── ENTRETENIMIENTO (12 preguntas) ──────────────────────────────────
    {
      category_id: entretenimiento.id,
      statement: 'El actor que interpretó a Darth Vader en Star Wars no fue la misma persona que puso la voz al personaje.',
      explanation: 'David Prowse interpretó físicamente a Vader, pero la voz icónica fue de James Earl Jones.',
      correct: 'Real',
    },
    {
      category_id: entretenimiento.id,
      statement: 'La película Titanic de James Cameron ganó 14 premios Oscar, más que cualquier otra película en la historia.',
      explanation: 'Titanic ganó 11 Oscar en 1998, no 14. Comparte ese récord con Ben-Hur y El Señor de los Anillos.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'El personaje de Sherlock Holmes nunca dijo la frase "Elemental, mi querido Watson" en los libros originales.',
      explanation: 'Esa frase exacta no aparece en ninguna de las novelas de Arthur Conan Doyle. Es una creación popular.',
      correct: 'Real',
    },
    {
      category_id: entretenimiento.id,
      statement: 'Michael Jackson inventó el moonwalk para la presentación de "Billie Jean" en 1983.',
      explanation: 'El moonwalk existía antes. Jackson lo popularizó pero no lo inventó. Fue influenciado por bailarines anteriores.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'El personaje de James Bond fue creado por el escritor Ian Fleming, quien fue espía en la vida real.',
      explanation: 'Ian Fleming trabajó para la inteligencia naval británica durante la Segunda Guerra Mundial.',
      correct: 'Real',
    },
    {
      category_id: entretenimiento.id,
      statement: 'El famoso cuadro "La Mona Lisa" de Leonardo da Vinci fue pintado en menos de un mes.',
      explanation: 'Se estima que Da Vinci trabajó en La Mona Lisa durante varios años, posiblemente entre 1503 y 1519.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'La serie Los Simpsons ha predicho correctamente varios eventos del mundo real con años de anticipación.',
      explanation: 'La serie ha tenido coincidencias notables con eventos reales, como tecnología, política y deportes.',
      correct: 'Real',
    },
    {
      category_id: entretenimiento.id,
      statement: 'El actor que interpreta a Wolverine en las películas de X-Men es de nacionalidad estadounidense.',
      explanation: 'Hugh Jackman, quien interpreta a Wolverine, es australiano, no estadounidense.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'La canción "Happy Birthday to You" estuvo protegida por derechos de autor hasta 2016.',
      explanation: 'Warner Music reclamaba los derechos hasta que un juez los declaró inválidos en 2015-2016.',
      correct: 'Real',
    },
    {
      category_id: entretenimiento.id,
      statement: 'La película "Avatar" de James Cameron fue la primera en usar efectos visuales generados por computadora.',
      explanation: 'Los efectos CGI se usaron desde los años 70 y 80. Tron (1982) y The Abyss (1989) son ejemplos anteriores.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'El famoso mago Harry Houdini murió durante uno de sus actos de escape.',
      explanation: 'Houdini murió de peritonitis causada por una apendicitis agravada por golpes en el abdomen, no en un escape.',
      correct: 'Inventado',
    },
    {
      category_id: entretenimiento.id,
      statement: 'Stan Lee, creador de muchos personajes de Marvel, hizo cameos en casi todas las películas del Universo Marvel.',
      explanation: 'Stan Lee apareció en prácticamente todas las películas del MCU hasta su muerte en 2018.',
      correct: 'Real',
    },
  ]

  // Borrar preguntas anteriores para evitar duplicados
  await prisma.userAnswer.deleteMany({})
  await prisma.quizAttempt.deleteMany({})
  await prisma.answer.deleteMany({})
  await prisma.question.deleteMany({})

  console.log('Preguntas anteriores eliminadas')

  for (const q of questions) {
    await prisma.question.create({
      data: {
        category_id: q.category_id,
        statement: q.statement,
        explanation: q.explanation,
        is_active: true,
        answers: {
          create: [
            { answer_text: 'Real', is_correct: q.correct === 'Real' },
            { answer_text: 'Inventado', is_correct: q.correct === 'Inventado' },
          ],
        },
      },
    })
  }

  console.log(`${questions.length} preguntas creadas exitosamente`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })