---
layout: article

type: conference
year: 2022
month: 05

title: 'Probabilistic Hyperproperties with Rewards'
authors: ['Oyendrila Dobe', 'Lukas Wilke', '[Erika Ábrahám](Erika)', '[Ezio Bartocci](Ezio)', '[Borzoo Bonakdarpour](Borzoo)']

DOI:
  target: Springer, Cham
  number: 10.1007/978-3-031-06773-0_35

awards:


tweet: 'We allow expression of the concept of rewards in probabilistic hyperproperties. We describe how it can be undefined in cases and suggest algorithms using which we can derive a defined answer from partial definedness. We additionally elaborate few interesting case studies for application and provide experimental results of the same.'

target:
  short: NFM
  full: 'Deshmukh, J.V., Havelund, K., Perez, I. (eds) NASA Formal Methods. NFM 2022. Lecture Notes in Computer Science, vol 13260'
  link: 'https://nfm2022.caltech.edu/'

links:
  PDF: '%BASE_URL%/assets/pdf/nfm2022_hyperrewards.pdf'
  Slides: '%BASE_URL%/slides/nfm2022_hyperrewards'
  #Talk: 'https://youtu.be/T-4J81c_bzY'
---

###### Abstract

Probabilistic hyperproperties describe system properties that are concerned with the probability relation between different system executions. Likewise, it is desirable to relate performance metrics (e.g., energy, execution time, etc.) between multiple runs. This paper introduces the notion of rewards to the temporal logic HyperPCTL by extending the syntax and semantics of the logic to express the accumulated reward relation among different computations. We demonstrate the application of the extended logic in expressing side-channel timing countermeasures, efficiency in probabilistic conformance, path planning in robotics applications, and recovery time in distributed self-stabilizing systems. We also propose a model checking algorithm for verifying Markov Decision Processes against HyperPCTL with rewards and report experimental results.

###### BibTeX Citation

```bibtex {% raw %}
@InProceedings{10.1007/978-3-031-06773-0_35,
author="Dobe, Oyendrila
and Wilke, Lukas
and {\'A}brah{\'a}m, Erika
and Bartocci, Ezio
and Bonakdarpour, Borzoo",
editor="Deshmukh, Jyotirmoy V.
and Havelund, Klaus
and Perez, Ivan",
title="Probabilistic Hyperproperties with Rewards",
booktitle="NASA Formal Methods",
year="2022",
publisher="Springer International Publishing",
address="Cham",
pages="656--673",
abstract="Probabilistic hyperproperties describe system properties that are concerned with the probability relation between different system executions. Likewise, it is desirable to relate performance metrics (e.g., energy, execution time, etc.) between multiple runs. This paper introduces the notion of rewards to the temporal logic HyperPCTL by extending the syntax and semantics of the logic to express the accumulated reward relation among different computations. We demonstrate the application of the extended logic in expressing side-channel timing countermeasures, efficiency in probabilistic conformance, path planning in robotics applications, and recovery time in distributed self-stabilizing systems. We also propose a model checking algorithm for verifying Markov Decision Processes against HyperPCTL with rewards and report experimental results.",
isbn="978-3-031-06773-0"
}
{% endraw %} ```