export default [
  {
    name: "Essay Outline Generator",
    desc: "An AI tool that helps students create structured essay outlines based on their topic and key points.",
    category: "Writing",
    icon: "https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/external-edit-interface-kiranshastry-gradient-kiranshastry-1.png",
    aiPrompt:
      "Create a detailed essay outline with introduction, main points, and conclusion based on the given topic and key ideas. Provide explanations for each section to guide the student in expanding their thoughts.",
    slug: "essay-outline-generator",
    form: [
      {
        label: "Essay Topic",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Key Ideas (comma-separated)",
        field: "input",
        name: "keyIdeas",
        required: true,
      },
    ],
  },
  {
    name: "Literature Analysis Assistant",
    desc: "Helps students analyze literary works by breaking down themes, characters, and symbolism.",
    category: "English Literature",
    icon: "https://img.icons8.com/pulsar-gradient/96/literature-1.png",
    aiPrompt:
      "Analyze the provided literary work excerpt, focusing on main themes, character development, symbolism, and writing style. Provide a comprehensive breakdown that a student can use to deepen their understanding of the text.",
    slug: "literature-analysis",
    form: [
      {
        label: "Title of the Literary Work",
        field: "input",
        name: "title",
        required: true,
      },
      {
        label: "Excerpt or Summary",
        field: "textarea",
        name: "excerpt",
        required: true,
      },
    ],
  },
  {
    name: "Math Problem Solver",
    desc: "An advanced AI tool that provides detailed, step-by-step solutions to a wide range of math problems.",
    category: "Mathematics",
    icon: "https://img.icons8.com/nolan/96/math.png",
    aiPrompt:
      "Solve the given math problem step-by-step, explaining each step clearly. Provide the final answer and suggest related concepts for further study.",
    slug: "math-problem-solver",
    form: [
      {
        label: "Math Problem",
        field: "textarea",
        name: "problem",
        required: true,
      },
      {
        label: "Subject Area (e.g., Algebra, Calculus)",
        field: "input",
        name: "subject",
        required: true,
      },
    ],
  },
  {
    name: "Science Experiment Designer",
    desc: "Helps students design scientific experiments based on their hypothesis and available resources.",
    category: "Science",
    icon: "https://img.icons8.com/pulsar-gradient/96/round-bottom-flask.png",
    aiPrompt:
      "Design a scientific experiment based on the given hypothesis and available resources. Include a step-by-step procedure, list of materials, safety precautions, and expected outcomes. Suggest ways to analyze the results.",
    slug: "science-experiment-designer",
    form: [
      {
        label: "Hypothesis",
        field: "textarea",
        name: "hypothesis",
        required: true,
      },
      {
        label: "Available Resources",
        field: "textarea",
        name: "resources",
      },
    ],
  },
  {
    name: "Historical Event Analyzer",
    desc: "An AI tool that helps students analyze historical events from multiple perspectives.",
    category: "History",
    icon: "https://img.icons8.com/office/80/historical.png",
    aiPrompt:
      "Analyze the given historical event from multiple perspectives, considering political, social, and economic factors. Provide a balanced view of the event's causes, consequences, and long-term impact. Suggest primary sources for further research.",
    slug: "historical-event-analyzer",
    form: [
      {
        label: "Historical Event",
        field: "input",
        name: "event",
        required: true,
      },
      {
        label: "Time Period",
        field: "input",
        name: "period",
        required: true,
      },
    ],
  },
  {
    name: "Language Translation and Cultural Context",
    desc: "Translates text between languages while providing cultural context and idiomatic explanations.",
    category: "Languages",
    icon: "https://cdn-icons-png.flaticon.com/128/3898/3898082.png",
    aiPrompt:
      "Translate the given text from the source language to the target language. Provide explanations for idiomatic expressions, cultural references, and any significant changes in meaning due to translation. Suggest ways to maintain the original tone and intent in the target language.",
    slug: "language-translation-context",
    form: [
      {
        label: "Text to Translate",
        field: "textarea",
        name: "sourceText",
        required: true,
      },
      {
        label: "Source Language",
        field: "input",
        name: "sourceLanguage",
        required: true,
      },
      {
        label: "Target Language",
        field: "input",
        name: "targetLanguage",
        required: true,
      },
    ],
  },
  {
    name: "Debate Argument Builder",
    desc: "Helps students construct strong arguments for debates by providing evidence and counterarguments.",
    category: "Critical Thinking",
    icon: "https://img.icons8.com/external-soft-fill-juicy-fish/100/external-argument-coding-and-development-soft-fill-soft-fill-juicy-fish.png",
    aiPrompt:
      "Construct a strong argument for the given debate topic. Provide a clear thesis, supporting evidence, potential counterarguments, and rebuttals. Suggest credible sources for further research and ways to strengthen the argument.",
    slug: "debate-argument-builder",
    form: [
      {
        label: "Debate Topic",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Your Position (For or Against)",
        field: "input",
        name: "position",
        required: true,
      },
    ],
  },
  {
    name: "Chemistry Reaction Predictor",
    desc: "Predicts the outcomes of chemical reactions and provides balanced equations.",
    category: "Chemistry",
    icon: "https://img.icons8.com/pulsar-gradient/96/chemistry-book.png",
    aiPrompt:
      "Predict the outcome of the chemical reaction between the given reactants. Provide a balanced chemical equation, identify the type of reaction, and explain the underlying principles. Suggest safety precautions and real-world applications of this reaction.",
    slug: "chemistry-reaction-predictor",
    form: [
      {
        label: "Reactants",
        field: "input",
        name: "reactants",
        required: true,
      },
      {
        label: "Reaction Conditions (if any)",
        field: "input",
        name: "conditions",
      },
    ],
  },
  {
    name: "Art Style Analyzer",
    desc: "Analyzes artworks and explains their style, techniques, and historical context.",
    category: "Art History",
    icon: "https://cdn-icons-png.flaticon.com/128/2970/2970785.png",
    aiPrompt:
      "Analyze the given artwork, identifying its style, key visual elements, and techniques used. Explain the historical and cultural context of the piece, its significance in art history, and its influence on later artists or movements. Suggest similar artworks for comparison.",
    slug: "art-style-analyzer",
    form: [
      {
        label: "Artwork Title and Artist",
        field: "input",
        name: "artwork",
        required: true,
      },
      {
        label: "Time Period or Art Movement",
        field: "input",
        name: "period",
        required: true,
      },
    ],
  },
  {
    name: "Economics Concept Explainer",
    desc: "Breaks down complex economics concepts and provides real-world examples.",
    category: "Economics",
    icon: "https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-economics-university-courses-wanicon-lineal-color-wanicon.png",
    aiPrompt:
      "Explain the given economics concept in simple terms, breaking it down into its key components. Provide real-world examples to illustrate the concept, discuss its importance in economic theory, and suggest how it applies to current economic situations. Include any relevant graphs or models that help in understanding.",
    slug: "economics-concept-explainer",
    form: [
      {
        label: "Economics Concept",
        field: "input",
        name: "concept",
        required: true,
      },
      {
        label: "Your Current Understanding (Optional)",
        field: "textarea",
        name: "understanding",
      },
    ],
  },
  {
    name: "Computer Science Algorithm Visualizer",
    desc: "Helps students understand algorithms by providing step-by-step visualizations and explanations.",
    category: "Computer Science",
    icon: "https://cdn-icons-png.flaticon.com/128/2920/2920277.png",
    aiPrompt:
      "Explain the given algorithm step-by-step, providing a visual representation of how it works with a small dataset. Include the algorithm's time and space complexity, its use cases, and potential optimizations. Suggest similar algorithms for comparison and provide pseudocode.",
    slug: "algorithm-visualizer",
    form: [
      {
        label: "Algorithm Name",
        field: "input",
        name: "algorithm",
        required: true,
      },
      {
        label: "Sample Input (Optional)",
        field: "textarea",
        name: "sampleInput",
      },
    ],
  },
  {
    name: "Psychology Study Guide Creator",
    desc: "Generates comprehensive study guides for psychology topics, including key theories and experiments.",
    category: "Psychology",
    icon: "https://img.icons8.com/office/80/psychotherapy.png",
    aiPrompt:
      "Create a detailed study guide for the given psychology topic. Include key theories, important studies or experiments, main figures in the field, and how this topic relates to other areas of psychology. Provide a list of key terms with definitions and suggest exam questions for self-testing.",
    slug: "psychology-study-guide",
    form: [
      {
        label: "Psychology Topic",
        field: "input",
        name: "topic",
        required: true,
      },
      {
        label: "Specific Areas of Focus (Optional)",
        field: "textarea",
        name: "focus",
      },
    ],
  },
];
