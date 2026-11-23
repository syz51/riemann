# Working rules for this repository

The owner set these rules on 22 November 2026. They take precedence over the global defaults for delegation and review.

- **Purpose.** This is the owner's study project: first understand the proof, then try to simplify it.
- **Parallel work.** Work mostly in one thread. Start a parallel agent only when the owner asks, or for a tool the session lacks, such as a page fetch.
- **Review.** Run the `reviewer` agent only on a commit that holds finished content, such as a completed note. Do not run it on small changes: configuration, registry entries, drafts or work in progress.
- **Simplification.** When a step of the argument looks longer than it needs to be, record it in `docs/notes/simplifications.md` with the reason and the Lean declarations it concerns.
- **Reading.** Never download or read the Lean library in bulk. Fetch single files from the pinned repository (see README, "Pinned sources").
- **Walk-through first.** The chat is where the owner learns; the notes are the record. Work in small steps. For each step, show it in the chat before or while writing the note: what we look at, the Lean lines, what they mean in plain words, and each new term explained when it first appears. Then stop and let the owner ask questions before the next step. Do not finish several notes in a row without a walk-through.
- **Sources in the chat too.** Do not explain mathematics or its history from memory. Look each fact up, cite the source in the reply, and say which facts stay unchecked. The owner set this rule on 23 November 2026.
