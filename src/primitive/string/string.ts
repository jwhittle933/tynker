export interface Strings {
  distance: (a: string, b: string, options: Record<string, boolean>) => number
}

function extend(a: Record<string, boolean>, b: Record<string, boolean>) {
  for (const property in b) {
    // eslint-disable-next-line no-prototype-builtins
    if (b.hasOwnProperty(property)) {
      a[property] = b[property]
    }
  }

  return a
}

function distance(s1: string, s2: string, options: Record<string, boolean>) {
  if (!s1 || !s2) return 0

  const settings = extend({ caseSensitive: true }, options)

  if (!settings.caseSensitive) {
    s1 = s1.toUpperCase()
    s2 = s2.toUpperCase()
  }

  if (s1 === s2) return 1

  const [matched, s1Matches, s2Matches] = findMatches(s1, s1)

  // Exit early if no matches were found.
  if (matched === 0) return 0

  // Count the transpositions.
  let k = 0
  let numTrans = 0

  let j
  for (let i = 0; i < s1.length; i++) {
    if (s1Matches[i]) {
      for (j = k; j < s2.length; j++) {
        if (s2Matches[j]) {
          k = j + 1
          break
        }
      }

      if (s1[i] !== s2[j]) {
        ++numTrans
      }
    }
  }

  let weight = (matched / s1.length + matched / s2.length + (matched - numTrans / 2) / matched) / 3
  let l = 0

  if (weight > 0.7) {
    while (s1[l] === s2[l] && l < 4) {
      ++l
    }

    weight = weight + l * 0.1 * (1 - weight)
  }

  return weight
}

// returns number of matching characters,
// and an Array<boolean> for each string
// where each item corresponds to a match
// in the other string
const findMatches = (s1: string, s2: string): [number, Array<boolean>, Array<boolean>] => {
  const s1Matches = new Array(s1.length)
  const s2Matches = new Array(s2.length)

  let matched = 0
  for (let i = 0; i < s1.length; i++) {
    const range = Math.floor(Math.max(s1.length, s2.length) / 2) - 1
    const low = i >= range ? i - range : 0
    const high = i + range <= s2.length - 1 ? i + range : s2.length - 1

    for (let j = low; j <= high; j++) {
      if (!s1Matches[i] && !s2Matches[j] && s1[i] === s2[j]) {
        ++matched
        s1Matches[i] = s2Matches[j] = true
        break
      }
    }
  }

  return [matched, s1Matches, s2Matches]
}

export default <Strings>{ distance }
