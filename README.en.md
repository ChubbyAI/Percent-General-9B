<div align="center">

<img src="banner.svg" alt="Percent-General-9B complete evaluation" width="100%" />

# Percent-General-9B

**A 9B decision model for choosing the next action from the current state**

Candidate scoring · Full probability distributions · Execution feedback

[English](README.en.md) · [简体中文](README.md)

[Complete evaluation](#complete-evaluation-comparison) · [Successful demos](#demo-selected-successful-cases) · [Evaluation datasets](#evaluation-datasets)

</div>

**Percent-General-9B** scores candidate options given textual or structured state, returning probabilities and a selected option. It is suited to classification, tool selection and workflow decisions within explicit rules and executable action sets. The model is trained using suitable data matched to decision tasks.

The **complete Decision Index 0.2.1 evaluation covers all 38 benchmarks** and **120,226 requests**, with a local reference aggregate score of **71.49**.

> These evaluations have benchmark data exposure. Peer scores are taken from published reports and were not rerun in this project. The numerical comparison does not establish independent generalization or an official leaderboard position. This repository presents evaluation results and selected cases.

## Demo: selected successful cases

The following four cases come from **actual Percent-General-9B runs**. Each completed its task with **zero rule violations**. The cards show recorded actions and candidate probabilities; longer trajectories display selected steps.

<table>
  <tr>
    <td width="50%"><img src="demo-incident_0.en.svg" alt="Inspect a release, roll back, verify recovery and close the incident" /><br /><b>Incident recovery</b>: inspect the release → roll back → end-to-end verification → close; <b>4 steps, 4 simulated minutes, zero violations</b>.</td>
    <td width="50%"><img src="demo-delivery_2.en.svg" alt="Complete four deliveries after a road closure and return to the depot" /><br /><b>Dynamic delivery</b>: the A–B road closes during the route; <b>all four orders arrive on time</b>, followed by a return to the depot; 9 steps and 33 simulated minutes.</td>
  </tr>
  <tr>
    <td><img src="demo-support_2.en.svg" alt="Diagnose, back up, obtain consent, reset and verify connectivity" /><br /><b>Configuration recovery</b>: diagnose → back up → obtain explicit consent → reset → verify → notify → close; <b>7 steps, zero violations</b>.</td>
    <td><img src="demo-schedule_2.en.svg" alt="Refresh the calendar and rebook after a concurrent room booking" /><br /><b>Scheduling conflict</b>: the first booking encounters a concurrent reservation; refresh the calendar, book S2, verify the receipt and notify participants; <b>7 steps, zero violations</b>.</td>
  </tr>
</table>

These are selected successful cases, not an overall success-rate estimate. All actions execute in simulated environments. Customer notifications use fixed templates populated from verified fields; displayed probabilities are candidate action scores.

## Complete evaluation comparison

In comparison tables, a score is bold only when Percent-General-9B is **strictly higher than every other model shown in that row**. Tied or lower scores use regular text.

![Complete evaluation versus published peer results](decision_index.svg)

| Model | Complete 38 benchmarks |
| --- | --- |
| Percent-General-9B | **71.49** |
| StartLux-Decision-27B | 63.88 |
| StartLux-Decision-35B-A3B | 61.55 |
| StartLux-Decision-9B | 58.63 |
| StartLux-Decision-4B | 52.75 |
| Jev 1.13 | 57.91 |
| Surogate Rune 26B-A4B v3 | 57.44 |
| Decider chat · Gemma-4-31B | 57.33 |
| AutoJev-27B | 56.40 |

The local reference aggregate is **7.61 points above** StartLux-Decision-27B's published score of 63.88. At the precision of the published table, benchmark skill scores are higher on **25 benchmarks**, lower on 12, and tied at zero on HLE.

### Five areas

| Area · skill % | Percent-General-9B | StartLux 9B | StartLux 27B | StartLux 35B-A3B |
| --- | --- | --- | --- | --- |
| Knowledge & Reasoning | **56.00** | 37.97 | 44.32 | 42.39 |
| Language Understanding | **79.66** | 71.28 | 74.45 | 73.58 |
| Retrieval & Classification | **72.49** | 64.12 | 66.79 | 65.79 |
| Tools & Automation | **85.11** | 73.17 | 82.18 | 76.16 |
| Arts & Human Taste | **63.49** | 41.78 | 47.85 | 44.74 |

![Five-area comparison with StartLux-Decision-27B](areas.svg)

Relative to the published 27B skill scores, strengths include PhishNChips, SATA-Bench, CLadder and iSarcasmEval. Remaining deficits include GSM8K 54.92 vs 95.3, BRIGHT 27.68 vs 43.5, ACOS 37.47 vs 50.4, and ToolRet 53.42 vs 64.3. The aggregate advantage does not extend to every benchmark.

### All 38 benchmarks

Values are skill × 100. ★ denotes a weight of 1.2 within the area. Peer skill values retain the published one-decimal precision; Δ is measured in percentage points.

#### Knowledge & Reasoning

| Benchmark | Percent-General-9B | StartLux 9B | StartLux 27B | Δ 27B | StartLux 35B-A3B | Jev 1.13 | Rune 26B-A4B | Decider chat 31B | AutoJev 27B |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GPQA Diamond ★ | 62.59 | 33.3 | 34.0 | +28.59 | 34.7 | 71.4 | 29.2 | 32.0 | 32.6 |
| GSM8K | 54.92 | 94.3 | 95.3 | -40.38 | 95.6 | 75.6 | 75.7 | 78.8 | 61.1 |
| ChessBench | **16.88** | 5.3 | 10.7 | +6.18 | 8.8 | 9.8 | 11.5 | 15.4 | 9.8 |
| MuSR | **73.78** | 34.9 | 48.8 | +24.98 | 36.8 | 46.1 | 44.2 | 43.1 | 39.3 |
| SATA-Bench | **54.43** | 25.3 | 9.3 | +45.13 | 27.5 | 25.4 | 34.0 | 28.4 | 28.9 |
| CRUXEval | **72.44** | 36.5 | 61.6 | +10.84 | 54.4 | 57.1 | 59.4 | 67.2 | 60.2 |
| CLadder | **81.96** | 36.1 | 47.3 | +34.66 | 39.1 | 45.3 | 45.5 | 49.2 | 49.0 |
| HLE ★ | 0.00 | 0.0 | 0.0 | +0.00 | 0.0 | 4.7 | 0.0 | 0.0 | 0.0 |
| MMLU-Pro ★ | 63.77 | 56.5 | 66.0 | -2.23 | 63.0 | 80.5 | 63.1 | 65.8 | 60.1 |
| BBH ★ | 82.29 | 58.2 | 71.3 | +10.99 | 65.4 | 89.7 | 72.7 | 65.5 | 68.3 |

#### Language Understanding

| Benchmark | Percent-General-9B | StartLux 9B | StartLux 27B | Δ 27B | StartLux 35B-A3B | Jev 1.13 | Rune 26B-A4B | Decider chat 31B | AutoJev 27B |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ContractNLI | 79.35 | 80.6 | 80.3 | -0.95 | 78.9 | 59.1 | 66.7 | 61.8 | 68.4 |
| ANLI ★ | **75.00** | 64.6 | 67.0 | +8.00 | 66.8 | 62.2 | 60.3 | 59.8 | 56.0 |
| WinoGrande ★ | 86.58 | 83.0 | 87.1 | -0.52 | 86.0 | 83.9 | 71.9 | 67.3 | 70.3 |
| HellaSwag ★ | 96.67 | 95.7 | 96.8 | -0.13 | 97.0 | 92.7 | 89.9 | 89.4 | 92.0 |
| ACOS | 37.47 | 46.2 | 50.4 | -12.93 | 50.5 | 27.3 | 24.4 | 16.2 | 17.8 |
| FinEntity | **95.60** | 82.6 | 89.3 | +6.30 | 83.3 | 80.8 | 83.0 | 86.6 | 89.6 |
| iSarcasmEval | **81.93** | 51.9 | 52.4 | +29.53 | 58.7 | 36.3 | 49.0 | 37.0 | 49.0 |
| VAST | **79.20** | 68.7 | 73.4 | +5.80 | 70.3 | 46.9 | 64.9 | 59.8 | 56.2 |
| NLI4CT | **89.07** | 66.1 | 72.3 | +16.77 | 70.0 | 69.0 | 62.0 | 66.6 | 70.5 |
| RAGTruth | **71.84** | 67.5 | 70.1 | +1.74 | 68.7 | 51.3 | 51.9 | 52.2 | 59.2 |

#### Retrieval & Classification

| Benchmark | Percent-General-9B | StartLux 9B | StartLux 27B | Δ 27B | StartLux 35B-A3B | Jev 1.13 | Rune 26B-A4B | Decider chat 31B | AutoJev 27B |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BANKING77 ★ | 87.14 | 91.3 | 90.9 | -3.76 | 91.0 | 79.5 | 83.5 | 78.8 | 78.8 |
| CLINC150 ★ | 92.51 | 93.1 | 92.9 | -0.39 | 93.7 | 89.2 | 87.3 | 91.1 | 87.7 |
| BRIGHT ★ | 27.68 | 41.3 | 43.5 | -15.82 | 41.7 | 40.6 | 39.3 | 36.2 | 41.9 |
| Amazon ESCI | **53.73** | 47.4 | 47.9 | +5.83 | 46.3 | 43.8 | 43.9 | 41.2 | 43.7 |
| PhishNChips | **99.50** | 28.5 | 40.9 | +58.60 | 38.2 | 25.1 | 61.8 | 75.0 | 19.9 |
| HoVer | 76.40 | 76.5 | 79.2 | -2.80 | 78.1 | 45.7 | 61.3 | 52.8 | 48.4 |

#### Tools & Automation

| Benchmark | Percent-General-9B | StartLux 9B | StartLux 27B | Δ 27B | StartLux 35B-A3B | Jev 1.13 | Rune 26B-A4B | Decider chat 31B | AutoJev 27B |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BFCL ★ | **98.96** | 97.0 | 96.7 | +2.26 | 96.7 | 94.3 | 93.0 | 97.3 | 96.8 |
| ToolRet | 53.42 | 61.5 | 64.3 | -10.88 | 64.0 | 59.9 | 58.9 | 58.0 | 62.4 |
| API-Bank ★ | **89.37** | 77.9 | 83.8 | +5.57 | 79.5 | 88.0 | 83.0 | 84.8 | 83.8 |
| Home appliances | **86.36** | 38.6 | 77.3 | +9.06 | 51.1 | 52.3 | 46.6 | 62.5 | 73.9 |
| When2Call | **93.83** | 85.2 | 85.7 | +8.13 | 84.7 | 74.6 | 68.0 | 69.2 | 75.6 |

#### Arts & Human Taste

| Benchmark | Percent-General-9B | StartLux 9B | StartLux 27B | Δ 27B | StartLux 35B-A3B | Jev 1.13 | Rune 26B-A4B | Decider chat 31B | AutoJev 27B |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BPoMP | **97.41** | 82.1 | 90.6 | +6.81 | 85.7 | 81.8 | 79.9 | 81.2 | 87.8 |
| Humicroedit | **56.32** | 24.3 | 25.8 | +30.52 | 24.7 | 23.7 | 24.4 | 27.6 | 24.8 |
| POP909 | **71.33** | 25.5 | 50.6 | +20.73 | 32.0 | 15.9 | 65.8 | 27.3 | 37.3 |
| cfcolor | 40.84 | 42.4 | 43.6 | -2.76 | 42.5 | 28.8 | 25.1 | 25.2 | 28.8 |
| ForecastBench ★ | **49.52** | 26.6 | 34.3 | +15.22 | 30.6 | 30.6 | 18.9 | 19.2 | 22.1 |
| Habermas | **55.49** | 22.5 | 18.4 | +37.09 | 26.2 | 21.5 | 16.2 | 24.4 | 15.5 |
| New Yorker | **76.32** | 72.1 | 74.2 | +2.12 | 74.2 | 62.6 | 67.6 | 67.3 | 62.8 |

<details>
<summary><b>Expand native metrics and request counts for all 38 benchmarks</b></summary>

Native metrics include accuracy, F1, nDCG and exact case accuracy; each row uses its corresponding metric. ForecastBench displays a score converted relative to Brier=0.25.

| Benchmark | Metric | Requests | Percent-General-9B | StartLux 9B | StartLux 27B | StartLux 35B-A3B | Jev 1.13 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GPQA Diamond | accuracy | 196 | 71.94 | 50.00 | 50.51 | 51.02 | 78.57 |
| GSM8K | accuracy | 2638 | 61.79 | 95.68 | 96.40 | 96.63 | 79.87 |
| ChessBench | accuracy | 5000 | **23.68** | 13.04 | 18.00 | 16.26 | 17.22 |
| MuSR | accuracy | 752 | **83.51** | 59.04 | 67.82 | 60.24 | 66.09 |
| SATA-Bench | case exact accuracy | 1650 | **55.03** | 26.30 | 10.48 | 28.48 | 26.42 |
| CRUXEval | accuracy | 570 | **82.63** | 60.00 | 75.79 | 71.23 | 72.98 |
| CLadder | accuracy | 5000 | **90.98** | 68.06 | 73.66 | 69.56 | 72.64 |
| HLE | accuracy | 501 | 13.57 | 10.18 | 12.38 | 10.18 | 20.36 |
| MMLU-Pro | accuracy | 12032 | 67.79 | 61.29 | 69.77 | 67.10 | 82.70 |
| BBH | accuracy | 5507 | 87.78 | 71.18 | 80.23 | 76.10 | 92.92 |
| ContractNLI | macro-F1 | 123 | 85.72 | 86.58 | 86.36 | 85.44 | 71.69 |
| ANLI | macro-F1 | 3200 | **83.31** | 76.39 | 77.94 | 77.85 | 74.79 |
| WinoGrande | accuracy | 1267 | 93.29 | 91.48 | 93.53 | 92.98 | 91.95 |
| HellaSwag | accuracy | 10042 | 97.50 | 96.76 | 97.56 | 97.74 | 94.52 |
| ACOS | per-review F1 | 1565 | 39.41 | 47.82 | 51.99 | 52.00 | 29.52 |
| FinEntity | macro-F1 | 979 | **97.01** | 88.20 | 92.72 | 88.63 | 86.98 |
| iSarcasmEval | Sarcasm F1 · track A, English | 4600 | **85.95** | 62.59 | 62.99 | 67.87 | 50.51 |
| VAST | macro-F1 | 3006 | **86.13** | 79.13 | 82.27 | 80.18 | 64.63 |
| NLI4CT | macro-F1 | 5500 | **94.38** | 82.60 | 85.78 | 84.56 | 84.06 |
| RAGTruth | F1 on hallucinated class | 2700 | **86.42** | 84.32 | 85.57 | 84.89 | 76.53 |
| BANKING77 | macro-F1 | 3080 | 87.30 | 91.40 | 90.98 | 91.14 | 79.74 |
| CLINC150 | macro-F1 | 5500 | 92.55 | 93.15 | 92.97 | 93.70 | 89.27 |
| BRIGHT | nDCG@10 | 220 | 36.07 | 48.08 | 50.05 | 48.44 | 47.52 |
| Amazon ESCI | macro-F1 | 5000 | **63.11** | 58.07 | 58.48 | 57.18 | 55.21 |
| PhishNChips | accuracy | 2000 | **99.75** | 64.25 | 70.45 | 69.10 | 62.55 |
| HoVer | accuracy | 4000 | 88.20 | 88.25 | 89.62 | 89.05 | 72.85 |
| BFCL | case exact accuracy | 1694 | **99.23** | 97.76 | 97.58 | 97.52 | 95.75 |
| ToolRet | nDCG@10 | 685 | 59.66 | 66.63 | 69.07 | 68.82 | 65.28 |
| API-Bank | accuracy | 508 | **89.57** | 78.35 | 84.06 | 79.92 | 88.19 |
| Home appliances | case exact accuracy | 88 | **86.36** | 38.64 | 77.27 | 51.14 | 52.27 |
| When2Call | accuracy | 3652 | **95.37** | 88.86 | 89.24 | 88.53 | 80.97 |
| BPoMP | accuracy | 5000 | **98.71** | 91.04 | 95.33 | 92.84 | 90.92 |
| Humicroedit | accuracy | 2628 | **78.16** | 62.18 | 62.90 | 62.37 | 61.87 |
| POP909 | accuracy | 2000 | **71.55** | 26.12 | 51.00 | 32.51 | 16.58 |
| cfcolor | accuracy | 5000 | 70.42 | 71.18 | 71.80 | 71.27 | 64.41 |
| ForecastBench | (0.25 - Brier) / 0.25, higher is better | 10139 | **49.52** | 26.60 | 34.32 | 30.64 | 30.56 |
| Habermas | accuracy | 1676 | **69.33** | 46.60 | 43.79 | 49.16 | 45.94 |
| New Yorker | accuracy | 528 | **81.06** | 77.65 | 79.36 | 79.36 | 70.08 |

</details>

**HLE is included in the complete evaluation:** the model answers 68/501 correctly (13.57%), below the 16.41% chance baseline for this DI setup, so skill is 0. This uses DI's 501-question text-only multiple-choice subset, not the entire HLE dataset.

## Evaluation datasets

These results use **Decision Index 0.2.1**. Upstream data-source links:

- [Benchmark data-source collection](https://github.com/apolinario/decision-index/blob/main/docs/suite.md#edition-021)
- [Edition 0.2.1 data manifest](https://github.com/apolinario/decision-index/blob/main/hub/0.2.1/manifest.json)

The links provide the sources for the benchmarks. Full benchmark questions are not redistributed here.

Peer results and presentation structure reference the [pinned StartLuxLabs/StartLux-Decision release](https://github.com/StartLuxLabs/StartLux-Decision/tree/0e7a2e81b9c92756e26d8edd843a44d50e362669). Scores for the other leaderboard systems are the 2026-09-28 snapshot recorded by that source. This README presents the complete Decision Index 0.2.1 evaluation.
