---
layout: article

type: conference
year: 2020
month: 10

title: 'Probabilistic Hyperproperties with Nondeterminism'
authors: ['[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)', 'Oyendrila Dobe']

DOI:
  target: Springer, Cham
  number: 10.1007/978-3-030-59152-6_29

awards:


tweet: 'We prove that the model checking problem for verification of probabilistic hyperproperties on Markov Decision Processes is undecidable. We further provide a NP complex solution for a fragment of the same problem and provide experimental results of the same.'

target:
  short: ATVA
  full: 'Hung D.V., Sokolsky O. (eds) Automated Technology for Verification and Analysis. ATVA 2020. Lecture Notes in Computer Science, vol 12302'
  link: 'http://fit.uet.vnu.edu.vn/atva2020/'

links:
  PDF: '%BASE_URL%/assets/pdf/atva2020_nondeterminism.pdf'
  Slides: '%BASE_URL%/slides/atva2020_nondeterminism'
  Talk: 'https://youtu.be/T-4J81c_bzY'
---

###### Abstract

We study the problem of formalizing and checking probabilistic hyperproperties for models that allow nondeterminism in actions. We extend the temporal logic HyperPCTL, which has been previously introduced for discrete-time Markov chains, to enable the specification of hyperproperties also for Markov decision processes. We generalize HyperPCTL by allowing explicit and simultaneous quantification over schedulers and probabilistic computation trees and show that it can express important quantitative requirements in security and privacy. We show that HyperPCTL model checking over MDPs is in general undecidable for quantification over probabilistic schedulers with memory, but restricting the domain to memoryless non-probabilistic schedulers turns the model checking problem decidable. Subsequently, we propose an SMT-based encoding for model checking this language and evaluate its performance.

###### BibTeX Citation

```bibtex {% raw %}
@InProceedings{10.1007/978-3-030-59152-6_29,
author="{\'A}brah{\'a}m, Erika
and Bartocci, Ezio
and Bonakdarpour, Borzoo
and Dobe, Oyendrila",
editor="Hung, Dang Van
and Sokolsky, Oleg",
title="Probabilistic Hyperproperties with Nondeterminism",
booktitle="Automated Technology for Verification and Analysis",
year="2020",
publisher="Springer International Publishing",
address="Cham",
pages="518--534",
abstract="We study the problem of formalizing and checking probabilistic hyperproperties for models that allow nondeterminism in actions. We extend the temporal logic HyperPCTL, which has been previously introduced for discrete-time Markov chains, to enable the specification of hyperproperties also for Markov decision processes. We generalize HyperPCTL by allowing explicit and simultaneous quantification over schedulers and probabilistic computation trees and show that it can express important quantitative requirements in security and privacy. We show that HyperPCTL model checking over MDPs is in general undecidable for quantification over probabilistic schedulers with memory, but restricting the domain to memoryless non-probabilistic schedulers turns the model checking problem decidable. Subsequently, we propose an SMT-based encoding for model checking this language and evaluate its performance.",
isbn="978-3-030-59152-6"
}
{% endraw %} ```