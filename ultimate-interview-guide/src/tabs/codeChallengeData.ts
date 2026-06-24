export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface CodeChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  pattern: string;
  problem: string;
  approach: string[];
  example: string;
  traps: string[];
  solution: string;
}

export const CATEGORIES = [
  { id: 'basics', label: 'Basics' },
  { id: 'fundamentals', label: 'Fundamentals' },
  { id: 'tree-traversal', label: 'Tree Traversal' },
  { id: 'core-patterns', label: 'Core Patterns' },
  { id: 'business-logic', label: 'Business Logic' },
  { id: 'algorithms', label: 'Algorithms' },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 01 — Basics
// ─────────────────────────────────────────────────────────────────────────────

const BASICS: CodeChallenge[] = [
  {
    id: 'dequeue-item',
    title: 'Dequeue One Item',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Destructuring / Immutable Array',
    problem:
      'Remove and return the first item from a queue without mutating the original array. Return both the removed item and the remaining queue.',
    approach: [
      'Use array destructuring: const [item, ...rest] = queue',
      'Return { item, queue: rest } — never splice or shift the original',
      'Handle empty queue: item will be undefined, rest will be []',
      'The generic type T ensures type safety across any element type',
    ],
    example: `dequeueOne([1, 2, 3])
// { item: 1, queue: [2, 3] }

dequeueOne([])
// { item: undefined, queue: [] }`,
    traps: [
      'Using shift() which mutates the original array',
      'Returning the original array reference instead of a new array',
      'Forgetting that the return type has both item AND queue fields',
    ],
    solution: `export function dequeueOne<T>(queue: T[]): { item: T | undefined; queue: T[] } {
  const [item, ...rest] = queue;
  return { item, queue: rest };
}`,
  },

  {
    id: 'exponential-backoff',
    title: 'Exponential Backoff Schedule',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Math / Loop',
    problem:
      'Build a retry delay schedule where each attempt waits longer than the last. Given a base delay, number of retries, a growth factor, and a maximum cap, return an array of delay values in milliseconds.',
    approach: [
      'Validate inputs first: retries >= 0, baseMs >= 0, factor >= 1, maxDelayMs >= 0',
      'Loop from i = 0 to retries - 1',
      'Each delay = baseMs * factor^i, capped at maxDelayMs',
      'Use Math.pow(factor, i) for the exponential growth',
      'Use Math.min(raw, maxDelayMs) to apply the cap',
    ],
    example: `buildBackoffSchedule(100, 4, 2, 1000)
// [100, 200, 400, 800]

buildBackoffSchedule(100, 4, 2, 300)
// [100, 200, 300, 300]  ← capped`,
    traps: [
      'Not capping: schedule can explode to huge numbers without Math.min',
      'Off-by-one: retries = 4 means 4 entries, loop 0..3',
      'Forgetting to validate: retries < 0 or factor < 1 should throw',
    ],
    solution: `export function buildBackoffSchedule(
  baseMs: number,
  retries: number,
  factor: number,
  maxDelayMs: number
): number[] {
  if (retries < 0) throw new Error("retries must be non-negative");
  if (baseMs < 0 || factor < 1 || maxDelayMs < 0) throw new Error("invalid backoff parameters");

  const schedule: number[] = [];
  for (let i = 0; i < retries; i++) {
    const raw = baseMs * Math.pow(factor, i);
    schedule.push(Math.min(raw, maxDelayMs));
  }
  return schedule;
}`,
  },

  {
    id: 'find-in-grid',
    title: 'Find First in Grid',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Grid Scan',
    problem:
      'Search a 2D string grid row by row, left to right. Return the [row, col] coordinates of the first matching cell, or null if the target is not found.',
    approach: [
      'Outer loop over rows (r = 0 to grid.length - 1)',
      'Inner loop over columns (c = 0 to grid[r].length - 1)',
      'Return [r, c] immediately on first match — do not continue scanning',
      'Return null after both loops exhaust without a match',
    ],
    example: `findFirstInGrid([['a','b'],['c','d']], 'c')
// [1, 0]

findFirstInGrid([['a','b']], 'z')
// null`,
    traps: [
      'Scanning the whole grid even after finding the target — use early return',
      'Returning the value instead of the coordinates',
      'Assuming a rectangular grid — use grid[r].length for each row',
    ],
    solution: `export function findFirstInGrid(
  grid: string[][],
  target: string
): [number, number] | null {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === target) return [r, c];
    }
  }
  return null;
}`,
  },

  {
    id: 'immutable-nested-update',
    title: 'Immutable Nested Update',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Immutable Update / Map',
    problem:
      'Toggle the done field on a specific todo item without mutating the original array. Return a new array where only the matching item is changed.',
    approach: [
      'Use Array.map() to iterate — it always returns a new array',
      'For non-matching items, return the original reference unchanged',
      'For the matching item, return { ...todo, done: !todo.done }',
      'Never splice, push, or directly assign to the original array',
    ],
    example: `const todos = [{ id: 'a', title: 'Buy milk', done: false }];
toggleTodo(todos, 'a')
// [{ id: 'a', title: 'Buy milk', done: true }]
// todos is unchanged`,
    traps: [
      'Mutating the original: todo.done = !todo.done instead of spreading',
      'Returning undefined for non-matching items (forgetting the return todo)',
      'Using forEach which does not return a new array',
    ],
    solution: `export type Todo = { id: string; title: string; done: boolean };

export function toggleTodo(todos: Todo[], id: string): Todo[] {
  return todos.map((todo) => {
    if (todo.id !== id) return todo;
    return { ...todo, done: !todo.done };
  });
}`,
  },

  {
    id: 'matrix-sum',
    title: 'Matrix Sum',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Nested Iteration',
    problem:
      'Sum all numeric values in a 2D array (matrix). The matrix may have any number of rows and columns, including jagged shapes.',
    approach: [
      'Initialize total = 0',
      'Outer loop over each row',
      'Inner loop over each value in that row',
      'Add each value to total',
      'Return total — no edge-case special handling needed for empty matrix',
    ],
    example: `sumMatrix([[1, 2], [3, 4]])  // 10
sumMatrix([[5]])             // 5
sumMatrix([])                // 0`,
    traps: [
      'Using reduce on the outer array and forgetting to reduce the inner row too',
      'Assuming the matrix is square — always iterate grid[r] per row',
    ],
    solution: `export function sumMatrix(matrix: number[][]): number {
  let total = 0;
  for (const row of matrix) {
    for (const value of row) {
      total += value;
    }
  }
  return total;
}`,
  },

  {
    id: 'rest-parameters',
    title: 'Rest Parameters Sum',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Rest / Spread',
    problem:
      'Write a function that accepts any number of numeric arguments and returns their sum. Callers should be able to call it with 0, 1, or many arguments.',
    approach: [
      'Use rest parameter syntax: ...nums: number[]',
      'Iterate over nums and accumulate the total',
      'Handle zero arguments: return 0',
    ],
    example: `sumAll(1, 2, 3)  // 6
sumAll(10)       // 10
sumAll()         // 0`,
    traps: [
      'Passing an array instead of spreading: sumAll([1,2,3]) — rest params capture individual args',
      'Forgetting that ...nums is typed as number[], not a single number',
    ],
    solution: `export function sumAll(...nums: number[]): number {
  let total = 0;
  for (const n of nums) total += n;
  return total;
}`,
  },

  {
    id: 'spread-arrays',
    title: 'Move to Front',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Spread / Filter',
    problem:
      'Given an array and a target item, return a new array with all occurrences of the target removed from their original positions and placed at the front.',
    approach: [
      'Filter out all occurrences of item from the original array',
      'Prepend item using spread: [item, ...withoutItem]',
      'Return the new array — never mutate the original',
    ],
    example: `moveToFront(['a', 'b', 'c', 'a'], 'a')
// ['a', 'b', 'c']  — duplicates removed, 'a' at front`,
    traps: [
      'Using indexOf and splice which mutate the original',
      'Only moving the first occurrence instead of all occurrences',
      'Forgetting to handle item not present in array (filter returns original minus nothing, then prepend)',
    ],
    solution: `export function moveToFront<T>(items: T[], item: T): T[] {
  const withoutItem = items.filter((value) => value !== item);
  return [item, ...withoutItem];
}`,
  },

  {
    id: 'spread-objects',
    title: 'Apply User Patch',
    category: 'basics',
    difficulty: 'Easy',
    pattern: 'Spread / Nested Merge',
    problem:
      'Apply a partial patch to a user object. Top-level fields from the patch override the user. For the nested profile field, merge the patch profile into the existing profile rather than replacing it entirely.',
    approach: [
      'If patch.profile exists, create nextProfile = { ...user.profile, ...patch.profile }',
      'Otherwise, keep nextProfile = user.profile as-is',
      'Spread the base user, then the patch, then override profile: { ...user, ...patch, profile: nextProfile }',
      'Spreading patch after user handles all top-level field overrides automatically',
    ],
    example: `applyUserPatch(
  { id:'1', name:'Alice', isAdmin:false, profile:{ city:'NY', timezone:'EST' } },
  { profile: { city: 'LA' } }
)
// { id:'1', name:'Alice', isAdmin:false, profile:{ city:'LA', timezone:'EST' } }`,
    traps: [
      'Spreading patch.profile directly which completely replaces user.profile',
      'Not handling the case where patch.profile is undefined (would erase profile)',
      'Mutating user.profile directly instead of creating a new object',
    ],
    solution: `export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
  profile: { city: string; timezone: string };
};

export type UserPatch = Partial<Omit<User, "profile">> & {
  profile?: Partial<User["profile"]>;
};

export function applyUserPatch(user: User, patch: UserPatch): User {
  const nextProfile = patch.profile
    ? { ...user.profile, ...patch.profile }
    : user.profile;
  return { ...user, ...patch, profile: nextProfile };
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 02 — Fundamentals
// ─────────────────────────────────────────────────────────────────────────────

const FUNDAMENTALS: CodeChallenge[] = [
  {
    id: 'modulo-normalization',
    title: 'Modulo Normalization',
    category: 'fundamentals',
    difficulty: 'Easy',
    pattern: 'Modular Arithmetic',
    problem:
      'Normalize any integer (including negative values) into a valid index in the range [0, bucketCount - 1]. JavaScript\'s % operator returns negative results for negative inputs, so a double-modulo pattern is needed.',
    approach: [
      'Validate: bucketCount must be a positive integer',
      'Apply double-modulo: ((value % n) + n) % n',
      'The first % keeps magnitude in range, the + n lifts negatives above 0, the second % brings back into range',
    ],
    example: `normalizeToRange(7, 5)   // 2
normalizeToRange(-1, 5)  // 4  ← not -1
normalizeToRange(10, 5)  // 0`,
    traps: [
      'Using value % n alone — returns negative for negative inputs in JS',
      'Forgetting to validate bucketCount > 0 (division by zero)',
      'Using Math.abs() first — changes the logical position, not just the sign',
    ],
    solution: `export function normalizeToRange(value: number, bucketCount: number): number {
  if (!Number.isInteger(bucketCount) || bucketCount <= 0) {
    throw new Error("bucketCount must be a positive integer");
  }
  return ((value % bucketCount) + bucketCount) % bucketCount;
}`,
  },

  {
    id: 'multiples-count',
    title: 'Count Multiples in Range',
    category: 'fundamentals',
    difficulty: 'Medium',
    pattern: 'Math / Counting',
    problem:
      'Count how many multiples of step exist in the inclusive range [start, end]. Inputs are non-negative integers.',
    approach: [
      'Validate all inputs are integers; step must be positive',
      'Count multiples up to end: Math.floor(end / step)',
      'Count multiples up to start - 1: Math.floor((start - 1) / step)',
      'Result = multiplesUpToEnd - multiplesBeforeStart',
      'If start > end, return 0 immediately',
    ],
    example: `countMultiplesInRange(1, 10, 3)  // 3  (3, 6, 9)
countMultiplesInRange(0, 10, 5)  // 3  (0, 5, 10)
countMultiplesInRange(5, 3, 2)   // 0  (start > end)`,
    traps: [
      'Iterating from start to end — O(n) when O(1) math works',
      'Off-by-one: the range is inclusive on both ends',
      'Forgetting that 0 is a multiple of any step',
    ],
    solution: `export function countMultiplesInRange(start: number, end: number, step: number): number {
  if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(step))
    throw new Error("start, end, and step must be integers");
  if (step <= 0) throw new Error("step must be a positive integer");
  if (start < 0 || end < 0) throw new Error("start and end must be non-negative");
  if (start > end) return 0;

  const multiplesUpToEnd = Math.floor(end / step);
  const multiplesBeforeStart = Math.floor((start - 1) / step);
  return multiplesUpToEnd - multiplesBeforeStart;
}`,
  },

  {
    id: 'negative-range-count',
    title: 'Signed Multiples in Range',
    category: 'fundamentals',
    difficulty: 'Medium',
    pattern: 'Math / Counting',
    problem:
      'Count multiples of step in an inclusive signed range [start, end]. Unlike the basics version, start and end may be negative integers.',
    approach: [
      'Validate step > 0; return 0 if start > end',
      'Smallest multiple >= start: kMin = Math.ceil(start / step)',
      'Largest multiple <= end: kMax = Math.floor(end / step)',
      'Count = max(0, kMax - kMin + 1)',
      'Math.ceil handles negative start correctly',
    ],
    example: `countSignedMultiplesInRange(-6, 6, 3)  // 5  (-6,-3,0,3,6)
countSignedMultiplesInRange(-5, -1, 2) // 2  (-4,-2)`,
    traps: [
      'Using the non-negative formula — Math.floor((start - 1) / step) breaks for negatives',
      'Forgetting kMax - kMin + 1 can be negative; wrap with Math.max(0, ...)',
    ],
    solution: `export function countSignedMultiplesInRange(start: number, end: number, step: number): number {
  if (!Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(step))
    throw new Error("start, end, and step must be integers");
  if (step <= 0) throw new Error("step must be a positive integer");
  if (start > end) return 0;

  const kMin = Math.ceil(start / step);
  const kMax = Math.floor(end / step);
  return Math.max(0, kMax - kMin + 1);
}`,
  },

  {
    id: 'final-value-and-count',
    title: 'Final Bucket & Wrap Count',
    category: 'fundamentals',
    difficulty: 'Medium',
    pattern: 'Modular Arithmetic',
    problem:
      'Given a starting bucket index, an advance amount, and the total number of buckets, compute the final bucket index and how many times the sequence wrapped around the ring.',
    approach: [
      'Validate all inputs are integers, bucketCount > 0, startBucket in [0, bucketCount-1], advanceBy >= 0',
      'total = startBucket + advanceBy',
      'finalBucket = total % bucketCount',
      'wrapCount = Math.floor(total / bucketCount)',
    ],
    example: `summarizeAdvance(3, 5, 7)  // { finalBucket: 1, wrapCount: 1 }
// 3 + 5 = 8; 8 % 7 = 1; 8 / 7 = 1 wrap`,
    traps: [
      'Using modulo alone without computing the wrap count separately',
      'Not validating that startBucket is within [0, bucketCount-1]',
    ],
    solution: `export function summarizeAdvance(
  startBucket: number,
  advanceBy: number,
  bucketCount: number
): { finalBucket: number; wrapCount: number } {
  if (!Number.isInteger(startBucket) || !Number.isInteger(advanceBy) || !Number.isInteger(bucketCount))
    throw new Error("startBucket, advanceBy, and bucketCount must be integers");
  if (bucketCount <= 0) throw new Error("bucketCount must be a positive integer");
  if (startBucket < 0 || startBucket >= bucketCount)
    throw new Error("startBucket must be in range [0, bucketCount - 1]");
  if (advanceBy < 0) throw new Error("advanceBy must be non-negative for this drill");

  const total = startBucket + advanceBy;
  return {
    finalBucket: total % bucketCount,
    wrapCount: Math.floor(total / bucketCount),
  };
}`,
  },

  {
    id: 'signed-movement-range-count',
    title: 'Signed Movement & Boundary Events',
    category: 'fundamentals',
    difficulty: 'Hard',
    pattern: 'Modular Arithmetic',
    problem:
      'Compute the final bucket after a signed delta (positive or negative advance) and count how many times a boundary (index 0 when moving forward, index bucketCount-1 when moving backward) was crossed. Return a signed boundary count.',
    approach: [
      'Validate inputs; allow negative delta',
      'finalBucket = ((startBucket + delta) % bucketCount + bucketCount) % bucketCount',
      'If delta == 0: boundaryEvents = 0',
      'Forward (delta > 0): count multiples of bucketCount in (startBucket, startBucket + delta] using ceil/floor',
      'Backward (delta < 0): count multiples in [startBucket + delta, startBucket) and negate',
      'Helper: countMultiplesInclusive(start, end, step) returns max(0, floor(end/step) - ceil(start/step) + 1)',
    ],
    example: `summarizeSignedAdvance(6, 5, 7)   // { finalBucket: 4, boundaryEvents: 1 }
summarizeSignedAdvance(2, -5, 7)  // { finalBucket: 4, boundaryEvents: -1 }`,
    traps: [
      'Using the non-negative wrap formula for backward movement',
      'Not negating the backward boundary count',
      'Off-by-one: forward boundary events use open start (startBucket + 1), closed end (raw)',
    ],
    solution: `function countMultiplesInclusive(start: number, end: number, step: number): number {
  if (start > end) return 0;
  const kMin = Math.ceil(start / step);
  const kMax = Math.floor(end / step);
  return Math.max(0, kMax - kMin + 1);
}

export function summarizeSignedAdvance(
  startBucket: number,
  delta: number,
  bucketCount: number
): { finalBucket: number; boundaryEvents: number } {
  if (!Number.isInteger(startBucket) || !Number.isInteger(delta) || !Number.isInteger(bucketCount))
    throw new Error("startBucket, delta, and bucketCount must be integers");
  if (bucketCount <= 0) throw new Error("bucketCount must be a positive integer");
  if (startBucket < 0 || startBucket >= bucketCount)
    throw new Error("startBucket must be in range [0, bucketCount - 1]");

  const raw = startBucket + delta;
  const finalBucket = ((raw % bucketCount) + bucketCount) % bucketCount;

  if (delta === 0) return { finalBucket, boundaryEvents: 0 };

  if (delta > 0) {
    const forwardEvents = countMultiplesInclusive(startBucket + 1, raw, bucketCount);
    return { finalBucket, boundaryEvents: forwardEvents };
  }

  const backwardEvents = countMultiplesInclusive(raw + 1, startBucket, bucketCount);
  return { finalBucket, boundaryEvents: -backwardEvents };
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 03 — Tree Traversal
// ─────────────────────────────────────────────────────────────────────────────

const TREE_TRAVERSAL: CodeChallenge[] = [
  {
    id: 'get-value-by-dot-path',
    title: 'Get Value by Dot Path',
    category: 'tree-traversal',
    difficulty: 'Easy',
    pattern: 'Object Traversal',
    problem:
      'Access a nested object value using a dot-delimited string path like "user.profile.city". Return undefined if any segment in the path is missing or the cursor becomes non-traversable.',
    approach: [
      'Split path on "." to get an array of key segments',
      'Initialize cursor = obj',
      'For each key, check cursor is non-null and is an object, then step: cursor = cursor[key]',
      'If cursor becomes null/undefined mid-path, return undefined',
      'Return the final cursor value',
    ],
    example: `getByPath({ user: { name: 'Alice' } }, 'user.name')  // 'Alice'
getByPath({ a: 1 }, 'a.b.c')                        // undefined`,
    traps: [
      'Not checking if cursor is an object before indexing — throws on primitives',
      'Using optional chaining naively without handling array paths',
      'Confusing undefined (missing key) with null (explicitly set)',
    ],
    solution: `export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = obj;
  for (const key of path.split(".")) {
    if (cursor == null) return undefined;
    if (typeof cursor !== "object" && typeof cursor !== "function") return undefined;
    cursor = (cursor as Record<string, unknown>)[key];
  }
  return cursor;
}`,
  },

  {
    id: 'max-folder-depth',
    title: 'Max Folder Depth',
    category: 'tree-traversal',
    difficulty: 'Easy',
    pattern: 'Recursive DFS',
    problem:
      'Given a file system tree where each node has a name, type ("file" | "folder"), and optional children, return the maximum nesting depth of folder nodes.',
    approach: [
      'Base case: if root has no children or empty children, depth = 1',
      'Recurse: map children to their depths, take Math.max(...childDepths)',
      'Return 1 + maxChildDepths',
      'Depth is 1-indexed (root itself counts as depth 1)',
    ],
    example: `maxFolderDepth({ name:'/', type:'folder', children:[
  { name:'a', type:'folder', children:[ { name:'b.txt', type:'file' } ] }
]})  // 2`,
    traps: [
      'Returning 0 for leaf nodes — depth 1 means the folder itself',
      'Spreading an empty array into Math.max: Math.max() returns -Infinity',
      'Not recursing into file-type nodes (they can be children but add no depth)',
    ],
    solution: `export interface FileSystemNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemNode[];
}

export function maxFolderDepth(root: FileSystemNode): number {
  if (!root.children?.length) return 1;
  const childDepths = root.children.map(child => maxFolderDepth(child));
  return 1 + Math.max(...childDepths);
}`,
  },

  {
    id: 'count-enabled-flags',
    title: 'Count Enabled Feature Flags',
    category: 'tree-traversal',
    difficulty: 'Easy',
    pattern: 'Recursive DFS',
    problem:
      'Given a tree of feature flag nodes (each with an enabled boolean and optional children), count the total number of nodes where enabled is true.',
    approach: [
      'Start count = root.enabled ? 1 : 0',
      'For each child, recursively call countEnabledFlags and add result to count',
      'Use the nullish coalescing operator for optional children: root.children ?? []',
      'Return count',
    ],
    example: `countEnabledFlags({
  enabled: true,
  children: [{ enabled: false }, { enabled: true }]
})  // 2`,
    traps: [
      'Not handling missing children (use ?? [] or optional chaining)',
      'Counting disabled nodes by accident — check enabled explicitly',
      'Iterating children without recursing (misses deeper nesting)',
    ],
    solution: `export interface FeatureNode {
  enabled: boolean;
  children?: FeatureNode[];
}

export function countEnabledFlags(root: FeatureNode): number {
  let count = root.enabled ? 1 : 0;
  for (const child of root.children ?? []) {
    count += countEnabledFlags(child);
  }
  return count;
}`,
  },

  {
    id: 'extract-leaf-values',
    title: 'Extract Leaf Values',
    category: 'tree-traversal',
    difficulty: 'Medium',
    pattern: 'Recursive DFS / Flatten',
    problem:
      'Recursively extract all primitive leaf values (string, number, boolean) from a deeply nested object/array structure. Null, undefined, and objects themselves are not leaves.',
    approach: [
      'If the value is a primitive (string | number | boolean), return [value]',
      'If null or undefined, return []',
      'If array, flatMap each item recursively',
      'If object, flatMap Object.values() recursively',
      'Cover all branches before the default return []',
    ],
    example: `extractLeafValues({ a: 1, b: { c: [2, 'hi'] } })
// [1, 2, 'hi']

extractLeafValues([true, null, { x: 3 }])
// [true, 3]`,
    traps: [
      'Checking typeof === "object" — null also satisfies this; check null first',
      'Not handling arrays separately — they are objects but need different iteration',
      'Returning the container object itself as a leaf',
    ],
    solution: `export type Primitive = string | number | boolean;

export function extractLeafValues(data: unknown): Primitive[] {
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') return [data];
  if (data == null) return [];
  if (Array.isArray(data)) return data.flatMap(item => extractLeafValues(item));
  if (typeof data === 'object') return Object.values(data).flatMap(item => extractLeafValues(item));
  return [];
}`,
  },

  {
    id: 'build-tree-from-paths',
    title: 'Build Tree from Paths',
    category: 'tree-traversal',
    difficulty: 'Medium',
    pattern: 'Object Construction / Path Traversal',
    problem:
      'Given an array of file path strings (e.g. "src/utils/helpers"), build a nested object tree representing the directory structure. Handle ".." (go up) and "." (current dir) segments.',
    approach: [
      'Start with result = {}',
      'For each path, split on "/" and resolve ".." and "." using a pathStack',
      'Walk through the pathStack, creating nested objects at each level',
      'Use a cursor starting at result, walking down (creating nodes as needed)',
      'Never assign values — leaf nodes are just empty objects {}',
    ],
    example: `buildTree(['src/utils', 'src/components'])
// { src: { utils: {}, components: {} } }

buildTree(['a/../b'])
// { b: {} }`,
    traps: [
      'Not handling ".." — must pop from pathStack, not the result object',
      'Forgetting to skip empty strings from split (leading/trailing slashes)',
      'Reassigning cursor[path] = {} even if the key already exists — use ||= or check first',
    ],
    solution: `export function buildTree(paths: string[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const path of paths) {
    const pathStack: string[] = [];
    for (const part of path.split("/")) {
      if (part === "." || part === "") continue;
      if (part === "..") pathStack.pop();
      else pathStack.push(part);
    }

    let cursor = result;
    for (const key of pathStack) {
      if (!cursor[key]) cursor[key] = {};
      cursor = cursor[key] as Record<string, unknown>;
    }
  }

  return result;
}`,
  },

  {
    id: 'validate-required-config-fields',
    title: 'Validate Required Config Fields',
    category: 'tree-traversal',
    difficulty: 'Medium',
    pattern: 'Object Traversal / Validation',
    problem:
      'Given a config object and an array of required dot-path strings, return the list of paths that are missing or empty. A value is "missing" if it is undefined, null, or an empty string — but NOT if it is 0, false, or an empty array.',
    approach: [
      'For each required path, traverse the config using dot-path splitting',
      'If any segment does not exist or cursor becomes non-object, mark as missing',
      'At the final value, check: undefined, null, or "" → missing',
      'Collect and return only the missing paths',
    ],
    example: `validateRequired({ db: { host: 'localhost', port: 0 } }, ['db.host', 'db.port', 'db.name'])
// ['db.name']  — port is 0 which is valid, name is missing`,
    traps: [
      'Treating 0 or false as missing — only undefined, null, and "" are missing',
      'Using optional chaining which silently swallows missing keys without recording them',
      'Not handling intermediate missing segments (e.g. path a.b.c when a.b doesn\'t exist)',
    ],
    solution: `function getByPath(obj: Record<string, unknown>, path: string): unknown {
  let cursor: unknown = obj;
  for (const key of path.split(".")) {
    if (cursor == null) return undefined;
    if (typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<string, unknown>)[key];
  }
  return cursor;
}

function isMissing(value: unknown): boolean {
  return value == null || value === "";
}

export function validateRequired(
  config: Record<string, unknown>,
  requiredPaths: string[]
): string[] {
  return requiredPaths.filter(path => isMissing(getByPath(config, path)));
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 04 — Core Patterns
// ─────────────────────────────────────────────────────────────────────────────

const CORE_PATTERNS: CodeChallenge[] = [
  {
    id: 'state-machine',
    title: 'Resolve Approval Chain',
    category: 'core-patterns',
    difficulty: 'Easy',
    pattern: 'State Machine / Early Exit',
    problem:
      'Given an ordered list of approvers, each with a status of "approved", "rejected", or "pending", determine the overall outcome. Process approvals in order and short-circuit on the first non-approved status.',
    approach: [
      'Return "approved" immediately for an empty list',
      'Iterate in order: if any status is "rejected", return "rejected" immediately',
      'If any status is "pending", return "pending" immediately',
      'If all are "approved", return "approved"',
    ],
    example: `resolveChain([
  { approver: 'alice', status: 'approved' },
  { approver: 'bob', status: 'pending' },
])  // 'pending'`,
    traps: [
      'Iterating the whole list without early exit — "rejected" must take priority over earlier items, but first-encountered wins',
      'Handling "pending" before "rejected" incorrectly — process in order, reject wins only if it appears first',
    ],
    solution: `export type Approval = {
  approver: string;
  status: "approved" | "rejected" | "pending";
};

export function resolveChain(approvals: Approval[]): "approved" | "rejected" | "pending" {
  if (approvals.length === 0) return 'approved';
  for (const approval of approvals) {
    if (approval.status === 'rejected') return 'rejected';
    if (approval.status === 'pending') return 'pending';
  }
  return 'approved';
}`,
  },

  {
    id: 'lookup-indexing',
    title: 'Group Activity by Date',
    category: 'core-patterns',
    difficulty: 'Easy',
    pattern: 'Lookup / Indexing',
    problem:
      'Given an array of activity records (each with id, date, action), group them into a dictionary keyed by date. Each date maps to an array of all activities on that date.',
    approach: [
      'Initialize result as an empty Record<string, Activity[]>',
      'Iterate activities; for each, use activity.date as the key',
      'If the key does not exist yet, initialize to []',
      'Append the activity to its group',
      'Return the grouped result',
    ],
    example: `groupByDate([
  { id:'1', date:'2024-01-15', action:'login' },
  { id:'2', date:'2024-01-15', action:'logout' },
])
// { '2024-01-15': [{ id:'1', ... }, { id:'2', ... }] }`,
    traps: [
      'Overwriting existing entries instead of appending: result[date] = [activity] instead of pushing',
      'Mutating the activity objects themselves',
    ],
    solution: `export type Activity = { id: string; date: string; action: string };

export function groupByDate(activities: Activity[]): Record<string, Activity[]> {
  const grouped: Record<string, Activity[]> = {};
  for (const activity of activities) {
    grouped[activity.date] = [...(grouped[activity.date] ?? []), activity];
  }
  return grouped;
}`,
  },

  {
    id: 'mapping-normalization',
    title: 'Extract Leaf Values (Flat)',
    category: 'core-patterns',
    difficulty: 'Easy',
    pattern: 'Mapping / Normalization',
    problem:
      'Recursively flatten all primitive leaf values from a nested structure (objects and arrays). This is the same recursive leaf-extraction pattern used in tree traversal but as a standalone pattern practice.',
    approach: [
      'Handle null/undefined: return []',
      'Handle primitives directly: return [value]',
      'Handle arrays: flatMap each item recursively',
      'Handle objects: flatMap Object.values() recursively',
    ],
    example: `extractLeaves({ x: [1, { y: 2 }], z: 'hi' })
// [1, 2, 'hi']`,
    traps: [
      'Checking typeof === "object" before null — null passes this check',
      'Using Object.keys() without Object.values() — need values to recurse',
    ],
    solution: `export function extractLeaves(obj: unknown): Array<string | number | boolean> {
  if (obj == null) return [];
  if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') return [obj];
  if (Array.isArray(obj)) return obj.flatMap(item => extractLeaves(item));
  if (typeof obj === 'object') return Object.values(obj).flatMap(item => extractLeaves(item));
  return [];
}`,
  },

  {
    id: 'time-bucketing',
    title: 'Time Bucketing — Event Window Logger',
    category: 'core-patterns',
    difficulty: 'Medium',
    pattern: 'Time Bucketing / Stateful Logger',
    problem:
      'Implement a stateful logger that stores events with timestamps. Each call to logEvent stores the new event, then returns a string array where index 0 = events from the current minute, index 1 = events from 1 minute ago, etc.',
    approach: [
      'Maintain global state: eventLog array of { name, time } pairs',
      'On each call: push the new event with Date.now()',
      'Loop over all stored events and compute msElapsed = now - event.time',
      'Bucket index = Math.floor(msElapsed / 60_000)',
      'Append event name to buckets[minuteIndex] (comma-separated if multiple)',
      'Return the buckets array',
    ],
    example: `logEvent('click')   // ['click']
// (1 minute later)
logEvent('scroll')  // ['scroll', 'click']`,
    traps: [
      'Clearing the log on each call — old events are needed to build prior-minute buckets',
      'Using seconds instead of milliseconds: 60 not 60_000',
      'Sparse array gaps — if no event in a minute, that bucket index is undefined (that\'s correct)',
    ],
    solution: `let eventLog: Array<{ name: string; time: number }> = [];

export function logEvent(eventName: string): string[] {
  const now = Date.now();
  eventLog.push({ name: eventName, time: now });

  const buckets: string[] = [];
  eventLog.forEach((event) => {
    const msElapsed = now - event.time;
    const minuteIndex = Math.floor(msElapsed / 60_000);
    if (!buckets[minuteIndex]) buckets[minuteIndex] = event.name;
    else buckets[minuteIndex] += \`, \${event.name}\`;
  });

  return buckets;
}

export function resetLog(): void { eventLog = []; }`,
  },

  {
    id: 'aggregation-accumulation',
    title: 'Aggregation Accumulation',
    category: 'core-patterns',
    difficulty: 'Medium',
    pattern: 'Recursive Aggregation',
    problem:
      'Two problems: (1) Sum all numbers in an arbitrarily nested array structure. (2) Count all enabled feature flags in a tree of flag nodes, where each node has an enabled boolean and optional children.',
    approach: [
      'Problem 1: Check Array.isArray first, then recurse over items; base case returns the number',
      'Problem 2: Initialize count = 0, increment if flag.enabled is true, recurse into children',
      'Both use the same recursive accumulation pattern: handle base case, recurse children, sum results',
    ],
    example: `sumNested([1, [2, [3, 4]]])  // 10

countEnabled([
  { name:'A', enabled: true, children:[{ name:'B', enabled:false }] }
])  // 1`,
    traps: [
      'Forgetting the base case for sumNested — if not array, return the number directly',
      'countEnabled: not recursing into children of disabled nodes (children may still be enabled)',
    ],
    solution: `export type NestedNumber = number | NestedNumber[];

export function sumNested(input: NestedNumber): number {
  if (Array.isArray(input)) {
    let sum = 0;
    for (const item of input) sum += sumNested(item);
    return sum;
  }
  return input;
}

export type FlagNode = { name: string; enabled: boolean; children?: FlagNode[] };

export function countEnabled(flags: FlagNode[]): number {
  let count = 0;
  for (const flag of flags) {
    if (flag.enabled) count++;
    if (flag.children) count += countEnabled(flag.children);
  }
  return count;
}`,
  },

  {
    id: 'validation-rules-engine',
    title: 'Validation Rules Engine',
    category: 'core-patterns',
    difficulty: 'Medium',
    pattern: 'Tree Traversal / Validation',
    problem:
      'Two problems: (1) Collect all field names from a tree of form nodes (type "field" | "group", with optional children). (2) Find missing required fields in a config object using dot-path strings.',
    approach: [
      'Problem 1: Iterate nodes — if type is "field" and has a name, collect it; if type is "group", recurse into children',
      'Problem 2: For each required path, traverse the config step by step; mark missing if any step fails or final value is null/undefined/""',
      'Both use the same recursive form: handle current node, then recurse children',
    ],
    example: `collectFieldNames([
  { type:'group', children:[{ type:'field', name:'email' }] }
])  // ['email']

findMissingFields({ db: { host: '' } }, ['db.host', 'db.port'])
// ['db.host', 'db.port']  — host is "" (empty string = missing)`,
    traps: [
      'Treating 0 or false as missing in findMissingFields — only null, undefined, and "" are missing',
      'Not recursing into group children in collectFieldNames',
    ],
    solution: `export type FormNode = { type: "field" | "group"; name?: string; children?: FormNode[] };

export function collectFieldNames(form: FormNode[]): string[] {
  const names: string[] = [];
  for (const f of form) {
    if (f.type === 'field' && f.name) names.push(f.name);
    if (f.type === 'group' && f.children) names.push(...collectFieldNames(f.children));
  }
  return names;
}

export function findMissingFields(config: Record<string, unknown>, required: string[]): string[] {
  const missing: string[] = [];
  for (const path of required) {
    let current: unknown = config;
    let isMissing = false;
    for (const part of path.split(".")) {
      if (current == null || typeof current !== 'object') { isMissing = true; break; }
      if (!(part in (current as object))) { isMissing = true; break; }
      current = (current as Record<string, unknown>)[part];
    }
    if (isMissing || current === null || current === undefined || current === "") {
      missing.push(path);
    }
  }
  return missing;
}`,
  },

  {
    id: 'pipeline-transform',
    title: 'Log Processing Pipeline',
    category: 'core-patterns',
    difficulty: 'Medium',
    pattern: 'Pipeline / Builder Pattern',
    problem:
      'Build a configurable log processing pipeline with a builder API. Logs flow through stages: parse (raw string → structured object), filter, enrich (add metadata), transform, and format (structured → output string). Malformed entries are handled via an error mode: skip, collect, or throw.',
    approach: [
      'Define a Stage discriminated union type for each operation',
      'createPipeline() closes over: stages[], errorMode, outputFormat',
      'Each builder method (parse/filter/enrich/transform/format/onError) pushes to stages[] and returns the pipeline (method chaining)',
      'process(input) iterates stages in order; parse stage acts on raw strings, others act on ParsedLog[]',
      'Format stage converts ParsedLog → string; return { data, errors } always',
    ],
    example: `const pipeline = createPipeline()
  .parse()
  .filter(log => log.level !== 'DEBUG')
  .enrich({ environment: 'production' })
  .format('json');

const { data, errors } = pipeline.process(rawLogs);`,
    traps: [
      'Executing stages during the builder phase instead of during process()',
      'Treating format() as a stage that runs mid-pipeline — it should set output config',
      'Mutating parsed log objects in enrich/transform instead of returning new objects',
      'Returning early on parse error in "collect" mode — should continue processing other logs',
    ],
    solution: `interface ParsedLog {
  timestamp: string; level: 'DEBUG'|'INFO'|'WARN'|'ERROR'; service: string; message: string;
  [key: string]: unknown;
}
type ErrorMode = 'skip' | 'collect' | 'throw';
type OutputFormat = 'json' | 'csv' | 'text';
type Stage =
  | { type: 'parse' }
  | { type: 'filter'; predicate: (log: ParsedLog) => boolean }
  | { type: 'enrich'; metadata: Record<string, unknown> }
  | { type: 'transform'; fn: (log: ParsedLog) => ParsedLog };

const LOG_REGEX = /^(\\S+)\\s+(DEBUG|INFO|WARN|ERROR)\\s+\\[([^\\]]+)\\]\\s+(.+)$/;

function formatEntry(log: ParsedLog, fmt: OutputFormat): string {
  if (fmt === 'json') return JSON.stringify(log);
  if (fmt === 'csv') return \`\${log.timestamp},\${log.level},\${log.service},\${log.message}\`;
  return \`\${log.timestamp} \${log.level} [\${log.service}] \${log.message}\`;
}

export function createPipeline() {
  const stages: Stage[] = [];
  let errorMode: ErrorMode = 'skip';
  let outputFormat: OutputFormat = 'json';

  const pipeline = {
    parse() { stages.push({ type: 'parse' }); return pipeline; },
    filter(predicate: (l: ParsedLog) => boolean) { stages.push({ type: 'filter', predicate }); return pipeline; },
    enrich(metadata: Record<string, unknown>) { stages.push({ type: 'enrich', metadata }); return pipeline; },
    transform(fn: (l: ParsedLog) => ParsedLog) { stages.push({ type: 'transform', fn }); return pipeline; },
    format(type: OutputFormat) { outputFormat = type; return pipeline; },
    onError(mode: ErrorMode) { errorMode = mode; return pipeline; },

    process(input: string[]) {
      const errors: Array<{ input: string; stage: string; error: string }> = [];
      let parsed: ParsedLog[] = [];
      let hasParsed = false;

      for (const stage of stages) {
        if (stage.type === 'parse') {
          hasParsed = true;
          for (const raw of input) {
            const match = raw.match(LOG_REGEX);
            if (match) {
              parsed.push({ timestamp: match[1], level: match[2] as ParsedLog['level'],
                service: match[3], message: match[4] });
            } else {
              if (errorMode === 'throw') throw new Error(\`Failed to parse: \${raw}\`);
              if (errorMode === 'collect') errors.push({ input: raw, stage: 'parse', error: 'Failed to parse log entry' });
            }
          }
        } else if (stage.type === 'filter') {
          parsed = parsed.filter(stage.predicate);
        } else if (stage.type === 'enrich') {
          parsed = parsed.map(log => ({ ...log, ...stage.metadata }));
        } else if (stage.type === 'transform') {
          parsed = parsed.map(stage.fn);
        }
      }

      const data = hasParsed ? parsed.map(log => formatEntry(log, outputFormat)) : input;
      return { data, errors };
    },
  };
  return pipeline;
}`,
  },

  {
    id: 'diff-reconciliation',
    title: 'Configuration Diff Engine',
    category: 'core-patterns',
    difficulty: 'Hard',
    pattern: 'Diff / Reconciliation',
    problem:
      'Calculate the minimal set of changes (add, remove, update) needed to transform a current config object into a target config object. Support deep comparison of nested objects and arrays, with an optional arrayKey for keyed array diffing.',
    approach: [
      'diff(current, target) dispatches to compareObjects or compareArrays at the root',
      'compareObjects: for each key, classify as add (only in target), remove (only in current), or recurse',
      'For arrays: if arrayKey is set, compare by key identity; otherwise compare by index',
      'deepEqual helper for primitive comparison at leaf nodes',
      'Each change records its path as an array of segments (string for object keys, object for array key segments)',
    ],
    example: `diff({ host: 'a', port: 80 }, { host: 'b', port: 80, ssl: true })
// changes: [
//   { type:'update', path:['host'], from:'a', to:'b' },
//   { type:'add', path:['ssl'], value: true }
// ]`,
    traps: [
      'Not deep-cloning before applying diffs — applyDiff must not mutate the original',
      'Array key-based diffing: must build Maps for O(1) lookup, not O(n) scan',
      'Root-level type mismatch (e.g. object vs array) must be handled before recursing',
    ],
    solution: `export function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }
  if (Array.isArray(a) || Array.isArray(b)) return false;
  if (isPlainObject(a) && isPlainObject(b)) {
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every(k => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k]));
  }
  return false;
}

type Change = { type:'add'|'remove'|'update'; path: unknown[]; from?: unknown; to?: unknown; value?: unknown };

function compareObjects(cur: Record<string,unknown>, tgt: Record<string,unknown>, path: unknown[], changes: Change[]) {
  const ck = new Set(Object.keys(cur)), tk = new Set(Object.keys(tgt));
  for (const k of tk) if (!ck.has(k)) changes.push({ type:'add', path:[...path,k], value: tgt[k] });
  for (const k of ck) if (!tk.has(k)) changes.push({ type:'remove', path:[...path,k], value: cur[k] });
  for (const k of ck) if (tk.has(k)) compareValues(cur[k], tgt[k], [...path,k], changes);
}

function compareValues(cur: unknown, tgt: unknown, path: unknown[], changes: Change[]) {
  if (cur === tgt) return;
  if (isPlainObject(cur) && isPlainObject(tgt)) { compareObjects(cur, tgt, path, changes); return; }
  if (Array.isArray(cur) && Array.isArray(tgt)) {
    const maxLen = Math.max(cur.length, tgt.length);
    for (let i = 0; i < maxLen; i++) {
      const ip = [...path, String(i)];
      if (i >= cur.length) changes.push({ type:'add', path:ip, value: tgt[i] });
      else if (i >= tgt.length) changes.push({ type:'remove', path:ip, value: cur[i] });
      else compareValues(cur[i], tgt[i], ip, changes);
    }
    return;
  }
  changes.push({ type:'update', path, from: cur, to: tgt });
}

export function diff(current: unknown, target: unknown) {
  const changes: Change[] = [];
  if (isPlainObject(current) && isPlainObject(target)) compareObjects(current, target, [], changes);
  else compareValues(current, target, [], changes);
  return { changes, hasChanges: changes.length > 0 };
}`,
  },

  {
    id: 'concurrency-coordination',
    title: 'Token Bucket Rate Limiter',
    category: 'core-patterns',
    difficulty: 'Hard',
    pattern: 'Concurrency / Token Bucket',
    problem:
      'Implement a per-client token bucket rate limiter. Each client has a bucket of tokens that refills at a configurable rate. Requests consume tokens; if insufficient tokens remain, the request is denied with a retryAfter estimate.',
    approach: [
      'createRateLimiter(config) closes over a Map<clientId, Bucket>',
      'Each bucket stores { tokens, lastRefillTime }',
      'On tryAcquire: compute elapsed time, add elapsed * refillRate tokens (capped at maxTokens)',
      'If tokens >= cost, subtract and return allowed:true; else compute retryAfter',
      'retryAfter = Math.ceil((deficit / refillRate) * 1000) ms',
      'getStatus, reset, remove are straightforward bucket operations',
    ],
    example: `const limiter = createRateLimiter({ maxTokens: 10, refillRate: 1 });
limiter.tryAcquire('user-1')  // { allowed: true, remaining: 9 }
// ... after consuming all tokens:
limiter.tryAcquire('user-1')  // { allowed: false, remaining: 0, retryAfter: 1000 }`,
    traps: [
      'Not refilling before checking — always refill first based on elapsed time',
      'Capping tokens: never let bucket.tokens exceed maxTokens after refill',
      'Creating a new bucket on getStatus should not consume tokens — just refill and report',
    ],
    solution: `export interface RateLimiterConfig {
  maxTokens: number; refillRate: number; initialTokens?: number; clock?: () => number;
}
interface Bucket { tokens: number; lastRefillTime: number; }

export function createRateLimiter(config: RateLimiterConfig) {
  const { maxTokens, refillRate } = config;
  const initialTokens = config.initialTokens ?? maxTokens;
  const clock = config.clock ?? Date.now;
  const buckets = new Map<string, Bucket>();

  function getOrCreate(id: string): Bucket {
    if (!buckets.has(id)) buckets.set(id, { tokens: initialTokens, lastRefillTime: clock() });
    return buckets.get(id)!;
  }

  function refill(bucket: Bucket): void {
    const now = clock();
    const elapsed = now - bucket.lastRefillTime;
    if (elapsed > 0) {
      bucket.tokens = Math.min(maxTokens, bucket.tokens + (elapsed * refillRate) / 1000);
      bucket.lastRefillTime = now;
    }
  }

  return {
    tryAcquire(clientId: string, options?: { cost?: number }) {
      const cost = options?.cost ?? 1;
      const bucket = getOrCreate(clientId);
      refill(bucket);
      if (bucket.tokens >= cost) {
        bucket.tokens -= cost;
        return { allowed: true, remaining: bucket.tokens };
      }
      const retryAfter = Math.ceil(((cost - bucket.tokens) / refillRate) * 1000);
      return { allowed: false, remaining: bucket.tokens, retryAfter };
    },
    getStatus(clientId: string) {
      const bucket = getOrCreate(clientId);
      refill(bucket);
      return { tokens: bucket.tokens, maxTokens, refillRate, lastRefillTime: bucket.lastRefillTime };
    },
    reset(clientId: string) {
      const b = getOrCreate(clientId); b.tokens = maxTokens; b.lastRefillTime = clock();
    },
    remove(clientId: string) { return buckets.delete(clientId); },
    getClients() { return Array.from(buckets.keys()); },
  };
}`,
  },

  {
    id: 'scheduling-timing',
    title: 'Meeting Room Scheduler',
    category: 'core-patterns',
    difficulty: 'Hard',
    pattern: 'Scheduling / Interval Overlap',
    problem:
      'Build a room booking system that detects time conflicts, lists available rooms, and suggests alternative time slots. Support an optional buffer between bookings.',
    approach: [
      'Store bookings per room in a sorted list (by start time)',
      'findConflict: extend each existing booking\'s effective range by ±bufferMinutes, then check rangesOverlap',
      'book(): validate room exists, validate start < end, check conflicts, generate ID, insert sorted',
      'findAvailable(): filter rooms by capacity/amenities, then check isAvailable()',
      'suggestAlternatives(): walk gaps between bookings in a time window, push slots that fit the requested duration',
    ],
    example: `const scheduler = createScheduler({ rooms: [{ id:'r1', name:'Main', capacity:10 }] });
scheduler.book({ roomId:'r1', start:'2024-01-01T09:00Z', end:'2024-01-01T10:00Z', title:'Standup' });
scheduler.book({ roomId:'r1', start:'2024-01-01T09:30Z', end:'2024-01-01T10:30Z', title:'Review' });
// { success: false, conflict: { id:'booking-1', ... } }`,
    traps: [
      'Not applying the buffer to conflict detection — overlapping ranges must account for buffer on both sides',
      'Forgetting that adjacent meetings (end === nextStart) are NOT conflicts',
      'suggestAlternatives: forgetting the gap AFTER the last booking in the search window',
    ],
    solution: `export function rangesOverlap(s1: Date, e1: Date, s2: Date, e2: Date): boolean {
  return s1.getTime() < e2.getTime() && s2.getTime() < e1.getTime();
}
export function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function createScheduler(config: { rooms: Array<{id:string;name:string;capacity:number;amenities?:string[]}>, bufferMinutes?: number }) {
  const bufferMinutes = config.bufferMinutes ?? 0;
  const roomsMap = new Map(config.rooms.map(r => [r.id, r]));
  const bookingsById = new Map<string, {id:string;roomId:string;start:string;end:string;title:string;attendees?:number}>();
  const roomBookings = new Map(config.rooms.map(r => [r.id, [] as typeof bookingsById extends Map<string, infer V> ? V[] : never]));
  let nextId = 1;

  function findConflict(roomId: string, start: Date, end: Date) {
    for (const b of roomBookings.get(roomId) ?? []) {
      const bs = addMinutes(new Date(b.start), -bufferMinutes);
      const be = addMinutes(new Date(b.end), bufferMinutes);
      if (rangesOverlap(start, end, bs, be)) return b;
    }
    return null;
  }

  const scheduler = {
    book(req: {roomId:string;start:string;end:string;title:string;attendees?:number}) {
      if (!roomsMap.has(req.roomId)) return { success:false, error:\`Room '\${req.roomId}' does not exist\` };
      const start = new Date(req.start), end = new Date(req.end);
      if (end <= start) return { success:false, error:'End time must be after start time' };
      const conflict = findConflict(req.roomId, start, end);
      if (conflict) return { success:false, conflict };
      const id = \`booking-\${nextId++}\`;
      const booking = { id, ...req };
      bookingsById.set(id, booking);
      const list = roomBookings.get(req.roomId)!;
      const idx = list.findIndex(b => new Date(b.start) > start);
      list.splice(idx === -1 ? list.length : idx, 0, booking);
      return { success:true, bookingId:id };
    },
    cancel(bookingId: string) {
      const b = bookingsById.get(bookingId);
      if (!b) return false;
      bookingsById.delete(bookingId);
      const list = roomBookings.get(b.roomId)!;
      const i = list.findIndex(x => x.id === bookingId);
      if (i !== -1) list.splice(i, 1);
      return true;
    },
    isAvailable(roomId: string, start: string, end: string) {
      return findConflict(roomId, new Date(start), new Date(end)) === null;
    },
    findAvailable(criteria: {start:string;end:string;minCapacity?:number;amenities?:string[]}) {
      return config.rooms.filter(room => {
        if (criteria.minCapacity && room.capacity < criteria.minCapacity) return false;
        if (criteria.amenities?.some(a => !(room.amenities ?? []).includes(a))) return false;
        return scheduler.isAvailable(room.id, criteria.start, criteria.end);
      });
    },
  };
  return scheduler;
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 05 — Business Logic
// ─────────────────────────────────────────────────────────────────────────────

const BUSINESS_LOGIC: CodeChallenge[] = [
  {
    id: 'state-machines-biz',
    title: 'Task State Machine',
    category: 'business-logic',
    difficulty: 'Easy',
    pattern: 'State Machine / Transition Table',
    problem:
      'Implement a task state machine with states TODO, IN_PROGRESS, DONE, and CANCELLED. Valid transitions: TODO → IN_PROGRESS (START), TODO/IN_PROGRESS → CANCELLED (CANCEL), IN_PROGRESS → DONE (COMPLETE). DONE and CANCELLED are terminal states.',
    approach: [
      'Define a TRANSITIONS table: Record<TaskState, Partial<Record<Action, TaskState>>>',
      'transition(task, { action, timestamp }): look up TRANSITIONS[currentState][action]',
      'If no next state found, return { success: false, error: "Cannot ACTION from STATE" }',
      'If valid, append a HistoryEntry and return the updated task',
      'Keep task immutable: spread into new object',
    ],
    example: `const task = createTask('t1', 'Fix bug');
transition(task, { action:'START', timestamp:'...' })
// { success:true, task: { ...task, state:'IN_PROGRESS', history:[...] } }

transition(task, { action:'COMPLETE', timestamp:'...' })
// { success:false, error:'Cannot COMPLETE from TODO' }`,
    traps: [
      'Mutating the task object directly instead of spreading into a new object',
      'Not appending to history — each transition must be recorded',
      'Forgetting that DONE and CANCELLED have empty transition maps (terminal states)',
    ],
    solution: `export type TaskState = "TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED";
export type Action = "START" | "COMPLETE" | "CANCEL";

const TRANSITIONS: Record<TaskState, Partial<Record<Action, TaskState>>> = {
  TODO:        { START: "IN_PROGRESS", CANCEL: "CANCELLED" },
  IN_PROGRESS: { COMPLETE: "DONE", CANCEL: "CANCELLED" },
  DONE:        {},
  CANCELLED:   {},
};

export function transition(task: {id:string;title:string;state:TaskState;history:unknown[]}, request: {action:Action;timestamp:string}) {
  const nextState = TRANSITIONS[task.state][request.action];
  if (!nextState) return { success:false, task, error: \`Cannot \${request.action} from \${task.state}\` };
  const historyEntry = { from: task.state, to: nextState, action: request.action, timestamp: request.timestamp };
  return { success:true, task: { ...task, state: nextState, history: [...task.history, historyEntry] } };
}

export function createTask(id: string, title: string) {
  return { id, title, state: "TODO" as TaskState, history: [] };
}

export function getValidActions(state: TaskState): Action[] {
  return Object.keys(TRANSITIONS[state]) as Action[];
}`,
  },

  {
    id: 'normalization',
    title: 'Data Normalization',
    category: 'business-logic',
    difficulty: 'Medium',
    pattern: 'Normalization / Source Adapter',
    problem:
      'Convert contact data from multiple sources (CSV and API) into a single unified format. Each source has different field names and formatting conventions. Warnings should be collected for missing or invalid fields rather than throwing.',
    approach: [
      'Dispatch on raw.source ("CSV" | "API") to source-specific normalizers',
      'Each normalizer extracts name, phone, email and calls helper functions',
      'parseFullName: split on space, lowercase, handle single-name edge case',
      'normalizePhone: strip non-digits, validate 10 digits, format as XXX-XXX-XXXX',
      'normalizeEmail: trim, lowercase, basic @ check',
      'Collect warnings for missing/invalid fields; never throw for optional fields',
    ],
    example: `normalizeContact({ source:'CSV', full_name:'John Smith', phone:'(555)123-4567' })
// { id:'...', source:'CSV', name:{ first:'john', last:'smith', full:'john smith' },
//   phone:'555-123-4567', email:'', warnings:['Missing email'] }`,
    traps: [
      'Throwing instead of warning for missing optional fields (phone, email)',
      'Not lowercasing the normalized name',
      'Forgetting to strip non-digit characters from phone before formatting',
    ],
    solution: `export type Source = "CSV" | "API";

export function normalizeContact(raw: { source: Source; [key: string]: unknown }) {
  if (raw.source === "CSV") return normalizeCSV(raw as {source:"CSV";full_name:string;phone?:string;email_address?:string});
  if (raw.source === "API") return normalizeAPI(raw as {source:"API";firstName:string;lastName:string;phoneNumber?:string;email?:string});
  throw new Error(\`Unknown source: \${String(raw.source)}\`);
}

function normalizeCSV(raw: {source:"CSV";full_name:string;phone?:string;email_address?:string}) {
  const warnings: string[] = [];
  const name = parseFullName(raw.full_name, warnings);
  const phone = normalizePhone(raw.phone, warnings);
  const email = normalizeEmail(raw.email_address, warnings);
  return { id: genId("CSV", raw.full_name), source:"CSV", name, phone, email, warnings };
}

function normalizeAPI(raw: {source:"API";firstName:string;lastName:string;phoneNumber?:string;email?:string}) {
  const warnings: string[] = [];
  const first = (raw.firstName||'').trim().toLowerCase();
  const last = (raw.lastName||'').trim().toLowerCase();
  const name = { first, last, full:[first,last].filter(Boolean).join(' ') };
  const phone = normalizePhone(raw.phoneNumber, warnings);
  const email = normalizeEmail(raw.email, warnings);
  return { id: genId("API", \`\${raw.firstName} \${raw.lastName}\`), source:"API", name, phone, email, warnings };
}

function parseFullName(fullName: string|undefined, warnings: string[]) {
  if (!fullName?.trim()) { warnings.push("Missing name"); return { first:'',last:'',full:'' }; }
  const parts = fullName.trim().replace(/\\s+/g,' ').split(' ');
  const first = parts[0].toLowerCase();
  const last = parts.slice(1).join(' ').toLowerCase();
  return { first, last, full:[first,last].filter(Boolean).join(' ') };
}

function normalizePhone(phone: string|undefined, warnings: string[]) {
  if (!phone) { warnings.push("Missing phone number"); return ''; }
  const digits = phone.replace(/\\D/g,'');
  if (digits.length !== 10) { warnings.push("Phone number should be 10 digits"); return digits; }
  return \`\${digits.slice(0,3)}-\${digits.slice(3,6)}-\${digits.slice(6)}\`;
}

function normalizeEmail(email: string|undefined, warnings: string[]) {
  if (!email) { warnings.push("Missing email"); return ''; }
  const n = email.trim().toLowerCase();
  if (!n.includes('@')) warnings.push("Invalid email format");
  return n;
}

function genId(source: string, name: string) {
  return \`\${source.toLowerCase()}-\${name.toLowerCase().replace(/\\s+/g,'-')}-\${Date.now().toString(36)}\`;
}`,
  },

  {
    id: 'merging',
    title: 'Data Merging with Conflict Detection',
    category: 'business-logic',
    difficulty: 'Medium',
    pattern: 'Merge / Conflict Resolution',
    problem:
      'Merge changes from two sources (A and B) into an original profile. If only one source changed a field, apply it. If both changed the same field to the same value, apply once. If both changed to different values, it\'s a conflict — keep the original value and record the conflict.',
    approach: [
      'Collect all changed fields from both sources using Object.keys',
      'For each field: if only A changed → apply A; if only B changed → apply B',
      'If both changed to the same value → apply (attribute to A)',
      'If both changed to different values → conflict: keep original, push to conflicts[]',
      'Track appliedFromA and appliedFromB arrays for audit',
    ],
    example: `mergeChanges(
  { name:'Alice', email:'a@x.com', role:'dev', department:'eng' },
  { name:'Bob' },
  { email:'bob@x.com', name:'Charlie' }
)
// merged: { name:'Alice'(conflict), email:'bob@x.com', role:'dev', department:'eng' }
// conflicts: [{ field:'name', originalValue:'Alice', valueA:'Bob', valueB:'Charlie' }]`,
    traps: [
      'Applying one side of a conflict — must keep original when there\'s a disagreement',
      'Not handling the case where both sources change to the same value (no conflict, apply once)',
      'Iterating only changesA or only changesB — use a Set of all changed fields',
    ],
    solution: `export interface Profile { name:string; email:string; role:string; department:string; }
export type Changes = Partial<Profile>;

export function mergeChanges(original: Profile, changesA: Changes, changesB: Changes) {
  const merged: Profile = { ...original };
  const conflicts: Array<{field:string;originalValue:string;valueA:string;valueB:string}> = [];
  const appliedFromA: string[] = [], appliedFromB: string[] = [];

  const allFields = new Set([...Object.keys(changesA), ...Object.keys(changesB)]) as Set<keyof Profile>;

  for (const field of allFields) {
    const vA = changesA[field], vB = changesB[field];
    if (vA !== undefined && vB === undefined) { merged[field] = vA; appliedFromA.push(field); }
    else if (vB !== undefined && vA === undefined) { merged[field] = vB; appliedFromB.push(field); }
    else if (vA !== undefined && vB !== undefined) {
      if (vA === vB) { merged[field] = vA; appliedFromA.push(field); }
      else { conflicts.push({ field, originalValue: original[field], valueA: vA, valueB: vB }); }
    }
  }

  return { merged, conflicts, appliedFromA, appliedFromB };
}`,
  },

  {
    id: 'idempotent-updates',
    title: 'Idempotent Updates',
    category: 'business-logic',
    difficulty: 'Medium',
    pattern: 'Idempotency / Cache-on-first-run',
    problem:
      'Ensure an operation executes at most once per idempotency key. If the same key is seen again with the same params, return the cached result. If params differ, return an error. If the previous attempt failed, allow a retry.',
    approach: [
      'Check the store for an existing record matching idempotencyKey',
      'If record exists: if params hash mismatches → error (key reuse); if "processing" → error; if "completed" → replay cached result; if "failed" → fall through to retry',
      'Mark as "processing" in store before running the executor',
      'Run executor: on success, store "completed" + result; on failure, store "failed" + error',
      'Hash params with JSON.stringify (sorted keys) → deterministic comparison',
    ],
    example: `const store = new IdempotencyStore();
executeIdempotent({ idempotencyKey:'k1', operation:'charge', params:{ amount:50 } }, store, charge);
// { success:true, isReplay:false, result: ... }

// Same call again:
executeIdempotent({ idempotencyKey:'k1', operation:'charge', params:{ amount:50 } }, store, charge);
// { success:true, isReplay:true, result: ... }  ← cached, charge not called again`,
    traps: [
      'Running the executor before checking the store — must check first',
      'Not allowing retry of failed records — failed != completed; fall through to re-execute',
      'Using a shallow params comparison instead of hashing — field order must not matter',
    ],
    solution: `import { createHash } from "crypto";

export class IdempotencyStore {
  private records = new Map<string, {key:string;paramsHash:string;status:"processing"|"completed"|"failed";result?:unknown;error?:string}>();
  get(key: string) { return this.records.get(key); }
  set(key: string, record: ReturnType<typeof this.get> & object) { this.records.set(key, record as never); }
  update(key: string, updates: object) {
    const ex = this.records.get(key);
    if (ex) this.records.set(key, { ...ex, ...updates } as never);
  }
}

export function hashParams(params: Record<string, unknown>): string {
  return createHash("sha256")
    .update(JSON.stringify(params, Object.keys(params).sort()))
    .digest("hex").slice(0, 16);
}

export function executeIdempotent<T>(
  request: { idempotencyKey: string; operation: string; params: Record<string, unknown> },
  store: IdempotencyStore,
  executor: (params: Record<string, unknown>) => T
): { success: boolean; isReplay: boolean; result?: T; error?: string } {
  const { idempotencyKey, params } = request;
  const paramsHash = hashParams(params);
  const existing = store.get(idempotencyKey);

  if (existing) {
    if (existing.paramsHash !== paramsHash) return { success:false, isReplay:false, error:"Idempotency key reused with different parameters" };
    if (existing.status === "processing") return { success:false, isReplay:false, error:"Request is still being processed" };
    if (existing.status === "completed") return { success:true, isReplay:true, result: existing.result as T };
    // failed → fall through to retry
  }

  store.set(idempotencyKey, { key:idempotencyKey, paramsHash, status:"processing" });
  try {
    const result = executor(params);
    store.update(idempotencyKey, { status:"completed", result });
    return { success:true, isReplay:false, result };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    store.update(idempotencyKey, { status:"failed", error });
    return { success:false, isReplay:false, error };
  }
}`,
  },

  {
    id: 'grouping-aggregation',
    title: 'Grouping & Aggregation',
    category: 'business-logic',
    difficulty: 'Medium',
    pattern: 'Group-by / Metrics Accumulation',
    problem:
      'Group an array of sales records by one or more fields (e.g. category + region) and compute aggregate metrics (count, sum, avg, min, max) for each group.',
    approach: [
      'Build a composite key for each record using the groupBy fields joined by "|"',
      'Use a Map<key, Sale[]> to bucket records',
      'For each bucket, extract the group dimensions from the first record',
      'Compute metrics over the numeric values in that bucket',
      'Return an array of { group, metrics } results',
    ],
    example: `aggregate(sales, ['category'], 'amount')
// [
//   { group: { category: 'electronics' }, metrics: { count:5, sum:2500, avg:500, min:100, max:1200 } },
//   { group: { category: 'clothing' }, metrics: { ... } },
// ]`,
    traps: [
      'Using string concatenation as a key when field values contain "|" — consider a more robust separator',
      'Integer division for avg — use floating point and round',
      'Forgetting to handle empty groups (no numeric values) — return zero metrics',
    ],
    solution: `export interface Sale { id:string; date:string; category:string; region:string; amount:number; }
export interface Metrics { count:number; sum:number; avg:number; min:number; max:number; }

function round2(n: number) { return Math.round(n * 100) / 100; }

function computeMetrics(sales: Sale[], field: keyof Sale): Metrics {
  const values = sales.map(s => s[field]).filter((v): v is number => typeof v === 'number' && !isNaN(v));
  if (!values.length) return { count:0, sum:0, avg:0, min:0, max:0 };
  const count = values.length, sum = values.reduce((a,b) => a+b, 0);
  return { count, sum:round2(sum), avg:round2(sum/count), min:round2(Math.min(...values)), max:round2(Math.max(...values)) };
}

export function aggregate(sales: Sale[], groupBy: (keyof Sale)[], valueField: keyof Sale = 'amount') {
  if (!sales.length) return [];
  const buckets = new Map<string, Sale[]>();
  for (const sale of sales) {
    const key = groupBy.map(f => sale[f]).join('|');
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key)!.push(sale);
  }
  return Array.from(buckets.values()).map(groupSales => {
    const group: Record<string,string> = {};
    for (const f of groupBy) group[f] = String(groupSales[0][f]);
    return { group, metrics: computeMetrics(groupSales, valueField) };
  });
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 07 — Algorithms
// ─────────────────────────────────────────────────────────────────────────────

const ALGORITHMS: CodeChallenge[] = [
  {
    id: 'arrays-and-hashing',
    title: 'Arrays + Hashing',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Hash Map / Single Pass',
    problem:
      'Three problems: (1) Two Sum — find indices of two numbers that sum to target. (2) Frequency Map — count occurrences of each string. (3) Group Anagrams — group words that are anagrams of each other.',
    approach: [
      'Two Sum: single pass — for each num, check if (target - num) is in the seen map, then add num → index',
      'Frequency Map: iterate and increment counts using map.get(key) ?? 0',
      'Group Anagrams: canonical key = sorted characters of word; group words by key',
      'All three use a Map for O(1) lookup — the core hash map pattern',
    ],
    example: `twoSum([2,7,11,15], 9)     // [0,1]  (2+7=9)
frequencyMap(['a','b','a']) // Map { 'a'=>2, 'b'=>1 }
groupAnagrams(['eat','tea','tan','ate','nat','bat'])
// [['eat','tea','ate'], ['tan','nat'], ['bat']]`,
    traps: [
      'Two Sum: adding the current number to the map before checking — find complement first, then add',
      'Group Anagrams: using word.sort() directly — strings have no .sort(), convert to array first',
    ],
    solution: `export function twoSum(nums: number[], target: number): [number,number] {
  const seen = new Map<number,number>();
  for (let i = 0; i < nums.length; i++) {
    const comp = target - nums[i];
    if (seen.has(comp)) {
      const j = seen.get(comp)!;
      return j < i ? [j,i] : [i,j];
    }
    seen.set(nums[i], i);
  }
  throw new Error("No two sum solution found");
}

export function frequencyMap(items: string[]): Map<string,number> {
  const counts = new Map<string,number>();
  for (const item of items) counts.set(item, (counts.get(item)??0) + 1);
  return counts;
}

export function groupAnagrams(words: string[]): string[][] {
  const groups = new Map<string,string[]>();
  for (const word of words) {
    const key = word.split('').sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(word);
  }
  return Array.from(groups.values());
}`,
  },

  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Divide & Conquer / Sorted Input',
    problem:
      'Three problems: (1) Classic binary search in a sorted array. (2) Find first and last position of a target. (3) Minimum truck capacity to ship all packages in N days.',
    approach: [
      'Classic: maintain left/right pointers, compute mid = left + floor((right-left)/2), narrow each iteration',
      'First/Last position: run two binary searches — one biased left (right = mid-1 on hit), one biased right (left = mid+1 on hit)',
      'Min capacity: binary search on the answer space [max(weights), sum(weights)]; use a greedy canShip() check',
    ],
    example: `binarySearch([1,3,5,7,9], 5)          // 2
searchRange([5,7,7,8,8,10], 8)        // [3,4]
minCapacity([1,2,3,4,5,6,7,8,9,10], 5) // 15`,
    traps: [
      'Integer overflow: use left + floor((right-left)/2) not (left+right)/2',
      'Infinite loop: make sure left and right always converge — mid must move the pointer',
      'Min capacity: the search space lower bound is max(weights) not 0 (single item must fit)',
    ],
    solution: `export function binarySearch(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

function findBound(nums: number[], target: number, side: 'left'|'right'): number {
  let left = 0, right = nums.length - 1, result = -1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) { result = mid; if (side==='left') right=mid-1; else left=mid+1; }
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return result;
}

export function searchRange(nums: number[], target: number): [number,number] {
  const first = findBound(nums, target, 'left');
  return first === -1 ? [-1,-1] : [first, findBound(nums, target, 'right')];
}

function canShip(weights: number[], days: number, cap: number): boolean {
  let trips = 1, load = 0;
  for (const w of weights) {
    if (load + w > cap) { trips++; load = w; } else load += w;
  }
  return trips <= days;
}

export function minCapacity(weights: number[], days: number): number {
  let low = Math.max(...weights), high = weights.reduce((a,b)=>a+b,0);
  while (low < high) {
    const mid = low + Math.floor((high-low)/2);
    if (canShip(weights, days, mid)) high = mid; else low = mid + 1;
  }
  return low;
}`,
  },

  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Bottom-Up Tabulation',
    problem:
      'Three classic DP problems: (1) Climb Stairs — how many ways to reach step N taking 1 or 2 steps. (2) Maximum Subarray — Kadane\'s algorithm for largest contiguous sum. (3) Coin Change — fewest coins to make a given amount.',
    approach: [
      'Climb Stairs: Fibonacci recurrence — keep prev2 and prev1, compute current = prev1 + prev2',
      'Max Subarray (Kadane): currentMax = max(nums[i], currentMax + nums[i]); track globalMax each step',
      'Coin Change: dp[i] = min coins for amount i; for each i, try all coins; dp[0] = 0, rest = Infinity',
    ],
    example: `climbStairs(5)           // 8
maxSubarraySum([-2,1,-3,4,-1,2,1,-5,4])  // 6
coinChange([1,5,11], 15)  // 3  (5+5+5 or 11+3×1?)  → 3`,
    traps: [
      'Climb stairs: base cases n=1 → 1, n=2 → 2; don\'t start loop from 1',
      'Kadane: initialize both currentMax and globalMax to nums[0], not 0 (handles all-negative arrays)',
      'Coin Change: initialize dp[i] to Infinity (not 0) except dp[0]; return -1 if dp[amount] is still Infinity',
    ],
    solution: `export function climbStairs(n: number): number {
  if (n < 1) throw new Error('n must be >= 1');
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) { const cur = prev1 + prev2; prev2 = prev1; prev1 = cur; }
  return prev1;
}

export function maxSubarraySum(nums: number[]): number {
  if (!nums.length) throw new Error('Array must not be empty');
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}

export function coinChange(coins: number[], amount: number): number {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i-coin] + 1 < dp[i]) dp[i] = dp[i-coin] + 1;
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
  },

  {
    id: 'grid-traversal',
    title: 'Grid Traversal (BFS / DFS)',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'BFS / DFS on 2D Grid',
    problem:
      'Three grid problems: (1) Count Islands — connected components of "1" cells. (2) Shortest Path in Binary Matrix — BFS with 8-directional movement. (3) Flood Fill — propagate a new color from a starting cell.',
    approach: [
      'Islands: outer loop to find unvisited "1" cells; DFS sink-fills each island (mark visited by overwriting with "0")',
      'Shortest Path: BFS with queue of [row, col, distance]; 8 directions; check bounds + visited + obstacle',
      'Flood Fill: DFS from (sr, sc); only fill cells matching originalColor; deep copy input to avoid mutation',
    ],
    example: `countIslands([['1','1','0'],['0','1','0'],['0','0','1']])  // 2
shortestPath([[0,0,0],[1,1,0],[1,1,0]])  // 4
floodFill([[1,1,1],[1,1,0]], 0, 0, 2)
// [[2,2,2],[2,2,0]]`,
    traps: [
      'Mutating the input grid in countIslands — work on a copy or restore cells after visiting',
      'Shortest path: returning -1 if start or end is blocked (grid[0][0]===1 or grid[n-1][n-1]===1)',
      'Flood Fill: early exit if originalColor === newColor to prevent infinite recursion',
    ],
    solution: `export function countIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  const visited = grid.map(row => [...row]);
  let count = 0;
  function sink(r: number, c: number) {
    if (r < 0 || r >= visited.length || c < 0 || c >= visited[0].length || visited[r][c] !== '1') return;
    visited[r][c] = '0';
    sink(r-1,c); sink(r+1,c); sink(r,c-1); sink(r,c+1);
  }
  for (let r = 0; r < visited.length; r++)
    for (let c = 0; c < visited[0].length; c++)
      if (visited[r][c] === '1') { count++; sink(r,c); }
  return count;
}

export function shortestPath(grid: number[][]): number {
  const n = grid.length;
  if (!n || grid[0][0]===1 || grid[n-1][n-1]===1) return -1;
  if (n===1) return 1;
  const dirs = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
  const visited = Array.from({length:n},()=>new Array(n).fill(false));
  const queue: [number,number,number][] = [[0,0,1]]; visited[0][0] = true;
  while (queue.length) {
    const [r,c,d] = queue.shift()!;
    for (const [dr,dc] of dirs) {
      const nr=r+dr, nc=c+dc;
      if (nr<0||nr>=n||nc<0||nc>=n||visited[nr][nc]||grid[nr][nc]===1) continue;
      if (nr===n-1&&nc===n-1) return d+1;
      visited[nr][nc]=true; queue.push([nr,nc,d+1]);
    }
  }
  return -1;
}

export function floodFill(grid: number[][], sr: number, sc: number, newColor: number): number[][] {
  const orig = grid[sr][sc];
  if (orig === newColor) return grid.map(r=>[...r]);
  const result = grid.map(r=>[...r]);
  function fill(r: number, c: number) {
    if (r<0||r>=result.length||c<0||c>=result[0].length||result[r][c]!==orig) return;
    result[r][c]=newColor; fill(r-1,c); fill(r+1,c); fill(r,c-1); fill(r,c+1);
  }
  fill(sr,sc); return result;
}`,
  },

  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Sliding Window / Two Pointers',
    problem:
      'Three problems: (1) Max sum of a fixed-size window. (2) Longest substring without repeating characters. (3) Minimum window substring containing all characters of t.',
    approach: [
      'Fixed window: compute first window sum, then slide by adding right and subtracting left',
      'Longest unique: shrink left pointer whenever the right char is already in the window (using a Set)',
      'Min window: expand right to satisfy all required chars; shrink left while still satisfied; track best',
    ],
    example: `maxSumWindow([1,3,-1,-3,5,3,6,7], 3)  // 16  (3+6+7)
longestUniqueSubstring("abcabcbb")      // 3  ("abc")
minWindowSubstring("ADOBECODEBANC","ABC")  // "BANC"`,
    traps: [
      'Fixed window: off-by-one when sliding — add nums[i] and subtract nums[i - k]',
      'Longest unique: not shrinking the window until the duplicate is fully removed',
      'Min window: using a single count instead of a frequency map (misses duplicate required chars)',
    ],
    solution: `export function maxSumWindow(nums: number[], k: number): number | null {
  if (nums.length < k) return null;
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let max = sum;
  for (let i = k; i < nums.length; i++) { sum += nums[i] - nums[i-k]; if (sum > max) max = sum; }
  return max;
}

export function longestUniqueSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) { seen.delete(s[left]); left++; }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

export function minWindowSubstring(s: string, t: string): string {
  if (!t.length || !s.length || t.length > s.length) return "";
  const need = new Map<string,number>();
  for (const c of t) need.set(c, (need.get(c)??0)+1);
  const win = new Map<string,number>();
  let have=0, required=need.size, left=0, bestLeft=0, bestLen=Infinity;
  for (let right=0; right<s.length; right++) {
    const c=s[right]; win.set(c,(win.get(c)??0)+1);
    if (need.has(c) && win.get(c)===need.get(c)) have++;
    while (have===required) {
      if (right-left+1<bestLen) { bestLen=right-left+1; bestLeft=left; }
      const lc=s[left]; win.set(lc,win.get(lc)!-1);
      if (need.has(lc) && win.get(lc)!<need.get(lc)!) have--;
      left++;
    }
  }
  return bestLen===Infinity ? "" : s.slice(bestLeft,bestLeft+bestLen);
}`,
  },

  {
    id: 'prefix-sums',
    title: 'Prefix Sums',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Prefix Sum / Cumulative State',
    problem:
      'Three problems: (1) Build a prefix sum array. (2) Answer range sum queries in O(1) using a prefix array. (3) Count subarrays that sum to exactly k using a prefix sum + hash map.',
    approach: [
      'Build prefix: running sum, push each accumulated value',
      'Range query [l, r]: return prefix[r+1] - prefix[l] (using a 1-indexed prefix array)',
      'Subarray sum = k: maintain running prefixSum; count how many times (prefixSum - k) has occurred before',
    ],
    example: `buildPrefixSum([1,2,3,4])  // [1,3,6,10]
rangeQuery(2, 4)           // sum of indices 2..4 = 3+4 = 7  (0-indexed)
subarraySum([1,1,1], 2)    // 2  ([0..1] and [1..2])`,
    traps: [
      'Range query off-by-one: use prefix[r+1] - prefix[l] with 0 sentinel at prefix[0]',
      'Subarray sum = k: initialize prefixMap with {0: 1} — the empty subarray has sum 0',
      'Not considering subarrays starting at index 0 without the {0:1} seed',
    ],
    solution: `export function buildPrefixSum(nums: number[]): number[] {
  const result: number[] = [];
  let running = 0;
  for (const n of nums) { running += n; result.push(running); }
  return result;
}

export function createRangeSumQuery(nums: number[]) {
  const prefix = new Array(nums.length + 1);
  prefix[0] = 0;
  for (let i = 1; i <= nums.length; i++) prefix[i] = prefix[i-1] + nums[i-1];
  return (left: number, right: number): number => {
    if (left < 0 || right >= nums.length || left > right) throw new Error("Index out of bounds");
    return prefix[right+1] - prefix[left];
  };
}

export function subarraySum(nums: number[], k: number): number {
  let count=0, prefixSum=0;
  const map = new Map<number,number>([[0,1]]);
  for (const n of nums) {
    prefixSum += n;
    count += map.get(prefixSum-k) ?? 0;
    map.set(prefixSum, (map.get(prefixSum)??0)+1);
  }
  return count;
}`,
  },

  {
    id: 'interval-merge',
    title: 'Interval Merge',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Sort + Linear Scan',
    problem:
      'Three interval problems: (1) Merge all overlapping intervals. (2) Insert a new interval into a sorted non-overlapping list. (3) Determine if a person can attend all meetings (no overlaps).',
    approach: [
      'Merge: sort by start time, then scan — extend the last merged interval\'s end if current overlaps',
      'Insert: three-phase scan — add all before, merge all overlapping, add all after',
      'Can Attend All: sort by start, check no adjacent pair has conflict (next starts before prev ends)',
    ],
    example: `mergeIntervals([[1,3],[2,6],[8,10]])  // [[1,6],[8,10]]
insertInterval([[1,3],[6,9]], [2,5])  // [[1,5],[6,9]]
canAttendAll([[0,30],[5,10],[15,20]]) // false`,
    traps: [
      'Merge: not sorting first — must sort by start[0] before scanning',
      'Insert: overlapping phase condition: intervals[i][0] <= merged[1] (not <)',
      'Can Attend All: adjacent meetings (end === nextStart) are NOT conflicts',
    ],
    solution: `type Interval = [number,number];

export function mergeIntervals(intervals: Interval[]): Interval[] {
  if (!intervals.length) return [];
  const sorted = [...intervals].sort((a,b)=>a[0]-b[0]);
  const merged: Interval[] = [sorted[0]];
  for (let i=1; i<sorted.length; i++) {
    const last = merged[merged.length-1], cur = sorted[i];
    if (cur[0] <= last[1]) last[1] = Math.max(last[1],cur[1]);
    else merged.push(cur);
  }
  return merged;
}

export function insertInterval(intervals: Interval[], newInterval: Interval): Interval[] {
  const result: Interval[] = [];
  let i=0;
  while (i<intervals.length && intervals[i][1]<newInterval[0]) result.push(intervals[i++]);
  let merged: Interval = [...newInterval];
  while (i<intervals.length && intervals[i][0]<=merged[1]) {
    merged[0]=Math.min(merged[0],intervals[i][0]);
    merged[1]=Math.max(merged[1],intervals[i][1]);
    i++;
  }
  result.push(merged);
  while (i<intervals.length) result.push(intervals[i++]);
  return result;
}

export function canAttendAll(meetings: Interval[]): boolean {
  if (meetings.length<=1) return true;
  const sorted = [...meetings].sort((a,b)=>a[0]-b[0]);
  for (let i=1; i<sorted.length; i++) if (sorted[i][0]<sorted[i-1][1]) return false;
  return true;
}`,
  },

  {
    id: 'modulo-wrapping',
    title: 'Modulo Wrapping Math',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Circular / Modular Arithmetic',
    problem:
      'Three modular arithmetic problems: (1) Final position on a circular dial after a sequence of moves. (2) Shortest circular distance between two positions. (3) Total steps to reach all targets in order on a combination lock.',
    approach: [
      'Dial position: accumulate moves; after each, apply double-modulo to keep in [0, n-1]',
      'Circular distance: diff = |a - b|; return min(diff, n - diff)',
      'Lock turns: sum circularDistance(current, target) for each step; update current',
    ],
    example: `dialPosition(10, 3, [4, -2])   // 5   (3→7→5)
circularDistance(10, 2, 9)     // 3   (min of 7 and 3)
lockTurns(10, [3, 7, 2])       // 8   (3+4+5=12? → 3+4+1=8)`,
    traps: [
      'Dial position: using a single % which gives negative results for negative moves',
      'Circular distance: forgetting the wrap-around path: n - diff',
      'Lock turns: updating current to target after each step, not after all steps',
    ],
    solution: `export function dialPosition(n: number, start: number, moves: number[]): number {
  if (n < 1) throw new Error('n must be >= 1');
  let pos = start;
  for (const move of moves) pos = ((pos + move) % n + n) % n;
  return pos;
}

export function circularDistance(n: number, a: number, b: number): number {
  if (n < 1) throw new Error('n must be >= 1');
  const diff = Math.abs(a - b);
  return Math.min(diff, n - diff);
}

export function lockTurns(n: number, targets: number[]): number {
  if (n < 1) throw new Error('n must be >= 1');
  let total = 0, current = 0;
  for (const target of targets) { total += circularDistance(n, current, target); current = target; }
  return total;
}`,
  },

  {
    id: 'sorting-custom-comparator',
    title: 'Sorting + Custom Comparators',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Sorting / Comparator Design',
    problem:
      'Three sorting problems: (1) Sort numbers by frequency descending, value ascending as tie-breaker. (2) Sort items according to a custom priority order, with remaining items alphabetically. (3) Arrange numbers to form the largest possible number.',
    approach: [
      'Frequency sort: build frequency map first, then sort with two-level comparator',
      'Custom order: build a priority index Map; items in order → use their index; unordered → Infinity, then alphabetical',
      'Largest number: sort strings with comparator: (a+b > b+a) → a comes first',
    ],
    example: `sortByFrequency([1,1,2,2,2,3])     // [2,2,2,1,1,3]
customSort(['c','a','b'], ['b','a']) // ['b','a','c']
largestNumber([3,30,34,5,9])        // "9534330"`,
    traps: [
      'Frequency sort: mutating the input array with .sort() instead of spreading a copy',
      'Custom sort: items not in the order list must sort alphabetically among themselves, not by insertion order',
      'Largest number: all-zeros edge case — [0,0] should return "0" not "00"',
    ],
    solution: `export function sortByFrequency(nums: number[]): number[] {
  const freq = new Map<number,number>();
  for (const n of nums) freq.set(n,(freq.get(n)??0)+1);
  return [...nums].sort((a,b) => {
    const fd = freq.get(b)! - freq.get(a)!;
    return fd !== 0 ? fd : a - b;
  });
}

export function customSort(items: string[], order: string[]): string[] {
  const priority = new Map(order.map((item,i) => [item,i]));
  return [...items].sort((a,b) => {
    const pa = priority.has(a) ? priority.get(a)! : Infinity;
    const pb = priority.has(b) ? priority.get(b)! : Infinity;
    if (pa !== pb) return pa - pb;
    if (pa === Infinity) return a.localeCompare(b);
    return 0;
  });
}

export function largestNumber(nums: number[]): string {
  if (!nums.length) return '';
  const strs = nums.map(String);
  strs.sort((a,b) => { const ab=a+b, ba=b+a; return ab>ba?-1:ab<ba?1:0; });
  if (strs[0]==='0') return '0';
  return strs.join('');
}`,
  },

  {
    id: 'stack-problems',
    title: 'Stack Problems',
    category: 'algorithms',
    difficulty: 'Medium',
    pattern: 'Stack / Monotonic Stack',
    problem:
      'Three stack problems: (1) Valid parentheses — check if brackets are properly matched. (2) Daily temperatures — days until next warmer temperature. (3) Evaluate Reverse Polish Notation (postfix expressions).',
    approach: [
      'Valid parens: push opening brackets; on closing bracket, pop and validate match; stack must be empty at end',
      'Daily temps: monotonic decreasing stack of indices; when current temp is warmer than top, pop and record distance',
      'Eval RPN: push numbers; on operator, pop two, compute, push result; division truncates toward zero',
    ],
    example: `isValidParentheses("()[]{}")    // true
isValidParentheses("([)]")      // false
dailyTemperatures([73,74,75,71,69,72,76,73])  // [1,1,4,2,1,1,0,0]
evalRPN(["2","1","+","3","*"])  // 9`,
    traps: [
      'Valid parens: empty stack on close bracket — must check before popping',
      'Daily temps: stack stores INDICES, not temperatures — need index to compute the "days until" distance',
      'RPN: order matters — pop b first (right operand) then a (left operand) for - and /',
    ],
    solution: `export function isValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string,string> = { ')':'(', ']':'[', '}':'{' };
  for (const c of s) {
    if (c==='('||c==='['||c==='{') stack.push(c);
    else if (!stack.length || stack.pop()!==pairs[c]) return false;
  }
  return stack.length === 0;
}

export function dailyTemperatures(temps: number[]): number[] {
  const result = new Array(temps.length).fill(0);
  const stack: number[] = [];
  for (let i=0; i<temps.length; i++) {
    while (stack.length && temps[i]>temps[stack[stack.length-1]]) {
      const prev = stack.pop()!;
      result[prev] = i - prev;
    }
    stack.push(i);
  }
  return result;
}

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const ops = new Set(['+','-','*','/']);
  for (const t of tokens) {
    if (ops.has(t)) {
      const b=stack.pop()!, a=stack.pop()!;
      if (t==='+') stack.push(a+b);
      else if (t==='-') stack.push(a-b);
      else if (t==='*') stack.push(a*b);
      else stack.push(Math.trunc(a/b));
    } else stack.push(Number(t));
  }
  return stack[0];
}`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Combined export
// ─────────────────────────────────────────────────────────────────────────────

export const CODE_CHALLENGES: CodeChallenge[] = [
  ...BASICS,
  ...FUNDAMENTALS,
  ...TREE_TRAVERSAL,
  ...CORE_PATTERNS,
  ...BUSINESS_LOGIC,
  ...ALGORITHMS,
];
