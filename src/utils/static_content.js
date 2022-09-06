export const generateStaticContent = (number = 1) =>
  Array.from(
    Array(number),
    (_, index) => `
      <div class="gl-mb-8">
        <h4 class="gl-mb-4">View jobs in a pipeline ${index}</h4>
        <p>
          Pipeline configuration begins with jobs. Jobs are the most fundamental element of a .gitlab-ci.yml file.
        </p>
        <p>Jobs are:</p>
        <ul>
          <li>Defined with constraints stating under what conditions they should be executed. </li>
          <li>Top-level elements with an arbitrary name and must contain at least the script clause.</li>
          <li>Not limited in how many can be defined.</li>
        </ul>
        <p>For example:</p>
        <gl-markdown compact>
          <code>job1: script: "execute-script-for-job1"</code>
          <br />
          <code>job2: script: "execute-script-for-job2"</code>
        </gl-markdown>
      </div>
    `
  ).join('');

export const generateContent = (items) =>
  items
    .map(
      (str) => `
    <div>
      <label class="gl-font-weight-bold">${str}</label>
      <div>None</div>
    </div>
    `
    )
    .join('');
