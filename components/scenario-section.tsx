export function ScenarioSection() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-text-primary">1. Use-Case Scenarios</h2>
        <div className="pl-4 space-y-4">
          <p className="text-text-secondary">You do not have to build every single FAS into every use-case.</p>
          <p className="text-text-secondary">
            Instead, each pre-defined scenario is mapped to the one AAOIFI FAS that governs that transaction.
          </p>
          <ul className="list-disc pl-8 space-y-2 text-text-secondary">
            <li>E.g. Ijarah MBT → FAS 4</li>
            <li>A Murabaha sale scenario → FAS 28</li>
          </ul>
          <p className="text-text-secondary">
            Your AI prototype must "bridge the gap" between the scenario's "correct answer" and the AI's answer for that
            one standard.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-text-primary">2. Reverse-Transaction Category</h2>
        <div className="pl-4">
          <ul className="list-disc pl-8 space-y-2 text-text-secondary">
            <li>Here you're given journal-entry snippets without context.</li>
            <li>Task: infer which FAS(s) could apply, rank by probability, and explain.</li>
            <li>You may need to consider more than one FAS—but only those relevant to the entries shown.</li>
            <li>E.g. an equity buy-out entry may point primarily to FAS 4, secondarily to FAS 20 or FAS 32.</li>
            <li>A cost-reversal entry under a construction contract points to FAS 10.</li>
          </ul>
          <p className="text-text-secondary mt-2">
            You are not required to test every FAS on every reverse-txn—only those that plausibly govern the
            transaction.
          </p>
        </div>
      </section>
    </div>
  )
}
