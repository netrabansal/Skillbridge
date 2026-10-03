import type { RawLessons } from "./types";

export const aiLessons: RawLessons = {
  "software-engineering-practices": {
    overview:
      "AI/ML engineers ship models inside real products, so they need solid engineering habits: version control, tests, packaging and readable code. This is what turns a notebook experiment into dependable software.",
    topics: [
      ["Version control for ML", "Git workflows, and keeping data and large files out of the repository"],
      ["Project structure", "Moving from notebooks to packages, modules and configuration files"],
      ["Testing ML code", "Unit tests for data transforms, and smoke tests for training and inference"],
      ["Packaging and dependencies", "pyproject.toml, lockfiles and reproducible environments"],
      ["Code quality", "Type hints, linting, formatting and code review"],
    ],
    resources: [
      ["The Missing Semester of Your CS Education", "https://missing.csail.mit.edu/", "MIT", "Course"],
      ["Packaging Python projects", "https://packaging.python.org/en/latest/tutorials/packaging-projects/", "Python Packaging Authority", "Guide"],
      ["Get started with pytest", "https://docs.pytest.org/en/stable/getting-started.html", "pytest", "Docs"],
    ],
    projects: [
      ["Notebook to package", "Intermediate", 6, "Turn a training notebook into an installable package with a CLI, config file, tests and CI."],
      ["Tested data pipeline", "Intermediate", 5, "Write tests for each transform in a feature pipeline, including edge cases like empty inputs and missing columns."],
    ],
    quiz: [
      ["Why keep large datasets out of the Git repository?", ["Git can't store binary files", "Repositories become huge and slow; use data versioning or storage instead", "It's illegal", "Python can't read them"], 1, "Tools like DVC or object storage handle large data properly."],
      ["What's a useful test for a training script?", ["None, it's too slow", "A smoke test that trains briefly on a tiny dataset", "Testing only the final accuracy", "Manual review"], 1, "A fast run catches broken code paths without full training."],
      ["What does a lockfile provide?", ["Security keys", "Exact dependency versions for reproducible installs", "Faster training", "Model weights"], 1, "Everyone installs the same versions, so results are reproducible."],
    ],
  },

  "calculus-optimization": {
    overview:
      "Models learn by optimization: adjusting parameters to reduce a loss. Derivatives, gradients and gradient descent explain how training works and why it sometimes doesn't.",
    topics: [
      ["Derivatives", "Rates of change and the chain rule"],
      ["Partial derivatives and gradients", "Functions of many variables"],
      ["Gradient descent", "Learning rates, convergence and local minima"],
      ["Variants", "Stochastic and mini-batch gradient descent, momentum and Adam"],
      ["Loss functions", "Mean squared error, cross-entropy and what they reward"],
    ],
    resources: [
      ["Essence of calculus", "https://www.3blue1brown.com/topics/calculus", "3Blue1Brown", "Video"],
      ["Mathematics for Machine Learning", "https://mml-book.github.io/", "Deisenroth, Faisal, Ong", "Book"],
      ["Multivariable calculus", "https://www.khanacademy.org/math/multivariable-calculus", "Khan Academy", "Course"],
    ],
    projects: [
      ["Gradient descent from scratch", "Intermediate", 4, "Implement gradient descent for linear regression in NumPy and plot the loss curve for several learning rates."],
      ["Optimizer comparison", "Intermediate", 4, "Compare plain SGD, momentum and Adam on the same small problem and explain the differences you see."],
    ],
    quiz: [
      ["In gradient descent, what happens if the learning rate is far too high?", ["Training converges faster", "Training can oscillate or diverge", "The model shrinks", "Nothing changes"], 1, "Steps overshoot the minimum, so the loss bounces around or explodes."],
      ["What does a gradient point toward?", ["The minimum", "The direction of steepest increase", "Zero", "The average"], 1, "Gradient descent steps in the opposite direction to reduce the loss."],
      ["Why use mini-batches instead of the full dataset per step?", ["Better accuracy always", "Faster, cheaper updates that still approximate the true gradient", "It avoids overfitting entirely", "Required by PyTorch"], 1, "Mini-batches balance compute efficiency and gradient quality."],
    ],
  },

  "neural-networks": {
    overview:
      "Neural networks are layered functions that learn representations from data. Understanding layers, activations, loss and backpropagation is the foundation of deep learning and modern AI.",
    topics: [
      ["Neurons and layers", "Weights, biases and fully connected layers"],
      ["Activation functions", "ReLU, sigmoid and softmax, and why non-linearity matters"],
      ["Loss and backpropagation", "Computing gradients through the network with the chain rule"],
      ["Training dynamics", "Initialization, batch size, learning rate schedules"],
      ["Regularization", "Dropout, weight decay, early stopping and data augmentation"],
    ],
    resources: [
      ["Neural networks", "https://www.3blue1brown.com/topics/neural-networks", "3Blue1Brown", "Video"],
      ["Practical Deep Learning for Coders", "https://course.fast.ai/", "fast.ai", "Course"],
      ["CS231n course notes", "https://cs231n.github.io/", "Stanford University", "Guide"],
      ["Deep Learning (book)", "https://www.deeplearningbook.org/", "Goodfellow, Bengio, Courville", "Book"],
    ],
    projects: [
      ["Network from scratch", "Intermediate", 8, "Implement a two-layer network with backpropagation in NumPy and train it on MNIST digits."],
      ["Regularization experiments", "Intermediate", 5, "Train a small network that overfits, then reduce overfitting with dropout, weight decay and augmentation, comparing curves."],
    ],
    quiz: [
      ["What does backpropagation compute?", ["Predictions", "Gradients of the loss with respect to the parameters", "The learning rate", "New labels"], 1, "It applies the chain rule backwards through the layers."],
      ["Why do networks need non-linear activations?", ["To run faster", "Without them, stacked layers collapse into a single linear function", "To normalize inputs", "For softmax only"], 1, "Non-linearity lets networks model complex relationships."],
      ["What does dropout do during training?", ["Removes data", "Randomly disables units to reduce overfitting", "Speeds up inference", "Lowers the learning rate"], 1, "It prevents units from relying too heavily on each other."],
    ],
  },

  pytorch: {
    overview:
      "PyTorch is the most widely used deep learning framework in research and increasingly in production. AI/ML engineers use it to build, train and debug models day to day.",
    topics: [
      ["Tensors", "Creating tensors, shapes, devices and operations"],
      ["Autograd", "How PyTorch tracks operations and computes gradients"],
      ["nn.Module", "Defining models and layers"],
      ["Datasets and DataLoaders", "Batching, shuffling and transforms"],
      ["The training loop", "Forward pass, loss, backward pass and optimizer step"],
      ["Saving and evaluating", "Checkpoints, eval mode and moving models to GPU"],
    ],
    resources: [
      ["Learn the Basics", "https://pytorch.org/tutorials/beginner/basics/intro.html", "PyTorch", "Docs"],
      ["PyTorch documentation", "https://pytorch.org/docs/stable/index.html", "PyTorch", "Reference"],
      ["Learn PyTorch for Deep Learning", "https://www.learnpytorch.io/", "Daniel Bourke", "Course"],
    ],
    projects: [
      ["Image classifier", "Intermediate", 8, "Train a CNN on CIFAR-10 with a custom training loop, checkpoints and a confusion matrix on the test set."],
      ["Fine-tune a pretrained model", "Intermediate", 6, "Fine-tune a pretrained vision model on a small custom dataset and compare it to training from scratch."],
    ],
    quiz: [
      ["What must you call before loss.backward() in a typical training step?", ["model.eval()", "optimizer.zero_grad() (to clear old gradients)", "torch.save()", "nothing"], 1, "Gradients accumulate by default, so they're cleared each step."],
      ["What does model.eval() change?", ["Nothing", "Layers like dropout and batch norm switch to inference behavior", "It deletes gradients", "It moves the model to GPU"], 1, "Remember to call it before evaluation or inference."],
      ["What does a DataLoader do?", ["Defines the model", "Batches and shuffles data from a Dataset", "Computes gradients", "Saves checkpoints"], 1, "It feeds batches to the training loop efficiently."],
    ],
  },

  transformers: {
    overview:
      "The transformer architecture, built on attention, powers today's large language models and many vision models. Understanding it helps you use, adapt and debug modern AI systems.",
    topics: [
      ["Attention", "Queries, keys and values, and why attention lets models use context"],
      ["The transformer block", "Multi-head attention, feed-forward layers, residuals and layer norm"],
      ["Tokenization and embeddings", "How text becomes vectors, and positional information"],
      ["Encoder, decoder and decoder-only models", "BERT-style versus GPT-style models"],
      ["Pretrained models", "Using models from the Hugging Face Hub"],
      ["Other architectures", "CNNs for vision and where transformers have replaced them"],
    ],
    resources: [
      ["Hugging Face LLM Course", "https://huggingface.co/learn/llm-course/chapter1/1", "Hugging Face", "Course"],
      ["The Illustrated Transformer", "https://jalammar.github.io/illustrated-transformer/", "Jay Alammar", "Guide"],
      ["Attention Is All You Need", "https://arxiv.org/abs/1706.03762", "Vaswani et al. (arXiv)", "Reference"],
    ],
    projects: [
      ["Text classifier with a pretrained model", "Intermediate", 5, "Fine-tune a small pretrained transformer for sentiment classification and compare it with a TF-IDF baseline."],
      ["Mini attention implementation", "Advanced", 8, "Implement scaled dot-product and multi-head attention in PyTorch and test it against the built-in module."],
    ],
    quiz: [
      ["What does attention let a model do?", ["Train without data", "Weigh how relevant each token is to every other token", "Skip tokenization", "Use less memory always"], 1, "Each token builds its representation from the parts of the context that matter most."],
      ["GPT-style models are…", ["Encoder-only", "Decoder-only and generate text one token at a time", "Convolutional", "Recurrent"], 1, "Decoder-only models predict the next token autoregressively."],
      ["Why do transformers need positional information?", ["To save memory", "Attention alone doesn't know the order of tokens", "For tokenization", "To speed up training"], 1, "Positional encodings or embeddings give the model word order."],
    ],
  },

  "prompt-engineering": {
    overview:
      "Many AI features are built by prompting large language models rather than training new ones. Writing clear, structured prompts, and using tools and examples, is now a core AI engineering skill.",
    topics: [
      ["Clear instructions", "Being specific about the task, audience, format and constraints"],
      ["Examples and structure", "Few-shot examples, XML-style tags and output schemas"],
      ["Reasoning", "Letting the model think step by step before answering"],
      ["System prompts and roles", "Setting behavior and context for an application"],
      ["Tool use and structured output", "Calling functions and returning JSON reliably"],
      ["Iterating with evaluations", "Testing prompts against examples instead of by feel"],
    ],
    resources: [
      ["Prompt engineering overview", "https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview", "Anthropic (Claude Docs)", "Docs"],
      ["Interactive prompt engineering tutorial", "https://github.com/anthropics/prompt-eng-interactive-tutorial", "Anthropic (GitHub)", "Interactive"],
      ["Prompt Engineering Guide", "https://www.promptingguide.ai/", "DAIR.AI", "Guide"],
    ],
    projects: [
      ["Support ticket triage", "Intermediate", 5, "Prompt an LLM to classify support tickets into categories with JSON output, and measure accuracy on 50 labeled examples."],
      ["Tool-using assistant", "Intermediate", 8, "Build an assistant that calls two tools (for example, search and a calculator) and handles tool errors gracefully."],
    ],
    quiz: [
      ["What usually improves an unreliable prompt the most?", ["Adding 'please'", "Clearer instructions, relevant examples and a defined output format", "Making it shorter at any cost", "Using capital letters"], 1, "Specificity and examples reduce ambiguity."],
      ["Why evaluate prompts on a set of examples?", ["To use more tokens", "Changes that help one case can break others", "It's required by APIs", "To train the model"], 1, "A test set shows whether a change is a real improvement."],
      ["What is few-shot prompting?", ["Using a small model", "Including a few input–output examples in the prompt", "Sending few requests", "Limiting output length"], 1, "Examples show the model the pattern you want."],
    ],
  },

  rag: {
    overview:
      "Retrieval-augmented generation gives a language model relevant documents at answer time, so it can respond with up-to-date, grounded information. It's one of the most common patterns in AI products.",
    topics: [
      ["Why RAG", "Grounding answers in your data and reducing hallucinations"],
      ["Embeddings", "Turning text into vectors that capture meaning"],
      ["Chunking", "Splitting documents so retrieved pieces are useful"],
      ["Vector search", "Similarity search, vector databases and hybrid keyword search"],
      ["Assembling the prompt", "Adding retrieved context and asking for citations"],
      ["Evaluating retrieval", "Measuring whether the right chunks are found"],
    ],
    resources: [
      ["Retrieval-Augmented Generation (paper)", "https://arxiv.org/abs/2005.11401", "Lewis et al. (arXiv)", "Reference"],
      ["Sentence Transformers documentation", "https://www.sbert.net/", "Sentence Transformers", "Docs"],
      ["Introducing Contextual Retrieval", "https://www.anthropic.com/news/contextual-retrieval", "Anthropic", "Guide"],
      ["Faiss wiki", "https://github.com/facebookresearch/faiss/wiki", "Meta AI (GitHub)", "Docs"],
    ],
    projects: [
      ["Docs Q&A bot", "Intermediate", 10, "Build a question-answering bot over a set of documentation pages, with citations to the chunks it used."],
      ["Retrieval evaluation", "Advanced", 6, "Create 30 test questions with known source passages and compare chunking and embedding choices by retrieval accuracy."],
    ],
    quiz: [
      ["In RAG, what are embeddings mainly used for?", ["Compressing model weights", "Finding chunks semantically similar to the query", "Encrypting prompts", "Counting tokens"], 1, "Queries and documents become vectors, and the nearest ones are retrieved."],
      ["Why does chunk size matter?", ["It doesn't", "Too small loses context; too large dilutes relevance and wastes tokens", "Bigger is always better", "It only affects cost"], 1, "Good chunking keeps retrieved text both relevant and self-contained."],
      ["Why ask the model to cite retrieved sources?", ["To lengthen answers", "So users can verify claims and spot unsupported ones", "It improves speed", "Required by vector databases"], 1, "Citations make grounded answers checkable."],
    ],
  },

  "llm-evaluation": {
    overview:
      "LLM outputs are variable, so you need systematic evaluation to know whether a change makes things better. Evals, guardrails and monitoring separate reliable AI products from demos.",
    topics: [
      ["Why evals matter", "Catching regressions when prompts, models or data change"],
      ["Building test sets", "Representative cases, edge cases and failure examples"],
      ["Automated grading", "Exact match, code-based checks and model-graded evaluation"],
      ["Human review", "Error analysis and labelling guidelines"],
      ["Guardrails and safety", "Input and output checks, refusals and monitoring in production"],
    ],
    resources: [
      ["Define success criteria and build evaluations", "https://docs.claude.com/en/docs/test-and-evaluate/develop-tests", "Anthropic (Claude Docs)", "Docs"],
      ["Your AI Product Needs Evals", "https://hamel.dev/blog/posts/evals/", "Hamel Husain", "Guide"],
      ["Hugging Face Evaluate", "https://huggingface.co/docs/evaluate/index", "Hugging Face", "Docs"],
    ],
    projects: [
      ["Eval harness", "Intermediate", 6, "Build a script that runs a prompt against 50 test cases, grades the outputs automatically and reports a score per category."],
      ["Error analysis study", "Intermediate", 4, "Review 100 real outputs, categorize the failures and turn the top categories into new test cases."],
    ],
    quiz: [
      ["What is the main purpose of an eval set?", ["Training the model", "Measuring quality consistently so changes can be compared", "Reducing cost", "Storing prompts"], 1, "Without a fixed set, improvements are guesses."],
      ["What's a risk of model-graded evaluation?", ["It's too slow to run", "The grader can be biased or wrong, so it should be checked against human labels", "It can't handle text", "It's always perfect"], 1, "Spot-check grader judgments to make sure they agree with people."],
      ["Where do the best new test cases often come from?", ["Random text", "Real failures found in error analysis", "The model's training data", "Marketing copy"], 1, "Real failures reflect what users actually experience."],
    ],
  },

  "fine-tuning": {
    overview:
      "Fine-tuning adapts a pretrained model to a specific task, style or domain. Knowing when it beats prompting or RAG, and how to do it efficiently with techniques like LoRA, is a valuable AI engineering skill.",
    topics: [
      ["When to fine-tune", "Compared with prompting and RAG: cost, data needs and maintenance"],
      ["Preparing data", "Instruction datasets, formatting and quality over quantity"],
      ["Parameter-efficient fine-tuning", "LoRA and adapters"],
      ["Training and evaluation", "Hyperparameters, overfitting and held-out evaluation"],
      ["Serving fine-tuned models", "Merging adapters and comparing with the base model"],
    ],
    resources: [
      ["PEFT documentation", "https://huggingface.co/docs/peft/index", "Hugging Face", "Docs"],
      ["LoRA: Low-Rank Adaptation of Large Language Models", "https://arxiv.org/abs/2106.09685", "Hu et al. (arXiv)", "Reference"],
      ["TRL documentation", "https://huggingface.co/docs/trl/index", "Hugging Face", "Docs"],
    ],
    projects: [
      ["LoRA fine-tune", "Advanced", 10, "Fine-tune a small open model with LoRA on a narrow task and compare it with prompting the base model on a held-out set."],
      ["Fine-tune or prompt?", "Intermediate", 4, "Write a decision memo for a real use case comparing prompting, RAG and fine-tuning on cost, quality and maintenance."],
    ],
    quiz: [
      ["What does LoRA train?", ["All model weights", "Small low-rank adapter matrices while the base weights stay frozen", "Only the tokenizer", "The optimizer"], 1, "It cuts memory and compute dramatically."],
      ["When is RAG usually a better fit than fine-tuning?", ["Teaching a consistent style", "Giving the model frequently changing, factual knowledge", "Shrinking the model", "Changing output format"], 1, "Retrieval keeps knowledge fresh without retraining."],
      ["Why keep a held-out evaluation set when fine-tuning?", ["To train longer", "To detect overfitting and measure real improvement", "To reduce cost", "It's optional"], 1, "Training loss alone doesn't show generalization."],
    ],
  },

  "model-serving": {
    overview:
      "A model only creates value once it's serving predictions reliably. Model serving covers wrapping models in APIs, managing latency and cost, and scaling inference in production.",
    topics: [
      ["Serving patterns", "Real-time APIs, batch jobs and streaming"],
      ["Building an inference API", "FastAPI, input validation and loading models once"],
      ["Performance", "Batching, quantization, caching and GPU utilization"],
      ["LLM serving", "Inference servers like vLLM, token streaming and cost per request"],
      ["Packaging and deployment", "Containers, versioning models and rolling out safely"],
    ],
    resources: [
      ["FastAPI documentation", "https://fastapi.tiangolo.com/", "FastAPI", "Docs"],
      ["vLLM documentation", "https://docs.vllm.ai/en/latest/", "vLLM", "Docs"],
      ["ONNX Runtime documentation", "https://onnxruntime.ai/docs/", "ONNX Runtime (Microsoft)", "Docs"],
    ],
    projects: [
      ["Inference API", "Intermediate", 6, "Serve a trained model behind a FastAPI endpoint in Docker, with validation, health checks and latency logging."],
      ["Latency optimization", "Advanced", 8, "Measure an endpoint's p95 latency, then apply batching and quantization and report the speed and accuracy trade-off."],
    ],
    quiz: [
      ["Why load the model once at startup rather than per request?", ["It's more secure", "Loading is slow and memory-heavy, so per-request loading kills latency", "APIs require it", "To reduce accuracy"], 1, "Keep the model in memory and reuse it across requests."],
      ["What does request batching improve?", ["Accuracy", "Throughput, by using hardware more efficiently", "Model size", "Security"], 1, "GPUs are more efficient on batches than single inputs."],
      ["What is quantization?", ["Adding more data", "Using lower-precision numbers to make models smaller and faster", "A training algorithm", "A type of cache"], 1, "It trades a little accuracy for speed and memory savings."],
    ],
  },

  "experiment-tracking": {
    overview:
      "ML work involves hundreds of experiments. Tracking parameters, metrics, code and data versions makes results reproducible and comparable, and lets teams know which model is actually in production.",
    topics: [
      ["Why track experiments", "Reproducibility, comparison and collaboration"],
      ["Logging runs", "Parameters, metrics, artifacts and environment details"],
      ["Tools", "MLflow and Weights & Biases"],
      ["Model registry", "Versioning models and promoting them through stages"],
      ["Data versioning", "Linking models to the exact data they were trained on"],
    ],
    resources: [
      ["MLflow documentation", "https://mlflow.org/docs/latest/index.html", "MLflow", "Docs"],
      ["Weights & Biases documentation", "https://docs.wandb.ai/", "Weights & Biases", "Docs"],
      ["DVC documentation", "https://dvc.org/doc", "DVC (Iterative)", "Docs"],
    ],
    projects: [
      ["Track a hyperparameter sweep", "Intermediate", 4, "Log a hyperparameter sweep with MLflow or W&B and pick the best run using a dashboard comparison."],
      ["Reproduce a past model", "Intermediate", 4, "Version data with DVC and show that you can recreate a previous model exactly from its tracked run."],
    ],
    quiz: [
      ["What should an experiment run record?", ["Only the final accuracy", "Parameters, metrics, code version, data version and artifacts", "Only the model file", "Nothing, use notes"], 1, "All of these are needed to reproduce and compare results."],
      ["What is a model registry for?", ["Training models", "Versioning models and managing which version is deployed", "Storing raw data", "Labelling data"], 1, "It gives teams one source of truth for production models."],
      ["Why version training data?", ["To save space", "The same code on different data gives different models", "It's required by Git", "It speeds up training"], 1, "Reproducibility requires the exact data."],
    ],
  },

  "ml-monitoring": {
    overview:
      "Models degrade as the world changes. Monitoring data drift, prediction quality, latency and cost lets AI engineers catch problems early and decide when to retrain.",
    topics: [
      ["What can go wrong", "Data drift, concept drift, pipeline bugs and silent failures"],
      ["Monitoring inputs and outputs", "Feature distributions and prediction distributions"],
      ["Measuring quality", "Delayed labels, proxy metrics and human feedback"],
      ["Operational metrics", "Latency, errors, throughput and cost"],
      ["Responding", "Alerts, rollbacks and retraining triggers"],
    ],
    resources: [
      ["Evidently documentation", "https://docs.evidentlyai.com/", "Evidently AI", "Docs"],
      ["Data distribution shifts and monitoring", "https://huyenchip.com/2022/02/07/data-distribution-shifts-and-monitoring.html", "Chip Huyen", "Guide"],
      ["Rules of Machine Learning", "https://developers.google.com/machine-learning/guides/rules-of-ml", "Google for Developers", "Guide"],
    ],
    projects: [
      ["Drift report", "Intermediate", 5, "Simulate drift by shifting a feature distribution and build a report that detects it and estimates the impact on accuracy."],
      ["Monitoring dashboard", "Intermediate", 6, "Log predictions from a served model and build a dashboard of input drift, prediction mix and latency with alerts."],
    ],
    quiz: [
      ["What is data drift?", ["A bug in training code", "A change in the distribution of input data over time", "Losing model files", "Slow inference"], 1, "Models trained on old data may perform worse on shifted inputs."],
      ["How can you monitor quality when true labels arrive weeks later?", ["You can't", "Use proxy metrics, input drift and sampled human review in the meantime", "Wait and do nothing", "Retrain daily regardless"], 1, "Leading indicators flag likely problems early."],
      ["Which is an operational metric for a model service?", ["F1 score", "p95 latency", "Feature importance", "Learning rate"], 1, "Latency, errors and cost matter as much as accuracy in production."],
    ],
  },

  "cloud-gpus": {
    overview:
      "Training and serving modern models usually happens on cloud GPUs. Knowing how to pick hardware, run jobs and control cost lets AI engineers move beyond what a laptop can do.",
    topics: [
      ["GPU basics", "Why GPUs speed up deep learning, and memory limits"],
      ["Managed ML platforms", "SageMaker and Vertex AI for training and endpoints"],
      ["Distributed training", "Data parallelism and tools like Accelerate and DDP"],
      ["Cost control", "Spot instances, right-sizing and shutting things down"],
      ["Storage and data access", "Getting data to GPUs efficiently from object storage"],
    ],
    resources: [
      ["What is Amazon SageMaker AI?", "https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html", "AWS Docs", "Docs"],
      ["Introduction to Vertex AI", "https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform", "Google Cloud", "Docs"],
      ["Hugging Face Accelerate", "https://huggingface.co/docs/accelerate/index", "Hugging Face", "Docs"],
      ["Distributed Data Parallel series", "https://pytorch.org/tutorials/beginner/ddp_series_intro.html", "PyTorch", "Guide"],
    ],
    projects: [
      ["Train on a cloud GPU", "Intermediate", 5, "Run a training job on a cloud GPU instance or managed platform, log costs and shut everything down automatically when done."],
      ["Multi-GPU training", "Advanced", 8, "Adapt a training script with Accelerate or DDP to use multiple GPUs and measure the speed-up."],
    ],
    quiz: [
      ["Why are GPUs well suited to deep learning?", ["They have more storage", "They perform many parallel matrix operations very quickly", "They're cheaper than CPUs", "They don't need drivers"], 1, "Neural network math is highly parallel."],
      ["What's the trade-off with spot or preemptible instances?", ["They're slower", "They're cheaper but can be reclaimed, so jobs need checkpoints", "They have no GPUs", "They can't run Python"], 1, "Checkpointing lets interrupted jobs resume."],
      ["What does data-parallel training do?", ["Splits the model across GPUs", "Runs copies of the model on different batches and syncs gradients", "Uses CPUs only", "Removes the need for data"], 1, "Each GPU processes part of the batch."],
    ],
  },

  "ai-projects": {
    overview:
      "AI/ML engineering roles reward evidence that you can ship. Deployed projects that solve a real problem, with evaluation and monitoring, show far more than notebooks alone.",
    topics: [
      ["Choosing a problem", "Real users, measurable success and available data"],
      ["Building the system", "Model or LLM choice, retrieval, APIs and UI"],
      ["Evaluation", "Test sets, metrics and baselines"],
      ["Deployment", "Hosting, cost control and monitoring"],
      ["Presenting", "Demo, write-up and honest limitations"],
    ],
    resources: [
      ["Claude Cookbooks", "https://github.com/anthropics/anthropic-cookbook", "Anthropic (GitHub)", "Guide"],
      ["Hugging Face Spaces", "https://huggingface.co/spaces", "Hugging Face", "Interactive"],
      ["Practical Deep Learning for Coders", "https://course.fast.ai/", "fast.ai", "Course"],
    ],
    projects: [
      ["Deployed AI assistant", "Advanced", 25, "Build and deploy an assistant for a specific domain with retrieval, an eval set, cost tracking and a public demo."],
      ["Applied ML service", "Advanced", 25, "Train a model on a real problem, serve it behind an API with monitoring, and write up results and limitations."],
    ],
    quiz: [
      ["What makes an AI portfolio project stand out?", ["The largest model", "A real problem, measured results and a working deployment", "The most libraries", "A long notebook"], 1, "Hiring teams want proof you can deliver end to end."],
      ["Why include limitations in your write-up?", ["To lower expectations", "It shows judgment and honesty about when the system fails", "It's required", "To fill space"], 1, "Understanding failure modes is a core AI engineering skill."],
      ["Why track inference cost in a deployed LLM project?", ["It's not important", "Costs scale with usage and can make a product unviable", "APIs require it", "To improve accuracy"], 1, "Cost per request is a real product constraint."],
    ],
  },
};
