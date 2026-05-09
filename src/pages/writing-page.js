import { LitElement, html } from 'lit';
import { pageFooter } from '../components/layout/page-footer.js';

const ENTRIES = [
  {
    date: 'Aug 2016 - age 12',
    paragraphs: [
      `Today I finally got my brothers old dell laptop!! It is super heavy and the fan is really loud like a jet engine. Mostly just watched youtube but then I saw this video on how to make a calculator in c++. The guy typed so fast in a black box and it looked like a total movie hacker.`,
      `Downloaded code::blocks and it took forever. I typed int main() exactly like him but I got a huge RED ERROR. I totally freaked out and deleted everything. Tried again but same error. I don't get it at all. My head hurts so I'm going to sleep.`,
    ],
  },
  {
    date: 'Nov 2016 - age 12',
    paragraphs: [
      `Still stuck on the calculator. I have to pause the video every two seconds to type then rewind when I get an error. Errors are so stupid and mean. It says "expected ; before }" but I don't know what that even means? Everything looks exactly the same to me.`,
      `I literally spent 4 hours looking for one tiny semicolon today. It was just on the wrong line. I felt like a secret detective when I finally found it!`,
      `IT WORKS!! You type 2 and 2 and it actually says 4. I showed my brother and he just said "nice." I wanted him to be way more excited but whatever... I made a real life program.`,
    ],
  },
  {
    date: 'Mar 2017 - age 13',
    paragraphs: [
      `Making a text adventure game now about goblins. I'm using if statements which I thought I was good at, but everything is breaking.`,
      `I put too many "ifs" inside of other "ifs" and now I'm lost in all the curly brackets. The goblin always wins because I forgot to subtract my health in the code. Every time I try to fix one thing, ten other things break.`,
      `I give up for today. The code is just a big mess. The internet says this is called "spaghetti code" which is a funny name but it's actually really annoying.`,
    ],
  },
  {
    date: '2018 - age 14',
    paragraphs: [
      `Today was chill. But I noticed that I haven't coded in a while. School is annoying and I'd rather just hang out with friends.`,
      `I open code::blocks sometimes at night and type a few lines but then I just get bored and close it. Nothing ever gets finished lately.`,
      `Maybe I'm just over it. I think I need a break from the screen.`,
    ],
  },
  {
    date: 'Jan 2019 - age 15',
    paragraphs: [
      `Found something called Unity. I opened it and there was a 3D cube with real shadows and light. It's an actual game engine, not just a black text box. This is way cooler.`,
      `Made a sphere roll off a platform. It took me 4 days to figure out the "Rigidbody" component, but when it finally fell off the edge, I actually yelled out loud. I don't even care if it's basic, it felt real.`,
    ],
  },
  {
    date: 'Summer 2019 - age 15',
    paragraphs: [
      `Spent my entire summer in Unity. I built a walking simulator with a door that opens and a scary hallway that loops forever.`,
      `C# is so much better than C++. I'm still breaking tutorial code constantly, but I'm actually starting to understand the logic now instead of just blindly copying what the guy on screen does.`,
      `Walking around in a 3D world that I built myself is honestly the best feeling in the world.`,
    ],
  },
  {
    date: 'Apr 2020 - age 16',
    paragraphs: [
      `Lockdown started, stupid virus. No school, no hanging out, just me and my laptop. It’s actually kind of perfect for finishing things.`,
      `Finished three projects this month: a maze, a platformer, and a field with procedural grass. The grass one is my favorite because of how the wind looks.`,
      `Saw a video on web development today. The guy just typed some HTML, dragged the file into Chrome, and it worked instantly. No compiling, no waiting. That workflow is so fast it's addictive.`,
    ],
  },
  {
    date: 'Feb 2021 - age 17',
    paragraphs: [
      `Made mysite.html. It just says "hello" in big letters. It looks like a website from 1997, but it's mine.`,
      `Learning CSS and Flexbox now. Web dev is so instant—change a hex code, refresh, and the whole vibe shifts. I like this feedback loop way more than waiting for C++ to build.`,
      `Built three different sites this week. They all look pretty bad, but I finally understand how the DOM works. I’m obsessed with the speed of it.`,
    ],
  },
  {
    date: 'Oct 2022 - age 18',
    paragraphs: [
      `Discovered Three.js. I saw this liquid-style sphere in a browser tab and couldn't believe it was just code. Checked the source—it’s Javascript.`,
      `Made a rotating cube, then went down the rabbit hole of GLSL shaders. They run directly on the GPU, calculating color with math for every single pixel. It’s just pure math and light. It's beautiful.`,
      `Staying up until 4am coding is becoming a habit. I have two notebooks now: one for shader math and one for general ideas. The ideas notebook is filling up way faster than I can build them.`,
    ],
  },
  {
    date: 'Mar 2023 - age 19',
    paragraphs: [
      `Applied to HBO ICT in Utrecht. I had to put together a portfolio, and it was weird seeing everything—the old Unity games, the web projects—all sitting in one folder.`,
      `Got the acceptance email today. I had to check the sender address twice to make sure it wasn't a mistake. It’s actually happening.`,
    ],
  },
  {
    date: 'Sep 1, 2023 - age 19',
    paragraphs: [
      `First day.`,
      `Took the train in. Utrecht Centraal is massive and loud, a total maze. I got a little lost looking for the campus but eventually found my way.`,
      `There are 70 students in my cohort. The professors laid out the next four years: modules, group projects, and the final thesis. I kept thinking about that dusty Dell laptop and the C++ terminal back in 2016.`,
      `I know exactly how to execute this.`,
    ],
  },
  {
    date: '2025 - age 21',
    paragraphs: [
      `Year two has been significantly more demanding. We've moved into networks, databases, and low-level algorithms. I've found that the design modules are where I thrive—merging visual output with structured backend logic.`,
      `I built this portfolio using Three.js and custom GLSL shaders. I chose this stack because it’s computationally efficient and accurately represents my technical specialization in creative development.`,
      `I’m still keeping the notebooks. The ideas still outpace the implementation, but the gap is closing as my architectural knowledge improves.`,
    ],
  },
];

class WritingPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main class="m-wrapper">
        <article class="c-page">
          <header class="c-page__header">
            <h1 class="c-page__subtitle">writing</h1>
            <span class="c-page__title" aria-hidden="true">writing</span>
          </header>

          <div class="c-page__cnt">
            <h2 class="c-page__heading">my story</h2>

            ${ENTRIES.map((entry) => html`
              <h3 class="c-page__heading">${entry.date}</h3>
              <div class="c-page__cnt__wrapper c-journal">
                ${entry.paragraphs.map((paragraph) => html`<p>${paragraph}</p>`)}
              </div>
            `)}
          </div>
        </article>

        ${pageFooter()}
      </main>
    `;
  }
}

customElements.define('osami-writing', WritingPage);