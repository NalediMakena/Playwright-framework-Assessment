
const fs = require('fs');
const path = require('path');
const { Reporter } = require('@playwright/test/reporter');

class MonocartReporter {
  onBegin(config, suite) {
    this.results = [];
  }

  onTestEnd(test, result) {
    this.results.push({
      title: test.title,
      file: test.location.file,
      status: result.status,
      duration: result.duration,
      errors: result.errors.map(e => (typeof e === 'string' ? e : JSON.stringify(e)))
    });
  }

  async onEnd() {
    const out = path.resolve(process.cwd(), 'monocart-report.html');
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const total = this.results.length;

    const rows = this.results
      .map(
        r => `<tr><td>${r.title}</td><td>${r.file}</td><td>${r.status}</td><td>${r.duration}</td><td><pre>${r.errors.join('\n')}</pre></td></tr>`
      )
      .join('\n');

    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Monocart Report</title>
<style>body{font-family:Arial,Helvetica,sans-serif}.passed{color:green}.failed{color:red}</style></head>
<body>
  <h1>Monocart Report</h1>
  <p>Total: ${total} | Passed: <span class="passed">${passed}</span> | Failed: <span class="failed">${failed}</span></p>
  <table border="1" cellpadding="6" cellspacing="0">
    <thead><tr><th>Test</th><th>File</th><th>Status</th><th>Duration(ms)</th><th>Errors</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
</body></html>`;

    fs.writeFileSync(out, html, 'utf8');
    console.log(`Monocart report generated: ${out}`);
  }
}

module.exports = MonocartReporter;
