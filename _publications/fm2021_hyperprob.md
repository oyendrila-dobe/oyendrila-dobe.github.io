---
layout: article

type: conference
year: 2021
month: 11

title: 'HyperProb: A Model Checker for Probabilistic Hyperproperties'
authors: ['Oyendrila Dobe', '[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)']

DOI:
  target: Springer, Cham
  number: 10.1007/978-3-030-90870-6_35

awards:


tweet: 'We present a overview of our tool, HyperProb,
        which aims to verify probabilistic hyperproperties on Markov Decision Processes.'

target:
  short: FM
  full: 'Huisman M., Păsăreanu C., Zhan N. (eds) Formal Methods. FM 2021. Lecture Notes in Computer Science, vol 13047'
  link: 'http://lcs.ios.ac.cn/fm2021/'

links:
  PDF: '%BASE_URL%/assets/pdf/fm2021_hyperprob.pdf'
  Tool: 'https://github.com/TART-MSU/HyperProb'
  Slides: '%BASE_URL%/slides/fm2021_hyperprob'
  Talk: 'https://youtu.be/o-NFhuVWzWU'
---

###### Abstract

We present HyperProb, a model checker to verify probabilistic hyperproperties on Markov Decision Processes (MDP). Our tool receives as input an MDP expressed as a PRISM model and a formula in Hyper Probabilistic Computational Tree Logic (HyperPCTL). By restricting the domain of scheduler quantification to memoryless non-probabilistic schedulers, our tool exploits an SMT-based encoding to model check probabilistic hyperproperties in HyperPCTL. Furthermore, when the property is satisfied, the tool can provide a witness that can be used for synthesizing a DTMC that conforms with the specification.

###### BibTeX Citation

```bibtex {% raw %}
@InProceedings{10.1007/978-3-030-90870-6_35,
author="Dobe, Oyendrila
and {\'A}brah{\'a}m, Erika
and Bartocci, Ezio
and Bonakdarpour, Borzoo",
editor="Huisman, Marieke
and P{\u{a}}s{\u{a}}reanu, Corina
and Zhan, Naijun",
title="HyperProb: A Model Checker for Probabilistic Hyperproperties",
booktitle="Formal Methods",
year="2021",
publisher="Springer International Publishing",
address="Cham",
pages="657--666",
abstract="We present HyperProb, a model checker to verify probabilistic hyperproperties on Markov Decision Processes (MDP). Our tool receives as input an MDP expressed as a PRISM model and a formula in Hyper Probabilistic Computational Tree Logic (HyperPCTL). By restricting the domain of scheduler quantification to memoryless non-probabilistic schedulers, our tool exploits an SMT-based encoding to model check probabilistic hyperproperties in HyperPCTL. Furthermore, when the property is satisfied, the tool can provide a witness that can be used for synthesizing a DTMC that conforms with the specification.",
isbn="978-3-030-90870-6"
}
{% endraw %} ```