# Percent-General-9B — Selected recorded decisions

[简体中文](DEMOS.zh-CN.md)

Five selected successes against Jev 1.13.0, plus a chess win against StartLux-Decision-v1-27B. These are exploratory success selections, not an overall win-rate estimate or evidence of general superiority. The models receive structured states and candidate actions; shopping and support are simulated workflows.

The browser replay is served by GitHub Pages from the docs directory. Repository HTML file views show source; use the repository's deployed Pages URL to open the interactive page. Pages must be enabled before sharing that URL.

| Case | Recorded result | GIF |
| --- | --- | --- |
| Chess | Black wins with 40...Rxd1#. | [Download](docs/media/chess.gif) |
| Tic-tac-toe | Percent plays second and completes the top row in six moves. | [Download](docs/media/tic-tac-toe.gif) |
| Connect Four | Percent plays first and connects four on move 19. | [Download](docs/media/connect-four.gif) |
| Othello | Percent plays White, finishing with 36 discs against 28 and three corners. | [Download](docs/media/othello.gif) |
| Simulated shopping | Percent completes the constrained three-pack order and verifies its CNY 29.90 receipt in ten actions; Jev does not finish within 24 actions. | [Download](docs/media/shopping-notebook.gif) |
| Simulated support | Percent applies the scenario's seven-day return policy, verifies the decision and closes the case in seven actions; Jev does not finish within 14. | [Download](docs/media/support-resolution.gif) |

## Preview cards

<table>
<tr><td width="50%"><a href="docs/media/chess.gif"><img src="docs/media/chess.png" alt="Chess recorded result"></a><br><b>Chess</b></td><td width="50%"><a href="docs/media/tic-tac-toe.gif"><img src="docs/media/tic-tac-toe.png" alt="Tic-tac-toe recorded result"></a><br><b>Tic-tac-toe</b></td></tr>
<tr><td width="50%"><a href="docs/media/connect-four.gif"><img src="docs/media/connect-four.png" alt="Connect Four recorded result"></a><br><b>Connect Four</b></td><td width="50%"><a href="docs/media/othello.gif"><img src="docs/media/othello.png" alt="Othello recorded result"></a><br><b>Othello</b></td></tr>
<tr><td width="50%"><a href="docs/media/shopping-notebook.gif"><img src="docs/media/shopping-notebook.png" alt="Simulated shopping recorded result"></a><br><b>Simulated shopping</b></td><td width="50%"><a href="docs/media/support-resolution.gif"><img src="docs/media/support-resolution.png" alt="Simulated support recorded result"></a><br><b>Simulated support</b></td></tr>
</table>

Source exploration outcomes: chess 1W/15L/36D; tic-tac-toe 1W/1L; Connect Four 1W/1L; Othello 1W/3L; shopping 2W/1T; support 1W/11T. Rule-only steps and the preset chess opening are marked separately. Candidate distributions are original outputs, not win probabilities. Checks were performed by this project; no external certification is claimed. Original API debug payloads and request identifiers are not included in the website.

Chess retains the original rich input protocol. Another game in the source run exposed an incorrect immediate-capture description, and upstream notation reduces mate # to check +. Both models share the input-construction rules and complete legal candidates. Legal move replay confirms this game's checkmate, not the accuracy of every input description. The corrected capture-description protocol has only CPU checks and has not been retested in GPU matches. This is a recorded example, not a standard chess-strength ranking.

[Results and record checks](docs/report.html) · [Third-party notices](THIRD_PARTY_NOTICES.md) · [Pages setup](GITHUB_PAGES_SETUP.md)
