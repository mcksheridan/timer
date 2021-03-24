const timerTemplate = `

  <link rel=stylesheet type=text/css href="timer.css">

    <section>

      <header>
        <h2><span class="timer-header_seconds"></span> Second Timer</h2>
      </header>

      <main>
        <svg class="timer-bar" width="90vw" height="2.5rem">
          <rect class="timer-bar_background" width="100%" height="40" />
          <rect class="timer-bar_progress" width="100%" height="40" />
          <text class="timer-bar_remaining-time" x="1%" y="60%">0</text>
        </svg>
      </main>

      <footer class="timer-button">
          <button type="button" class="timer-button_control">Loading...</button>
      </footer>

    </section>
`;

export default timerTemplate;
