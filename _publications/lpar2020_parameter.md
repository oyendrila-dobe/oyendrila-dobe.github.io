---
layout: article

type: conference
year: 2020
month: 01

title: 'Parameter Synthesis for Probabilistic Hyperproperties'
authors: ['[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)', 'Oyendrila Dobe']

DOI:
  target: Easychair
  number: 10.29007/37lf
tweet: 'We solve the problem of synthesis of parameters in DTMCs given probabilistic hyperproperties that hold for the system.'

target:
  short: LPAR
  full: '23rd International Conference on Logic for Programming, Artificial Intelligence and Reasoning'
  link: 'https://easychair.org/smart-program/LPAR23/'

links:
  PDF: '%BASE_URL%/assets/pdf/lpar2020_parameter.pdf'
  Slides: '%BASE_URL%/slides/lpar2020_parameter_slides'
---

###### Abstract

In this paper, we study the parameter synthesis problem for probabilistic hyperproperties. A probabilistic hyperproperty stipulates quantitative dependencies among a set of executions. We, in particular, solve the following problem: given a probabilistic hyperproperty and discrete-time Markov chain with parametric transition probabilities, compute regions of parameter configurations that instantiate the Markov chain to satisfy the hyperproperty, and regions that lead to violation. We solve this problem for a fragment of the temporal logic HyperPCTL that allows expressing quantitative reachability relation among a set of computation trees. We illustrate the application of our technique in the areas of differential privacy, probabilistic nonintereference, and probabilistic conformance.

###### BibTeX Citation

```bibtex {% raw %}
@inproceedings{LPAR23:Parameter_Synthesis_for_Probabilistic,
  author    = {Erika Abraham and Ezio Bartocci and Borzoo Bonakdarpour and Oyendrila Dobe},
  title     = {Parameter Synthesis for Probabilistic Hyperproperties},
  booktitle = {LPAR23. LPAR-23: 23rd International Conference on Logic for Programming, Artificial Intelligence and Reasoning},
  editor    = {Elvira Albert and Laura Kovacs},
  series    = {EPiC Series in Computing},
  volume    = {73},
  pages     = {12--31},
  year      = {2020},
  publisher = {EasyChair},
  bibsource = {EasyChair, https://easychair.org},
  issn      = {2398-7340},
  url       = {https://easychair.org/publications/paper/BTZg},
  doi       = {10.29007/37lf}}
{% endraw %} ```