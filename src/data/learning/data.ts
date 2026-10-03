import type { RawLessons } from "./types";

export const dataLessons: RawLessons = {
  python: {
    overview:
      "Python is the main language of data science and machine learning. Its readable syntax and huge ecosystem (NumPy, pandas, scikit-learn, PyTorch) make it the default tool for analysis and modeling.",
    topics: [
      ["Core syntax", "Variables, types, control flow and functions"],
      ["Data structures", "Lists, dictionaries, sets, tuples and comprehensions"],
      ["Modules and packages", "Importing, pip, and virtual environments"],
      ["Files and errors", "Reading and writing files, exceptions and context managers"],
      ["NumPy basics", "Arrays, vectorized operations and broadcasting"],
      ["Writing clean scripts", "Functions, docstrings and simple tests"],
    ],
    resources: [
      ["The Python Tutorial", "https://docs.python.org/3/tutorial/", "Python Software Foundation", "Docs"],
      ["Python micro-course", "https://www.kaggle.com/learn/python", "Kaggle Learn", "Course"],
      ["NumPy: the absolute basics", "https://numpy.org/doc/stable/user/absolute_beginners.html", "NumPy", "Docs"],
      ["Automate the Boring Stuff with Python", "https://automatetheboringstuff.com/", "Al Sweigart", "Book"],
    ],
    projects: [
      ["Personal finance analyzer", "Beginner", 5, "Read a CSV of transactions, categorize them with rules and print monthly summaries using only the standard library."],
      ["NumPy simulation", "Intermediate", 4, "Simulate 10,000 dice games with NumPy, compare the results to theory and time the vectorized version against a loop."],
    ],
    quiz: [
      ["What does [x * 2 for x in range(3)] produce?", ["[0, 2, 4]", "[2, 4, 6]", "[1, 2, 3]", "6"], 0, "range(3) yields 0, 1, 2, and each is doubled."],
      ["Why use a virtual environment?", ["To run Python faster", "To isolate each project's dependencies", "To write notebooks", "To use Git"], 1, "Projects can depend on different package versions without conflicting."],
      ["Why are NumPy operations usually faster than Python loops?", ["They use more memory", "They run vectorized code in optimized C", "They skip calculations", "They're parallel by default"], 1, "Vectorized operations avoid per-element Python overhead."],
    ],
  },

  "python-automation": {
    overview:
      "Python is the go-to language for automating operational work: calling APIs, processing files and logs, and gluing tools together. It replaces fragile manual steps with repeatable scripts.",
    topics: [
      ["Scripts and the CLI", "argparse, exit codes and environment variables"],
      ["Files and text", "Reading logs, regular expressions, CSV and JSON"],
      ["Calling APIs", "HTTP requests, authentication, pagination and error handling"],
      ["Running commands", "subprocess, capturing output and handling failures"],
      ["Packaging and scheduling", "Dependencies, virtual environments and running scripts on a schedule"],
    ],
    resources: [
      ["Automate the Boring Stuff with Python", "https://automatetheboringstuff.com/", "Al Sweigart", "Book"],
      ["Requests documentation", "https://requests.readthedocs.io/en/latest/", "Requests", "Docs"],
      ["Regular expression HOWTO", "https://docs.python.org/3/howto/regex.html", "Python Software Foundation", "Guide"],
      ["subprocess", "https://docs.python.org/3/library/subprocess.html", "Python Software Foundation", "Reference"],
    ],
    projects: [
      ["Log alert script", "Beginner", 4, "Parse an auth log for repeated failed logins with a regex and print a summary, with a threshold set by a CLI flag."],
      ["Cloud inventory report", "Intermediate", 6, "Call a cloud or GitHub API, page through results and produce a CSV report of resources or repositories, with retries on errors."],
    ],
    quiz: [
      ["Which module parses command-line arguments in the standard library?", ["sys.args", "argparse", "cli", "optparse2"], 1, "argparse handles flags, help text and validation."],
      ["How should a script signal failure to a calling process or CI job?", ["Print 'error'", "Exit with a non-zero status code", "Return None", "Write to a file"], 1, "Non-zero exit codes let shells and pipelines detect failure."],
      ["Why not hard-code API tokens in scripts?", ["They expire", "They can leak through version control; use environment variables or a secrets store", "Python can't read them", "They slow the script"], 1, "Secrets in code end up in Git history and shared copies."],
    ],
  },

  "jupyter-environments": {
    overview:
      "Notebooks are where most data exploration happens, and reproducible environments make sure your analysis runs the same on a colleague's machine as on yours.",
    topics: [
      ["Jupyter notebooks", "Cells, kernels, markdown and keyboard shortcuts"],
      ["Notebooks in an editor", "Using notebooks in VS Code alongside scripts"],
      ["Environments", "venv or conda, and pinning dependencies"],
      ["Reproducibility", "Restart-and-run-all, random seeds and data paths"],
      ["From notebook to code", "Moving reusable logic into modules"],
    ],
    resources: [
      ["Project Jupyter documentation", "https://docs.jupyter.org/en/latest/", "Project Jupyter", "Docs"],
      ["venv: creating virtual environments", "https://docs.python.org/3/library/venv.html", "Python Software Foundation", "Reference"],
      ["Jupyter notebooks in VS Code", "https://code.visualstudio.com/docs/datascience/jupyter-notebooks", "Visual Studio Code", "Docs"],
    ],
    projects: [
      ["Reproducible analysis repo", "Beginner", 3, "Set up a repository with a pinned environment, a notebook that runs top to bottom and a README explaining how to reproduce it."],
      ["Notebook to module refactor", "Intermediate", 4, "Move the reusable functions from a messy notebook into a tested Python module the notebook imports."],
    ],
    quiz: [
      ["Why use 'Restart and run all' before sharing a notebook?", ["It saves space", "It proves the notebook runs top to bottom without hidden state", "It formats code", "It's required"], 1, "Cells run out of order can hide bugs that appear on a fresh run."],
      ["What does pinning dependency versions achieve?", ["Faster installs", "Others get the same library versions and results", "Smaller files", "Automatic updates"], 1, "Unpinned packages may update and change behavior."],
      ["Why set a random seed?", ["To speed up code", "So random results are reproducible", "To hide randomness", "It's required by NumPy"], 1, "A fixed seed makes sampling and model training repeatable."],
    ],
  },

  "descriptive-stats": {
    overview:
      "Descriptive statistics summarize data: its center, spread and shape. They're the first step of any analysis and the language data scientists use to describe what they see.",
    topics: [
      ["Types of data", "Categorical, ordinal and numerical variables"],
      ["Center", "Mean, median and mode, and when each misleads"],
      ["Spread", "Range, variance, standard deviation and interquartile range"],
      ["Distributions", "Histograms, skew and outliers"],
      ["Relationships", "Correlation, and why it isn't causation"],
    ],
    resources: [
      ["Statistics and probability", "https://www.khanacademy.org/math/statistics-probability", "Khan Academy", "Course"],
      ["OpenIntro Statistics", "https://www.openintro.org/book/os/", "OpenIntro", "Book"],
      ["Seeing Theory", "https://seeing-theory.brown.edu/", "Brown University", "Interactive"],
    ],
    projects: [
      ["Summarize a dataset", "Beginner", 3, "Compute summary statistics for a public dataset, plot distributions and write a short paragraph on what stands out."],
      ["Mean versus median", "Beginner", 2, "Use salary or house-price data to show how outliers pull the mean, and explain which measure you'd report and why."],
    ],
    quiz: [
      ["Which measure of center is least affected by outliers?", ["Mean", "Median", "Range", "Standard deviation"], 1, "The median depends on order, not on extreme values."],
      ["What does standard deviation measure?", ["The middle value", "How spread out values are around the mean", "The most common value", "Sample size"], 1, "A larger standard deviation means more variability."],
      ["A strong correlation between X and Y proves that…", ["X causes Y", "Y causes X", "They move together, but not necessarily causally", "Nothing"], 2, "Correlation can come from confounders or chance."],
    ],
  },

  probability: {
    overview:
      "Probability is the math of uncertainty. It underpins statistical inference, machine learning and A/B testing, and it's needed to reason correctly about risk and randomness in data.",
    topics: [
      ["Basic rules", "Sample spaces, events, and the addition and multiplication rules"],
      ["Conditional probability", "Independence and Bayes' theorem"],
      ["Random variables", "Expected value and variance"],
      ["Common distributions", "Binomial, Poisson, uniform and normal"],
      ["Sampling and the CLT", "Sampling distributions and the central limit theorem"],
    ],
    resources: [
      ["Seeing Theory", "https://seeing-theory.brown.edu/", "Brown University", "Interactive"],
      ["Probability", "https://www.khanacademy.org/math/statistics-probability/probability-library", "Khan Academy", "Course"],
      ["Introduction to Probability, Statistics, and Random Processes", "https://www.probabilitycourse.com/", "Hossein Pishro-Nik", "Book"],
    ],
    projects: [
      ["Simulate Bayes' theorem", "Intermediate", 3, "Simulate a medical test with a rare condition to show why a positive result may still mean a low chance of illness."],
      ["Central limit theorem demo", "Intermediate", 3, "Sample from a skewed distribution repeatedly and plot how the sample means become approximately normal."],
    ],
    quiz: [
      ["Two events are independent if…", ["They can't both happen", "One happening doesn't change the probability of the other", "They have equal probability", "They're mutually exclusive"], 1, "P(A and B) = P(A)·P(B) when A and B are independent."],
      ["What does Bayes' theorem let you do?", ["Compute averages", "Update a probability given new evidence", "Remove outliers", "Fit a line"], 1, "It relates P(A|B) to P(B|A) and prior probabilities."],
      ["What does the central limit theorem say about sample means?", ["They're always zero", "Their distribution approaches normal as sample size grows", "They equal the median", "They can't be computed"], 1, "This holds for many underlying distributions, which is why normal approximations are so common."],
    ],
  },

  "statistical-inference": {
    overview:
      "Statistical inference lets you draw conclusions about a population from a sample, and quantify how confident you can be. It's how data scientists decide whether an effect is real or noise.",
    topics: [
      ["Samples and populations", "Sampling, bias and standard error"],
      ["Confidence intervals", "What they mean and how to interpret them"],
      ["Hypothesis tests", "Null and alternative hypotheses, test statistics and p-values"],
      ["Errors and power", "Type I and II errors, significance levels and statistical power"],
      ["Common tests", "t-tests, chi-squared tests and when to use each"],
      ["Pitfalls", "p-hacking, multiple comparisons and practical versus statistical significance"],
    ],
    resources: [
      ["OpenIntro Statistics", "https://www.openintro.org/book/os/", "OpenIntro", "Book"],
      ["Significance tests (hypothesis testing)", "https://www.khanacademy.org/math/statistics-probability/significance-tests-one-sample", "Khan Academy", "Course"],
      ["Think Stats", "https://greenteapress.com/wp/think-stats-2e/", "Allen B. Downey", "Book"],
    ],
    projects: [
      ["Test a real claim", "Intermediate", 4, "Use a public dataset to test a claim (for example, whether two groups differ) with a suitable test, and report the effect size and confidence interval."],
      ["Permutation test from scratch", "Intermediate", 4, "Implement a permutation test in Python and compare its p-value to a t-test on the same data."],
    ],
    quiz: [
      ["A 95% confidence interval means…", ["The true value has a 95% chance of being in this specific interval", "If we repeated sampling, about 95% of intervals built this way would contain the true value", "95% of the data is inside it", "The result is 95% accurate"], 1, "The 95% describes the method's long-run coverage, not one interval."],
      ["What is a Type I error?", ["Missing a real effect", "Rejecting a true null hypothesis (a false positive)", "A coding bug", "Using the wrong test"], 1, "The significance level α is the accepted rate of false positives."],
      ["Why can testing many hypotheses at once be misleading?", ["Tests get slower", "Some will look significant by chance alone", "p-values become negative", "Samples shrink"], 1, "Correct for multiple comparisons or pre-register your main hypothesis."],
    ],
  },

  "linear-algebra": {
    overview:
      "Linear algebra is how machine learning represents data and models: vectors, matrices and the operations between them. Intuition here makes models and their math far less mysterious.",
    topics: [
      ["Vectors", "Addition, scaling, dot products and length"],
      ["Matrices", "Matrix multiplication and matrices as transformations"],
      ["Systems of equations", "Solving linear systems and the idea of an inverse"],
      ["Eigenvectors and eigenvalues", "What they mean geometrically"],
      ["In practice with NumPy", "Arrays, shapes and broadcasting for real data"],
    ],
    resources: [
      ["Essence of linear algebra", "https://www.3blue1brown.com/topics/linear-algebra", "3Blue1Brown", "Video"],
      ["Linear algebra", "https://www.khanacademy.org/math/linear-algebra", "Khan Academy", "Course"],
      ["MIT 18.06 Linear Algebra", "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/", "MIT OpenCourseWare", "Course"],
    ],
    projects: [
      ["Linear regression with matrices", "Intermediate", 4, "Fit a linear regression using the normal equation in NumPy and check it against scikit-learn's result."],
      ["Image as a matrix", "Intermediate", 3, "Load an image as an array and apply rotation, scaling and a low-rank approximation with SVD."],
    ],
    quiz: [
      ["What does the dot product of two vectors tell you?", ["Their sum", "How aligned they are (and is used in projections)", "Their cross area only", "Nothing useful"], 1, "Zero means perpendicular; larger values mean more aligned."],
      ["When can you multiply an (m × n) matrix by a (p × q) matrix?", ["Always", "When n = p", "When m = q", "When m = p"], 1, "Inner dimensions must match; the result is m × q."],
      ["Geometrically, what is an eigenvector of a matrix?", ["Any vector", "A vector whose direction doesn't change under that transformation", "The largest row", "A unit vector"], 1, "It's only scaled, by its eigenvalue."],
    ],
  },

  "data-sources": {
    overview:
      "Real data lives in files, databases, APIs and warehouses. Data scientists need to get it out reliably, combine sources and understand where it came from before trusting it.",
    topics: [
      ["Files", "CSV, Excel, JSON and Parquet, and their trade-offs"],
      ["Databases", "Querying with SQL and loading results into pandas"],
      ["APIs", "Requesting JSON data, pagination and rate limits"],
      ["Warehouses", "What BigQuery, Snowflake and Redshift are for"],
      ["Data provenance", "Documenting sources, licenses and refresh schedules"],
    ],
    resources: [
      ["IO tools (text, CSV, HDF5, …)", "https://pandas.pydata.org/docs/user_guide/io.html", "pandas", "Docs"],
      ["Requests documentation", "https://requests.readthedocs.io/en/latest/", "Requests", "Docs"],
      ["sqlite3", "https://docs.python.org/3/library/sqlite3.html", "Python Software Foundation", "Reference"],
    ],
    projects: [
      ["Combine three sources", "Intermediate", 5, "Pull data from a CSV, a public API and a SQLite database, join them in pandas and document each source."],
      ["Scheduled data pull", "Intermediate", 4, "Write a script that pulls fresh data from an API daily, appends it to Parquet files and logs failures."],
    ],
    quiz: [
      ["Why is Parquet often preferred over CSV for large datasets?", ["It's human-readable", "It's columnar, compressed and keeps data types", "It's required by pandas", "It's always smaller than JSON"], 1, "Columnar storage makes reads faster and files smaller."],
      ["What should you do when an API paginates results?", ["Use only the first page", "Request each page until there are no more", "Increase the timeout", "Switch APIs"], 1, "Otherwise you silently analyze an incomplete dataset."],
      ["Why document data provenance?", ["It's legally required everywhere", "So others know where data came from, how fresh it is and whether they can use it", "To make files bigger", "It speeds up queries"], 1, "Trustworthy analysis depends on knowing your inputs."],
    ],
  },

  pandas: {
    overview:
      "pandas is the workhorse library for working with tabular data in Python. Selecting, grouping, joining and reshaping DataFrames is something data scientists do every day.",
    topics: [
      ["Series and DataFrames", "Creating, reading and inspecting data"],
      ["Selecting and filtering", "loc, iloc and boolean masks"],
      ["Grouping and aggregation", "groupby, agg and transform"],
      ["Joining data", "merge, join and concat"],
      ["Reshaping", "pivot_table, melt and working with dates"],
      ["Performance", "Vectorized operations and avoiding row-by-row loops"],
    ],
    resources: [
      ["Getting started tutorials", "https://pandas.pydata.org/docs/getting_started/intro_tutorials/index.html", "pandas", "Docs"],
      ["pandas micro-course", "https://www.kaggle.com/learn/pandas", "Kaggle Learn", "Course"],
      ["Python for Data Analysis, 3rd edition", "https://wesmckinney.com/book/", "Wes McKinney", "Book"],
    ],
    projects: [
      ["Sales analysis", "Beginner", 5, "Analyze a retail sales dataset: revenue by month and region, top products and a pivot table of category by quarter."],
      ["Join and reshape", "Intermediate", 5, "Combine several related tables, reshape them into a tidy analysis table and explain each transformation."],
    ],
    quiz: [
      ["Which method joins DataFrames on key columns, like SQL?", ["concat", "merge", "append", "pivot"], 1, "merge supports inner, left, right and outer joins."],
      ["What does df.groupby('region')['sales'].sum() return?", ["Total sales overall", "Total sales for each region", "The first row of each region", "A filtered DataFrame"], 1, "groupby splits by region, then sums sales within each group."],
      ["Why avoid iterating over rows with a loop in pandas?", ["It's not allowed", "Vectorized operations are much faster", "Loops change the data", "It uses less memory"], 1, "Column-wise operations run in optimized code."],
    ],
  },

  "data-cleaning": {
    overview:
      "Real-world data is messy: missing values, duplicates, wrong types and outliers. Cleaning often takes most of an analyst's time, and getting it right decides whether results can be trusted.",
    topics: [
      ["Missing data", "Finding gaps, and choosing to drop, fill or flag them"],
      ["Types and formats", "Parsing dates, numbers and categories correctly"],
      ["Duplicates and inconsistencies", "Deduplicating and standardizing text values"],
      ["Outliers", "Detecting them and deciding whether they're errors or signal"],
      ["Tidy data", "One variable per column, one observation per row"],
      ["Validation", "Writing checks so dirty data is caught early"],
    ],
    resources: [
      ["Working with missing data", "https://pandas.pydata.org/docs/user_guide/missing_data.html", "pandas", "Docs"],
      ["Data Cleaning micro-course", "https://www.kaggle.com/learn/data-cleaning", "Kaggle Learn", "Course"],
      ["Tidy Data (Wickham, 2014)", "https://www.jstatsoft.org/article/view/v059i10", "Journal of Statistical Software", "Reference"],
    ],
    projects: [
      ["Clean a messy dataset", "Beginner", 5, "Take a deliberately messy public dataset and produce a clean version plus a log of every decision you made."],
      ["Data validation checks", "Intermediate", 4, "Write automated checks (types, ranges, uniqueness, nulls) that run before analysis and fail loudly on bad data."],
    ],
    quiz: [
      ["What's a risk of filling all missing values with the mean?", ["None", "It can distort distributions and hide why data is missing", "It deletes rows", "It changes column names"], 1, "Imputation choices should reflect why values are missing."],
      ["In tidy data, each row represents…", ["A variable", "One observation", "A summary", "A file"], 1, "Tidy layouts make grouping and plotting straightforward."],
      ["An extreme outlier should be…", ["Always deleted", "Investigated to decide if it's an error or real", "Always kept", "Replaced with zero"], 1, "Some outliers are mistakes; others are the most important data points."],
    ],
  },

  "data-visualization": {
    overview:
      "Charts are how data scientists explore data and explain findings. Choosing the right chart and making it clear and honest is a skill hiring managers look for directly.",
    topics: [
      ["Choosing a chart", "Comparisons, distributions, relationships and change over time"],
      ["matplotlib fundamentals", "Figures, axes, labels and annotations"],
      ["seaborn for statistical plots", "Distributions, categories and relationships"],
      ["Interactive charts", "Plotly for exploration and dashboards"],
      ["Design principles", "Clarity, honest axes, color and accessibility"],
    ],
    resources: [
      ["Matplotlib tutorials", "https://matplotlib.org/stable/tutorials/index.html", "Matplotlib", "Docs"],
      ["seaborn tutorial", "https://seaborn.pydata.org/tutorial.html", "seaborn", "Docs"],
      ["Plotly Python", "https://plotly.com/python/", "Plotly", "Docs"],
      ["Fundamentals of Data Visualization", "https://clauswilke.com/dataviz/", "Claus O. Wilke", "Book"],
    ],
    projects: [
      ["Chart makeover", "Beginner", 3, "Find a misleading or cluttered chart online and redesign it, explaining each change."],
      ["Visual report", "Intermediate", 6, "Produce a five-chart visual report on a public dataset, each chart answering one clearly stated question."],
    ],
    quiz: [
      ["Which chart best shows how a value changes over time?", ["Pie chart", "Line chart", "Scatter plot", "Histogram"], 1, "Lines emphasise trends across an ordered axis like time."],
      ["Why can a bar chart with a truncated y-axis mislead?", ["Bars disappear", "Small differences look much larger than they are", "It changes the data", "Colors fade"], 1, "Bar length encodes value, so bars should start at zero."],
      ["Which chart shows the relationship between two numeric variables?", ["Bar chart", "Scatter plot", "Pie chart", "Table"], 1, "Each point is one observation plotted on both variables."],
    ],
  },

  eda: {
    overview:
      "Exploratory data analysis is the process of getting to know a dataset: its quality, patterns and surprises. Good EDA prevents wrong conclusions and leads to better questions and models.",
    topics: [
      ["A first look", "Shape, types, summary statistics and missing values"],
      ["Univariate analysis", "Distributions of each variable"],
      ["Bivariate analysis", "Relationships, correlations and group comparisons"],
      ["Spotting problems", "Leakage, duplicates, odd values and sampling issues"],
      ["Writing it up", "Turning observations into questions and next steps"],
    ],
    resources: [
      ["Exploratory data analysis", "https://r4ds.hadley.nz/EDA.html", "R for Data Science (2e)", "Book"],
      ["Data Visualization micro-course", "https://www.kaggle.com/learn/data-visualization", "Kaggle Learn", "Course"],
      ["EDA chapter, NIST/SEMATECH e-Handbook", "https://www.itl.nist.gov/div898/handbook/eda/eda.htm", "NIST", "Reference"],
    ],
    projects: [
      ["EDA notebook", "Intermediate", 6, "Explore a new public dataset end to end and finish with five findings and three questions worth investigating."],
      ["Data quality report", "Intermediate", 4, "Write a data quality report for a dataset, covering completeness, consistency and potential biases."],
    ],
    quiz: [
      ["What's the main goal of EDA?", ["Building the final model", "Understanding the data's structure, quality and patterns", "Writing production code", "Deploying dashboards"], 1, "EDA comes first so later steps rest on a correct understanding."],
      ["Which plot best shows the distribution of one numeric variable?", ["Histogram", "Line chart", "Pie chart", "Map"], 0, "Histograms (or box plots) show shape, spread and outliers."],
      ["Why check how data was collected?", ["For formatting", "Sampling choices can bias every conclusion", "It's required by pandas", "It speeds up analysis"], 1, "A biased sample produces confident but wrong results."],
    ],
  },

  "bi-dashboards": {
    overview:
      "Dashboards put data in front of decision-makers every day. Tools like Tableau, Power BI and Streamlit let data scientists share interactive results without anyone running code.",
    topics: [
      ["Dashboard purpose", "Who uses it, which decisions it supports and which metrics matter"],
      ["BI tools", "Connecting data and building views in Tableau or Power BI"],
      ["Python dashboards", "Interactive apps with Streamlit"],
      ["Layout and interaction", "Filters, drill-downs and a clear visual hierarchy"],
      ["Keeping it trustworthy", "Refresh schedules, definitions and data quality"],
    ],
    resources: [
      ["Streamlit documentation", "https://docs.streamlit.io/", "Streamlit", "Docs"],
      ["Power BI fundamentals", "https://learn.microsoft.com/en-us/power-bi/fundamentals/", "Microsoft Learn", "Docs"],
      ["Tableau training", "https://www.tableau.com/learn/training", "Tableau", "Course"],
    ],
    projects: [
      ["Streamlit KPI app", "Intermediate", 6, "Build a Streamlit dashboard with filters and three key metrics from a public dataset, and deploy it."],
      ["Executive dashboard", "Intermediate", 6, "Design a one-page dashboard in Tableau or Power BI for a specific stakeholder, with documented metric definitions."],
    ],
    quiz: [
      ["What should come first when designing a dashboard?", ["Picking colors", "Knowing who uses it and what decisions it supports", "Adding every metric", "Choosing chart animations"], 1, "Purpose determines which metrics and views belong."],
      ["Why document metric definitions on a dashboard?", ["To fill space", "So everyone interprets numbers the same way", "Tools require it", "To slow down readers"], 1, "Different definitions of the same metric cause confusion and bad decisions."],
      ["What is Streamlit?", ["A database", "A Python library for building data apps quickly", "A BI server only for Excel", "A charting standard"], 1, "It turns Python scripts into interactive web apps."],
    ],
  },

  "supervised-learning": {
    overview:
      "Supervised learning trains models on labeled examples to predict outcomes, such as prices, churn or fraud. It's the most widely used form of machine learning in industry.",
    topics: [
      ["The supervised learning workflow", "Features, labels, training and prediction"],
      ["Regression", "Linear regression and predicting continuous values"],
      ["Classification", "Logistic regression, decision trees and probabilities"],
      ["Ensembles", "Random forests and gradient boosting"],
      ["Overfitting and regularization", "Bias–variance trade-off and controlling complexity"],
      ["scikit-learn in practice", "Estimators, fit/predict and pipelines"],
    ],
    resources: [
      ["Supervised learning", "https://scikit-learn.org/stable/supervised_learning.html", "scikit-learn", "Docs"],
      ["Machine Learning Crash Course", "https://developers.google.com/machine-learning/crash-course", "Google for Developers", "Course"],
      ["Intro to Machine Learning", "https://www.kaggle.com/learn/intro-to-machine-learning", "Kaggle Learn", "Course"],
      ["An Introduction to Statistical Learning", "https://www.statlearning.com/", "James, Witten, Hastie, Tibshirani", "Book"],
    ],
    projects: [
      ["House price predictor", "Intermediate", 8, "Train and compare linear regression and gradient boosting models to predict house prices, explaining the most important features."],
      ["Churn classifier", "Intermediate", 8, "Build a churn model on a public dataset, handle class imbalance and present precision and recall for the business."],
    ],
    quiz: [
      ["A model scores 99% on training data but 70% on test data. What's likely happening?", ["Underfitting", "Overfitting", "Perfect generalization", "Data cleaning"], 1, "The model memorized training data instead of learning patterns that generalize."],
      ["Which task is classification?", ["Predicting a house price", "Predicting whether an email is spam", "Predicting temperature", "Predicting sales revenue"], 1, "Classification predicts categories; regression predicts continuous values."],
      ["What does regularization do?", ["Speeds up training", "Penalises complexity to reduce overfitting", "Adds more features", "Removes the test set"], 1, "Constraining the model helps it generalize."],
    ],
  },

  "model-evaluation": {
    overview:
      "A model is only useful if you can trust how it will perform on new data. Evaluation (proper splits, cross-validation and the right metrics) is what separates a demo from a dependable model.",
    topics: [
      ["Train, validation and test splits", "Why each exists and keeping the test set untouched"],
      ["Cross-validation", "k-fold, stratification and time-series splits"],
      ["Regression metrics", "MAE, RMSE and R²"],
      ["Classification metrics", "Precision, recall, F1, ROC-AUC and confusion matrices"],
      ["Baselines and error analysis", "Comparing against simple baselines and inspecting failures"],
    ],
    resources: [
      ["Metrics and scoring", "https://scikit-learn.org/stable/modules/model_evaluation.html", "scikit-learn", "Docs"],
      ["Cross-validation", "https://scikit-learn.org/stable/modules/cross_validation.html", "scikit-learn", "Docs"],
      ["Classification (accuracy, precision, recall)", "https://developers.google.com/machine-learning/crash-course/classification", "Google for Developers", "Course"],
    ],
    projects: [
      ["Evaluation report", "Intermediate", 5, "Evaluate a classifier with cross-validation, a confusion matrix and precision–recall trade-offs, and recommend a decision threshold."],
      ["Baseline challenge", "Beginner", 3, "Compare three models against a simple baseline and show where each one fails using error analysis."],
    ],
    quiz: [
      ["Only 1% of transactions are fraud. Why is accuracy a poor metric?", ["It can't be computed", "Always predicting 'not fraud' scores 99%", "It's always lower than recall", "Fraud has no labels"], 1, "Precision, recall or PR-AUC reveal whether the rare class is caught."],
      ["Why keep a separate test set?", ["To train faster", "To get an unbiased estimate of performance on unseen data", "To increase accuracy", "It's optional"], 1, "Using it for tuning leaks information and inflates results."],
      ["What does recall measure?", ["Of predicted positives, how many were right", "Of actual positives, how many the model found", "Overall accuracy", "Training speed"], 1, "High recall means few actual positives are missed."],
    ],
  },

  "feature-engineering": {
    overview:
      "Feature engineering and data preparation turn raw data into inputs a model can learn from. Done well, and without leakage, it often improves results more than switching algorithms.",
    topics: [
      ["Encoding categories", "One-hot, ordinal and target encoding"],
      ["Scaling and transforming", "Standardization, normalization and log transforms"],
      ["Creating features", "Dates, ratios, aggregations and domain knowledge"],
      ["Pipelines", "Combining preprocessing and models with scikit-learn pipelines"],
      ["Avoiding leakage", "Fitting transformations on training data only and respecting time"],
    ],
    resources: [
      ["Feature Engineering micro-course", "https://www.kaggle.com/learn/feature-engineering", "Kaggle Learn", "Course"],
      ["Preprocessing data", "https://scikit-learn.org/stable/modules/preprocessing.html", "scikit-learn", "Docs"],
      ["Common pitfalls and recommended practices", "https://scikit-learn.org/stable/common_pitfalls.html", "scikit-learn", "Guide"],
    ],
    projects: [
      ["Feature improvement study", "Intermediate", 6, "Start with a baseline model, add engineered features one at a time and measure the impact of each with cross-validation."],
      ["Leak-proof pipeline", "Intermediate", 4, "Rebuild a model so all preprocessing lives in a pipeline, and show how the leaky version overstated performance."],
    ],
    quiz: [
      ["Which is an example of data leakage?", ["Using a validation set", "Scaling features with statistics from the whole dataset before splitting", "Shuffling training data", "One-hot encoding"], 1, "Test-set information leaks into training. Fit preprocessing on the training split only."],
      ["Why one-hot encode a categorical variable like color?", ["To compress data", "So the model doesn't treat categories as ordered numbers", "To remove the column", "It's required for trees only"], 1, "Encoding red=1, blue=2 implies an order that doesn't exist."],
      ["What does a scikit-learn Pipeline help with?", ["Plotting", "Applying the same preprocessing consistently in training and prediction", "Downloading data", "Deploying models"], 1, "Pipelines bundle steps so they're fit and applied together."],
    ],
  },

  "unsupervised-learning": {
    overview:
      "Unsupervised learning finds structure in data without labels, such as customer segments or compressed representations. It's useful for exploration, segmentation and preparing data for other models.",
    topics: [
      ["Clustering", "k-means, choosing k and interpreting clusters"],
      ["Density and hierarchical clustering", "DBSCAN and dendrograms"],
      ["Dimensionality reduction", "PCA and what principal components represent"],
      ["Visualizing high-dimensional data", "t-SNE and UMAP, and their caveats"],
      ["Anomaly detection", "Finding unusual records without labels"],
    ],
    resources: [
      ["Unsupervised learning", "https://scikit-learn.org/stable/unsupervised_learning.html", "scikit-learn", "Docs"],
      ["Clustering", "https://scikit-learn.org/stable/modules/clustering.html", "scikit-learn", "Docs"],
      ["Decomposing signals in components (PCA)", "https://scikit-learn.org/stable/modules/decomposition.html", "scikit-learn", "Docs"],
    ],
    projects: [
      ["Customer segmentation", "Intermediate", 6, "Segment customers with k-means on a public dataset, profile each segment and suggest actions for each."],
      ["PCA exploration", "Intermediate", 4, "Apply PCA to a high-dimensional dataset, explain the main components and plot the data in two dimensions."],
    ],
    quiz: [
      ["What does k-means need you to choose?", ["The labels", "The number of clusters, k", "The test set", "The loss function"], 1, "Methods like the elbow plot or silhouette score help pick k."],
      ["What does PCA do?", ["Labels data", "Finds directions of greatest variance to reduce dimensions", "Removes outliers", "Trains a classifier"], 1, "Principal components summarize variance in fewer dimensions."],
      ["Why scale features before k-means?", ["It's faster", "Distance-based methods are dominated by large-scale features otherwise", "k-means requires integers", "To remove missing values"], 1, "Without scaling, one wide-ranging feature decides the clusters."],
    ],
  },

  "ab-testing": {
    overview:
      "A/B testing is how product teams decide whether a change actually works. Data scientists design experiments, size them correctly and interpret results without fooling themselves.",
    topics: [
      ["Experiment design", "Hypotheses, metrics, randomization and units of analysis"],
      ["Sample size and power", "Minimum detectable effect and how long to run a test"],
      ["Analyzing results", "Significance, confidence intervals and practical impact"],
      ["Common mistakes", "Peeking, stopping early, novelty effects and multiple metrics"],
      ["Guardrail metrics", "Making sure a win doesn't harm something else"],
    ],
    resources: [
      ["Sample size calculator", "https://www.evanmiller.org/ab-testing/sample-size.html", "Evan Miller", "Interactive"],
      ["How Not To Run an A/B Test", "https://www.evanmiller.org/how-not-to-run-an-ab-test.html", "Evan Miller", "Guide"],
      ["Trustworthy Online Controlled Experiments", "https://experimentguide.com/", "Kohavi, Tang, Xu", "Book"],
    ],
    projects: [
      ["Analyze an A/B test", "Intermediate", 4, "Analyze a public A/B test dataset, report the effect with a confidence interval and recommend whether to ship."],
      ["Experiment plan", "Intermediate", 3, "Write a full experiment plan for a product change: hypothesis, metrics, guardrails, sample size and duration."],
    ],
    quiz: [
      ["Why is stopping a test as soon as it looks significant a problem?", ["It wastes traffic", "Repeated peeking inflates the false-positive rate", "Results can't be saved", "It's fine"], 1, "Decide sample size in advance, or use methods designed for sequential testing."],
      ["What is a minimum detectable effect?", ["The largest possible effect", "The smallest effect the test is designed to reliably detect", "The p-value", "The control group size"], 1, "Smaller effects need larger samples to detect."],
      ["What are guardrail metrics for?", ["To speed up tests", "To catch harmful side effects of a change", "To choose the winner", "To randomize users"], 1, "A conversion win that increases refunds isn't a win."],
    ],
  },

  "data-storytelling": {
    overview:
      "Analysis only matters if it changes a decision. Data storytelling turns results into a clear narrative, with focused charts, plain language and a recommendation, that stakeholders can act on.",
    topics: [
      ["Know your audience", "What they need to decide and how much detail they want"],
      ["Structure", "Lead with the answer, then the evidence and the caveats"],
      ["Focused visuals", "Removing clutter and directing attention"],
      ["Plain language", "Explaining uncertainty and methods without jargon"],
      ["Recommendations", "Turning findings into concrete next steps"],
    ],
    resources: [
      ["Storytelling with Data", "https://www.storytellingwithdata.com/", "Cole Nussbaumer Knaflic", "Guide"],
      ["Fundamentals of Data Visualization", "https://clauswilke.com/dataviz/", "Claus O. Wilke", "Book"],
      ["From Data to Viz", "https://www.data-to-viz.com/", "data-to-viz.com", "Reference"],
    ],
    projects: [
      ["One-page memo", "Beginner", 3, "Turn an analysis notebook into a one-page memo for a non-technical manager, leading with the recommendation."],
      ["Five-minute presentation", "Intermediate", 4, "Present a project in five minutes with three slides, then refine it based on feedback."],
    ],
    quiz: [
      ["How should a stakeholder summary usually start?", ["With the methodology", "With the key finding and recommendation", "With the raw data", "With a literature review"], 1, "Busy readers need the answer first; details follow for those who want them."],
      ["What makes a chart more effective for a presentation?", ["More colors", "Highlighting the one point you want the audience to see", "Adding 3D effects", "Including every variable"], 1, "Focus directs attention to the message."],
      ["How should uncertainty be communicated?", ["Hidden to avoid confusion", "Honestly, in plain language, with ranges where helpful", "Only in footnotes", "Not at all"], 1, "Stakeholders make better decisions when they know how confident to be."],
    ],
  },

  "data-portfolio": {
    overview:
      "A portfolio of end-to-end case studies (a question, messy data, analysis, model and a clear conclusion) is the strongest evidence of data science skills for junior roles.",
    topics: [
      ["Choosing questions", "Interesting, specific questions with available data"],
      ["End-to-end case studies", "From raw data to a recommendation"],
      ["Reproducibility", "Clean repositories, environments and instructions"],
      ["Communication", "Readable notebooks, write-ups and visuals"],
      ["Sharing", "GitHub, a personal site and Kaggle profiles"],
    ],
    resources: [
      ["Kaggle competitions", "https://www.kaggle.com/competitions", "Kaggle", "Interactive"],
      ["Awesome Public Datasets", "https://github.com/awesomedata/awesome-public-datasets", "GitHub community", "Reference"],
      ["Data.gov catalog", "https://catalog.data.gov/", "U.S. General Services Administration", "Reference"],
    ],
    projects: [
      ["Case study one", "Intermediate", 15, "Pick a question you care about, find the data and produce a complete, reproducible case study with a written conclusion."],
      ["Case study two (modeling)", "Advanced", 20, "Build a predictive model end to end, including evaluation and a short explanation of how it could be used in practice."],
    ],
    quiz: [
      ["What makes a strong data science portfolio project?", ["A famous dataset with a tutorial copied", "A specific question, real data cleaning, sound analysis and a clear conclusion", "The largest dataset", "The most complex model"], 1, "Reviewers look for judgment and communication, not just code."],
      ["Why include a README with setup steps?", ["It's required by Kaggle", "So reviewers can understand and reproduce the work quickly", "To add length", "To show off tools"], 1, "Reproducibility signals professional habits."],
      ["Which conclusion is better?", ["\"The model is 87% accurate.\"", "\"The model catches 80% of churners at 60% precision, so a retention offer targeted with it would…\"", "\"Results are interesting.\"", "\"More data is needed.\""], 1, "Linking metrics to a decision shows business understanding."],
    ],
  },
};
