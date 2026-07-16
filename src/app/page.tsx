import Link from 'next/link'

const Fragment = ({ children }: { children: React.ReactNode }) => (
  <aside className="computergrass-fragment">
    <span>From Computergrass, an original poem</span>
    <p>{children}</p>
  </aside>
)

export default function Home() {
  return (
    <div className="portfolio-home">
      <header className="portfolio-topbar">
        <p>Kasra C. Mikaili · industrial designer, poet, technologist</p>
        <nav aria-label="Portfolio projects">
          <a href="#percy">Percy</a>
          <a href="#zinemaker">ZineMaker</a>
          <a href="#telephone">Project Telephone</a>
          <a href="#akutan">Akutan</a>
          <a href="#lifeform">Lifeform</a>
        </nav>
      </header>
      <section className="portfolio-hero">
        <h1>I make new ways of living with computers.</h1>
        <div className="portfolio-hero-copy">
          <p>We used to live close to things.</p>
          <p>Now I tap this piece of glass and they promise that&apos;s enough.</p>
          <p className="portfolio-hero-question">How do we use emerging technology to make people feel more present in their own body?</p>
        </div>
        <a className="portfolio-down" href="#work">See the work ↓</a>
      </section>

      <Fragment>
        Whoever wishes to build a computer<br />
        should study this one that I once saw.
      </Fragment>

      <main id="work" className="portfolio-work">
        <section className="project project-percy" id="percy">
          <header className="project-heading">
            <div>
              <p className="project-number">01 · Life computing instrument</p>
              <h2>Percy</h2>
            </div>
            <div className="project-intro">
              <p className="project-lead">Percy is a screenless recording device.</p>
              <p>Most small recorders are designed around meetings and productivity. Percy begins with a different question: What else could a computer become?</p>
            </div>
          </header>

          <div className="percy-pair">
            <figure>
              <img src="/portfolio/percy-dog.jpg" alt="Percy wearing an existing small recorder on his collar" />
            </figure>
            <figure>
              <img src="/portfolio/percy-cat.jpg" alt="A cat wearing the same existing small recorder on its collar" />
            </figure>
          </div>
          <p className="project-caption">Early form-factor tests using an existing PLAUD NotePin. The final Percy hardware is in development.</p>

          <div className="percy-explanation">
            <p>Percy wakes when it is placed in an activator. An activator can live on a dog&apos;s collar, a guitar strap, a sketchbook, or anything connected to a grounded way of thinking.</p>
            <div className="working-proof">
              <span>A working recorder exists</span>
              <audio controls preload="metadata" src="/portfolio/percy-first-recording.wav">Your browser does not support audio.</audio>
            </div>
          </div>

          <Fragment>
            Percy responds, &quot;Computers can do so much more than work.<br />
            Computers are softer than rubber.&quot;
          </Fragment>
        </section>

        <section className="project project-zinemaker" id="zinemaker">
          <header className="project-heading">
            <div>
              <p className="project-number">02 · Codex plugin</p>
              <h2>ZineMaker</h2>
            </div>
            <div className="project-intro">
              <p className="project-lead">Print a zine by talking to your agent.</p>
              <p>A request becomes an eight-page zine, a browser edition, and one foldable sheet of paper. Print it, fold it, write on it, and hand it to someone.</p>
              <a className="project-link" href="codex://plugins/zinemaker">Open the Codex plugin ↗</a>
            </div>
          </header>
          <figure className="zine-proof">
            <img src="/portfolio/zinemaker-loops.png" alt="Loops While You Sleep zine, made with ZineMaker" />
            <figcaption>Loops While You Sleep, a real eight-page zine made through the plugin.</figcaption>
          </figure>
        </section>

        <Fragment>
          It had no keyboard,<br />
          or mouse or screen.<br />
          It grew in the grass.
        </Fragment>

        <section className="project project-telephone" id="telephone">
          <header className="project-heading">
            <div>
              <p className="project-number">03 · Installation</p>
              <h2>Project Telephone</h2>
            </div>
            <div className="project-intro">
              <p className="project-lead">An honest installation. A telephone booth on a college drillfield. Pick up a telephone &amp; leave a message.</p>
              <Link className="project-link" href="/design/project-telephone">Listen to the voices ↗</Link>
            </div>
          </header>
          <div className="telephone-question">
            <span>The question</span>
            <p>What do you need the most right now? Who do you wish to call?</p>
          </div>
        </section>

        <section className="project project-akutan" id="akutan">
          <header className="project-heading">
            <div>
              <p className="project-number">04 · Data sonification</p>
              <h2>Akutan</h2>
            </div>
            <div className="project-intro">
              <p className="project-lead">Twenty years of earthquake data from Akutan Volcano became a one-minute piece.</p>
              <p>Data sonification turns research data into sound. Here, time controls when a voice enters, magnitude controls loudness, and depth controls pitch.</p>
              <audio controls preload="metadata" src="/portfolio/akutan.wav">Your browser does not support audio.</audio>
            </div>
          </header>
        </section>

        <Fragment>
          Computers are breathing devices,<br />
          inhale and exhale.<br />
          The garden does not ask us to be useful.
        </Fragment>

        <section className="project project-lifeform" id="lifeform">
          <header className="project-heading">
            <div>
              <p className="project-number">05 · Industrial design</p>
              <h2>Lifeform</h2>
            </div>
            <div className="project-intro">
              <p className="project-lead">A maple tool for experiencing your life in the sand.</p>
              <Link className="project-link" href="/design/lifeform">See the complete project ↗</Link>
            </div>
          </header>
          <div className="lifeform-grid">
            <figure className="lifeform-object">
              <img src="/images/design/lifeform/cube-in-sand.jpg" alt="The Lifeform maple object and its engraved instructions in sand" />
            </figure>
            <figure className="lifeform-mark">
              <img src="/images/design/lifeform/process/67.jpg" alt="The carved bottom of the maple Lifeform object beside Kasra making it" />
              <figcaption>The carved bottom of the form presses memories into the sand.</figcaption>
            </figure>
            <blockquote>
              <p>Take off your shoes.</p>
              <p>Consider your life, everything that&apos;s progressed until now.</p>
              <p>Keep walking and pressing until the sand knows your story.</p>
              <p>Walk again, this time into your future.</p>
              <p>Once your life is complete, leave the sand behind.</p>
              <p>Watch as your life fades away.</p>
            </blockquote>
          </div>
        </section>
      </main>

      <section className="portfolio-thesis">
        <p>The cold of the stone. A neighbor&apos;s hug.</p>
        <p>The weight of something you made with your hands, the exhausted satisfaction after a long run, the borderline-celestial presence in your love&apos;s eyes.</p>
        <p>I think the body knows things the screen can&apos;t teach.</p>
        <p className="portfolio-thesis-close">I don&apos;t want technology that saps us out of our bodies. I want technology that makes us feel more slowly, deeply, richly human.</p>
      </section>

      <section className="computergrass-full" id="computergrass">
        <details>
          <summary>Read Computergrass</summary>
          <div className="poem">
            <header>
              <h2>Computergrass</h2>
              <p>by Kasra C. Mikaili</p>
              <blockquote>“Any sufficiently advanced technology is indistinguishable from nature”<cite>Percy Mikaili</cite></blockquote>
            </header>
            <section><b>I.</b><p>Whoever wishes to build a computer<br />should study this one that I once saw.</p><p>It was April.<br />We were in a garden,<br />and the computer lay open in the grass.<br />The mouth of the computer was<br />opened wide.</p></section>
            <section><b>II.</b><p>It had no keyboard,<br />or mouse or screen.<br />It grew in the grass,<br />filled with roses,<br />roses up and down.</p></section>
            <section><b>III.</b><p>Whoever wishes to build a computer<br />should study this one that I once saw.</p><p>The computer that grew in the grass.</p><p>&quot;O computer,<br />what can you do?&quot;</p><p>Percy, a young labradoodle,<br />responds, &quot;Computers<br />can do so much more<br />than work.</p><p>Much more than that<br />clock-stiffening rubber<br />of a dayjob.</p><p>Computers are<br />softer than rubber.&quot;</p></section>
            <section><b>IV.</b><p>Whoever wishes to build a computer,<br />must be happy and live well.</p><p>Computers are breathing devices,<br />inhale and exhale.<br />The garden does not ask us<br />to be useful.</p></section>
            <section><b>V.</b><p>The computer grew fur.</p><p>A fur-furred creature.<br />A beast who was my friend.<br />A lion, then a horse,<br />who offered a ride.</p><p>The computer of life<br />loved being alive.</p></section>
            <section><b>VI.</b><p>An egg cracks on my head,<br />then yours.</p><p>We watch the yolk</p><p className="poem-trickle">trick-<br />le<br /><br />down<br /><br />us,<br /><br />shivering<br /><br />smooth-<br />ly.</p><p>There were no words between me,<br />and you, but we cried in this<br />garden</p><p>as the yolk<br />trickled down.</p><p>We cried, and cried,<br />and cried over<br />electric grass.</p></section>
          </div>
        </details>
      </section>

      <footer className="portfolio-footer">
        <p>Have a project in mind?</p>
        <a className="portfolio-footer-cta" href="mailto:kasra@kasra.world">Let&apos;s make something</a>
      </footer>
    </div>
  )
}
