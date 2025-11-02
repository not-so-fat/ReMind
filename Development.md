# ReMind Development Doc

## Key Concepts
- Target
    - Set of quizs and results, like "English practice", "Chinese practice"
    - Important stats to show:
        - The number of quizs
        - Ratio of new, wandering, confident
- Quiz
    - One quiz consists of pair of string ("question" and "answer")
    - One question would have multiple answers, in that case we'll have multiple quizs; the number of answers
    - When user choose answer, we'll check whether it is one of the answers to determine result
- Trial
    - When user choose the answer, we create a "trial"
    - Trial consists of quiz and success_flag
- Quiz Status: each quiz has following attributes
    - The number of trials
    - The number of success
    - Success rate = (The number of success) / (The number of trials)
    - Status category: One of "New", "Wandering", "Confident"
        - If the number of trials is less than N (by default N=3), it is new
        - If the number of trials is >= N,
            - If success rate is under p (by default p = 0.5), it is "Wandering"
            - Else, "Confident"
    - Active and cooldown (turn-based)
        - We don't want to show the same quiz in short period of time. Cooldown is measured in turns: once used, a quiz becomes inactive for C turns (default C=10). Each answered quiz increments a per-target turn counter.
        - Data model: store per-target currentTurn and per-quiz lastShownTurn. A quiz is active if currentTurn - lastShownTurn ≥ C.
- How quizs are picked and generated
    - Logic of pick quiz
        - Basically we want to balance how much time users should spend for learning quiz for each status category
        - First decide which category we should pick New/Wandering/Confideng with p_n/p_w/p_c (default: p_n=0.4, p_w=0.5, p_c=0.1)
            - Sometimes there are no active quiz in category, such case just pick category from the other categories. For example, if all the quiz is new, just pick new. If new and confident, pick new with 80%, confident with 20%.
        - Then pick the quiz from active quizs with uniform distribution
    - Initialize
        - Pick M quizs (deafult: M=5) in queue
        - Use answers of picked quizs as choices (the number of choices is always M)
    - Show quiz
        - Pick the quiz from queue
        - Show the question of the quiz
        - Show the choices
    - User answer the quiz
        - +1 the number of trials of the quiz
        - If answer is correct
            - Note that the question could have different answer in differen quiz, in such case we need to consider it correct
            - +1  the number of success of the quiz
            - Show effect
        - If answer is wrong
            - Show the answers as green and user choice as red
            - Users can claim it should be correct, then don't count this trial, and add another quiz based on this answer in DB
        - Delete the quiz answer from choices
        - Pick a new quiz and put it in the queue, and add the answer to choices
        - Make answered quiz inactive (set lastShownTurn = currentTurn; cooldown is C turns)
        - Advance the target's turn counter by +1; activeness is determined by (currentTurn - lastShownTurn)
- Quiz import
    - Import quizs from CSV, 1st column question, 2nd column answer; can choose whether 1st row is header
    - Normalize on import (trim whitespace, case-fold, Unicode normalize); deduplicate identical (question, answer) per target
    - Validate CSV is valid and has at least M+C quizs on first import; later imports have no minimum
- Configuration
    - User can customize N, M, C, p_n, p_w, p_c
    - Choices per prompt are always M; when a category is unavailable, re-normalize remaining weights

## Screens
- Top screen = Choose targets or Create a new target
    - For target, show name and stats, clickable -> go to practice page
    - Create a new target: target name and import file (CSV)
- Practice screen
    - From top to bottom
        - Count of trials done today
        - Quiz card (with status, success rate, # of trials)
        - Choices (clickable)
    - User workflow is in key concepts
    - Effect:
        - Success: animation
        - Failure: animation (like screen shake)
        - New to Confident: flash, animation, and shake
        - Wandering to Confident: flash, animation and shake, with hit stop and slow motion
- Review screen
    - From top to bottom
        - Cumulative number of trials done
        - Size of category: New / Wandering / Confident 
        - Recent daily completion for 1 week
        - Import more quiz as CSV (here don't need to have M+C rows restriction)

### Fixed parts
- Top-left = return to top screen
- Top-right = switch practice / review
- Top-center = Show target name and stats (update for each quiz completion)

## Components
- Quiz DB
- Quiz Engine
- Frontend

Maybe preferred to implement everything in TypeScript

## Scope & Implementation Notes
- Single-user local app (no authentication).
- Stateless engine: recompute per answer; no server session state.
- Cooldown is turn-based: each answer increments a turn; a quiz reactivates after C turns.
- Choices per prompt are always M (the queue size).
- Answer matching: light normalization at import (trim, case-fold, Unicode normalize); no synonyms/aliases. Disputes can be recorded and later added as new quizzes.
- CSV import appends and deduplicates by (question, answer); first import requires ≥ M+C rows; later imports have no minimum.
- When a category has no active quizzes, re-normalize remaining weights and pick by weight.
- No edit/delete for targets or quizzes initially.
- “Today” uses local device time; review chart shows last 7 days including zeros.
- UI in English; quiz content can be any language (Japanese supported).
- Animations always on for now.
- Scale: typical up to ~10k quizzes per target; upper bound ~1M. Plan indexes and batched/streaming imports.

## Style

Normal background
--cyber-dark: #0A0A07;

Normal font color / line color
--cyber-teal: #92E4DD;

Emphasis color
--cyber-gold: #C4B643; 

Other colors:
--card-red: #F9386D; 
--card-green: #39FF14; 
--card-gray: #E0E0E0; 
--card-orange: #FF6B00;


Font:
--font-sans: Monaco, 'Nunito Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
--font-serif: Georgia, serif; 
--font-mono: Monaco, 'SF Mono', Menlo, 'Consolas', 'Liberation Mono', monospace;