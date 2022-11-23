---
layout: article

type: journal
year: 2022
month: 11

title: 'Model checking hyperproperties for Markov decision processes'
authors: ['Oyendrila Dobe', '[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)']

DOI:
  target: Elsevier
  number: 10.1016/j.ic.2022.104978

awards:


tweet: 'We study the problem of formalizing and checking probabilistic hyperproperties for Markov decision processes (MDPs). We introduce the temporal logic HyperPCTL that allows explicit and simultaneous quantification over schedulers as well as probabilistic computation trees. We show that the logic can express important quantitative requirements in various fields. We show that HyperPCTL model checking over MDPs is in general undecidable, but restricting the domain of scheduler quantification to memoryless non-probabilistic schedulers turns the model checking problem decidable. Subsequently, we propose an SMT-based encoding for model checking this language.'

target:
  #short: IC
  #full: Information and Computation, Special Isuue
  link: 'https://doi.org/10.1016/j.ic.2022.104978'

links:
  PDF: '%BASE_URL%/assets/pdf/id2022_hyperprob.pdf'
  #Slides: '%BASE_URL%/slides/nfm2022_hyperrewards'
  #Talk: 'https://youtu.be/T-4J81c_bzY'
---

###### Abstract

We study the problem of formalizing and checking probabilistic hyperproperties for Markov decision processes (MDPs). We introduce the temporal logic HyperPCTL that allows explicit and simultaneous quantification over schedulers as well as probabilistic computation trees. We show that the logic can express important quantitative requirements in security and privacy such as probabilistic noninterference, differential privacy, timing side-channel countermeasures, and probabilistic conformance testing. We show that HyperPCTL model checking over MDPs is in general undecidable, but restricting the domain of scheduler quantification to memoryless non-probabilistic schedulers turns the model checking problem decidable. Subsequently, we propose an SMT-based encoding for model checking this language. Finally, we demonstrate the applicability of our method by providing experimental results for verification, and we show how it can be used to solve even certain synthesis problems.

###### BibTeX Citation

```bibtex {% raw %}
@article{DOBE2022104978,
title = {Model checking hyperproperties for Markov decision processes},
journal = {Information and Computation},
pages = {104978},
year = {2022},
issn = {0890-5401},
doi = {https://doi.org/10.1016/j.ic.2022.104978},
url = {https://www.sciencedirect.com/science/article/pii/S089054012200133X},
author = {Oyendrila Dobe and Erika Ábrahám and Ezio Bartocci and Borzoo Bonakdarpour},
keywords = {Markov models, Hyperproperties, Model checking, Policy synthesis, Information leakage},
abstract = {We study the problem of formalizing and checking probabilistic hyperproperties for Markov decision processes (MDPs). We introduce the temporal logic HyperPCTL that allows explicit and simultaneous quantification over schedulers as well as probabilistic computation trees. We show that the logic can express important quantitative requirements in security and privacy such as probabilistic noninterference, differential privacy, timing side-channel countermeasures, and probabilistic conformance testing. We show that HyperPCTL model checking over MDPs is in general undecidable, but restricting the domain of scheduler quantification to memoryless non-probabilistic schedulers turns the model checking problem decidable. Subsequently, we propose an SMT-based encoding for model checking this language. Finally, we demonstrate the applicability of our method by providing experimental results for verification, and we show how it can be used to solve even certain synthesis problems.}
}
{% endraw %} ```
