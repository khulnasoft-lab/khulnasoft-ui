function legacyClassToImportant(klass) {
  return klass.endsWith('!') ? klass : `${klass}!`;
}

function tailwindClassToImportant(klass) {
  if (klass.includes('!gl-')) {
    return klass;
  } else {
    return klass.replace(/(^|:)(-?gl-)/, '$1!$2');
  }
}

function filterOutNonStringValues(rawMigrations) {
  return Object.entries(rawMigrations).filter(([, to]) => typeof to === 'string');
}

function addImportantVariants(rawMigrations) {
  const map = rawMigrations.reduce((acc, [from, to]) => {
    acc.set(from, to);
    const importantFrom = legacyClassToImportant(from);

    if (!Object.hasOwn(rawMigrations, importantFrom)) {
      const importantTo = tailwindClassToImportant(to);
      acc.set(importantFrom, importantTo);
    }

    return acc;
  }, new Map());
  return Array.from(map.entries()).map(([from, to]) => ({ from, to }));
}

function addFromRegExps(rawMigrations) {
  const classChars = ['-', '\\w', '!', ':'].join('|');

  return rawMigrations.map((migration) => ({
    ...migration,
    fromRegExp: new RegExp(`(?<!${classChars})${migration.from}(?!${classChars})`, 'g'),
  }));
}

function sortMigrations(unsortedMigrations) {
  return (
    unsortedMigrations
      .slice()
      // Migrate "foobar" and "bar foo" before "foo" so we don't incorrectly
      // migrate "foo".
      .sort((a, b) => {
        if (a.from.length < b.from.length) return 1;
        if (a.from.length > b.from.length) return -1;
        return 0;
      })
  );
}

export async function parseMigrations(obj) {
  try {
    return sortMigrations(addFromRegExps(addImportantVariants(filterOutNonStringValues(obj))));
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

export function runMigrations(contents, migrationsToDo) {
  let newContents = contents;
  for (const { fromRegExp, to } of migrationsToDo) {
    newContents = newContents.replaceAll(fromRegExp, to);
  }

  return newContents;
}
