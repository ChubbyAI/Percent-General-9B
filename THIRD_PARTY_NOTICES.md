# Third-party notices

## Chess piece artwork

The chess SVG piece designs are by **Colin M. L. Burnett (Cburnett)**.
They are supplied as SVG artwork through python-chess's rendering output.
For this package the artwork is used under the author's **BSD 3-Clause**
licensing option. The full copyright notice, conditions and disclaimer are
included in docs/licenses/Cburnett-BSD-3-Clause.txt.

- Author's original file and license choices: https://commons.wikimedia.org/wiki/File:Chess_klt45.svg
- python-chess's SVG artwork attribution: https://python-chess.readthedocs.io/en/latest/svg.html
- python-chess source: https://github.com/niklasf/python-chess

The SVG paths remain unchanged from the existing rendered assets; SVG
wrapping, serialization, display size and placement belong to the demo.
The editable SVG markup is included in docs/data/chess-pieces.json.
The attribution does not imply author or opponent endorsement.

## Offline rendering and rule checks

python-chess and OpenSpiel were used by the offline record-checking tools.
Their Python/native library code and model-serving code are not distributed
in this website overlay. The published website contains the display code,
selected playback states, original candidate distributions and rendered media.

DejaVu Sans was used when rasterizing GIF labels. Font binaries are not
included in this overlay.

This notice applies to the third-party artwork and tooling attribution.
It does not assign a new blanket license to the owner's existing repository,
model weights, training data or other documents.
