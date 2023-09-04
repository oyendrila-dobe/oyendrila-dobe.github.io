---
layout: article

type: conference
year: 2023
month: 08

title: 'Introducing Asynchronicity to Probabilistic Hyperproperties'
authors: ['Lina Gerlach', 'Oyendrila Dobe', '[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)']

DOI:
  target: 
  number: 

awards:


tweet: 'In this paper we propose an extension named AHyperPCTL to additionally introduce asynchronicity between the observed executions by quantifying over stutter-schedulers, which may randomly decide to delay scheduler decisions by idling. We show that AHyperPCTL can express interesting information-flow security policies, and propose a model checking algorithm for a decidable fragment.'

target:
  short: QEST
  full: 'Jansen, N., Tribastone, M. (eds) QEST 2023. Lecture Notes in Computer Science, vol 14287'
  link: 'https://www.qest.org/qest2023/'

links:
  PDF: '%BASE_URL%/assets/pdf/atva2023_async.pdf'
  #Slides: '%BASE_URL%/slides/nfm2022_hyperrewards'
  #Talk: 'https://youtu.be/T-4J81c_bzY'
---

###### Abstract

Probabilistic hyperproperties express probabilistic relations between different executions of systems with uncertain behavior. HyperPCTL allows to formalize such properties, where quantification over probabilistic schedulers resolves potential non-determinism. In this paper we propose an extension named AHyperPCTL to additionally introduce asynchronicity between the observed executions by quantifying over stutter-schedulers, which may randomly decide to delay scheduler decisions by idling. To our knowledge, this is the first asynchronous extension of a probabilistic branching-time hyperlogic. We show that AHyperPCTL can express interesting information-flow security policies, and propose a model checking algorithm for a decidable fragment.

###### BibTeX Citation

```bibtex {% raw %}
@misc{gerlach2023introducing,
      title={Introducing Asynchronicity to Probabilistic Hyperproperties}, 
      author={Lina Gerlach and Oyendrila Dobe and Erika Ábrahám and Ezio Bartocci and Borzoo Bonakdarpour},
      year={2023},
      eprint={2307.05282},
      archivePrefix={arXiv},
      primaryClass={cs.LO}
}
{% endraw %} ```